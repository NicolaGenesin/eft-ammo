export const dev = process.env.NEXT_NODE_ENV !== "production";
export const url = dev ? "http://localhost:3000" : "https://eft-ammo.com";
