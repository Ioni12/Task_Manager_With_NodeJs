const express = require("express");
const Task = require("../models/Task");

const router = new express.Router();

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    res.render("tasks/index", { tasks, title: "all tasks" });
  } catch (error) {
    res.status(500).render("error", { error });
  }
});

router.get("/tasks/new", (req, res) => {
  res.render("tasks/new", { title: "create new task" });
});

router.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.redirect("/tasks");
  } catch (error) {
    res.render("tasks/new", {
      title: "create new task",
      error: "error creating task",
    });
  }
});

router.get("tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).render("error", { error: "task not found" });
    }
    res.render("tasks/show", { task, title: task.title });
  } catch (error) {
    res.status(500).render("error", { error });
  }
});

router.get("/tasks/:id/edit", async (req, res) => {
  try {
    const task = await Task.findById(res.params.id);
    if (!task) {
      return res.status(404).render("error", { error: "task not found" });
    }
    res.render("tasks/edit", { task, title: `Edit ${task.title}` });
  } catch (error) {
    res.status(500).render("error", { error });
  }
});

router.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).render("error", { error: "task not found" });
    }
    res.redirect(`/tasks/${task._id}`);
  } catch (error) {
    res.render("tasks/edit", {
      task: { ...req.body, _id: req.params.id },
      title: "Edit Task",
      error: "Error Updating Task",
    });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).render("error", { error: "Task not found" });
    }
    res.redirect("/tasks");
  } catch (error) {
    res.status(500).render("error", { error });
  }
});

module.exports = router;
