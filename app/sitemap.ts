import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://malty-token.vercel.app";
const publicRoutes = ["", "/about", "/gives", "/transparency", "/updates", "/docs"];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-09-12"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
