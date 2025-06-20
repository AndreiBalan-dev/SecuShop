import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";

import productRoutes from "./routes/products";
import xssRoutes from "./routes/xss";
import csrfRoutes from "./routes/csrf";

const app = express();
const PORT = 4000;

// ✅ Permite cookies și frontend-ul să acceseze resursele
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ✅ Middleware-uri standard
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Servim fișierele statice (ex: attacker.html)
app.use(express.static(path.join(__dirname, "../public")));

// ✅ Rute
app.use("/api/products", productRoutes);
app.use("/api/xss", xssRoutes);
app.use("/api/csrf", csrfRoutes);

// ✅ Pornim serverul
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
