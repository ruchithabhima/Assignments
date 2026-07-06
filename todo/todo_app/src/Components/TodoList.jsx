import React, { useState,useEffect } from "react";
import "./TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
    });
    useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
  const [headingInput, setHeadingInput] = useState("");
  const [listInputs, setListInputs] = useState({});
  const handleAddTodo = () => {
    if (headingInput.trim() != "") {
      setTodos([...todos, { heading: headingInput, lists: [] }]);
      setHeadingInput("");
    }
  };
  const handleAddList = (index) => {
    if (listInputs[index] && listInputs[index].trim() !== "") {
      const newTodos = [...todos];
      newTodos[index].lists.push(listInputs[index]);
      setTodos(newTodos);
      setListInputs({ ...listInputs, [index]: "" });
    }
  };
  const handleListInputChange = (index, value) => {
    setListInputs({ ...listInputs, [index]: value }); // Update the listInputs state for the corresponding index
  };
  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  const handleDeleteList = (todoIndex, listIndex) => {
    const newTodos = [...todos];

    newTodos[todoIndex].lists.splice(listIndex, 1);

    setTodos(newTodos);
  };
  
  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="container">
        <input
          type="text"
          className="heading-input"
          placeholder="Enter heading"
          onChange={(e) => {
            setHeadingInput(e.target.value);
          }}
          value={headingInput}
        />
        <button className="add-list-button" onClick={handleAddTodo}>
          Add Heading
        </button>
        </div>
      </div>
      <div className="todo_main">
        {todos.map((todo, index) => (
          <div key={index} className="todo-card">
            <div className="heading_todo">
              <h3>{todo.heading}</h3>
              <button
                className="delete-button-heading"
                onClick={handleDeleteTodo}
              >
                Delete List{" "}
              </button>
            </div>
            <div className="deletelist">
              <ul>
                {todo.lists.map((list, listIndex) => (
                  <li key={listIndex} className="todo_inside_list">
                    <p>{list}</p>
                    <button
                      className="delete-button-heading"
                      onClick={() => handleDeleteList(index, listIndex)}
                    >
                      Delete Listitem{" "}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="add_list">
              <input
                type="text"
                className="list-input"
                placeholder="Add List"
                value={listInputs[index] || ""}
                onChange={(e) => handleListInputChange(index, e.target.value)}
              />
              <button
                className="add-list-button"
                onClick={() => handleAddList(index)}
              >
                Add List
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
