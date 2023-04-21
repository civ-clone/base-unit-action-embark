import Busy from '@civ-clone/core-unit/Rules/Busy';
import Criterion from '@civ-clone/core-rule/Criterion';

export class Stowed extends Busy {
  constructor() {
    super(new Criterion((): boolean => false));
  }
}

export default Stowed;
