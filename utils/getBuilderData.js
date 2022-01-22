const dev = process.env.NEXT_NODE_ENV !== "production";
const url = dev ? "http://localhost:3000" : "https://eft-ammo.com";

const getBuilderData = async () => {
  const data = fetch(`${url}/api/builder/`, {
    method: "GET",
  });

  return data;
};

export default getBuilderData;
