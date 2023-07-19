import { FastifyInstance } from "fastify";

import {
  getAllCategorySchema,
  getCategorySchema,
  addCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
} from "../schema/Category";
import Category from "../controllers/Category";

function CategoryRoute(server: FastifyInstance) {
  const {
    getAllCategory,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory,
  } = Category();

  server.get("/api/category", getAllCategorySchema, getAllCategory);
  server.get("/api/category/:id", getCategorySchema, getCategory);
  server.post("/api/category", addCategorySchema, addCategory);
  server.put("/api/category/:id", updateCategorySchema, updateCategory);
  server.delete("/api/category/:id", deleteCategorySchema, deleteCategory);

  return server;
}

export default CategoryRoute;
