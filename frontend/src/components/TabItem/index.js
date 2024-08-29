import './index.css'

const TabItem = tabItem => {
    const {eachTask, selectTabItem, activeTabItems} = tabItem
    const {id, type, color} = eachTask
    const style = {
        backgroundColor: color
    }
    const activeTabItem = activeTabItems.includes(id) ? 'activeTab' : null

    const onClickTab = () => {
        selectTabItem(id)
    }

    return (
        <li className={`tabItem ${activeTabItem} `} >
            <button className='tabItemBtn' onClick={onClickTab} >
                <span style={style}></span>
                <p>{type}</p>
            </button>
        </li>
    )
}

export default TabItem