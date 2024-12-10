import express from "express";
import { query } from "../db-service.js";

const router = express.Router();

router.get("/api/events", async (req, res) => {
  try {
    const data = await query("SELECT * FROM EVENT");
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

router.post("/api/events/create", async (req, res) => {
  try {
    const { userId, title, description, start, end, duration, address } =
      req.body;
    const sql = `
      INSERT INTO Event (organizer, title, description, start_time, end_time, duration, address)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const data = await query(sql, [
      userId,
      title,
      description,
      start,
      end,
      duration,
      address,
    ]);
    res.status(200).json({ message: "Event added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/api/events/edit", async (req, res) => {
  try {
    const { eventId, title, description, start, end } = req.body;
    const sql = `
    UPDATE Event
    SET title = ?, description = ?, start_time = ?, end_time = ?
    WHERE event_id = ?
    `;

    const data = await query(sql, [title, description, start, end, eventId]);
    console.log(data);
    res.status(200).json({ message: "Event updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.get("api/events?filters*", async (req, res) => {
//   try {
//     const userquery = req.query;

//     const data = await query("SELECT * FROM event");

//     res.json({ events: data });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// })

export default router;
