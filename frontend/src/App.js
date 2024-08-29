import Home from "./components/Home";
import TodoContext from "./context/TodoContext";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";


let handleGetRequest;

function App() {
  const [todoList, setTodo] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    handleGetRequest = () => {
      setLoader(true)
      axios
        .get("http://localhost:5444/todos")
        .then((response) => {
          setLoader(false)
          setTodo(response.data.data);
        })
        .catch((error) => {
          setLoader(false)
          console.log(error.message);
        });
    };
    handleGetRequest();
  }, []);

  const handlePostRequest = async (todo) => {
    await axios
      .post("http://localhost:5444/todos", todo)
      .then((response) => {
        enqueueSnackbar("Todo Created Successfully", { variant: "success" });
      })
      .catch((error) => {
        enqueueSnackbar("Error! Check Console", { variant: "failure" });
        console.log(error.data.message);
      });
    handleGetRequest();
  };

  const handleUpdateRequest = async (id, todo) => {
    await axios
      .put(`http://localhost:5444/todos/${id}`, todo)
      .then((response) => {
        enqueueSnackbar("Todo Updated Successfully", { variant: "success" });
      })
      .catch((error) => {
        enqueueSnackbar("Error! Check Console", { variant: "failure" });
        console.log(error.data.message);
      });
    handleGetRequest();
  };

  const statusUpdateRequest = async (id, todo) => {
    await axios
      .put(`http://localhost:5444/todos/${id}`, todo)
      .then((response) => {
        enqueueSnackbar("Status Updated Successfully", { variant: "success" });
      })
      .catch((error) => {
        enqueueSnackbar("Error! Check Console", { variant: "failure" });
        console.log(error.data.message);
      });
    handleGetRequest();
  };

  const handleDeleteRequest = async (id) => {
    await axios
      .delete(`http://localhost:5444/todos/${id}`)
      .then((response) => {
        enqueueSnackbar("Todo Deleted Successfully", { variant: "success" });
      })
      .catch((error) => {
        enqueueSnackbar("Error! Check Console", { variant: "failure" });
        console.log(error.data.message);
      });
    handleGetRequest();
  };

  return (
    <TodoContext.Provider
      value={{
        todoList,
        loader,
        handlePostRequest: handlePostRequest,
        handleUpdateRequest: handleUpdateRequest,
        handleDeleteRequest: handleDeleteRequest,
        statusUpdateRequest: statusUpdateRequest,
      }}
    >
      <Home />
    </TodoContext.Provider>
  );
}

export default App;
