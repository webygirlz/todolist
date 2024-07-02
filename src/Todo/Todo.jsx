import React, {useReducer, useState } from "react";
import './Todo.css'

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return {
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case "remove":
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "toggle":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "edit":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.newText }
            : todo
        ),
      };
    default:
      throw new Error("Unknown action type");
  }
};

const Todo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [todoText, setTodoText] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAddTodo = () => {
    if (todoText.trim() !== "") {
      dispatch({ type: "add", payload: todoText });
      setTodoText("");
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodoId(todo.id);
    setEditingText(todo.text);
  };

 


  const handleSaveEdit = (id) => {
    if (editingText.trim() !== "") {
      dispatch({ type: "edit", payload: { id, newText: editingText } });
      setEditingTodoId(null);
      setEditingText("");
    }
  };
  return (
    <div className="container">
      <h1 className="heading">Todo List</h1>
      <div className="container1">
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
      </div>
      <div className="add_div">
      <ul>
        {state.todos.map((todo) => (
          <li key={todo.id}>
           {}
            {editingTodoId === todo.id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
              
            ) : (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                onClick={() => dispatch({ type: "toggle", payload: todo.id })}>
                {todo.text}
              </span>
            )}
            
            {editingTodoId === todo.id ? (
              <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
            ) : (
              <button onClick={() => handleEditTodo(todo)}>Edit</button>
            )}
            <button onClick={() => dispatch({ type: "remove", payload: todo.id })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Todo;