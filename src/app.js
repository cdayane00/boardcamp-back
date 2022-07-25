import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
import categories from './routes/categoriesRouter.js';
import jogo from "./routes/jogoRouter.js"

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use(categories);
app.use(jogo);


app.listen(process.env.PORT, () => {
    console.log(chalk.bold.green("Rodando em http://localhost:" + process.env.PORT ));
});

