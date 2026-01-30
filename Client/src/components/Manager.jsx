import React, { useState } from "react";

function Manager({ data, handleDelete, handleAdd }) {
  const [text, setText] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAdd(text);
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
      <main>
        {data.map((t) => (
          <div key={t._id} className="single_task">
            <label htmlFor="checked_task">
              <input type="checkbox" name="checked_task" id="checked_task" />
              <p>{t.task}</p>
            </label>
            <button onClick={() => handleEdit(t._id)}>Edit</button>
            <button onClick={() => handleDelete(t._id)}>Delete</button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Manager;
