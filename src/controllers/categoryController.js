import queryS from "../utils/query.js";
import connection from "../db/database.js";

export default class Categories {
    static getCategories = async (request, response) => {
        const {offset, limit, order} = queryS(response.locals.query);

        try{
            const query = 'SELECT * FROM categories';

            const categories = await connection.query(`
                ${query}
                ${order}
                ${offset}
                ${limit}
            `);
            return response.status(200).json(categories.rows);
        }
        catch(erro){
            return response.status(500).json({message: erro.message});
        }
    };

    static createCategory = async (request, response) => {
        const {name} = response.locals.category;
        try{
            await connection.query(
                'INSERT INTO categories (name) VALUES ($1)',
                [name]
            );
            return response.sendStatus(201);
        }
        catch(erro){
            return response.status(500).json({message: erro.message});
        }
    };
}