import { FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";

import { isValueNotNull, toLowerCase } from "../utils/CommonUtils";
import { handleServerError } from "../utils/ErrorUtils";
import { validateRequiredFields } from "../utils/ValidateUtils";

function ProductService() {
  const params = new PrismaClient();

  const getProductById = async (reply: FastifyReply, id: string) => {
    try {
      const foundProduct = await params.pRODUCTS.findUnique({
        where: {
          id: id,
        },
      });
      if (!foundProduct) {
        const errorMessage = `Product id ${id} not found`;
        console.error(errorMessage);
        reply.status(404).send({ message: errorMessage });
        return false;
      }

      return foundProduct;
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
      const lowercaseValue = toLowerCase(value);
      const existingProductValue = await params.pRODUCTS.findFirst({
        where: {
          [key]: lowercaseValue,
        },
      });

      if (isValueNotNull(existingProductValue)) {
        const errorMessage = `The same ${key} already exist`;
        console.error(errorMessage);
        reply.status(400).send({ message: errorMessage });
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
      const errorMessage = "Invalid price or quantity";
      console.error(errorMessage);
      reply.status(400).send({ message: errorMessage });
      return false;
    } else {
      return true;
    }
  };

  return {
    getProductById,
    checkExistingProductValue,
    validateBodyValue,
  };
}

export default ProductService;
