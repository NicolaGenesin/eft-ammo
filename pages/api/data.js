import { withSentry } from "@sentry/nextjs";
const { GoogleSpreadsheet } = require("google-spreadsheet");
const fallback = require("./fallback").default;

const getFleaMarketPrices = async () => {
  const dataQuery = JSON.stringify({
    query: `
      { itemsByType(type: ammo){ name, normalizedName, lastLowPrice, wikiLink } }
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

  return json.data?.itemsByType || [];
};

const getResults = async (targetSheet, headerRow) => {
  const doc = new GoogleSpreadsheet(targetSheet);
  await doc.useServiceAccountAuth({
    client_email: process.env.NEXT_GOOGLE_CLIENT_EMAIL,
    private_key: process.env.NEXT_GOOGLE_PRIVATE_KEY,
  });
  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

  await sheet.loadHeaderRow(headerRow);
  const rows = await sheet.getRows({
    limit: 160,
    // offset: 38
  });

  const results = {};
  let currentKey = "";

  rows.forEach((row) => {
    const rawData = row._rawData;

    if (rawData[0] !== "") {
      currentKey = rawData[0];

      results[currentKey] = [row._rawData];
    } else {
      results[currentKey].push(row._rawData);
    }
  });

  return results;
};

const handler = async (req, res) => {
  console.log("[API] api/data GET - called");

  res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate");

  let noFAMResults;
  let additionalResults = [];
  let fleaMarketPrices;

  try {
    noFAMResults = await getResults(process.env.NEXT_TARGET_SHEET_21012022, 38);
  } catch (error) {
    console.log("[API] api/data GET - WARNING - Using fallback", error);

    noFAMResults = fallback;
  }

  try {
    additionalResults = await getResults(
      process.env.NEXT_TARGET_SHEET_ADDITIONAL,
      1
    );
  } catch (error) {
    console.log(
      "[API] api/data GET - WARNING - Additional data failed to load",
      error
    );
  }

  try {
    fleaMarketPrices = await getFleaMarketPrices();
  } catch (error) {
    console.log(
      "[API] api/data GET - WARNING - Flea Market Prices data failed to load",
      error
    );
  }

  // console.log("[noFAMResults]", JSON.stringify(noFAMResults));
  // console.log("[additionalResults]", JSON.stringify(additionalResults));
  // console.log("[fleaMarketPrices]", JSON.stringify(fleaMarketPrices));

  const json = {};

  Object.keys(noFAMResults).map((category) => {
    if (category !== "undefined") {
      json[category] = noFAMResults[category].map((ammoSpecs) => {
        const ammo = {
          name: ammoSpecs[1],
          damage: ammoSpecs[2],
          penValue: ammoSpecs[3],
          fragChange: ammoSpecs[4],
          recoil: ammoSpecs[5],
          effDist: ammoSpecs[6],
          maxHsDist: ammoSpecs[7],
          class1: ammoSpecs[8],
          class2: ammoSpecs[9],
          class3: ammoSpecs[10],
          class4: ammoSpecs[11],
          class5: ammoSpecs[12],
          class6: ammoSpecs[13],
          category: category,
        };

        let additionalSpecsForAmmo;

        try {
          additionalSpecsForAmmo = additionalResults[category].find(
            (additionalRow) => {
              return additionalRow[1] === ammo.name;
            }
          );
        } catch (error) { }

        if (additionalSpecsForAmmo) {
          ammo.standard = {
            translations: {
              en: { name: additionalSpecsForAmmo[2], note: ammoSpecs[14], secondNote: ammoSpecs[15] },
              es: { name: additionalSpecsForAmmo[6], note: additionalSpecsForAmmo[7] },
            },
            normalizedName: additionalSpecsForAmmo[3],
          };
          ammo.notAvailableOnFleaMarket = additionalSpecsForAmmo[4] === "FALSE";
          ammo.initialSpeed = additionalSpecsForAmmo[5] || "";

          const price = fleaMarketPrices.find((priceItem) => {
            return priceItem.normalizedName === ammo.standard.normalizedName;
          });

          if (price) {
            // const buyFor = price.buyFor.find((x) => x.source === "fleaMarket");

            // if (buyFor) {
            //   ammo.buyFor = [buyFor];
            // }

            ammo.price = price.lastLowPrice;
            ammo.wikiLink = price.wikiLink;
          }
        }

        return ammo;
      });
    }
  });

  res.status(200).json(json);
};

export default withSentry(handler);
