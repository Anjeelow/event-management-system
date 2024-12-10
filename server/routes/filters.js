import express from "express";
import { query } from "../db-service.js";

const router = express.Router();

router.get("/api/events/search", async (req, res) => {
  console.log(req.query);
  const params = req.query;
  var sql = "SELECT * FROM EVENT WHERE ";
  if (req.query != {}) {
    sql = !params.title
      ? sql.concat("1 AND ")
      : sql.concat("title LIKE '".concat(params.title.concat("%' AND ")));
    sql = !params.location
      ? sql.concat("1 AND ")
      : sql.concat("address LIKE '".concat(params.location.concat("%' AND ")));
    sql = !params.category
      ? sql.concat("1 AND ")
      : sql.concat("category_id = ".concat(params.category.concat(" AND ")));
  }

  sql = sql.concat("1");
  console.log(sql);

  try {
    const data = await query(sql);
    res.json({ events: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
