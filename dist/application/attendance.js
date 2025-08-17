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
exports.createAttendance = exports.generateResponse = exports.getReNO = exports.getAllAttendance = void 0;
const Attendance_1 = __importDefault(require("../infrastructure/schemas/Attendance"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const openai_1 = __importDefault(require("openai"));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getAllAttendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Attendances = yield Attendance_1.default.find();
        yield sleep(1000);
        res.status(200).json(Attendances);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getAllAttendance = getAllAttendance;
const getReNO = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rgNo = req.params.rgNo;
        const attendanceRecords = yield Attendance_1.default.find({ RgNO: rgNo });
        if (!attendanceRecords) {
            throw new not_found_error_1.default("User not found");
        }
        res.status(200).json(attendanceRecords);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getReNO = getReNO;
const generateResponse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    try {
        const openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const completion = yield openai.chat.completions.create({
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
    }
    catch (error) {
        console.error("OpenAI Error:", error);
        res.status(500).json({ error: "OpenAI API Error" });
    }
});
exports.generateResponse = generateResponse;
const createAttendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendanceData = req.body;
        // Validate required fields
        if (!attendanceData.name ||
            !attendanceData.department ||
            !attendanceData.date ||
            attendanceData.RgNO == null ||
            attendanceData.timeIn == null ||
            attendanceData.timeOut == null ||
            attendanceData.totalTime == null ||
            !attendanceData.description) {
            throw new validation_error_1.default("Invalid attendance data");
        }
        // Create attendance record
        const attendance = yield Attendance_1.default.create({
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
    }
    catch (error) {
        next(error);
    }
});
exports.createAttendance = createAttendance;
//# sourceMappingURL=attendance.js.map