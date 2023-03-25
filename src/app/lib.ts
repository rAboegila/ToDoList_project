export type todoStep = {
   text:string;
   isChecked:boolean;
}

export interface Todo {
  readonly _id: number;
  title: string;
  status: {
    completed: boolean;
    favourite: boolean;
    deleted: boolean;
  };
  priority?: string;
  deadline: Date;
  steps?:todoStep[];
  description?: string;
}
export interface User {
  readonly id?: number;
  userName: string;
  quote: string;
  loggedIn: boolean;
  password?: string;
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
  DELETED = 'deleted',

}
