import { BsThreeDots } from "react-icons/bs";
import "./index.css";
import { useState } from "react";
import TodoContext from "../../context/TodoContext";
import Popup from "reactjs-popup";
import EditTodoItem from "../EditTodoItem";

const taskTypes = [
  { id: "WORK", type: "work", color: "#D2CEFF", active: false },
  { id: "STUDY", type: "study", color: "#D1E5F7", active: false },
  {
    id: "ENTERTAINMENT",
    type: "entertainment",
    color: "#FFCECE",
    active: false,
  },
  { id: "FAMILY", type: "family", color: "#DAF2D6", active: false },
];

const TaskCard = (props) => {
  const [displayEditAndDeleteCard, setDisplayEditAndDeleteCard] =
    useState(false);

  const { eachTask } = props;

  const { _id, title, description, tags, status } = eachTask;
  const typeOfTasks = taskTypes.filter((eachTask) =>
    tags.includes(eachTask.id)
  );

  const eAndDCard = displayEditAndDeleteCard ? null : "hideCard";
  const isTaskDone = status ? "taskDone" : null;

  return (
    <TodoContext.Consumer>
      {(props) => {
        const { statusUpdateRequest, handleDeleteRequest } = props;
        const onClickThreeDots = () => {
          setDisplayEditAndDeleteCard(!displayEditAndDeleteCard);
        };

        const onChangeTaskStatus = () => {
          const todo = { _id, title, description, tags, status: !status };
          statusUpdateRequest(_id, todo);
        };

        const onTodoDelete = () => {
          setDisplayEditAndDeleteCard(!displayEditAndDeleteCard);
          handleDeleteRequest(_id);
        };

        return (
          <li className="taskCard">
            <div className="titleCard">
              <h1 className={`${isTaskDone}`}>{title}</h1>
              <button type="button" onClick={onClickThreeDots}>
                <BsThreeDots />
              </button>
              <div className={`editAndDelete ${eAndDCard}`}>
                <Popup modal trigger={<button type="button">Edit...</button>}>
                  {(close) => (
                    <EditTodoItem
                      todoItem={eachTask}
                      close={close}
                      onClickThreeDots={onClickThreeDots}
                    />
                  )}
                </Popup>
                <hr />
                <button type="button" onClick={onTodoDelete}>
                  Delete
                </button>
              </div>
            </div>
            <p className={`${isTaskDone}`}>{description}</p>
            <div className="taskTypeAndTaskStatus">
              <ul className="taskSpecificTypes">
                {typeOfTasks.map((eachTask) => (
                  <span
                    key={eachTask.id}
                    style={{ backgroundColor: eachTask.color }}
                  ></span>
                ))}
              </ul>
              <div className="taskStatus">
                <input
                  type="checkbox"
                  id={_id}
                  checked={status}
                  onChange={onChangeTaskStatus}
                />
                <label htmlFor={_id} style={{ color: status ? "black" : "" }}>
                  Done
                </label>
              </div>
            </div>
          </li>
        );
      }}
    </TodoContext.Consumer>
  );
};

export default TaskCard;
