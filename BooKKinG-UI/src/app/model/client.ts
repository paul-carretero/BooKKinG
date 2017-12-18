import { Reponse } from './reponse';

export class Client extends Reponse {
    name?: string;
    address?: string;
    email: string;
    password: string;
    admin = false;

    public static clone(orig: Client): Client {
        const c = new Client();
        c.name = orig.name;
        c.address = orig.address;
        c.email = orig.email;
        c.password = orig.password;
        c.admin = orig.admin;
        return c;
    }
}
