import express from "express";
import { Todo } from "../modals/todomodal.js";

const router = express.Router();

// Route for Save a new Todo
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.description ||
      !request.body.tags.length
    ) {
      return response.status(400).send({
        message: "send all required fields: title, description, tags",
      });
    }
    const newTodo = {
      title: request.body.title,
      description: request.body.description,
      tags: request.body.tags,
      status: request.body.status,
    };
    const todo = await Todo.create(newTodo);
    return response.status(201).send(todo);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all todos
router.get("/", async (request, response) => {
  try {
    const todos = await Todo.find({});
    return response.status(200).send({ count: todos.length, data: todos });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to update a todo
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.description ||
      !request.body.tags.length
    ) {
      return response.status(400).send({
        message: "send all required fields: title, description, tags",
      });
    }

    const { id } = request.params;
    const result = await Todo.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).send({ message: "Todo Item Not Found" });
    }
    return response
      .status(200)
      .send({ message: "Todo Item updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to delete a todo
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Todo.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).send({ message: "Todo Item Not Found" });
    }
    return response
      .status(200)
      .send({ message: "Todo Item Deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
