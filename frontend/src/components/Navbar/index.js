import { FaPlus } from "react-icons/fa";
import './index.css'
import Popup from "reactjs-popup";
import AddTodoItem from "../AddTodoItem";

const Navbar = () => {
    return (
        <nav>
            <h1>todo</h1>
            <Popup
            modal
            trigger = {
                <button>
                    <FaPlus className="plusIcon" />
                </button>
            }
            >
                {
                    close => (
                        <AddTodoItem close={close} />
                    )
                }
            </Popup>
            
        </nav>
    )
    
}

export default Navbar