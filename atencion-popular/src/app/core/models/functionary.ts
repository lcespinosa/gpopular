import {Entity} from './entity';

export class Functionary {
  id:         number;
  name:       string;
  last_name:  string;
  nick:       string;
  phones:     string;
  is_relevant: boolean;
  occupation: string;
  agency:     Entity;
  agency_id:  any;
  disabled:   boolean;
}
