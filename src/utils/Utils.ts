import { FastifyRequest, FastifyReply } from "fastify";
import moment from "moment-timezone";

export const getThaiTimestamp = () => {
  return moment.utc().tz("Asia/Bangkok").format();
};

export const isValueNotNull = (existingValue: any) => {
  return existingValue !== null && existingValue !== undefined;
};

export const isValueEmpty = (reply: FastifyReply, value: any, name: string) => {
  if(!value){
    console.error(`${name} not found`);
    reply.status(404).send({ message: `${name} not found` });
    return true
  }
  return false
};

export const handleServerError = (reply: FastifyReply, error: any) => {
  console.error(error);
  reply.status(500).send({ message: "Internal server error" });
};

export const validateAPIKey = (
  request: FastifyRequest,
  reply: FastifyReply,
  key: string,
  value: string
): boolean => {
  const headerValue = request.headers[key];
  if (headerValue !== value) {
    console.error("Invalid API key");
    reply.status(400).send({ message: "Invalid custom header" });
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
