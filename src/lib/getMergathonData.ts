import "server-only";

import { cache } from "react";
import { readFile } from "fs/promises";
import path from "path";
import { MergathonData } from "../types";

export const getMergathonData = cache(async function getMergathonData(): Promise<MergathonData> {
  const filePath = path.join(process.cwd(), "public", "data", "mergathon-data.json");
  const fileContents = await readFile(filePath, "utf8");
  return JSON.parse(fileContents) as MergathonData;
});