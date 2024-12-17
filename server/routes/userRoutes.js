import express from "express";
import { query } from "../db-service.js";
import authenticateToken from "../middleware/authMiddleware.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/api/users", async (req, res) => {
  try {
    const data = await query("SELECT * FROM user");
    res.json({ users: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/api/users/edit", async (req, res) => {
  try {
    const { userId, firstName, lastName, email } = req.body;
    const sql = `
      UPDATE User SET first_name = ?, last_name = ?, email = ?
      WHERE user_id = ?
    `;
    const data = await query(sql, [firstName, lastName, email, userId]);
    res.status(200).json({ message: "User details updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/api/users/delete", async (req, res) => {
  try {
    const { userId } = req.body.data;
    const sql = `
      UPDATE User SET status = 'closed'
      WHERE user_id = ?
    `;
    const data = await query(sql, [userId]);
    res.status(200).json({ message: "Account closed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/api/users/:id", authenticateToken, async (req, res) => {
  try {
    const user_id = req.params.id;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const sql = "SELECT * FROM User WHERE user_id = ?";
    const result = await query(sql, [user_id]);

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: result[0] });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/api/reset-password", authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.user_id;
  try {
    const sql = "SELECT * FROM User WHERE user_id = ?";
    const result = await query(sql, [userId]);
    const user = result[0];
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password_hash
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const updateSql = "UPDATE User SET password_hash = ? WHERE user_id = ?";
    await query(updateSql, [hashedNewPassword, userId]);

    return res.status(200).json({ message: "Password successfully updated" });
  } catch (err) {
    return res.status(500).json({ message: "Error processing the request" });
  }
});

export default router;
