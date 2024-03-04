import { db } from "../config/database.connection.js";

export async function findClientsRepository(cpf) {
  return db.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf]);
}

export async function postClientsRepository(name, phone, cpf, birthday) {
  db.query(
    `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`,
    [name, phone, cpf, birthday]
  );
  return;
}

export async function getClientsRepository() {
  return db.query(`SELECT id, name, phone, cpf, birthday FROM customers`);
}

export async function getClientsByIdRepository(id) {
  return db.query(`SELECT * FROM customers WHERE id=$1`, [id]);
}

export async function updateClientsRepository(name, phone, cpf, birthday, id) {
  return db.query(
    `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`,
    [name, phone, cpf, birthday, id]
  );
}

export async function getClientsByQueryStringRepository(string) {
  return db.query(`SELECT * FROM customers WHERE cpf LIKE $1`, [`${string}%`]);
}
