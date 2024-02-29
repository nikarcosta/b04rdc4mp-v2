import { getRentalsRepository } from "../repositories/rentalsRepository.js";

export async function getRentals(_, res) {
  try {
    const rentals = await getRentalsRepository();

    if (rentals.rowCount === 0) return res.sendStatus(404);

    return res.status(200).send(rentals.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
