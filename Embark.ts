import { Moved, IMovedRegistry } from '@civ-clone/core-unit/Rules/Moved';
import {
  UnitRegistry,
  instance as unitRegistryInstance,
} from '@civ-clone/core-unit/UnitRegistry';
import Busy from '@civ-clone/core-unit/Rules/Busy';
import Criterion from '@civ-clone/core-rule/Criterion';
import Move from '@civ-clone/base-unit-action-move/Move';
import NavalTransport from '@civ-clone/base-unit-type-naval-transport/NavalTransport';
import Unit from '@civ-clone/core-unit/Unit';

export class Embark extends Move {
  perform(unitRegistry: UnitRegistry = unitRegistryInstance): boolean {
    const [targetVessel]: NavalTransport[] = unitRegistry
      .getByTile(this.to())
      .filter((tileUnit: Unit): boolean => tileUnit instanceof NavalTransport)
      // @ts-ignore
      .filter((tileUnit: NavalTransport): boolean => tileUnit.hasCapacity());

    if (!targetVessel) {
      return false;
    }

    if (!super.perform()) {
      return false;
    }

    targetVessel.stow(this.unit());

    this.unit().setBusy(new Busy(new Criterion(() => false)));
    this.unit().setActive(false);

    (this.ruleRegistry() as IMovedRegistry).process(Moved, this.unit(), this);

    return true;
  }
}

export default Embark;
