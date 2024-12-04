import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { query } from "./db-service.js";
import router from "./routes/index.js";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
