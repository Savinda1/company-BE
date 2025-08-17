import { Request, Response, NextFunction } from "express";
import usrInformation from "../infrastructure/schemas/usrInformation";
import ValidationError from "../domain/errors/validation-error";
//import NotFoundError from "../domain/errors/not-found-error";


const sleep = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));



 export const getAllInformation = async(
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try{
    const Information = await usrInformation.find();
   await sleep(1000);
    res.status(200).json(Information);
    return;
  }catch(error){
  next(error);
}
};

 

export const createInformation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const InformationData = req.body;

    // Validate required fields
    if (
      !InformationData.name ||
      !InformationData.department ||
       InformationData.RgNO == null 
     
    ) {
      throw new ValidationError("Invalid attendance data");
    }

    // Create attendance record
    const attendance = await  usrInformation.create({
      name:  InformationData.name,
    RgNO:  InformationData.RgNO,
      department:  InformationData.department,
     
    });

    res.status(201).json({
      message: "Information created successfully",
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};
