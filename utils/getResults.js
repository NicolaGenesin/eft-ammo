import { url } from "./env";

const getResults = async () => {
  const results = fetch(`${url}/api/data`, {
    method: "GET",
  });

  return results;
};

export default getResults;
