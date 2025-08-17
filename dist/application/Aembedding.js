"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmbeddings = void 0;
const openai_1 = require("@langchain/openai");
const documents_1 = require("@langchain/core/documents");
const mongodb_1 = require("@langchain/mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Attendance_1 = __importDefault(require("../infrastructure/schemas/Attendance"));
const createEmbeddings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const embeddingsModel = new openai_1.OpenAIEmbeddings({
            model: "text-embedding-3-small", //text ekak dunnama vector ekak denawa
            apiKey: process.env.OPENAI_API_KEY,
        });
        const vectorIndex = new mongodb_1.MongoDBAtlasVectorSearch(embeddingsModel, {
            collection: mongoose_1.default.connection.collection("AttenVectors"),
            indexName: "vector_index",
        });
        const attendances = yield Attendance_1.default.find({});
        const docs = attendances.map((attendance) => {
            const { _id, date, RgNO } = attendance; //me tika thama wadagath wenne search karanna
            const doc = new documents_1.Document({
                pageContent: `date:${date} ${RgNO}`, //search karala hana ewa
                metadata: {
                    _id,
                },
            });
            return doc;
        });
        yield vectorIndex.addDocuments(docs);
        res.status(200).json({
            message: "Embeddings created successfully",
        });
    }
    catch (error) {
        console.error(" Embedding creation error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createEmbeddings = createEmbeddings;
//# sourceMappingURL=Aembedding.js.map