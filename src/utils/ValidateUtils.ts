import { FastifyRequest, FastifyReply } from "fastify";

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
    reply.code(401).send({ error: errorMessage });
    return false;
  }

  return true;
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
