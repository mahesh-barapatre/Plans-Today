"use client"
import React, { useEffect, useState } from 'react'
// import { debounce } from '@/Hooks/debounce'

export interface todos {
    id: number,
    title: string,
    completed: boolean,
}

const Todo = () => {
    
    useEffect(() => {
        const storage = localStorage.getItem('todos');
        const savedTodos: todos[] = storage ? JSON.parse(storage) : [];
        setTodos(savedTodos);
    },[])
    
    const [todos, setTodos] = useState<todos[]>([])
    const [todo, setTodo] = useState<string>("")

    const onCheck = (id: number): void => {
        const newTodos = todos.map(t => {
            if (t.id === id) {
                t.completed = !t.completed; 
            }
            return t;
        })

        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos)); 
    };

    const addTodo = (): void => {
        const newTodo = {
            id: Math.random() * 100,
            title: todo,
            completed: false
        }

        setTodos(prev => {
            return [...prev, newTodo]
        })

        setTodo("");
        localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    };

    const deleteTodo = (id: number): void => {
        const newTodos: todos[] = todos.filter(todo => todo.id !== id);

        setTodos(newTodos);
        localStorage.setItem("todos", JSON.stringify(newTodos));
    }

    return (
        <div className='w-full h-full flex flex-col justify-center items-center p-5 space-y-5'>
            
            <div className='p-4 flex flex-col space-y-5'>
                
                <textarea
                    placeholder='Plan your day Here!'
                    value={todo}
                    onChange={(e)=>setTodo(e.target.value)}
                    className='p-1 rounded text-black' />
                
                <button onClick={addTodo} className='p-1 rounded text-lg bg-blue-600 text-white'>Add Todo</button>
                
            </div>
            <div className='space-y-5 w-1/2'>
                {
                    todos.map(todo => 
                        <div key={todo.id} className='flex w-full justify-between items-center bg-gray-900 space-x-5 p-3'>
                            <div className='items-center space-x-4'>

                                <input
                                    checked = {todo.completed}
                                    onChange={() => onCheck(todo.id)} type="checkbox" name="done" id="done" />
                            <span className={`${todo.completed ? "line-through" : ""}`}>{todo.title}</span>
                            </div>
                            <button
                                onClick={()=>deleteTodo(todo.id)}
                                className='bg-red-600 text-sm rounded p-1 text-white'>Delete</button>
                        </div>
                        )
                }
            </div>
            
            
      </div>
  )
}

export default Todo
