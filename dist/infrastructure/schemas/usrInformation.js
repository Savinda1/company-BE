"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserInformationSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    RgNO: {
        type: Number,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
});
const UserInformation = mongoose_1.default.model("UserInformation", UserInformationSchema);
exports.default = UserInformation;
//# sourceMappingURL=usrInformation.js.map