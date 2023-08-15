import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

//API KEY
export const validateAPIKey = (
  request: FastifyRequest,
  reply: FastifyReply,
  key: string,
  value: string
): boolean => {
  const headerValue = request.headers[key];
  if (headerValue !== value) {
    const errorMessage = "Invalid custom header";
    console.error(errorMessage);
    reply.status(400).send({ message: errorMessage });
    return false;
  }

  return true;
};

//Basic Auth
export const validateAuthUser = (
  request: FastifyRequest,
  reply: FastifyReply,
  username: string,
  password: string
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    const errorMessage = "Unauthorized - Missing credentials";
    console.error(errorMessage);
    reply.code(401).send({ message: errorMessage });
    return false;
  }

  const encodedCredentials = authHeader.replace("Basic ", "");
  const credentials = Buffer.from(encodedCredentials, "base64").toString(
    "utf-8"
  );
  const [receivedUsername, receivedPassword] = credentials.split(":");

  if (receivedUsername !== username || receivedPassword !== password) {
    const errorMessage = "Unauthorized - Invalid credentials";
    console.error(errorMessage);
    reply.code(401).send({ message: errorMessage });
    return false;
  }

  return true;
};

//BearerToken
export const validateBearerToken = (
  request: FastifyRequest,
  reply: FastifyReply,
  secretKey?: string
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    reply.status(401).send({ message: "Unauthorized" });
    return false;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secretKey || "secretKey") as {
      id: string;
    };
    return decoded.id;
  } catch (error) {
    reply.status(401).send({ message: "Invalid token" });
    return false;
  }
};

export const validateRequiredFields = (
  reply: FastifyReply,
  fields: string[]
) => {
  for (const field of fields) {
    if (!field) {
      const errorMessage = `Please provide a value for the required field`;
      console.error(errorMessage);
      reply.status(400).send({ message: errorMessage });
      return false;
    }
  }
  return true;
};
