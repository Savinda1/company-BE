import express from "express";

import {
 createAttendance,
getAllAttendance,
getReNO,
generateResponse
  } from "../application/attendance";
  
  import { createEmbeddings } from "../application/Aembedding";

const AttendanceRouter = express.Router();

AttendanceRouter.route("/").get(getAllAttendance).post(createAttendance);

AttendanceRouter.route("/:rgNo").get(getReNO);
AttendanceRouter.route("/llm").post(generateResponse);
AttendanceRouter.route("/embeddings/create").post(createEmbeddings);


export default  AttendanceRouter;