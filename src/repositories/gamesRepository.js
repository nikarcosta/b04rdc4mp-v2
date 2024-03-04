import { db } from "../config/database.connection.js";

export async function getGamesRepository() {
  return db.query(`SELECT * FROM games`);
}

export async function findGamesRepository(name) {
  return db.query(`SELECT * FROM games WHERE name=$1`, [name]);
}

export async function postGamesRepository(
  name,
  image,
  stockTotal,
  pricePerDay
) {
  db.query(
    `INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`,
    [name, image, stockTotal, pricePerDay]
  );
  return;
}

export async function findGamesByIdRepository(id) {
  return db.query(`SELECT * FROM games WHERE id=$1`, [id]);
}

export async function findGamesByQueryString(string) {
  return db.query(`SELECT * FROM games WHERE name ILIKE $1`, [`${string}%`]);
}
