import {
  getGamesRepository,
  findGamesRepository,
  postGamesRepository,
  findGamesByQueryString,
} from "../repositories/gamesRepository.js";

export async function getGames(req, res) {
  const { name } = req.query;
  try {
    if (!name) {
      const games = await getGamesRepository();
      if (games.rowCount === 0) return res.sendStatus(404);
      return res.status(200).send(games.rows);
    }

    const gamesByQueryString = await findGamesByQueryString(name);
    if (gamesByQueryString.rowCount === 0) return res.sendStatus(404);
    return res.status(200).send(gamesByQueryString.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function postGames(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {
    const gameExists = await findGamesRepository(name);
    if (gameExists.rowCount != 0)
      return res.status(409).send("Game already exists!");

    await postGamesRepository(name, image, stockTotal, pricePerDay);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
