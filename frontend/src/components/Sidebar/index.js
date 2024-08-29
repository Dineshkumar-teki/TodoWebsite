import TabItem from '../TabItem'
import './index.css'

const taskTypes = [
    {id:'WORK',type:'work', color:'#D2CEFF', active: false},
    {id:'STUDY',type:'study', color:'#D1E5F7', active: false},
    {id:'ENTERTAINMENT',type:'entertainment', color:'#FFCECE', active: false},
    {id:'FAMILY',type:'family', color:'#DAF2D6', active: false}
]

const Sidebar = props => {
    const {selectTabItem, activeTabItems} = props
    return(
        <ul className='tabItems'>
            {taskTypes.map(eachTask => (
                <TabItem key={eachTask.id} eachTask={eachTask} activeTabItems={activeTabItems} selectTabItem={selectTabItem} />
            ))}
        </ul>
    )
}

export default Sidebar