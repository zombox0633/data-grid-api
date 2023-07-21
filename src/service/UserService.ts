import { FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";

import { isValueNotNull, toLowerCase } from "../utils/CommonUtils";
import { handleServerError } from "../utils/ErrorUtils";

function ValidatedUser() {
  const params = new PrismaClient();

  const getUserById = async (reply: FastifyReply, id: string) => {
    try {
      //findUnique ใช้สำหรับค้นหาแถวเดียวในฐานข้อมูล โดยระบุเงื่อนไขที่ชัดเจนเพื่อหาแถวที่ตรงกับเงื่อนไข
      const foundUser = await params.uSERS.findUnique({
        where: {
          id: id,
        },
      });
      if (!foundUser) {
        const errorMessage = `User id ${id} not found`;
        console.error(errorMessage);
        reply.status(404).send({ message: errorMessage });
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
    const lowercaseValue = toLowerCase(value);
    try {
      const existingUserValue = await params.uSERS.findFirst({
        where: {
          [key]: lowercaseValue,
        },
      });

      if (isValueNotNull(existingUserValue)) {
        const errorMessage = `User with the same ${key} already exists`;
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

  const validateLastOpUser = async (
    reply: FastifyReply,
    last_op_id: string,
    requiredRole?: string[]
  ): Promise<boolean> => {
    try {
      const existingOpUser = await params.uSERS.findFirst({
        where: {
          id: last_op_id,
        },
      });

      if (!existingOpUser) {
        const errorMessage = "Invalid last operation ID";
        console.error(errorMessage);
        reply.status(404).send({ message: errorMessage });
        return false;
      }

      const isRoleMatch = requiredRole?.some(
        (role) => role === existingOpUser.role
      );
      if (requiredRole && !isRoleMatch) {
        const errorMessage = `Role does not match '${requiredRole}'`;
        console.error(errorMessage);
        reply.status(403).send({ message: errorMessage });
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
      const errorMessageIncorrect = "The provided old password is incorrect";
      console.error(errorMessageIncorrect);
      reply.status(400).send({ message: errorMessageIncorrect });
      return false;
    } else if (
      newPassword1.length < MIN_PASSWORD_LENGTH ||
      newPassword2.length < MIN_PASSWORD_LENGTH
    ) {
      const errorMessageLength =
        "New password must be at least 8 characters long";
      console.error(errorMessageLength);
      reply.status(400).send({ message: errorMessageLength });
      return false;
    } else if (
      !newPassword1 ||
      !newPassword2 ||
      newPassword1 !== newPassword2
    ) {
      const errorMessageNotMatch = "New passwords do not match";
      console.error(errorMessageNotMatch);
      reply.status(400).send({ message: errorMessageNotMatch });
      return false;
    }

    return true;
  };

  return {
    checkExistingUserValue,
    validateAddRole,
    getUserById,
    validatePasswordFields,
    checkNameAndRole,
    validateLastOpUser,
  };
}

export default ValidatedUser;
