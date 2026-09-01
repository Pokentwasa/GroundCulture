import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { events } from "@/data/events";
import { locations } from "@/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/events",
    "/menu",
    "/locations",
    "/about",
    "/hire",
    "/hire/food-truck",
    "/hire/venue",
    "/gallery",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
  }));

  const eventRoutes = events.map((e) => ({
    url: `${site.url}/events/${e.slug}`,
    lastModified: now,
  }));

  const locationRoutes = locations.map((l) => ({
    url: `${site.url}/locations/${l.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...eventRoutes, ...locationRoutes];
}
