import express from "express";
import { query } from "../db-service.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/api/users", async (req, res) => {
  try {
    const data = await query("SELECT * FROM user");
    res.json({ users: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/api/users/:id", authenticateToken, async (req, res) => {
  try {
    const user_id = req.params.id;

    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' })
    }

    const sql = 'SELECT * FROM User WHERE user_id = ?'
    const result = await query(sql, [user_id])

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json({user: result[0]})

  } catch (error) {
    console.error('Error fetching user:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

export default router;
