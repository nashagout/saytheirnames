import type { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import { Low } from "lowdb";
// @ts-ignore
import { JSONFile } from "lowdb/node";
export type DataType = {
  lastName: string;
  firstName: string;
  dob: Date;
  cob: number;
  cod: number;
  e: number;
  id: number;
};

const filePath = join(process.cwd(), "public/ds/names.json");
const adapter = new JSONFile<DataType[]>(filePath);
const db = new Low<DataType[]>(adapter);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Low<DataType[]>>
) {
  await db.read();

  res.status(200).json(db);
}
