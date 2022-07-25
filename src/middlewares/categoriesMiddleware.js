import connection from "../db/database.js";
import { categorySchema, querySchema } from "../schemas/categorySchema.js";

export default class CategoriesMiddleware{
    static bodyValidation = (request, response, next) => {
        const {value, error} = categorySchema.validate(request.body, {abortEarly: false});
        
        if(error){
            return response.status(400).json({
                message: 'Validação falhou',
                error: error.details.map((erro) => erro.message)
            });
        }

        response.locals.category = value;
        next();
    };

    static checkIfCategoryExist = async (request, response, next) => {
        const {name} = response.locals.category;

        try{
            const category = await connection.query(
                'SELECT * FROM categories WHERE name = $1',
                [name]
            );

            if(category.rows.length > 0){
                return response.status(409).send('Categoria já existe');
            }

            next();
        }
        catch(erro){
            return response.status(500).json({message: erro.message});
        }
    };

    static checkQueryString = (request, response, next) => {
        const {value, error} = querySchema.validate(request.query, { abortEarly: false});

        if(error){
            return response.status(400).json({
                message: 'Validação falhou',
                error: error.details.map((erro) => erro.message)
            });
        }

        response.locals.query = value;
        next();
    };
}

