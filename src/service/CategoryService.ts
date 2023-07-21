import { FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";

import { isValueNotNull, toLowerCase } from "../utils/CommonUtils";
import { handleServerError } from "../utils/ErrorUtils";

function CategoryService() {
  const params = new PrismaClient();

  const getCategoryById = async (reply: FastifyReply, id: string) => {
    try {
      const foundCategory = await params.cATEGORY.findUnique({
        where: {
          id: id,
        },
      });

      if (!foundCategory) {
        const errorMessage = `Category id ${id} not found`;
        console.error(errorMessage);
        reply.status(404).send({ message: errorMessage });
        return false;
      }

      return foundCategory;
    } catch (error) {
      handleServerError(reply, error);
      return false;
    }
  };

  const checkExistingCategoryValue = async (
    reply: FastifyReply,
    key: string,
    value: string
  ): Promise<boolean> => {
    try {
      const lowercaseValue = toLowerCase(value);
      const existingCategoryValue = await params.cATEGORY.findFirst({
        where: {
          [key]:lowercaseValue
        },
      });

      if (isValueNotNull(existingCategoryValue)) {
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

  return {
    getCategoryById,
    checkExistingCategoryValue,
  };
}

export default CategoryService;
