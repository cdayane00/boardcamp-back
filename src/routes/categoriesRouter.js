import {Router} from "express";
import Categories from '../controllers/categoryController.js';
import CategoriesMiddleware from "../middlewares/categoriesMiddleware.js";

const router = Router();

router.get('/categories', CategoriesMiddleware.checkQueryString, Categories.getCategories);
router.post('/categories', CategoriesMiddleware.bodyValidation, CategoriesMiddleware.checkIfCategoryExist, Categories.createCategory);

export default router;