import { withSentry } from "@sentry/nextjs";

const getItems = async (ids) => {
  const queryBuilder = [];

  ids.forEach((id) => {
    queryBuilder.push(`_${id}: item(id: "${id}")  { lastLowPrice }`);
  });

  const dataQuery = JSON.stringify({
    query: `
        { 
          ${queryBuilder.join(",")}
        }
    `,
  });

  const response = await fetch("https://api.tarkov.dev/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: dataQuery,
  });

  const json = await response.json();

  return json.data;
};

const handler = async (req, res) => {
  const { body } = req;
  const { ids } = body;
  let json = {};

  try {
    json = await getItems(ids);
  } catch (error) {
    console.log("[API] api/data GET - Failed to get items", error);
  }

  res.status(200).json(json);
};

export default withSentry(handler);
