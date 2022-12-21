import path from "path";
import { promises as fs } from "fs";

import { BlogData } from "../../types";

export const getBlog = async (): Promise<BlogData> => {
  const jsonDirectory = path.join(process.cwd(), "json");
  const fileContents = await fs.readFile(jsonDirectory + "/data.json", "utf8");
  const parsedJson = JSON.parse(fileContents);

  return parsedJson;
};