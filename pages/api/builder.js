import { withSentry } from "@sentry/nextjs";

const getItems = async () => {
  // todo do mapping

  const dataQuery = JSON.stringify({
    query: `
        { 
            headphones: itemsByType(type: headphones)  { gridImageLink, name, normalizedName, weight },
            helmet: itemsByType(type: helmet)  { gridImageLink, name, normalizedName, weight },
            gun: itemsByType(type: gun)  { gridImageLink, name, normalizedName, weight },
            armor: itemsByType(type: armor)  { gridImageLink, name, normalizedName, weight },
            glasses: itemsByType(type: glasses)  { gridImageLink, name, normalizedName, weight },
            grenade: itemsByType(type: grenade)  { gridImageLink, name, normalizedName, weight },
            injectors: itemsByType(type: injectors)  { gridImageLink, name, normalizedName, weight },
            meds: itemsByType(type: meds)  { gridImageLink, name, normalizedName, weight },  
            ammos: itemsByType(type: ammo)  { gridImageLink, name, normalizedName, weight },  
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

  res.status(200).json(json);
};

export default withSentry(handler);
