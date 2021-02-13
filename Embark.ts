import { Moved, IMovedRegistry } from '@civ-clone/core-unit/Rules/Moved';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Action from '@civ-clone/core-unit/Action';
import Busy from '@civ-clone/core-unit/Rules/Busy';
import Criterion from '@civ-clone/core-rule/Criterion';
import { ITransport } from '@civ-clone/core-unit-transport/Transport';
import Move from '@civ-clone/base-unit-action-move/Move';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';

export class Embark extends Move {
  #transport: ITransport;

  constructor(
    from: Tile,
    to: Tile,
    unit: Unit,
    transport: ITransport,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super(from, to, unit, ruleRegistry);

    this.#transport = transport;
  }

  perform(): boolean {
    if (!super.perform()) {
      return false;
    }

    this.#transport.stow(this.unit());

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
