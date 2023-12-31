import Fastify, { FastifyInstance} from "fastify"

import OptsTest from "../schema/Test";
import PingHandler from "../controllers/TestController";

const TestRoute = async (server: FastifyInstance) => {

  server.get("/api/ping", OptsTest, PingHandler);

  return server;
};

export default TestRoute;
