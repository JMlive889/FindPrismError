export type TravelConfig = {
  freeZips: string[];
  tiers: { priceCents: number; zips: string[] }[];
  defaultOutsideFreeZipsCents: number;
  fallbackCents: number;
};

export function travelForZip(zip: string, cfg: TravelConfig): number {
  const z = (zip || '').trim();
  if (!z) return cfg.defaultOutsideFreeZipsCents;
  if (cfg.freeZips.includes(z)) return 0;
  for (const t of cfg.tiers) if (t.zips.includes(z)) return t.priceCents;
  return cfg.defaultOutsideFreeZipsCents ?? cfg.fallbackCents;
}

export const DEFAULT_TRAVEL_CONFIG: TravelConfig = {
  freeZips: ["30012", "30013"],
  tiers: [
    {
      priceCents: 2500,
      zips: [
        "30014", "30016", "30038", "30058", "30094", "30052",
        "30252", "30281", "30294"
      ]
    },
    {
      priceCents: 4000,
      zips: [
        "30087", "30078", "30017", "30083", "30034", "30032", "30021",
        "30046", "30316", "30317", "30248", "30236"
      ]
    }
  ],
  defaultOutsideFreeZipsCents: 2500,
  fallbackCents: 4000
};