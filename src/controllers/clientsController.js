import {
  postClientsRepository,
  findClientsRepository,
  getClientsRepository,
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

export async function getClients(_, res) {
  try {
    const clients = await getClientsRepository();

    const formattedClients = clients.rows.map((client) => ({
      ...client,
      birthday: new Date(client.birthday).toISOString().split("T")[0],
    }));

    return res.status(200).send(formattedClients);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
