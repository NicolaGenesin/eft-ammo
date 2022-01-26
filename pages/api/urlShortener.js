import { withSentry } from "@sentry/nextjs";
const tinyURL = require("tinyurl");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const writeToGoogleSheet = async (link, originalLink) => {
  const doc = new GoogleSpreadsheet(
    "18QS7LFyM-Hy5xgFqVAPHeJKhAdUUiL6ZFU1eXGn5WHQ"
  );
  await doc.useServiceAccountAuth({
    client_email: process.env.NEXT_GOOGLE_CLIENT_EMAIL,
    private_key: process.env.NEXT_GOOGLE_PRIVATE_KEY,
  });
  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0];

  await sheet.loadHeaderRow(1);
  await sheet.addRow([link, new Date().toString(), originalLink]);
};

const handler = async (req, res) => {
  const body = req.body;
  const originalLink = body.link;
  const result = await tinyURL.shorten(originalLink);

  try {
    await writeToGoogleSheet(result, originalLink);
  } catch (error) {
    console.log("Error while saving to spreadsheet");
  }

  res.status(200).json({ result });
};

export default withSentry(handler);
