import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux";

import { addTask } from "../../redux/reducers/reducer";
import './modal.css'
const Modal = ({ taskData, category, changeTable, setChangeTable, toggle, setToggle}) => {

  const [task, setTask] = useState('')

  useEffect(() => {
      changeTable !== "" && changeTable !== "adding"
      ? setTask(taskData[changeTable])
      : setTask({id: +new Date(), Created: new Date(parseInt(+ new Date())).toLocaleDateString(), Name: "", Content: "", Category: "Task", Dates: ""})
  },[changeTable])

  const dispatch = useDispatch()
  const handleSubmit = (e, task) => {
    e.preventDefault()
    dispatch(addTask(task))
    setChangeTable('')
    setToggle(!toggle)
  }
  const handleChange = (e) => {
    setTask({...task, [e.target.name]: e.target.value})
  }
  return (
    <div className={(changeTable === '' ? "modal" : "modal active")}>
        <form className="modal__form">
          <input required placeholder="Name" name="Name" value={task.Name} onChange={(e) => {handleChange(e)}} className="modal__form__input" />
          <select name="Category" value={task.Category} onChange={(e) => {handleChange(e)}}>
            {category.map((cat)=>{
              return (
                <option key={cat} name={cat} >{cat}</option>
              )
            })}
          </select>
          <textarea name="Content" placeholder="Content" value={task.Content} className="modal__form__input" onChange={(e) => {handleChange(e)}}/>
          <div className="modal__form__buttonfield">
            <button onClick={(e) => {handleSubmit(e, task)}}>{changeTable !== '' && changeTable !== 'adding' ? "Save" : "Add"}</button>
            <button onClick={()=>{setChangeTable('')}} >Close</button>
          </div>
        </form>
    </div>
  );
}

export default Modal