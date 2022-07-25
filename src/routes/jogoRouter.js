import {Router} from "express";
import Jogo from "../controllers/jogoController.js";
import JogoMiddleware from "../middlewares/jogoMiddleware.js";

const router = Router();
router.get('/games', JogoMiddleware.checkQueryString, Jogo.getGames);
router.post('/games', JogoMiddleware.bodyValidation, JogoMiddleware.checkIfGameExists, Jogo.postGame);
export default router;