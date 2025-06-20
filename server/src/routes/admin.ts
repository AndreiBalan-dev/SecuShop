import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router();

router.get("/dashboard", isAdmin, (req, res) => {
  res.json({ message: "Bine ai venit în dashboard-ul de admin!" });
});

export default router;
