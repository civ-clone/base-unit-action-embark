"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Embark_transport;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embark = void 0;
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Busy_1 = require("@civ-clone/core-unit/Rules/Busy");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Move_1 = require("@civ-clone/base-unit-action-move/Move");
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
class Embark extends Move_1.default {
    constructor(from, to, unit, transport, ruleRegistry = RuleRegistry_1.instance) {
        super(from, to, unit, ruleRegistry);
        _Embark_transport.set(this, void 0);
        __classPrivateFieldSet(this, _Embark_transport, transport, "f");
    }
    perform() {
        if (!super.perform()) {
            return false;
        }
        __classPrivateFieldGet(this, _Embark_transport, "f").stow(this.unit());
        this.unit().setBusy(new Busy_1.default(new Criterion_1.default(() => false)));
        this.unit().setActive(false);
        this.ruleRegistry().process(Moved_1.default, this.unit(), this);
        return true;
    }
}
exports.Embark = Embark;
_Embark_transport = new WeakMap();
exports.default = Embark;
//# sourceMappingURL=Embark.js.map