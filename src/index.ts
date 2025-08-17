import express from "express";
import "dotenv/config"; 
const app=express();
import cors from "cors";

import conectDB from "./infrastructure/db";
import AttenRouter from "./api/Attendance";
import InformationRouter from "./api/information";
app.use(express.json());

app.use(cors());

conectDB();



app.use("/api/Atten",AttenRouter);
app.use("/api/Info",InformationRouter);

const port=8000;
app.listen(port,()=>console.log(`Server is running on port ${port}`));

