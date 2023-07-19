import { FastifyRequest, FastifyReply } from "fastify";

const PingHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ pong: "it worked!" });
};

export default PingHandler;
