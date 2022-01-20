import { withSentry } from "@sentry/nextjs";
const { GoogleSpreadsheet } = require("google-spreadsheet");
const fallback = require("./fallback").default;

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

  try {
    noFAMResults = await getResults(process.env.NEXT_TARGET_SHEET, 38);
    additionalResults = await getResults(
      process.env.NEXT_TARGET_SHEET_ADDITIONAL,
      1
    );
  } catch (error) {
    console.log("[API] api/data GET - WARNING - Using fallback");
    console.log(error);

    noFAMResults = fallback;
  }

  const json = {};

  Object.keys(noFAMResults).map((category) => {
    json[category] = noFAMResults[category].map((ammoRow) => {
      const ammo = {
        name: ammoRow[1],
        damage: ammoRow[2],
        penValue: ammoRow[3],
        armorDamage: ammoRow[4],
        fragChange: ammoRow[5],
        recoil: ammoRow[6],
        effDist: ammoRow[7],
        maxHsDist: ammoRow[8],
        class1: ammoRow[9],
        class2: ammoRow[10],
        class3: ammoRow[11],
        class4: ammoRow[12],
        class5: ammoRow[13],
        class6: ammoRow[14],
        note: ammoRow[15],
        secondNote: ammoRow[16],
        category: category,
      };

      const additionalSpecsForAmmo = additionalResults[category].find(
        (additionalRow) => {
          return additionalRow[1] === ammo.name;
        }
      );

      if (additionalSpecsForAmmo) {
        ammo.standard = {
          name: additionalSpecsForAmmo[2],
          normalizedName: additionalSpecsForAmmo[3],
        };
        ammo.notAvailableOnFleaMarket = additionalSpecsForAmmo[4] === "FALSE";
      }

      return ammo;
    });
  });

  res.status(200).json(json);
};

export default withSentry(handler);
