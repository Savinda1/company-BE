"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const attendance_1 = require("../application/attendance");
const Aembedding_1 = require("../application/Aembedding");
const AttendanceRouter = express_1.default.Router();
AttendanceRouter.route("/").get(attendance_1.getAllAttendance).post(attendance_1.createAttendance);
AttendanceRouter.route("/:rgNo").get(attendance_1.getReNO);
AttendanceRouter.route("/llm").post(attendance_1.generateResponse);
AttendanceRouter.route("/embeddings/create").post(Aembedding_1.createEmbeddings);
exports.default = AttendanceRouter;
//# sourceMappingURL=Attendance.js.map