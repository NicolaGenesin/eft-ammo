import { url } from "./env";

const getBuilderData = async () => {
  const data = fetch(`${url}/api/builder/`, {
    method: "GET",
  });

  return data;
};

export default getBuilderData;
