import {Router} from "express";
import Clientes from "../controllers/clientesController.js";
import ClienteMiddleware from "../middlewares/clientesMiddleware.js";

const router = Router();
router.get('/customers', ClienteMiddleware.checkQueryString, Clientes.getCustomer);
router.get('/customers/:id', Clientes.getCustomer);
router.post('/customers', ClienteMiddleware.bodyValidation, ClienteMiddleware.checkIfCustomerExists, Clientes.createCustomer);
router.put('/customers/:id', ClienteMiddleware.bodyValidation, ClienteMiddleware.checkIfCpfExists, Clientes.updateCustomer);

export default router;