const { GoogleSpreadsheet } = require("google-spreadsheet");
const fallback = require("./fallback").default;
const doc = new GoogleSpreadsheet(process.env.NEXT_TARGET_SHEET);

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

  res.status(200).json(results);
};

export default handler;
