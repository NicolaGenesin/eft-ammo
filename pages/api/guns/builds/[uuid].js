import { PSDB } from "planetscale-node";
const conn = new PSDB("main");

const handler = async (req, res) => {
  const { body, method, query } = req;

  switch (method) {
    case "POST":
      const { code, configuration } = body;

      // the replace is crucial e.g. 'AR-15s 20"' is stringified to "AR-15 20\\"" and will fail the insert
      const stringifiedBody = JSON.stringify(configuration).replace(/\\"/g, "");

      await conn.query(
        `update configuration set value = '${stringifiedBody}' where code = '${code}';`
      );

      const queryBuilder = [];

      if (configuration?.title) {
        queryBuilder.push(`name = "${configuration.title}"`);
      }

      if (configuration?.twitchLoginId) {
        queryBuilder.push(`twitchLoginId = "${configuration.twitchLoginId}"`);
      }

      if (configuration?.gun?.name) {
        queryBuilder.push(`gunName = "${configuration.gun.name}"`);
      }

      if (configuration?.currentBuild) {
        let modsCount = 0;

        const slots = configuration.currentBuild?.slots || [];

        const countSlots = (slots) => {
          slots.forEach((slot) => {
            if (slot.item) {
              modsCount += 1;
            }
            if (slot.slots?.length) {
              countSlots(slot.slots);
            }
          });
        };

        countSlots(slots);

        queryBuilder.push(`modsCount = ${modsCount}`);
      }

      await conn.query(
        `update build set ${queryBuilder.join(",")} where code = '${code}';`
      );

      res.status(200).json({ ok: true });
      break;
    case "GET":
      const { uuid } = req.query;

      const [getRows, _] = await conn.query(
        `select a.createdAt, a.code, a.score, value as configuration from build a join configuration b on a.code = b.code where b.code = '${uuid}'`
      );

      if (getRows.length) {
        res.json({ data: getRows[0], isNew: false });
      } else {
        await conn.query(`insert into build (code) values ('${uuid}')`);
        await conn.query(`insert into configuration (code) values ('${uuid}')`);

        res.json({ data: { code: uuid }, isNew: true });
      }

      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
