import {Router} from "express";
import Alugueis from "../controllers/alugueisController.js";
import AlugueisMiddleware from "../middlewares/alugueisMiddleware.js";

const router = Router();
router.get('/rentals',AlugueisMiddleware.checkQueryString, Alugueis.getRentals);
router.post('/rentals', AlugueisMiddleware.bodyValidation, AlugueisMiddleware.checkIfCustomerAndGameExists, Alugueis.postRental);
router.post('/rentals/:id/return', Alugueis.returnRental);
router.delete('/rentals/:id', Alugueis.deleteRental);
router.get('/rentals/metrics', AlugueisMiddleware.checkMetricsQueryString, Alugueis.getMetrics);

export default router;