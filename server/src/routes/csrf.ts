import { Router, Request, Response } from "express";
import csurf from "csurf";
import cookieParser from "cookie-parser";

const router = Router();

const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  },
});

let balance = 1000;

router.post("/transfer-vulnerable", (req: Request, res: Response): any => {
  const { amount } = req.body;
  const parsed = parseFloat(amount);

  if (isNaN(parsed) || parsed <= 0) {
    return res.status(400).json({ error: "Suma invalidă" });
  }

  balance -= parsed;
  return res.json({ message: `Transfer reușit. Sold rămas: ${balance} RON` });
});

router.post(
  "/transfer-protected",
  cookieParser(),
  csrfProtection,
  (req: Request, res: Response): any => {
    const { amount } = req.body;
    const parsed = parseFloat(amount);

    if (isNaN(parsed) || parsed <= 0) {
      return res.status(400).json({ error: "Suma invalidă" });
    }

    balance -= parsed;
    return res.json({
      message: `Transfer securizat. Sold rămas: ${balance} RON`,
    });
  }
);

router.get(
  "/token",
  cookieParser(),
  csrfProtection,
  (req: Request, res: Response): any => {
    return res.json({ token: req.csrfToken() });
  }
);

router.get("/balance", (_req: Request, res: Response): any => {
  return res.json({ balance });
});

export default router;
