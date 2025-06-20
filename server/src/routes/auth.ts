import { Router } from "express";

const router = Router();

// LOGIN fake
router.post("/login", (req: any, res: any) => {
  const { role } = req.body;

  if (role !== "admin" && role !== "user") {
    return res.status(400).json({ error: "Rol invalid" });
  }

  req.session.user = { username: "testuser", role };
  res.json({ message: `Logat ca ${role}` });
});

// LOGOUT
router.post("/logout", (req: any, res: any) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Delogat cu succes" });
  });
});

export default router;
