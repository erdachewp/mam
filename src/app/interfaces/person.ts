import { Contact } from "./contact";

export interface Person{
    _id?: string;
    firstName?: string;
    lastName?: string;
    address?:string;
    phone?:string;
    contacts?: Contact[];
}
// contacts: mail,personal phone, work phone, email, social media