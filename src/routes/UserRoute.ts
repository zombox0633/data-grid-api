import { FastifyInstance } from "fastify";

import UsersController from "../controllers/UsersController";
import {
  getUsersSchema,
  getUserSchema,
  addUserSchema,
  updateUserSchema,
  editPasswordSchema,
  deleteUserSchema,
  authentication,
} from "../schema/Users";

function UsersRoute(server: FastifyInstance) {
  const {
    authenticateUser,
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    editPassword,
    deleteUser,
  } = UsersController();

  // server.get("/api/users", {preHandler:[server.guard.role(['admin'])]}, getAllUsers);

  server.get("/api/users", getUsersSchema, getAllUsers);
  server.get("/api/users/:id", getUserSchema, getUser);

  //Authentication
  server.post("/api/users/login", authentication, authenticateUser);

  server.post("/api/users", addUserSchema, addUser);

  server.put("/api/users/:id", updateUserSchema, updateUser);
  server.put("/api/users/password/:id", editPasswordSchema, editPassword);

  server.delete("/api/users/:id", deleteUserSchema, deleteUser);

  return server;
}

export default UsersRoute;
