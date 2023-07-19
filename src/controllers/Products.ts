import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";

import {
  handleServerError,
  isValueEmpty,
  validateAPIKey,
} from "../utils/Utils";
import UserService from "../service/UserService";
import ProductService from "../service/ProductService";
import CategoryService from "../service/CategoryService";

type ProductsTypes = {
  name: string;
  category_id: string;
  price: number;
  quantity: number;
  last_op_id: string;
  created_timestamp?: Date;
  lastupdate_timestamp?: Date;
};

function Products() {
  const prisma = new PrismaClient();

  const { validateIdProduct, checkExistingProductValue, validateBodyValue } =
    ProductService();
  const { validateLastOpUser } = UserService();
  const { validateIdCategory } = CategoryService();

  //GET ALL
  const getAllProducts = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const isFoundHeader = validateAPIKey(
        request,
        reply,
        "header-get-products",
        "getProductsTest"
      );
      if (!isFoundHeader) return;

      const products = await prisma.pRODUCTS.findMany();
      if (isValueEmpty(reply, products, "Products")) return;

      reply.send(products);
    } catch (error) {
      handleServerError(reply, error);
    }
  };

  //GET PRODUCT
  const getProduct = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const isFoundHeader = validateAPIKey(
        request,
        reply,
        "header-get-products",
        "getProductsTest"
      );
      if (!isFoundHeader) return;

      const { id } = request.params as { id: string };
      const product = await validateIdProduct(reply, id);
      if (!product) return;

      reply.send({ data: product });
    } catch (error) {
      handleServerError(reply, error);
    }
  };

  //POST
  const addProduct = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const isFoundHeader = validateAPIKey(
        request,
        reply,
        "header-add-product",
        "addProductTest"
      );
      if (!isFoundHeader) return;

      const { name, category_id, price, quantity, last_op_id } =
        request.body as ProductsTypes;
      const requiredFields = [name, category_id, last_op_id];

      if (!validateBodyValue(reply, requiredFields, price, quantity)) return;

      const isCategoryId = await validateIdCategory(reply, category_id);
      if (!isCategoryId) return;

      const isNameUnique = await checkExistingProductValue(reply, "name", name);
      if (!isNameUnique) return;

      const isLastOpIdVal = await validateLastOpUser(reply, last_op_id);
      if (!isLastOpIdVal) return;

      const newProduct = await prisma.pRODUCTS.create({
        data: {
          name,
          category_id,
          price,
          quantity,
          last_op_id,
          created_timestamp: new Date(),
          lastupdate_timestamp: new Date(),
        },
      });

      reply.code(201).send(newProduct);
    } catch (error) {
      handleServerError(reply, error);
    }
  };

  return {
    getAllProducts,
    getProduct,
    addProduct,
  };
}

export default Products;
