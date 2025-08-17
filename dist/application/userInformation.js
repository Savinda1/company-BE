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
exports.createInformation = exports.getAllInformation = void 0;
const usrInformation_1 = __importDefault(require("../infrastructure/schemas/usrInformation"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
//import NotFoundError from "../domain/errors/not-found-error";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getAllInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Information = yield usrInformation_1.default.find();
        yield sleep(1000);
        res.status(200).json(Information);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getAllInformation = getAllInformation;
const createInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const InformationData = req.body;
        // Validate required fields
        if (!InformationData.name ||
            !InformationData.department ||
            InformationData.RgNO == null) {
            throw new validation_error_1.default("Invalid attendance data");
        }
        // Create attendance record
        const attendance = yield usrInformation_1.default.create({
            name: InformationData.name,
            RgNO: InformationData.RgNO,
            department: InformationData.department,
        });
        res.status(201).json({
            message: "Information created successfully",
            data: attendance,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createInformation = createInformation;
//# sourceMappingURL=userInformation.js.map