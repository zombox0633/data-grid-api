import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

// import TestRoute from "./routes/Test";
import UsersRoute from "./routes/UserRoute";
import CategoryRoute from "./routes/CategoryRoute";
import ProductsRoute from "./routes/ProductRoute";

const options = {
  host: process.env.HOST,
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
};

const server: FastifyInstance = Fastify({});
dotenv.config();

//การตั้งค่า CORS (Cross-Origin Resource Sharing) ให้เซิร์ฟเวอร์ API (Back-end) อนุญาตให้หน้าเว็บที่รันที่หรือใช้ API ได้
server.register(cors, {
  origin: "http://localhost:5173",
});

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
