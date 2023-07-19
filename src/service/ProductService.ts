import { FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import {
  handleServerError,
  isValueNotNull,
  validateRequiredFields,
} from "../utils/Utils";

function ProductService() {
  const params = new PrismaClient();

  const validateIdProduct = async (reply: FastifyReply, id: string) => {
    try {
      const foundProduct = await params.pRODUCTS.findUnique({
        where: {
          id: id,
        },
      });
      if (!foundProduct) {
        console.error(`Product id ${id} not found`);
        reply.status(404).send({ message: `Product id ${id} not found` });
        return false;
      }

      return true;
    } catch (error) {
      handleServerError(reply, error);
      return false;
    }
  };

  const checkExistingProductValue = async (
    reply: FastifyReply,
    key: string,
    value: string
  ): Promise<boolean> => {
    try {
      const existingProductValue = await params.pRODUCTS.findFirst({
        where: {
          [key]: value,
        },
      });

      if (isValueNotNull(existingProductValue)) {
        console.error(`The same ${key} already exist`);
        reply.status(400).send({ message: `The same ${key} already exist` });
        return false;
      }
      return true;
    } catch (error) {
      handleServerError(reply, error);
      return false;
    }
  };

  const validateBodyValue = (
    reply: FastifyReply,
    fields: string[],
    price: number,
    quantity: number
  ) => {
    if (!validateRequiredFields(reply, fields)) {
      return false;
    } else if (price <= 0 || quantity < 0) {
      console.error("Invalid price or quantity");
      reply.status(400).send({ message: "Invalid price or quantity" });
      return false;
    } else {
      return true;
    }
  };

  return {
    validateIdProduct,
    checkExistingProductValue,
    validateBodyValue,
  };
}

export default ProductService;
