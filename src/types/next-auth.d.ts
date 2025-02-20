import 'next-auth';
import { DefaultSession } from 'next-auth';


declare module 'next-auth' {
    interface User {
        _id?: string;
        isVerified?: boolean;
        name?: string;
        addresses?: Address[];
        cart?: Cart[];
        orders?: Order[];
    }
    interface Session {
        user: {
            _id?: string;
            name?: string;
            addresses?: Address[];
            cart?: Cart[];
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        name?: string;
        addresses?: Address[];
        cart?: Cart[];
    }
}