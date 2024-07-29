import { Person } from "../interfaces/person";
export interface User extends Person{
    username : string;
    password: string;
    email?: string;
    token?: string;
}