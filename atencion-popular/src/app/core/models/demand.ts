import { Type } from './type';
import {Way} from './way';
import {DemandCase} from './demand_case';
import {Contact} from './contact';
import {Topic} from './topic';


export class Demand {
  id: number;
  page: string;
  number: string;
  expedient: string;
  reception_date: string;
  content: string;
  is_anonymous: boolean;
  disabled: boolean;

  type: Type;
  type_id: number;
  way: Way;
  way_id: string;
  demand_case: DemandCase;
  demand_case_id: string;
  topic: Topic;
  topic_id: string;
  agency_id: string;
  contact: Contact;
  contact_id: number;
}
