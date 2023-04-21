"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stowed = void 0;
const Busy_1 = require("@civ-clone/core-unit/Rules/Busy");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
class Stowed extends Busy_1.default {
    constructor() {
        super(new Criterion_1.default(() => false));
    }
}
exports.Stowed = Stowed;
exports.default = Stowed;
//# sourceMappingURL=Stowed.js.map