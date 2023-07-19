import { FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";

import { handleServerError, isValueNotNull } from "../utils/Utils";

function CategoryService() {
  const params = new PrismaClient();

  const validateIdCategory = async (reply: FastifyReply, id: string) => {
    try {
      const foundCategory = await params.cATEGORY.findUnique({
        where: {
          id: id,
        },
      });
      if (!foundCategory) {
        console.error(`Category id ${id} not found`);
        reply.status(404).send({ message: `Category id ${id} not found` });
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
      const existingCategoryValue = await params.cATEGORY.findFirst({
        where: {
          [key]: value,
        },
      });

      if (isValueNotNull(existingCategoryValue)) {
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

  return {
    validateIdCategory,
    checkExistingCategoryValue,
  };
}

export default CategoryService;
