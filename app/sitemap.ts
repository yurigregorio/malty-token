import type { MetadataRoute } from "next";
import { MALTY_PUBLIC_REVIEW_DATE_ISO } from "./lib/malty-token";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://malty-token.vercel.app";
const publicRoutes = ["", "/about", "/gives", "/transparency", "/updates", "/docs"];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(MALTY_PUBLIC_REVIEW_DATE_ISO),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
