import { Request, Response, NextFunction } from "express";
import Attendance from "../infrastructure/schemas/Attendance";
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";
import OpenAI from "openai";

const sleep = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));



 export const getAllAttendance = async(
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try{
    const Attendances = await Attendance.find();
   await sleep(1000);
    res.status(200).json(Attendances);
    return;
  }catch(error){
  next(error);
}
};

  export const getReNO = async(
    req: Request,
    res: Response,
    next: NextFunction
   ) => {
    try{
        
 const rgNo = req.params.rgNo;
 
 const attendanceRecords =await Attendance.find({ RgNO: rgNo });
    if (! attendanceRecords)
      {  throw new NotFoundError("User not found");
      }
    res.status(200).json(attendanceRecords);
    return;
  } catch (error) {
      next(error);
    }
  };


export const generateResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { prompt } = req.body;


  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.status(200).json({
      messages: [
        { role: "user", content: prompt },
        {
          role: "assistant",
          content: completion.choices[0].message.content,
        },
      ],
    });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "OpenAI API Error" });
  }
};








export const createAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const attendanceData = req.body;

    // Validate required fields
    if (
      !attendanceData.name ||
      !attendanceData.department ||
      !attendanceData.date ||
       attendanceData.RgNO == null ||
      attendanceData.timeIn == null ||
      attendanceData.timeOut == null ||
      attendanceData.totalTime == null ||
      !attendanceData.description
    ) {
      throw new ValidationError("Invalid attendance data");
    }

    // Create attendance record
    const attendance = await Attendance.create({
      name: attendanceData.name,
    RgNO: attendanceData.RgNO,
      department: attendanceData.department,
      date: new Date(attendanceData.date),
      timeIn: attendanceData.timeIn,
      timeOut: attendanceData.timeOut,
      totalTime: attendanceData.totalTime,
      description: attendanceData.description,
    });

    res.status(201).json({
      message: "Attendance created successfully",
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};
