import pg from "pg";

const {Pool} = pg;

const database = {
    connectionString: process.env.DATABASE_URL,
}

const connection = new Pool(database);

export default connection;