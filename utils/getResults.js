const dev = process.env.NEXT_NODE_ENV !== "production";
const url = dev
  ? "http://localhost:3000"
  : "https://eft-ammo-git-nofam-data-v2-1911z.vercel.app";

const getResults = async () => {
  const results = fetch(`${url}/api/data`, {
    method: "GET",
  });

  return results;
};

export default getResults;
