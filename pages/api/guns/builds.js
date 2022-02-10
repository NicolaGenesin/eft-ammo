import { PSDB } from "planetscale-node";
const conn = new PSDB("main");

// `id` int NOT NULL AUTO_INCREMENT,
// `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
// `code` varchar(255) NOT NULL,
// `configuration` json DEFAULT NULL,
// `socialVote` int DEFAULT '0',

const handler = async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case "GET":
      let queryToExec = `select * from gunbuilds where configuration is not null order by createdAt desc limit 150`;

      if (query.orderBy === "score") {
        queryToExec = `select * from gunbuilds where configuration is not null order by socialVote desc limit 150`;
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
