export const serviceKeys = [
  "web",
  "systems",
  "mobile",
  "ai",
  "ecommerce",
  "uiux",
  "apis",
  "hosting",
] as const;

export type ServiceKey = (typeof serviceKeys)[number];

export const projectKeys = [
  "thawra",
  "noureldin",
  "usersave",
  "morshd",
  "labib",
  "laborex",
] as const;

export type ProjectKey = (typeof projectKeys)[number];

export const projectLogos: Record<ProjectKey, string> = {
  thawra: "/thawra-logo.png",
  noureldin: "/nour-eldeeen-logo.png",
  usersave: "/uzer-saif-logo.png",
  morshd: "/morsh-d-logo.png",
  labib: "/labeeb-logo.png",
  laborex: "/laborex-logo.png",
};

/** Header surface behind each logo (matches baked-in logo backgrounds). */
export const projectLogoBg: Record<ProjectKey, string> = {
  thawra: "bg-[#f8f4f0]",
  noureldin: "bg-[#f8f4f0]",
  usersave: "bg-black",
  morshd: "bg-black",
  labib: "bg-[#e4e8df]",
  laborex: "bg-[#e4e8df]",
};

export const featuredFeatureKeys = [
  "ai",
  "qr",
  "table",
  "delivery",
  "payment",
  "dashboard",
  "reports",
  "offers",
  "multi",
] as const;

export type FeaturedFeatureKey = (typeof featuredFeatureKeys)[number];

/** WhatsApp chat (wa.me) — 01555666947 */
export const WHATSAPP_CHAT_NUMBER = "201555666947";

export const heroTagKeys = [
  "software",
  "mobile",
  "cloud",
  "databases",
  "apis",
  "ai",
  "web",
  "security",
] as const;
