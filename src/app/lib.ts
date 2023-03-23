export interface Todo {
  readonly id: number;
  title: string;
  status: {
    completed: boolean;
    favourite: boolean;
    deleted: boolean;
  };
}
export interface User {
  readonly id: number;
  username: string;
  quote: string;
  loggedIn: boolean;
  password: string;
}

export enum TodoFilter {
  ALL = 'all',
  FAVOURITE = 'favourite ',
  COMPLETED = 'completed',
  DELETED = 'deleted',
}

export enum TodoStatus {
  FAVOURITE = 'favourite',
  COMPLETED = 'completed',
}
