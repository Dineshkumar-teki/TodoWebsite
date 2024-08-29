import { useState } from 'react'
import TodoContext from '../../context/TodoContext'
import './index.css'

const taskTypes = [
    {id:'WORK',type:'work', color:'#D2CEFF', active: false},
    {id:'STUDY',type:'study', color:'#D1E5F7', active: false},
    {id:'ENTERTAINMENT',type:'entertainment', color:'#FFCECE', active: false},
    {id:'FAMILY',type:'family', color:'#DAF2D6', active: false}
]

const AddTodoItem = props => {
    const {close} = props
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState([])
    const onChangeTitle = event => {
        setTitle(event.target.value)
    }

    const onChangeDescription = event => {
        setDescription(event.target.value)
    }

    return (
        <TodoContext.Consumer>
            {
                props => {
                    const {handlePostRequest} = props
                    const onSubmitForm = event => {
                        event.preventDefault()
                        const todo = {
                            title,
                            description,
                            tags,
                            status:false
                        }
                        handlePostRequest(todo)
                        setTitle('')
                        setDescription('')
                        setTags([])
                        close()
                    }
                    return (
                            <section className='AddTodoCard'>
                            <form onSubmit={onSubmitForm} className='addTodoForm'>
                                <div className='btnContainer'>
                                    <button type='button' className='cancelBtn btn' onClick={() => close()} >Cancel</button>
                                    <button type="submit" className='addBtn btn' >Add</button>
                                </div>
                                    <label htmlFor="title" >Title</label>
                                    <input id="title" placeholder='add a title ...' value={title} onChange={onChangeTitle} />
                                    <label htmlFor="description" >Description</label>
                                    <textarea rows={5} id="description" placeholder='add a description ...' value={description} onChange={onChangeDescription} />
                                    <h3>Tags</h3>
                                    <ul className='tagsList'>
                                        {
                                            taskTypes.map(eachTag => {
                                                const onClickTag = () => {
                                                    if (tags.includes(eachTag.id)){
                                                        const updatedTags = tags.filter(eachId => eachId !== eachTag.id)
                                                        setTags(updatedTags)
                                                    }else{
                                                        setTags([...tags, eachTag.id])
                                                    }
                                                }
                                                return (
                                                    <li key={eachTag.id} className='eachTag' >
                                                        <button type="button" className={`eachTagBtn ${tags.includes(eachTag.id)? 'activeTab':null}`} onClick={onClickTag} >
                                                            <span style={{backgroundColor:eachTag.color}}></span>
                                                            <p>{eachTag.type}</p>
                                                        </button>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                            </form>
                            </section>
                    )
                }
            }
        </TodoContext.Consumer>

    )
}

export default AddTodoItem