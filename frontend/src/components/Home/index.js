import { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import TaskCard from "../TaskCard";
import TodoContext from "../../context/TodoContext";
import { InfinitySpin } from "react-loader-spinner";
import "./index.css";

const Home = () => {
  const [hideDoneTasks, setHideDoneTasks] = useState(false);
  const [activeTabItems, setActiveTabs] = useState([]);

  const selectTabItem = (id) => {
    if (activeTabItems.includes(id)) {
      const updatedActiveTabItems = activeTabItems.filter(
        (eachTab) => eachTab !== id
      );
      setActiveTabs([...updatedActiveTabItems]);
    } else {
      setActiveTabs([...activeTabItems, id]);
    }
  };

  const onChangeHideDoneTasks = () => {
    setHideDoneTasks(!hideDoneTasks);
  };

  const displayTaskList = (todoList) => {
    const filteredList = todoList.filter((eachTask) => {
      const activeTabItemsSet = new Set(activeTabItems);
      const typeOfTaskSet = new Set(eachTask.tags);
      return activeTabItemsSet.isSubsetOf(typeOfTaskSet);
    });
    if (hideDoneTasks) {
      const updatedTodoList = filteredList.filter(
        (eachTask) => !eachTask.status
      );
      return updatedTodoList.map((eachTask) => (
        <TaskCard key={eachTask._id} eachTask={eachTask} />
      ));
    }

    return filteredList.map((eachTask) => (
      <TaskCard key={eachTask._id} eachTask={eachTask} />
    ));
  };

  return (
    <TodoContext.Consumer>
      {(props) => {
        const { todoList, loader } = props;
        console.log(loader);
        return (
          <>
            <Navbar />
            <section className="homePage">
              <aside>
                <Sidebar
                  selectTabItem={selectTabItem}
                  activeTabItems={activeTabItems}
                />
                <div className="hideTasksCheckbox">
                  <input
                    id="hideDoneTasks"
                    type="checkbox"
                    onChange={onChangeHideDoneTasks}
                  />
                  <label
                    htmlFor="hideDoneTasks"
                    className={hideDoneTasks ? "hidetasks" : null}
                  >
                    Hide Done Tasks
                  </label>
                </div>
              </aside>
              <section className="taskSection">
                {loader ? (
                  <div className="loader">
                    <InfinitySpin
                      visible={true}
                      width="200"
                      color="blue"
                      ariaLabel="infinity-spin-loading"
                    />
                  </div>
                ) : todoList.length ? (
                  <ul className="tasks">{displayTaskList(todoList)}</ul>
                ) : (
                  <div className="emptyTodoList">
                    <img
                      src="https://img.freepik.com/free-vector/tiny-man-woman-standing-near-list-couple-ticking-off-items-check-list-flat-vector-illustration-daily-routine-busy-lifestyle-concept-banner-website-design-landing-web-page_74855-22067.jpg?w=740&t=st=1724776178~exp=1724776778~hmac=95d266aa99f7f5b703f43501eb7d88e9434e59e79c71b302a9ec15a4041d49cb"
                      alt="emptyTodoList"
                    />
                    <p>
                      Your to-do list is clear and ready for new tasks. Let’s
                      get started on something great!
                    </p>
                  </div>
                )}
              </section>
            </section>
          </>
        );
      }}
    </TodoContext.Consumer>
  );
};

export default Home;
