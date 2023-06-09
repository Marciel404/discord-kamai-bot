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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdvertenciaEntry = exports.verifyRegChannelName = exports.verifyRoles = void 0;
const moderation_1 = require("../db/moderation");
const loader_1 = require("../utils/loader");
function verifyRoles(msg, roles) {
    let v = false;
    for (const r of Object.values(msg.member.roles)[0]["_roles"]) {
        if (roles.indexOf(r) == 1) {
            v = true;
        }
        ;
    }
    ;
    return v;
}
exports.verifyRoles = verifyRoles;
function verifyRegChannelName(client, configData, moddb) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Verificação de primeira instancia");
        let qnt = yield moddb.findOne({ "_id": "kamaiMod" });
        yield client.guilds.fetch(configData["guild"])
            .then((guild) => __awaiter(this, void 0, void 0, function* () {
            yield guild.channels.fetch(configData["channels"]["registrosAtivos"])
                .then((channel) => __awaiter(this, void 0, void 0, function* () {
                if ((channel === null || channel === void 0 ? void 0 : channel.name) != `registros-ativos-${qnt["regsAtivos"]}`) {
                    yield (channel === null || channel === void 0 ? void 0 : channel.edit({ name: `registros-ativos-${qnt["regsAtivos"]}` }));
                }
            }));
        }));
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            let qnt = yield moddb.findOne({ "_id": "kamaiMod" });
            yield client.guilds.fetch(configData["guild"])
                .then((guild) => __awaiter(this, void 0, void 0, function* () {
                yield guild.channels.fetch(configData["channels"]["registrosAtivos"])
                    .then((channel) => __awaiter(this, void 0, void 0, function* () {
                    if ((channel === null || channel === void 0 ? void 0 : channel.name) != `registros-ativos-${qnt["regsAtivos"]}`) {
                        yield (channel === null || channel === void 0 ? void 0 : channel.edit({ name: `registros-ativos-${qnt["regsAtivos"]}` }));
                    }
                }));
            }));
        }), 300000);
    });
}
exports.verifyRegChannelName = verifyRegChannelName;
function verifyAdvertenciaEntry(member) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let point = 0;
            let adv = yield moderation_1.memberManegements.findOne({ "_id": member.id });
            for (var a1 in adv) {
                if (a1 == "advertencias") {
                    for (var a2 of adv[a1]) {
                        point += a2["points"];
                    }
                }
            }
            const roles = [loader_1.configData["roles"]["adv1"], loader_1.configData["roles"]["adv2"], loader_1.configData["roles"]["adv3"]];
            if (point == 3) {
                return yield member.roles.add([roles[0], roles[1], roles[2]]);
            }
            if (point == 2) {
                return yield member.roles.add([roles[0], roles[1]]);
            }
            if (point == 1) {
                return yield member.roles.add(roles[0]);
            }
            return false;
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.verifyAdvertenciaEntry = verifyAdvertenciaEntry;
