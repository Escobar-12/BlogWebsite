import express from "express"
import { findAuthor } from "../controller/authorController.js";

const AuthorRouter = express.Router();

AuthorRouter.get("/:AuthorId",findAuthor);


export default AuthorRouter;