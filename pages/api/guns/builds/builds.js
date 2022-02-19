import { PSDB } from "planetscale-node";
const conn = new PSDB("main");

const handler = async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case "GET":
      let queryToExec = `select value from build a join configuration b on a.code = b.code where value is not null and json_length(value) > 1 order by createdAt desc limit 20`;

      if (query.orderBy === "score") {
        queryToExec = `select value from build a join configuration b on a.code = b.code where value is not null and json_length(value) > 1 order by createdAt desc limit 20`;
      }

      const [getRows, _] = await conn.query(queryToExec);

      res.json({ data: getRows });

      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
