import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import { checkForUpdates } from "./middleware/notificationEvent.js";

const app = express();
const PORT = 8080;

setInterval(async () => {
  try {
    await checkForUpdates();
  } catch (error) {
    console.error("Error during periodic checkForUpdates:", error);
  }
}, 60000);

app.use(cors());
app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
