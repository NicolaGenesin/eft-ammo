import { withSentry } from "@sentry/nextjs";

const getItems = async () => {
  // todo do mapping

  const dataQuery = JSON.stringify({
    query: `
        { 
            headphones: itemsByType(type: headphones)  { gridImageLink, name, normalizedName},
            helmet: itemsByType(type: helmet)  { gridImageLink, name, normalizedName},
            gun: itemsByType(type: gun)  { gridImageLink, name, normalizedName},
            armor: itemsByType(type: armor)  { gridImageLink, name, normalizedName},
            glasses: itemsByType(type: glasses)  { gridImageLink, name, normalizedName},
            grenade: itemsByType(type: grenade)  { gridImageLink, name, normalizedName},
            injectors: itemsByType(type: injectors)  { gridImageLink, name, normalizedName},
            meds: itemsByType(type: meds)  { gridImageLink, name, normalizedName},  
        }
    `,
  });

  const response = await fetch("https://tarkov-tools.com/graphql", {
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
  res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate");

  let json = {};

  try {
    json = await getItems();
  } catch (error) {
    console.log("[API] api/data GET - Failed to get items", error);
  }

  console.log(json);

  res.status(200).json(json);
};

export default withSentry(handler);
