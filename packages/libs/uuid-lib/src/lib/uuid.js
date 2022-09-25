"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uuid = void 0;
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
class Uuid {
    constructor(identity, entityName = 'Uuid') {
        this.identity = identity;
        this.entityName = entityName;
        if (!Uuid.isValid(identity)) {
            throw new Error('Invalid UUID');
        }
    }
    static isValid(uuid) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
    }
    static generate(entityName) {
        return new Uuid(crypto_1.default.randomUUID().toString(), entityName);
    }
    toString() {
        return this.identity;
    }
    equal(uuid) {
        return uuid.entityName === this.entityName && uuid.identity === this.identity;
    }
}
exports.Uuid = Uuid;
