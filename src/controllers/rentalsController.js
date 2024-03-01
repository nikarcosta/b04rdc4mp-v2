import { getClientsByIdRepository } from "../repositories/clientsRepository.js";
import { findGamesByIdRepository } from "../repositories/gamesRepository.js";
import {
  getRentalsByGameIdRepository,
  getRentalsRepository,
  postRentalsRepository,
} from "../repositories/rentalsRepository.js";

export async function getRentals(_, res) {
  try {
    const rentals = await getRentalsRepository();

    if (rentals.rowCount === 0) return res.sendStatus(404);

    return res.status(200).send(rentals.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function postRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  try {
    const clientExists = await getClientsByIdRepository(customerId);
    if (clientExists.rowCount === 0) return res.sendStatus(400);

    const gameExists = await findGamesByIdRepository(gameId);
    if (gameExists.rowCount === 0) return res.sendStatus(400);

    const gamesRented = await getRentalsByGameIdRepository(gameId);

    if (gamesRented.rowCount >= gameExists.rows[0].stockTotal)
      return res.sendStatus(400);

    const rentDate = new Date();
    const originalPrice =
      parseInt(daysRented) * parseInt(gameExists.rows[0].pricePerDay);

    await postRentalsRepository(
      customerId,
      gameId,
      rentDate,
      parseInt(daysRented),
      originalPrice
    );

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
