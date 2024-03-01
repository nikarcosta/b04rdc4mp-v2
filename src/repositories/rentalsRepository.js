import { db } from "../config/database.connection.js";

export async function getRentalsRepository() {
  return db.query(
    `SELECT * FROM rentals 
    JOIN customers ON customers.id = rentals."customerId"
    JOIN games ON games.id = rentals."gameId"`
  );
}

export async function postRentalsRepository(
  customerId,
  gameId,
  rentDate,
  daysRented,
  originalPrice
) {
  return db.query(
    `INSERT INTO rentals ("customerId","gameId", "rentDate", "daysRented", "originalPrice") 
    VALUES ($1, $2, $3, $4, $5)`,
    [customerId, gameId, rentDate, daysRented, originalPrice]
  );
}

export async function getRentalsByGameIdRepository(id) {
  return db.query(
    `SELECT * FROM  rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`,
    [id]
  );
}
