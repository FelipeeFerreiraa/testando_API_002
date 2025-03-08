import express from "express";
import { getUsers, addUser, updateUser, deleteUser } from "../controllers/user_controller.js";

const rota = express.Router();

rota.get("/", getUsers);

//rota.post("/", addUser);

//rota.put("/:id", updateUser);

//rota.delete("/:id", deleteUser);

export default rota;