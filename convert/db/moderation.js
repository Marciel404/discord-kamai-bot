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
exports.rmvNotify = exports.adcNotify = exports.rmvAdvertencia = exports.adcAdvertencia = exports.RegsAtivos = exports.memberManegements = exports.moddb = void 0;
const moment_1 = __importDefault(require("moment"));
const { MongoClient } = require("mongodb");
const cluster = new MongoClient(process.env.mongoKet);
const db = cluster.db(process.env.database_name);
exports.moddb = db.collection("moderação");
exports.memberManegements = db.collection("memberManegements");
function RegsAtivos(qnt) {
    exports.moddb.updateOne({ _id: "kamaiMod" }, { $inc: { "regsAtivos": qnt } }, { upsert: true });
}
exports.RegsAtivos = RegsAtivos;
function adcAdvertencia(author, member, aprovador, motivo, data) {
    return __awaiter(this, void 0, void 0, function* () {
        exports.moddb.updateOne({ _id: "kamaiMod" }, { $inc: { "AdvsQnt": 1 } }, { upsert: true });
        const warn = yield exports.moddb.findOne({ "_id": "kamaiMod" });
        const insert = { "advertencias": {
                "points": 1,
                "author": `${author}`,
                "aprovador": `${aprovador}`,
                "motivo": `${motivo}`,
                "data": `${data}`,
                "warn_id": warn["AdvsQnt"]
            }
        };
        exports.memberManegements.updateOne({ _id: member.id }, { $push: insert }, { upsert: true });
    });
}
exports.adcAdvertencia = adcAdvertencia;
function rmvAdvertencia(warnid) {
    const time = new Date();
    const dt = new Date().setHours(time.getHours() - 3);
    exports.memberManegements.findOneAndUpdate({ "advertencias": { "$elemMatch": { "warn_id": warnid } } }, { "$pull": { "advertencias": { "warn_id": warnid } },
        "$set": { "UltimaRemoção": ((0, moment_1.default)(new Date(dt))).format("DD/MM/YYYY HH:mm") } });
}
exports.rmvAdvertencia = rmvAdvertencia;
function adcNotify(author, member, motivo, data) {
    return __awaiter(this, void 0, void 0, function* () {
        exports.moddb.updateOne({ "_id": "kamaiMod" }, { "$inc": { "NtfsQnt": 1 } }, { upsert: true });
        const ntf = yield exports.moddb.findOne({ "_id": "kamaiMod" });
        exports.memberManegements.updateOne({ "_id": member.id }, { "$push": {
                "Notifys": {
                    "author": `${author}`,
                    "motivo": `${motivo}`,
                    "data": data,
                    "notify_id": ntf["NtfsQnt"]
                }
            }
        }, { upsert: true });
    });
}
exports.adcNotify = adcNotify;
function rmvNotify(warnid) {
    return __awaiter(this, void 0, void 0, function* () {
        exports.memberManegements.findOneAndUpdate({ "Notifys": { "$elemMatch": { "notify_id": warnid } } }, { "$pull": { "Notifys": { "notify_id": warnid } } });
    });
}
exports.rmvNotify = rmvNotify;
