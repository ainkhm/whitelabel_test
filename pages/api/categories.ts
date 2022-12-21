import { NextApiResponse } from "next";
import { getBlog } from "../../src/helpers/getBlog"

export default async function blogHandler(_: unknown, res: NextApiResponse) {
  const data = await getBlog();

  return res.status(200).json(data.categories);
}