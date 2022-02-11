import { PSDB } from "planetscale-node";
const conn = new PSDB("main");

// `id` int NOT NULL AUTO_INCREMENT,
// `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
// `code` varchar(255) NOT NULL,
// `configuration` json DEFAULT NULL,
// `socialVote` int DEFAULT '0',

const handler = async (req, res) => {
  const { body, method, query } = req;

  switch (method) {
    case "POST":
      const { code, configuration } = body;

      // the replace is crucial e.g. 'AR-15s 20"' is stringified to "AR-15 20\\"" and will fail the insert
      const stringifiedBody = JSON.stringify(configuration).replace(/\\"/g, "");

      await conn.query(
        `update gunbuilds set configuration = '${stringifiedBody}' where code = '${code}';`
      );

      res.status(200).json({ ok: true });
      break;
    case "GET":
      const { uuid } = req.query;

      const [getRows, _] = await conn.query(
        `select * from gunbuilds where code = '${uuid}'`
      );

      if (getRows.length) {
        res.json({ data: getRows[0], isNew: false });
      } else {
        await conn.query(`insert into gunbuilds (code) values ('${uuid}')`);

        res.json({ data: { code: uuid }, isNew: true });
      }

      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
