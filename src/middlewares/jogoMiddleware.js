import { jogoSchema, querySchema } from "../schemas/jogoSchema.js";
import connection from "../db/database.js";

export default class JogoMiddleware {
    static bodyValidation = async (req, res, next) => {
        const { value, error } = jogoSchema.validate(req.body, {
            abortEarly: false,
        });

        if (error) {
            return res.status(400).json({
                message: 'Validação falhou',
                error: error.details.map((err) => err.message),
            });
        }

        res.locals.game = value;

        next();
    };

    static checkIfGameExists = async (req, res, next) => {
        const { name, categoryId } = res.locals.game;

        try {
            const categoryExists = await connection.query(
                'SELECT * FROM categories WHERE id = $1',
                [categoryId]
            );
            if (categoryExists.rows.length === 0) {
                return res.status(400).send('Categoria não existe');
            }

            const gameExists = await connection.query(
                'SELECT * FROM games WHERE name = $1',
                [name]
            );
            if (gameExists.rows.length > 0) {
                return res.status(409).send('Jogo já existe');
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    static checkQueryString = async (req, res, next) => {
        const { value, error } = querySchema.validate(req.query, {
            abortEarly: false,
        });

        if (error) {
            return res.status(400).json({
                message: 'Validação falhou',
                error: error.details.map((err) => err.message),
            });
        }

        res.locals.query = value;

        next();
    };
}