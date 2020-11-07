import {Street} from './street';
import {Contact} from './contact';

export class Address {
    id:         number;
    building:   string;
    apartment:  string;
    number:     string;
    street:     Street;
    street_id:  string;
    contact:    Contact;
    contact_id: string;
    created_at: Date;
    updated_at: Date;
}
