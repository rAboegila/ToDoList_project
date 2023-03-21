export interface Todo {
    readonly id: number;
    title: string;
    completed: boolean;
    favourite: boolean;
    deleted: boolean;
}

export interface User {
    readonly id: number;
    userName: string,
    quote: string,
    loggedIn:boolean,
    password:string
}