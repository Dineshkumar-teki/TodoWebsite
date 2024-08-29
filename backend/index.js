import express, { request, response } from "express";
import { PORT, MongoDbURL } from "./config.js";
import mongoose from "mongoose";
import todoRoutes from "./routes/todoRoutes.js";
import cors from "cors";

const app = express();

// Allow all origins(cors Policy)
app.use(cors());

//Middleware for parsing request body
app.use(express.json());

// Route for Default Url Http request
app.get("/", (request, response) => {
  console.log(request.body);
  return response.status(200).send("Welcome to Todo App");
});

app.use("/todos", todoRoutes);

// Connection to database
mongoose
  .connect(MongoDbURL)
  .then(() => {
    console.log("App connected to the Database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
