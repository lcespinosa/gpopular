import {Entity} from './entity';

export class Topic {
  id:         number;
  name:       string;
  code:       string;
  has_resources: boolean;
  agency:     Entity;
  agency_id:  number;
  disabled:   boolean;
}
