import { Router, Request, Response } from "express";

const router = Router();

router.get("/vulnerable", (req: Request, res: Response): any => {
  const next = req.query.next as string;

  if (!next) {
    return res.status(400).send("❌ Lipseste parametrul `next`.");
  }

  return res.redirect(next);
});

router.get("/protected", (req: Request, res: Response): any => {
  const next = req.query.next as string;

  if (!next) {
    return res.status(400).send("❌ Lipseste parametrul `next`.");
  }

  try {
    const url = new URL(next);
    if (url.host !== "localhost:3000") {
      throw new Error("Host nepermis");
    }

    return res.redirect(next);
  } catch {
    return res.redirect("/");
  }
});

export default router;
