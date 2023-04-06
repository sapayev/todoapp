import {createEvent, createStore, createEffect} from "effector";
import * as url from "url";

// Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

 const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

 const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

 const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

 const addTodoList = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

 // effector state implemantation

type Store = {
    todos: Todo[];
    newTodo: string;
}

// event for set new todo
export const setNewTodo = createEvent<string>();
// event for add todo
export const addTodo = createEvent();
// event for update
export const update = createEvent<{ id: number, text: string }>();
//event for toggle
export const toggle = createEvent<number>();
// event for remove
export const remove = createEvent<number>()

export const loadFx = createEffect(async (url: string) => {
    const res = await fetch(url)
        return res.json()
})
export default createStore <Store>({
    todos: [],
    newTodo: "",
})
    .on(loadFx.doneData, (state, todos) => ({
            ...state,
            todos,
        }
    ))  .on(setNewTodo, (state, newTodo) => ({
            ...state,
            newTodo,
        }
    ))
    .on(addTodo, (state) =>({
    ...state,
    newTodo: "",
    todos: addTodoList(state.todos, state.newTodo),
}))
    .on(update, (state, {id, text}) =>({
        ...state,
        newTodo: "",
        todos: updateTodo(state.todos, id, text),
    }))
    .on(toggle, (state, id) =>({
        ...state,
        todos: toggleTodo(state.todos, id),
    }))
    .on(remove, (state, id) =>({
        ...state,
        todos: removeTodo(state.todos, id),
    }));