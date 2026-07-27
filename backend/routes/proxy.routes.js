import express from "express";
import {
	getReadMe,
	getRepos,
} from "../controllers/proxy.controller.js";

const proxyRouter = express.Router();

proxyRouter.get("/readMe", getReadMe);
proxyRouter.get("/repos", getRepos);


export default proxyRouter;