import { ITransport } from '@civ-clone/core-unit-transport/Transport';
import Move from '@civ-clone/base-unit-action-move/Move';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
export declare class Embark extends Move {
  #private;
  constructor(
    from: Tile,
    to: Tile,
    unit: Unit,
    transport: ITransport,
    ruleRegistry?: RuleRegistry
  );
  perform(): boolean;
}
export default Embark;
