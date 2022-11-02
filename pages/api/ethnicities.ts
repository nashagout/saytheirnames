import type { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import { Low } from "lowdb";
// @ts-ignore
import { JSONFile } from "lowdb/node";
export type DataType = {
  id: number;
  label: string;
};
const filePath = join(process.cwd(), "public/ds/ethnicities.json");
const adapter = new JSONFile<DataType[]>(filePath);
const db = new Low<DataType[]>(adapter);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Low<DataType[]>>
) {
  await db.read();

  res.status(200).json(db);
}
