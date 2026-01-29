import React, { useState } from "react";

function Manager({ data, setData }) {
  const [text, setText] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("task", text);
    for (let [key, value] of formdata.entries()) {
      console.log(key, value);
    }

    const res = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      //   //   headers: { "Content-Type": "application/json" },
      //   //   body: JSON.stringify({ task: text }),
      body: formdata,
    });
    const newTask = await res.json();
    setData((prev) => [...prev, newTask]);
    setText("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task">
          <input
            type="text"
            name="task"
            id="task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <button type="submit">Add Task</button>
      </form>
      {data.map((t) => (
        <div key={t._id}>{t.task}</div>
      ))}
    </div>
  );
}

export default Manager;
