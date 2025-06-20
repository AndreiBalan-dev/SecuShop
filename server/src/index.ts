import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import session from "express-session";

import productRoutes from "./routes/products";
import xssRoutes from "./routes/xss";
import csrfRoutes from "./routes/csrf";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";
import openRedirectRoutes from "./routes/openRedirect";

const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: "secu-secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 30,
    },
  })
);

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/products", productRoutes);
app.use("/api/xss", xssRoutes);
app.use("/api/csrf", csrfRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/redirect", openRedirectRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
