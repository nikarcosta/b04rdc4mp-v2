import { getClientsByIdRepository } from "../repositories/clientsRepository.js";
import { findGamesByIdRepository } from "../repositories/gamesRepository.js";
import {
  getRentalsByGameIdRepository,
  getRentalsRepository,
  postRentalsRepository,
  updateRentalsReturnDateRepository,
  updateRentalsDelayFeeRepository,
  getRentalsById,
  deleteRentalsRepository,
  getRentalsByQueryStringCustomerIdRepository,
} from "../repositories/rentalsRepository.js";

export async function getRentals(req, res) {
  const { customerId, gameId } = req.query;

  try {
    if (!customerId && !gameId) {
      const rentals = await getRentalsRepository();

      if (rentals.rowCount === 0) return res.sendStatus(404);

      return res.status(200).send(rentals.rows);
    }

    if (customerId && gameId) {
      return res
        .status(400)
        .send("Provide either customerId or gameId, not both.");
    }

    if (customerId) {
      const rentalsByCustomerId =
        await getRentalsByQueryStringCustomerIdRepository(parseInt(customerId));

      if (rentalsByCustomerId.rowCount === 0) return res.sendStatus(404);

      return res.status(200).send(rentalsByCustomerId.rows);
    }

    if (gameId) {
      const rentalsByGameId = await getRentalsByGameIdRepository(
        parseInt(gameId)
      );

      if (rentalsByGameId.rowCount === 0) return res.sendStatus(404);

      return res.status(200).send(rentalsByGameId.rows);
    }
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

export async function updateRentals(req, res) {
  const { id } = req.params;

  try {
    const rentalExist = await getRentalsById(id);

    if (rentalExist.rowCount === 0) return res.sendStatus(404);

    if (rentalExist.rows[0].returnDate != null) return res.sendStatus(400);

    const returnDate = new Date();
    await updateRentalsReturnDateRepository(returnDate, id);

    const updatedRental = await getRentalsById(id);

    const diffDays = Math.ceil(
      (new Date(updatedRental.rows[0].returnDate) -
        new Date(updatedRental.rows[0].rentDate)) /
        (1000 * 60 * 60 * 24)
    );

    const daysRented = updatedRental.rows[0].daysRented;

    if (diffDays > daysRented) {
      let delayFee = (diffDays - daysRented) * originalPrice;
      await updateRentalsDelayFeeRepository(delayFee, id);
      return res.sendStatus(200);
    }

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function deleteRentals(req, res) {
  const { id } = req.params;

  try {
    const rentalExist = await getRentalsById(id);

    if (rentalExist.rowCount === 0) return res.sendStatus(404);

    if (rentalExist.rows[0].returnDate != null) return res.sendStatus(400);

    await deleteRentalsRepository(id);

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

function formatResult(result) {
  const formattedResult = result.rows.map((row) => ({
    id: row.id,
    customerId: row.customerId,
    gameId: row.gameId,
    rentDate: row.rentDate,
    daysRented: row.daysRented,
    returnDate: row.returnDate,
    originalPrice: row.originalPrice,
    delayFee: row.delayFee,
    customer: {
      id: row.customer_id,
      name: row.customer_name,
    },
    game: {
      id: row.game_id,
      name: row.game_name,
    },
  }));

  return formattedResult;
}
