"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function UTMTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getSource = () => {
        // 1. Check for explicit UTM / Ref parameters
        const utmSource = searchParams.get("utm_source");
        const utmMedium = searchParams.get("utm_medium");
        const ref = searchParams.get("ref");
        const fbclid = searchParams.get("fbclid"); // Facebook Click ID
        const gclid = searchParams.get("gclid");   // Google Ad Click ID

        if (utmSource) return `${utmSource}${utmMedium ? ` / ${utmMedium}` : ''}`;
        if (fbclid) return "Meta Ads";
        if (gclid) return "Google Ads";
        if (ref) return `Referral (${ref})`;

        // 2. Check HTTP Referrer if no direct params exist
        const referrer = document.referrer;
        if (referrer) {
          if (referrer.includes("facebook.com") || referrer.includes("instagram.com")) return "Meta / Instagram Organic";
          if (referrer.includes("google.com")) return "Google Organic Search";
          if (referrer.includes("linkedin.com")) return "LinkedIn Organic";
          if (referrer.includes("wa.me") || referrer.includes("whatsapp.com")) return "WhatsApp";
          return `Website Referral: ${new URL(referrer).hostname}`;
        }

        return "Website Organic";
      };

      const identifiedSource = getSource();
      
      // Store in localStorage if it's not simply "Website Organic" or if nothing is stored yet
      const existingSource = localStorage.getItem("aiclex_lead_source");
      if (identifiedSource !== "Website Organic" || !existingSource) {
        localStorage.setItem("aiclex_lead_source", identifiedSource);
      }
    }
  }, [searchParams]);

  return null; // This is a logic-only component
}
