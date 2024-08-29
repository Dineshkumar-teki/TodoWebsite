import { useState } from 'react'
import TodoContext from '../../context/TodoContext'
import './index.css'

const taskTypes = [
    {id:'WORK',type:'work', color:'#D2CEFF', active: false},
    {id:'STUDY',type:'study', color:'#D1E5F7', active: false},
    {id:'ENTERTAINMENT',type:'entertainment', color:'#FFCECE', active: false},
    {id:'FAMILY',type:'family', color:'#DAF2D6', active: false}
]

const EditTodoItem = props => {
    const {close, todoItem, onClickThreeDots} = props
    const {_id, title, description, tags, status} = todoItem

    const [newTitle, setTitle] = useState(title)
    const [newDescription, setDescription] = useState(description)
    const [newTags, setTags] = useState(tags)

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
                    const {handleUpdateRequest} = props
                    const onSubmitForm = event => {
                        event.preventDefault()
                        const todo = {
                            _id,
                            title: newTitle,
                            description: newDescription,
                            tags: newTags,
                            status
                        }
                        handleUpdateRequest(_id, todo)
                        setTitle('')
                        setDescription('')
                        setTags([])
                        close()
                        onClickThreeDots()
                    }

                    const onClickCancelBtn = () => {
                        close()
                        onClickThreeDots()
                    }

                    return (
                            <section className='AddTodoCard'>
                            <form onSubmit={onSubmitForm} className='addTodoForm'>
                                <div className='btnContainer'>
                                    <button type='button' className='cancelBtn btn' onClick={onClickCancelBtn} >Cancel</button>
                                    <button type="submit" className='addBtn btn' >Save</button>
                                </div>
                                    <label htmlFor="title" >Title</label>
                                    <input id="title" placeholder='add a title ...' value={newTitle} onChange={onChangeTitle} />
                                    <label htmlFor="description" >Description</label>
                                    <textarea rows={5} id="description" placeholder='add a description ...' value={newDescription} onChange={onChangeDescription} />
                                    <h3>Tags</h3>
                                    <ul className='tagsList'>
                                        {
                                            taskTypes.map(eachTag => {
                                                const onClickTag = () => {
                                                    if (newTags.includes(eachTag.id)){
                                                        const updatedTags = newTags.filter(eachId => eachId !== eachTag.id)
                                                        setTags(updatedTags)
                                                    }else{
                                                        setTags([...newTags, eachTag.id])
                                                    }
                                                }
                                                return (
                                                    <li key={eachTag.id} className='eachTag' >
                                                        <button type="button" className={`eachTagBtn ${newTags.includes(eachTag.id)? 'activeTab':null}`} onClick={onClickTag} >
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

export default EditTodoItem