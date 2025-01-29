// types/next-auth.d.ts
import { JWT } from 'next-auth';
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    access_token?: string;
    email?: string;
    name?: string;
  }

  interface JWT {
    access_token?: string;
    email?: string;
    name?: string;
  }
}
