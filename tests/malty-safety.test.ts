import { describe, expect, it } from "vitest";

import { MALTY_CONFIG } from "../app/lib/malty-config";
import {
  MALTY_PRODUCTION_POLICY,
  MALTY_TOKEN,
  MALTY_TOTAL_SUPPLY_BASE_UNITS,
} from "../app/lib/malty-token";

describe("MALTY token invariants", () => {
  it("keeps the final token identity fixed", () => {
    expect(MALTY_TOKEN.name).toBe("Malty");
    expect(MALTY_TOKEN.symbol).toBe("MALTY");
    expect(MALTY_TOKEN.decimals).toBe(6);
    expect(MALTY_TOKEN.totalSupplyTokens).toBe(1_000_000_000n);
    expect(MALTY_TOTAL_SUPPLY_BASE_UNITS).toBe(1_000_000_000_000_000n);
  });

  it("never configures a freeze authority", () => {
    expect(MALTY_PRODUCTION_POLICY.freezeAuthority).toBeNull();
  });

  it("keeps Mainnet mutations locked until an explicit reviewed release", () => {
    expect(MALTY_CONFIG.mainnet.mint).toBeNull();
    expect(MALTY_CONFIG.mainnet.allowCreateMint).toBe(false);
    expect(MALTY_CONFIG.mainnet.allowMintSupply).toBe(false);
    expect(MALTY_CONFIG.mainnet.allowMetadata).toBe(false);
    expect(MALTY_CONFIG.mainnet.allowRevokeMintAuthority).toBe(false);
  });

  it("keeps the completed Devnet deployment immutable from the app", () => {
    expect(MALTY_CONFIG.devnet.mint).not.toBeNull();
    expect(MALTY_CONFIG.devnet.allowCreateMint).toBe(false);
    expect(MALTY_CONFIG.devnet.allowMintSupply).toBe(false);
    expect(MALTY_CONFIG.devnet.allowMetadata).toBe(false);
    expect(MALTY_CONFIG.devnet.allowRevokeMintAuthority).toBe(false);
  });
});
