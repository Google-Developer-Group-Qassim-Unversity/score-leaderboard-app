import { PrismaClient } from "@prisma/client"
import {writeFileSync} from "fs";
import { performance } from "perf_hooks";
const prisma = new PrismaClient()
const JSON_OUTPUT_FILE = "output.json"
async function main() {
  await getAllactoins();
}

async function getAllactoins() {
  console.log(`querying DB....`);
  const start = performance.now()
  const actions = await prisma.members_points.findMany();
  console.log(`Done ✅`);
  const end = performance.now()
  console.log(`writing to ${JSON_OUTPUT_FILE}...`);
  writeFileSync(JSON_OUTPUT_FILE, JSON.stringify(actions, null, 4), {encoding: "utf-8"} ); 
  console.log(`Done ✅`);
  console.log(`DB query took \x1b[33m${(end - start).toFixed(0)}ms\x1b[0m`);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })