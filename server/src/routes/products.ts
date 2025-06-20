import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";

const router = Router();

router.get(
  "/search-vuln",
  async (req: Request, res: Response): Promise<void> => {
    const term = req.query.term as string;
    if (!term) {
      res.status(400).json({ error: "Term is required" });
      return;
    }

    try {
      const rawQuery = `SELECT id, name, price FROM Product WHERE name LIKE '%${term}%'`;
      console.log("🚨 Running VULNERABLE query:", rawQuery);

      const results = await prisma.$queryRawUnsafe(rawQuery);
      res.json(results);
    } catch (err: any) {
      console.error("❌ Vulnerable query failed:", err.message);
      res.status(500).json({ error: "Query failed" });
    }
  }
);

router.get(
  "/search-safe",
  async (req: Request, res: Response): Promise<void> => {
    const term = req.query.term as string;
    if (!term) {
      res.status(400).json({ error: "Term is required" });
      return;
    }

    try {
      const results = await prisma.$queryRaw<any[]>(
        Prisma.sql`SELECT id, name, price FROM Product WHERE name LIKE ${
          "%" + term + "%"
        }`
      );
      res.json(results);
    } catch (err) {
      console.error("❌ Safe raw query failed:", (err as any).message);
      res.status(500).json({ error: "Query failed" });
    }
  }
);

export default router;
