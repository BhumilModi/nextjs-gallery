import type {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
  res: NextApiResponse,
  req: NextApiRequest
) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({message: "Invalid Token"});
  }

  try {
    await res.unstable_revalidate();
    return res.json({revalidated: true});
  } catch (err) {
    return res.status(500).send("Error Revalidating");
  }
}
