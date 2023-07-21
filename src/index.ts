import Fastify, { FastifyInstance } from "fastify";
import dotenv from "dotenv";

// import TestRoute from "./routes/Test";
import UsersRoute from "./routes/UserRoute";
import CategoryRoute from "./routes/CategoryRoute";
import ProductsRoute from "./routes/ProductRoute";

const server: FastifyInstance = Fastify({});
dotenv.config();

const options = {
  host: process.env.HOST,
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
};

const start = async () => {
  try {
    await server.register(UsersRoute);
    await server.register(CategoryRoute);
    await server.register(ProductsRoute);

    await server.listen(options, () => {
      console.log(`Server listening at ${options.port}`);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
