"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userInformation_1 = require("../application/userInformation");
const InformationRouter = express_1.default.Router();
InformationRouter.route("/").get(userInformation_1.getAllInformation).post(userInformation_1.createInformation);
exports.default = InformationRouter;
//# sourceMappingURL=information.js.map