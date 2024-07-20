import React, { useState } from "react";
import style from "./Todo.module.css";
import classnames from "classnames";
import Add from "../assets/add.svg";
// import DeleteAll from "../assets/deleteAll.png";
import Edit from "../assets/edit.svg";
import Save from "../assets/save.svg";
import Remove from "../assets/remove.svg";

const Todo = () => {
  const [input, setInput] = useState("");
  const [item, setItem] = useState([]);
  const [edit, setEdit] = useState("");
  const [isEdit, setIsEdit] = useState();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleEdit = (e) => {
    console.log("e", e);
    setEdit(e.target.value);
  };

  const editing = (index) => {
    console.log("ind", index);
    setIsEdit(index);
    setEdit(item[index]);
  };

  const saveEdit = (index) => {
    const updateValue = item.find((e, i) => {
      return i === index;
    });

    const updateItem = item.map((e, i) => {
      return i === index ? edit : e;
    });

    setItem(updateItem);
    setIsEdit(null);
    setEdit("");
  };
  const add = () => {
    if (input) {
      setItem([...item, input]);
      setInput("");
    }
  };
  const deleteAll = () => {
    setItem([]);
  };
  const deleteItem = (index) => {
    const filteredData = item.filter((e, i) => {
      return i !== index;
    });
    setItem(filteredData);
  };

  return (
    <div className={style.body}>
         <div className={classnames("container", "col-md-4", style.container)}>
      <h1 className="my-4 text-center">Todo App</h1>
      <div className="d-flex justify-content-center">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          className={classnames(style.inputAdd)}
        />

        <img src={Add} alt="" onClick={() => add()} />
        <button onClick={() => deleteAll()}>Deleet All</button>
      </div>

      <ul>
        {item.map((e, i) => (
          <li key={i}>
            {isEdit === i ? (
              <>
                <input type="text" value={edit} onChange={handleEdit} />

                <img
                  src={Save}
                  onClick={() => {
                    saveEdit(i);
                  }}
                />
              </>
            ) : (
              <>
                {e}
                <div className="actions">
                  <img src={Edit} onClick={() => editing(i)} />
                  <img src={Remove} onClick={() => deleteItem(i)} />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
    </div>
   
  );
};

export default Todo;
