import {
  postClientsRepository,
  findClientsRepository,
} from "../repositories/clientsRepository.js";

export async function postClients(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const clientExists = await findClientsRepository(cpf);
    if (clientExists.rowCount != 0)
      return res.status(409).send("Client already exists!");

    await postClientsRepository(name, phone, cpf, birthday);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
