"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _transport;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embark = void 0;
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
const Busy_1 = require("@civ-clone/core-unit/Rules/Busy");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Move_1 = require("@civ-clone/base-unit-action-move/Move");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
class Embark extends Move_1.default {
    constructor(from, to, unit, transport, ruleRegistry = RuleRegistry_1.instance) {
        super(from, to, unit, ruleRegistry);
        _transport.set(this, void 0);
        __classPrivateFieldSet(this, _transport, transport);
    }
    perform() {
        if (!super.perform()) {
            return false;
        }
        __classPrivateFieldGet(this, _transport).stow(this.unit());
        this.unit().setBusy(new Busy_1.default(new Criterion_1.default(() => false)));
        this.unit().setActive(false);
        this.ruleRegistry().process(Moved_1.Moved, this.unit(), this);
        return true;
    }
}
exports.Embark = Embark;
_transport = new WeakMap();
exports.default = Embark;
//# sourceMappingURL=Embark.js.map