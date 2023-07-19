import { FastifyInstance } from "fastify";
import Products from "../controllers/Products";
import {
  addProductSchema,
  getAllProductSchema,
  getProductSchema,
} from "../schema/Products";

function ProductsRoute(server: FastifyInstance) {
  const { getAllProducts, getProduct, addProduct } = Products();

  server.get("/api/products", getAllProductSchema, getAllProducts);
  server.get("/api/products/:id", getProductSchema, getProduct);

  server.post("/api/products", addProductSchema, addProduct);

  return server;
}

export default ProductsRoute;
