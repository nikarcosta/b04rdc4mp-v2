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
  return db.query(
    `SELECT id, name, phone, cpf, CAST(birthday AS DATE) AS birthday FROM customers`
  );
}
