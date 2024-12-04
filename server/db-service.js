import mysql from "mysql";

export const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "event-management-system",
});

export const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
