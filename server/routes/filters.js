import express from "express";
import { query } from "../db-service.js";

const router = express.Router();

router.get("/api/events/search", async (req, res) => {
  try {
    const userquery = req.query;

    const data = await query("SELECT * FROM event");
    res.json({ events: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
