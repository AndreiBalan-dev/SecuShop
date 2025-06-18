import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/search-vuln", async (req: Request, res: Response): Promise<void> => {
  const term = req.query.term as string;
  if (!term) {
    res.status(400).json({ error: "Term is required" });
    return;
  }

  try {
    const results = await prisma.$queryRawUnsafe(
      `SELECT * FROM Product WHERE name LIKE '%${term}%'`
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Query failed" });
  }
});

router.get("/search-safe", async (req: Request, res: Response): Promise<void> => {
  const term = req.query.term as string;
  if (!term) {
    res.status(400).json({ error: "Term is required" });
    return;
  }

  try {
    const results = await prisma.product.findMany({
      where: {
        name: {
          contains: term,
        },
      },
    });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Query failed" });
  }
});

export default router;
