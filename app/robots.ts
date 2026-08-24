import type { MetadataRoute } from "next"
import { config } from "@/lib/config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Pages that need to stay crawlable so Google can see and honor their
      // `noindex` meta tag (profile, wallet, /p/*, attendance, form pages)
      // are intentionally NOT blocked here. Blocking them in robots.txt
      // would prevent Googlebot from ever seeing that tag and dropping
      // them from the index. /api/ has no HTML content to index, so it's
      // safe to block outright.
      disallow: ["/api/"],
    },
    sitemap: `${config.thisAppUrl}/sitemap.xml`,
  }
}
