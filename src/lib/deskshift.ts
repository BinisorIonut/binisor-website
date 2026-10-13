// Facts about DeskShift that several pages quote. Change them here only.

const APP_STORE_ID = "6773494854";

// App Store Connect → App Analytics → Acquisition → Campaigns gives the provider
// token ("pt"). With it set, every store link carries a campaign name and App
// Analytics counts downloads per campaign. Empty: a plain link, no attribution.
const PROVIDER_TOKEN = "";

/** The Mac App Store link, tagged with a campaign name once the provider token is set. */
export function appStoreUrl(campaign = "website"): string {
  const base = `https://apps.apple.com/app/deskshift/id${APP_STORE_ID}`;
  if (!PROVIDER_TOKEN) return base;
  return `${base}?pt=${PROVIDER_TOKEN}&ct=${encodeURIComponent(campaign)}&mt=12`;
}

// The minimum of the build that is live on the App Store (1.3.0, since 2026-10-13).
export const MIN_MACOS = "15";

// The price of Pro. The App Store converts it for every other country. Keep it
// in step with the In-App Purchase's price schedule in App Store Connect.
export const PRO_PRICE = "$19.99 in the US, €19.99 in the euro area";

export const SUPPORT_EMAIL = "deskshift@binisor.com";

// Required wherever a page names IDÅSEN.
export const DISCLAIMER =
  "DeskShift is an independent app. It is not affiliated with, endorsed by, or sponsored by IKEA or LINAK. IDÅSEN is a trademark of Inter IKEA Systems B.V.";
