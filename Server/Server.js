const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const app = express();
const upload = multer();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/tasks")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Task needed"],
      unique: true,
      minlength: [10, "Task minimum 10 characters"],
      maxlength: [25, "Task maximun 25 characters"],
    },
    isCompleted: { type: Boolean, default: false },
    isEdit: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Tasks = mongoose.model("tasks", taskSchema);

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.status(200).json({ success: true, tasks: tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to load" });
  }
});

app.post("/tasks", upload.none(), async (req, res) => {
  try {
    const { task } = await req.body;
    const t = await Tasks.create({ task: task });
    res.status(201).json({ success: true, message: "User Created" });
  } catch (error) {
    console.log(error);
  }
});

const server = app.listen(3000, (req, res) => {
  console.log("Server Started on http://localhost:3000");
});

const GracefulShutDown = () => {
  console.log("Server Stopped");
  server.close(() => {
    console.log("Server Stopped Gracefully");
    process.exit(0);
  });
};

process.on("SIGINT", GracefulShutDown);
