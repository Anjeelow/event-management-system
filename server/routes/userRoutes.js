import express from "express";
import { query } from "../db-service.js";

const router = express.Router();

router.get("/api/users", async (req, res) => {
  try {
    const data = await query("SELECT * FROM user");
    res.json({ users: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
