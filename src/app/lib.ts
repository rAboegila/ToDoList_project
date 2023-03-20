export interface Todo {
    readonly id: number;
    title: string;
    completed: boolean;
    favourite: boolean;
    deleted: boolean;
}

export interface User {
    readonly id: number;
    name: string,
    quote: string,
    loggedIn:boolean
}