import { FastifyRequest, FastifyReply } from "fastify";

export const validateAPIKey = (
  request: FastifyRequest,
  reply: FastifyReply,
  key: string,
  value: string
): boolean => {
  const headerValue = request.headers[key];
  if (headerValue !== value) {
    const errorMessage = "Invalid custom header"
    console.error(errorMessage);
    reply.status(400).send({ message: errorMessage });
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