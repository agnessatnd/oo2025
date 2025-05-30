import { AppUser } from './AppUser';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user: AppUser;
}
