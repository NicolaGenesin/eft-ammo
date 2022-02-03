import { v4 as uuidv4 } from "uuid";
import { PSDB } from "planetscale-node";
const { GoogleSpreadsheet } = require("google-spreadsheet");

const conn = new PSDB("main");

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

export default async (req, res) => {
  const { body, method, query } = req;
  switch (method) {
    case "POST":
      let code = uuidv4();

      console.log(code);

      code = code.replaceAll("-", "");
      const path = body.link;

      await conn.query(
        `insert into urls (code, path) values ('${code}', '${path}')`
      );

      try {
        await writeToGoogleSheet(code, path);
      } catch (error) {
        console.log("Error while saving to spreadsheet");
      }

      res.status(200).json({ code });
      break;
    case "GET":
      try {
        const { code } = query;

        if (!code) {
          break;
        }

        const [getRows, _] = await conn.query(
          `select * from urls where code = '${code}'`
        );

        res.status(200).json({ result: getRows[0].path });
      } catch (e) {
        console.log(e);
      }

      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
