import { FastifyReply } from "fastify";

export const handleServerError = (reply: FastifyReply, error: any) => {
  console.error(error);
  reply.status(500).send({ message: "Internal server error" });
};