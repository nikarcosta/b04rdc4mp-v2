import { db } from "../config/database.connection.js";

export async function getRentalsRepository() {
  return db.query(
    `SELECT * FROM rentals 
    JOIN customers ON customers.id = rentals."customerId"
    JOIN games ON games.id = rentals."gameId"`
  );
}
