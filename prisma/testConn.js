import { PrismaClient } from "../src/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  console.log("🔗 Testing Supabase connection...");
  const rounds = await prisma.round.findMany();
  console.log("✅ Connection successful!");
  console.log("Rounds found:", rounds);
}

main()
  .catch((e) => {
    console.error("❌ Connection failed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
