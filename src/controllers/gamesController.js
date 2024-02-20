import { getGamesRepository } from "../repositories/gamesRepository.js";

export async function getGames(_, res) {
  try {
    const games = await getGamesRepository();
    if (games.rowCount === 0) return res.sendStatus(404);
    return res.status(201).send(games);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
