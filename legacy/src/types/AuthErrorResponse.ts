export type AuthErrorResponse = {
    message?:string;
    errors?:{
        email?:string;
        password?:string;
    }
}