import {ReasonType} from './reason_type';
import {Result} from './result';
import {Functionary} from './functionary';
import {Demand} from './demand';

export class Reply {
  id: number;
  description: string;
  accepted: boolean;
  send_date: Date;
  reply_date: Date;

  reason_type: ReasonType;
  reason_type_id: number;
  result: Result;
  result_id: number;
  functionary: Functionary;
  functionary_id: number;
  // demand: Demand;
  demand_id: number;

  get status(): any {
    return this.accepted ? {
      value: 'success',
      text: 'Finalizado'
    } : {
      value: 'default',
      text: 'En proceso'
    };
  }

  _expand: boolean;
  get expand(): boolean {
    return this._expand || false;
  }
  set expand(value) {
    this._expand = value;
  }
}
