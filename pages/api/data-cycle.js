import { withSentry } from "@sentry/nextjs";
const { GoogleSpreadsheet } = require("google-spreadsheet");
const fallback = require("./fallback").default;

const componentToHex = (component) => {
  var hex = Math.round(component * 255).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

const rgbToHex = ({ red, green, blue }) => {
  return (
    "#" + componentToHex(red) + componentToHex(green) + componentToHex(blue)
  );
};

const getResults = async (targetSheet, headerRow, limit, titleAt) => {
  const doc = new GoogleSpreadsheet(targetSheet);
  await doc.useServiceAccountAuth({
    client_email: process.env.NEXT_GOOGLE_CLIENT_EMAIL,
    private_key: process.env.NEXT_GOOGLE_PRIVATE_KEY,
  });
  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  await sheet.loadHeaderRow(headerRow);
  await sheet.loadCells();
  const rows = await sheet.getRows({
    limit,
  });

  const results = [sheet.headerValues.map(value => { return { value, backgroundColor: "#ccc" } })];

  for (let x = 0; x < rows.length; x++) {
    const row = rows[x];
    const tmp = [];

    for (let y = 0; y < row._rawData.length; y++) {
      const value = row._rawData[y];
      const cell = sheet.getCell(x + headerRow, y);
      const backgroundColor = cell.effectiveFormat ? cell.effectiveFormat.backgroundColor : undefined;
      const hexBackgroundColor = rgbToHex(backgroundColor);
      const k = { value };

      if (hexBackgroundColor !== "#ffffff") {
        k.backgroundColor = hexBackgroundColor;
      }

      tmp.push(k);
    }

    results.push(tmp);
  }

  let title = sheet.getCell(titleAt[0], titleAt[1]).formattedValue

  if (titleAt.length > 2) {
    title += " - " + sheet.getCell(titleAt[2], titleAt[3]).formattedValue
  }

  return { title, rows: results };
};

const handler = async (req, res) => {
  console.log("[API] api/data GET - called");

  res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate");

  const table1 = await getResults(process.env.NEXT_TARGET_SHEET_CYCLE, 2, 7, [0, 1]);
  const table2 = await getResults(process.env.NEXT_TARGET_SHEET_CYCLE, 15, 9, [13, 1]);
  const table3 = await getResults(process.env.NEXT_TARGET_SHEET_CYCLE, 31, 3, [28, 1, 29, 1]);
  const table4 = await getResults(process.env.NEXT_TARGET_SHEET_CYCLE, 41, 3, [38, 1, 39, 1]);

  res.status(200).json({ table1, table2, table3, table4 });
};

export default withSentry(handler);
