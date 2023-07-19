import { FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";

import { handleServerError, isValueNotNull } from "../utils/Utils";

function ValidatedUser() {
  const params = new PrismaClient();

  const validateExistingId = async (reply: FastifyReply, id: string) => {
    try {
      //findUnique ใช้สำหรับค้นหาแถวเดียวในฐานข้อมูล โดยระบุเงื่อนไขที่ชัดเจนเพื่อหาแถวที่ตรงกับเงื่อนไข
      const foundUser = await params.uSERS.findUnique({
        where: {
          id: id,
        },
      });
      if (!foundUser) {
        console.error("User not found");
        reply.status(404).send({ message: `User id ${id} not found` });
        return false;
      }

      return foundUser;
    } catch (error) {
      handleServerError(reply, error);
      return false;
    }
  };

  const checkExistingUserValue = async (
    reply: FastifyReply,
    key: string,
    value: string
  ): Promise<boolean> => {
    try {
      const existingUserValue = await params.uSERS.findFirst({
        where: {
          [key]: value,
        },
      });

      if (isValueNotNull(existingUserValue)) {
        console.error(`User with the same ${key} already exists`);
        reply
          .status(400)
          .send({ message: `User with the same ${key} already exists` });
        return false;
      }

      return true;
    } catch (error) {
      handleServerError(reply, error);
      return false;
    }
  };

  const validateLastOpUser = async (
    reply: FastifyReply,
    last_op_id: string
  ): Promise<boolean> => {
    try {
      const existingOpUser = await params.uSERS.findFirst({
        where: {
          id: last_op_id,
        },
      });

      if (!existingOpUser) {
        console.error("Invalid last operation ID");
        reply.status(404).send({ message: "Invalid last_op_id" });
        return false;
      }

      return true;
    } catch (error) {
      handleServerError(reply, error);
      return false;
    }
  };

  const validateAddRole = (reply: FastifyReply, role: string): boolean => {
    if (!["admin", "dev", "user"].includes(role)) {
      console.error("Invalid role");
      reply.status(400).send({ message: "Invalid role" });
      return false;
    } else if (role === "admin") {
      console.error("Unable to add the admin role");
      reply.status(403).send({ message: "Administrator role not allowed" });
      return false;
    }
    return true;
  };

  //PUT
  const checkNameAndRole = async (
    reply: FastifyReply,
    name: string,
    role: string
  ) => {
    try {
      if (name) {
        const isNameUnique = await checkExistingUserValue(reply, "name", name);
        if (!isNameUnique) return false;
      } else if (role) {
        const roleValid = validateAddRole(reply, role);
        if (!roleValid) return false;
      }

      return true;
    } catch (error) {
      handleServerError(reply, error);
      return false;
    }
  };

  //PUT PASSWORD
  const validatePasswordFields = (
    reply: FastifyReply,
    oldPassword: string,
    newPassword1: string,
    newPassword2: string,
    confirmPassword: string
  ): boolean => {
    const MIN_PASSWORD_LENGTH = 8;

    if (oldPassword !== confirmPassword) {
      console.error("The provided old password is incorrect");
      reply
        .status(400)
        .send({ message: "The provided old password is incorrect" });
      return false;
    } else if (
      newPassword1.length < MIN_PASSWORD_LENGTH ||
      newPassword2.length < MIN_PASSWORD_LENGTH
    ) {
      console.error("New password must be at least 8 characters long");
      reply
        .status(400)
        .send({ message: "New password must be at least 8 characters long" });
      return false;
    } else if (
      !newPassword1 ||
      !newPassword2 ||
      newPassword1 !== newPassword2
    ) {
      console.error("New passwords do not match");
      reply.status(400).send({ message: "New passwords do not match" });
      return false;
    }

    return true;
  };

  return {
    checkExistingUserValue,
    validateAddRole,
    validateExistingId,
    validatePasswordFields,
    checkNameAndRole,
    validateLastOpUser,
  };
}

export default ValidatedUser;
