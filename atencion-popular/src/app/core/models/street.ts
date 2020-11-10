import {Cpopular} from './cpopulars';

export class Street {
  id:         number;
  name:       string;
  code:       string;
  cpopular:   Cpopular;
  cpopular_id: number;
  first_between_street: Street;
  first_between_id: number;
  second_between_street: Street;
  second_between_id: number;
  disabled:   boolean;
}
