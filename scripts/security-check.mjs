import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`SECURITY CHECK FAILED: ${message}`);
  process.exitCode = 1;
};

const trackedFiles = execFileSync("git", ["ls-files"], {
  encoding: "utf8",
})
  .split("\n")
  .map((file) => file.trim())
  .filter(Boolean);

const forbiddenTrackedFiles = trackedFiles.filter((file) => {
  if (file === ".env.example") return false;
  return (
    /(^|\/)\.env(?:\.|$)/i.test(file) ||
    /\.(pem|key|p12|pfx)$/i.test(file) ||
    /(^|\/)(id_rsa|id_ed25519)$/i.test(file)
  );
});

if (forbiddenTrackedFiles.length > 0) {
  fail(`sensitive file names are tracked: ${forbiddenTrackedFiles.join(", ")}`);
}

const binaryExtensions = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".ico",
  ".lock",
]);

const extensionOf = (file) => {
  const index = file.lastIndexOf(".");
  return index >= 0 ? file.slice(index).toLowerCase() : "";
};

const secretAssignmentPattern =
  /\b(?:API_KEY|SECRET|PRIVATE_KEY|MNEMONIC|SEED_PHRASE|SEED)\b\s*[:=]\s*["']?([A-Za-z0-9+/_=-]{20,})["']?/gi;
const privateKeyBlockPattern = /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/;

for (const file of trackedFiles) {
  if (binaryExtensions.has(extensionOf(file))) continue;

  let content;
  try {
    content = readFileSync(file, "utf8");
  } catch {
    continue;
  }

  if (privateKeyBlockPattern.test(content)) {
    fail(`private-key material marker found in ${file}`);
  }

  secretAssignmentPattern.lastIndex = 0;
  const match = secretAssignmentPattern.exec(content);
  if (match) {
    fail(`possible hard-coded secret assignment found in ${file}`);
  }
}

const config = readFileSync("app/lib/malty-config.ts", "utf8");
const mainnetBlock = config.match(/mainnet:\s*\{([\s\S]*?)\n\s*\},?\n\};/);

if (!mainnetBlock) {
  fail("could not locate MALTY mainnet configuration block");
} else {
  const block = mainnetBlock[1];
  for (const flag of [
    "allowCreateMint",
    "allowMintSupply",
    "allowMetadata",
    "allowRevokeMintAuthority",
  ]) {
    if (!new RegExp(`${flag}:\\s*false`).test(block)) {
      fail(`Mainnet mutation flag ${flag} must remain false`);
    }
  }

  for (const state of ["supplyMinted", "metadataCreated", "mintAuthorityRevoked"]) {
    if (!new RegExp(`${state}:\\s*true`).test(block)) {
      fail(`completed Mainnet state ${state} must remain true`);
    }
  }
}

const actionsPanel = readFileSync(
  "app/components/actions/actions-panel.tsx",
  "utf8"
);

if (!/if\s*\(cluster\s*===\s*["']mainnet["']\)/.test(actionsPanel)) {
  fail("ActionsPanel must keep an explicit Mainnet read-only guard");
}

const gitignore = readFileSync(".gitignore", "utf8");
if (!/^\.env\*$/m.test(gitignore) || !/^!\.env\.example$/m.test(gitignore)) {
  fail(".gitignore must exclude .env* while allowing .env.example");
}

if (!process.exitCode) {
  console.log("Security invariant checks passed.");
}
