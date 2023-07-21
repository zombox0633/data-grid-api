import { FastifyInstance } from "fastify";
import ProductsController from "../controllers/ProductsController";
import {
  addProductSchema,
  deleteProductSchema,
  getAllProductSchema,
  getProductSchema,
  updateCategorySchema,
} from "../schema/Products";

function ProductsRoute(server: FastifyInstance) {
  const {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
  } = ProductsController();

  server.get("/api/products", getAllProductSchema, getAllProducts);
  server.get("/api/products/:id", getProductSchema, getProduct);

  server.post("/api/products", addProductSchema, addProduct);

  server.put("/api/products/:id", updateCategorySchema, updateProduct);

  server.delete("/api/products/:id", deleteProductSchema, deleteProduct);

  return server;
}

export default ProductsRoute;
