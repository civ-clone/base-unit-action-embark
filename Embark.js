"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embark = void 0;
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
const UnitRegistry_1 = require("@civ-clone/core-unit/UnitRegistry");
const Busy_1 = require("@civ-clone/core-unit/Rules/Busy");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Move_1 = require("@civ-clone/base-unit-action-move/Move");
const NavalTransport_1 = require("@civ-clone/base-unit-type-naval-transport/NavalTransport");
class Embark extends Move_1.default {
    perform(unitRegistry = UnitRegistry_1.instance) {
        const [targetVessel] = unitRegistry
            .getByTile(this.to())
            .filter((tileUnit) => tileUnit instanceof NavalTransport_1.default)
            // @ts-ignore
            .filter((tileUnit) => tileUnit.hasCapacity());
        if (!targetVessel) {
            return false;
        }
        if (!super.perform()) {
            return false;
        }
        targetVessel.stow(this.unit());
        this.unit().setBusy(new Busy_1.default(new Criterion_1.default(() => false)));
        this.unit().setActive(false);
        this.ruleRegistry().process(Moved_1.Moved, this.unit(), this);
        return true;
    }
}
exports.Embark = Embark;
exports.default = Embark;
//# sourceMappingURL=Embark.js.map