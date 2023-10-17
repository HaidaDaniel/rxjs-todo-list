import { createContext, useContext } from "react";
import { BehaviorSubject, map } from "rxjs";


const rawTodos$ = new BehaviorSubject([]);

const todos$ = rawTodos$;

const completedTodos$ = todos$.pipe(
    map((todos) => todos.filter((todo) => todo.completed))
);

const uncompletedTodos$ = todos$.pipe(
    map((todos) => todos.filter((todo) => !todo.completed))
);

const TodoContext = createContext({
    todos$,
    completedTodos$,
    uncompletedTodos$,
});

export const useTodos = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => (
    <TodoContext.Provider
        value={{
            todos$,
            completedTodos$,
            uncompletedTodos$,
        }}
    >
        {children}
    </TodoContext.Provider>
);