export interface User {
    email: string
    password: string
    name: string;
    address: string;
    age: number;
    phoneNumber: string;
    picture: string;
    comparePassword(reqPassword: string, password: string): Promise<boolean>
}