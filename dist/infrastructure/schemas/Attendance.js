"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AttendanceSchema = new mongoose_1.default.Schema({
    //   name: {
    //     type: String,
    //     required: true,
    //   },
    //  RgNO: {
    //     type: Number, 
    //     required: true,
    //   },
    //   department: {
    //     type: String,
    //     required: true,
    //   },
    RgNO: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    timeIn: {
        type: Number,
        required: true,
    },
    timeOut: {
        type: Number,
        required: true,
    },
    totalTime: {
        type: Number,
        required: true,
    },
});
const Attendance = mongoose_1.default.model("Attendance", AttendanceSchema);
exports.default = Attendance;
//# sourceMappingURL=Attendance.js.map