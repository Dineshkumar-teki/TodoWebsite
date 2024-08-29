import React from "react";

const TodoContext = React.createContext({
    todoList: [],
    loader: false,
    handlePostRequest: () => {},
    handleUpdateRequest: () => {},
    statusUpdateRequest: () => {},
    handleDeleteRequest: () => {},
})

export default TodoContext