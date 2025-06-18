import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productRoutes from "./routes/products";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
