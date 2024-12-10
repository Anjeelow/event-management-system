import express from "express";
import { query } from "../db-service.js";

const router = express.Router();

router.get("/api/events", async (req, res) => {
  try {
    const data = await query("SELECT * FROM event");
    res.json({ events: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/api/rsvps", async (req, res) => {
  try {
    const data = await query("SELECT * FROM rsvp");
    res.json({ rsvps: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/api/category", async (req, res) => {
  try {
    const data = await query("SELECT * FROM category");
    res.json({ category: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
