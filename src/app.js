import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
import categories from './routes/categoriesRouter.js';
import jogo from "./routes/jogoRouter.js";
import clientes from "./routes/clienteRouter.js";
import alugueis from "./routes/aluguelRouter.js";

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use(categories);
app.use(jogo);
app.use(clientes);
app.use(alugueis);



app.listen(process.env.PORT, () => {
    console.log(chalk.bold.green("Rodando em http://localhost:" + process.env.PORT ));
});

