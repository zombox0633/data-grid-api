import { FastifyReply } from "fastify";
import moment from "moment-timezone";

export const getThaiTimestamp = () => {
  return moment.utc().tz("Asia/Bangkok").format();
};

export const isValueNotNull = (existingValue: any) => {
  return existingValue !== null && existingValue !== undefined;
};

//ตัดเว้นวรรคที่อยู่ก่อนและหลังคำของ name
export const trimWhitespace = (value: string) => {
  return value.trim();
};

export const toLowerCase = (value: string) => {
  return value.toLowerCase();
};

export const isValueEmpty = (reply: FastifyReply, value: any, name: string) => {
  if (!value) {
    const errorMessage = `${name} not found`;
    console.error(errorMessage);
    reply.status(404).send({ message: errorMessage });
    return true;
  }
  return false;
};
