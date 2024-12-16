import express from "express";
import { query } from "../db-service.js";

const router = express.Router();

router.get("/api/user/events", async (req, res) => {
  try {
    const { userID } = req.query;
    const joinedEvents = await query(
      `
      SELECT e.*
      FROM event e
      JOIN rsvp r ON e.event_id = r.event_id
      WHERE r.user_id = ?
    `,
      [userID]
    );
    res.status(200).json({ joinedEvents: joinedEvents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/api/events/search", async (req, res) => {
  const params = req.query;
  console.log("Query Params:", params);

  let sql = "SELECT * FROM EVENT WHERE 1=1";
  const values = [];

  if (params.title) {
    sql += " AND title LIKE ?";
    values.push(`${params.title}%`);
  }

  if (params.location) {
    sql += " AND address LIKE ?";
    values.push(`${params.location}%`);
  }

  if (
    params.categoryID !== undefined &&
    params.categoryID !== null &&
    params.categoryID !== ""
  ) {
    sql += " AND category_id = ?";
    values.push(params.categoryID);
  }

  if (params.userID) {
    sql += " AND organizer = ?";
    values.push(params.userID);
  }

  if (params.fromDate) {
    sql += " AND date >= ?";
    values.push(params.fromDate);
  }

  if (params.toDate) {
    sql += " AND date <= ?";
    values.push(params.toDate);
  }

  console.log("Constructed SQL:", sql);
  console.log("Values:", values);

  try {
    const data = await query(sql, values);
    res.json({ events: data });
  } catch (err) {
    console.error("Error executing query:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
