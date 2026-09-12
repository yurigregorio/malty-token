import type { Metadata } from "next";
import { NotFoundContent } from "./not-found-content";

export const metadata: Metadata = {
  title: "Page Not Found — MALTY",
  description: "The page you requested does not exist or may have moved.",
};

export default function NotFound() {
  return <NotFoundContent />;
}
