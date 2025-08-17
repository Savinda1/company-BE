import express from "express";

import {
 createInformation,
 getAllInformation,

  } from "../application/userInformation";
  

const InformationRouter = express.Router();

 InformationRouter.route("/").get(getAllInformation).post(createInformation);


export default  InformationRouter;