export interface Todo {
  id?: string;
  todo: string;
  completed: boolean;
  userId: number;
  tags?: string[];
}
