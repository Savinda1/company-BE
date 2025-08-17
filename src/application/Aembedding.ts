import { Request, Response, NextFunction } from "express";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import mongoose from "mongoose";
import Attendance from "../infrastructure/schemas/Attendance";

export const createEmbeddings = async (
    req: Request,
    res: Response,
    next: NextFunction
  )=> {
    try{
        const embeddingsModel = new OpenAIEmbeddings({
            model: "text-embedding-3-small",//text ekak dunnama vector ekak denawa
            apiKey: process.env.OPENAI_API_KEY,
          });
          const vectorIndex = new MongoDBAtlasVectorSearch(embeddingsModel, {
            collection: mongoose.connection.collection("AttenVectors"),
            indexName: "vector_index",
          });

          const attendances = await Attendance.find({});

              const docs = attendances.map((attendance) => {
            
            const { _id, date,RgNO} = attendance;//me tika thama wadagath wenne search karanna
            const doc = new Document({
              pageContent: `date:${date} ${RgNO}`,//search karala hana ewa
              metadata: {//id eka
                _id,
              },
            });
            return doc;
          });
      
          await vectorIndex.addDocuments(docs);
      
          res.status(200).json({
            message: "Embeddings created successfully",
          });
}
  catch (error) {
  console.error(" Embedding creation error:", error);
  res.status(500).json({ error: "Internal Server Error" });
}}