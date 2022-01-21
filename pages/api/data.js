import { withSentry } from "@sentry/nextjs";
const { GoogleSpreadsheet } = require("google-spreadsheet");
const fallback = require("./fallback").default;
const doc = new GoogleSpreadsheet(
  "1Ui7TUxTrueCElnfnuZ5SEHtAJnv-w4eoANeVO9_nqvY"
);

const getResults = async () => {
  await doc.useServiceAccountAuth({
    client_email: process.env.NEXT_GOOGLE_CLIENT_EMAIL,
    private_key: process.env.NEXT_GOOGLE_PRIVATE_KEY,
  });
  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

  await sheet.loadHeaderRow(38);
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

  let results;

  try {
    results = await getResults();
  } catch (error) {
    console.log("[API] api/data GET - WARNING - Using fallback");

    results = fallback;
  }

  const json = {};

  Object.keys(results).map((key) => {
    json[key] = results[key].map((ammoSpecs) => {
      console.log(ammoSpecs);

      return {
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
        note: ammoSpecs[14],
        secondNote: ammoSpecs[15],
        category: key,
      };
    });
  });

  res.status(200).json(json);
};

export default withSentry(handler);
