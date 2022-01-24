import { withSentry } from "@sentry/nextjs";
const tinyURL = require("tinyurl");

const handler = async (req, res) => {
  const body = req.body;
  const result = await tinyURL.shorten(body.link);

  res.status(200).json({ result });
};

export default withSentry(handler);
