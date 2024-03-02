import { db } from "../config/database.connection.js";

export async function getRentalsRepository() {
  return db.query(
    `SELECT 
      rentals.id AS id,
      rentals."customerId" AS customerId,
      rentals."gameId" AS gameId,
      rentals."rentDate" AS rentDate,
      rentals."daysRented" AS daysRented,
      rentals."returnDate" AS returnDate,
      rentals."originalPrice" AS originalPrice,
      rentals."delayFee" AS delayFee,
      json_build_object('id', customers.id, 'name', customers.name) AS customer,
      json_build_object('id', games.id, 'name', games.name) AS game
    FROM rentals
    JOIN customers ON customers.id = rentals."customerId"
    JOIN games ON games.id = rentals."gameId"
    `
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
