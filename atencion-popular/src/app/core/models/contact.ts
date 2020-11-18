import {Address} from './address';

export class Contact {
  id:         number;
  name:       string;
  last_name:  string;
  phones:     string;
  address:    Address;
  anonymous:  boolean;
  disabled:   boolean;

  cpopular_id:  string;
  street_id:    string;
}
