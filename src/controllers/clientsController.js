import {
  postClientsRepository,
  findClientsRepository,
  getClientsRepository,
  getClientsByIdRepository,
  updateClientsRepository,
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

    const formattedClients = formatDate(clients.rows);

    return res.status(200).send(formattedClients);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getClientsById(req, res) {
  const { id } = req.params;
  try {
    const client = await getClientsByIdRepository(id);
    if (client.rowCount === 0) return res.status(404).send("Client not found!");

    const formattedClients = formatDate(client.rows);

    return res.status(200).send(formattedClients[0]);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function updateClients(req, res) {
  const { id } = req.params;
  console.log(id);
  const { name, phone, cpf, birthday } = req.body;

  try {
    const client = await getClientsByIdRepository(id);
    if (client.rowCount === 0) return res.status(404).send("Client not found!");

    if (client.rows[0].cpf === cpf) {
      await updateClientsRepository(name, phone, cpf, birthday, id);
      return res.sendStatus(200);
    }

    return res.sendStatus(409);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

function formatDate(clientsArr) {
  return clientsArr.map((client) => ({
    ...client,
    birthday: new Date(client.birthday).toISOString().split("T")[0],
  }));
}
