import { PSDB } from "planetscale-node";
const conn = new PSDB("main");

const handler = async (req, res) => {
  const { body, method, query } = req;

  switch (method) {
    case "POST":
      const { direction } = body;

      const [getRows, _] = await conn.query(
        `select * from build where code = '${query.uuid}'`
      );

      let score = getRows[0].score;

      if (direction === "up") {
        score = score + 1;
      } else if (direction === "down") {
        score = score - 1;
      }

      await conn.query(
        `update build set score = ${score} where code = '${query.uuid}';`
      );

      res.status(200).json({ ok: true });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
