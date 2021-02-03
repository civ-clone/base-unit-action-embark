import { Moved, IMovedRegistry } from '@civ-clone/core-unit/Rules/Moved';
import {
  UnitRegistry,
  instance as unitRegistryInstance,
} from '@civ-clone/core-unit/UnitRegistry';
import Action from '@civ-clone/core-unit/Action';
import Busy from '@civ-clone/core-unit/Rules/Busy';
import Criterion from '@civ-clone/core-rule/Criterion';
import Move from '@civ-clone/base-unit-action-move/Move';
import NavalTransport from '@civ-clone/base-unit-type-naval-transport/NavalTransport';
import Unit from '@civ-clone/core-unit/Unit';

export class Embark extends Move {
  perform(unitRegistry: UnitRegistry = unitRegistryInstance): boolean {
    const [targetVessel] = (unitRegistry
      .getByTile(this.to())
      .filter(
        (tileUnit: Unit): boolean => tileUnit instanceof NavalTransport
      ) as NavalTransport[]).filter((tileUnit: NavalTransport): boolean =>
      tileUnit.hasCapacity()
    );

    if (!targetVessel) {
      return false;
    }

    if (!super.perform()) {
      return false;
    }

    targetVessel.stow(this.unit());

    this.unit().setBusy(new Busy(new Criterion((): boolean => false)));
    this.unit().setActive(false);

    (this.ruleRegistry() as IMovedRegistry).process(
      Moved,
      this.unit(),
      this as Action
    );

    return true;
  }
}

export default Embark;
