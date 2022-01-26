import { withSentry } from "@sentry/nextjs";

const getItems = async () => {
  // meds: getByBsgCategoryId('5448f3a14bdc2d27728b4569'),

  const dataQuery = JSON.stringify({
    query: `
        { 
            earpiece: itemsByType(type: headphones)  { lastLowPrice, gridImageLink, name, normalizedName, weight },
            headwear: itemsByType(type: helmet)  { lastLowPrice, gridImageLink, name, normalizedName, weight },
            faceCover: itemsByBsgCategoryId(bsgCategoryId: "57bef4c42459772e8d35a53b")  { lastLowPrice, gridImageLink, name, normalizedName, weight },
            armband: itemsByBsgCategoryId(bsgCategoryId: "5b3f15d486f77432d0509248")  { lastLowPrice, gridImageLink, name, normalizedName, weight },
            scabbard: itemsByBsgCategoryId(bsgCategoryId: "5447e1d04bdc2dff2f8b4567")  { lastLowPrice, gridImageLink, name, normalizedName, weight },
            guns: itemsByType(type: gun)  { lastLowPrice, gridImageLink, name, normalizedName, weight },
            bodyArmor: itemsByType(type: armor)  { lastLowPrice, gridImageLink, name, normalizedName, weight },
            eyewear: itemsByType(type: glasses)  { lastLowPrice, gridImageLink, name, normalizedName, weight },
            ammos: itemsByType(type: ammo)  { lastLowPrice, gridImageLink, name, normalizedName, weight },  
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

  json.data.headwear = [...json.data.faceCover, ...json.data.headwear];

  // dedupe (there are some)
  json.data.headwear = json.data.headwear.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.name === value.name)
  );

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
