export const dev = process.env.NODE_ENV === "development";
export const url = dev
  ? "http://localhost:3000"
  : "https://eft-ammo-git-gun-builder-feature-1911z.vercel.app";
