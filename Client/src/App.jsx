import React, { useEffect, useState } from "react";
import Manager from "./components/Manager";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => setData(data.tasks))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Manager data={data} setData={setData} />
    </div>
  );
}

export default App;
