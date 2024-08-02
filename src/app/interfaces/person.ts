import { Address } from "./address";
import { Contact } from "./contact";

export interface Person{
    _id?: string;
    firstName?: string;
    lastName?: string;
    address?:string;
    phone?:string;
    contacts?: Contact[];
    Addresses?: Address[];
}
// contacts: mail,personal phone, work phone, email, social media