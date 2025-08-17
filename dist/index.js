"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./infrastructure/db"));
const Attendance_1 = __importDefault(require("./api/Attendance"));
const information_1 = __importDefault(require("./api/information"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, db_1.default)();
app.use("/api/Atten", Attendance_1.default);
app.use("/api/Info", information_1.default);
const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
//# sourceMappingURL=index.js.map