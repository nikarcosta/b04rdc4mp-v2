import { db } from "../config/database.connection.js";

export async function getGamesRepository() {
  return db.query(`SELECT * FROM games`);
}
