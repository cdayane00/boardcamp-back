import pg from "pg";

const {Pool} = pg;

const database = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
}

const connection = new Pool(database);

export default connection;