import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      { name: "iPhone 14", price: 6000 },
      { name: "MacBook Air", price: 8000 },
      { name: "Samsung Galaxy", price: 4000 },
    ],
  });

  // @ts-expect-error: model exists at runtime
  await prisma.user.createMany({
    data: [
      {
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
      },
      {
        email: "maria@example.com",
        password: "pa55w0rd",
        role: "user",
      },
      {
        email: "test@example.com",
        password: "123456",
        role: "user",
      },
    ],
  });
}

main()
  .then(() => console.log("✅ Seed completed"))
  .catch((e) => {
    console.error("❌ Seed failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
