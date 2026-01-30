import React, { useEffect, useState } from "react";
import Manager from "./components/Manager";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => setData(data.tasks))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setData(data.filter((data) => data._id !== id));
    }
  };

  const handleAdd = async (taskText) => {
    const formdata = new FormData();
    formdata.append("task", taskText);

    const res = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: formdata,
    });

    if (res.ok) {
      const newTask = await res.json();
      setData([...data, newTask]); // Update parent state
    }
  };

  return (
    <div className="container">
      <Manager data={data} handleDelete={handleDelete} handleAdd={handleAdd} />
    </div>
  );
}

export default App;
