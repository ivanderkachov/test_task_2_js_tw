import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux";

import { addTask } from "../../redux/reducers/reducer";
import './modal.css'
const Modal = ({ taskData, category, changeTable, setChangeTable, toggle, setToggle}) => {

  const [task, setTask] = useState('')

  useEffect(() => {
      changeTable !== "" && changeTable !== "adding"
      ? setTask(taskData[changeTable])
      : setTask({id: +new Date(), Name: "", Created: new Date(parseInt(+ new Date())).toLocaleDateString(), Category: "Task", Content: "",  Dates: ""})
  },[changeTable])

  const dispatch = useDispatch()

  const handleSubmit = (e, task) => {
    e.preventDefault()
    if (task.Name === '' || task.Content === '') {
      alert("Missing data")
    } else {
      dispatch(addTask(task));
      setChangeTable("");
      setToggle(!toggle);
    }

  }
  const handleChange = (e) => {
    setTask({...task, [e.target.name]: e.target.value})
  }
  return (
    <div className={(changeTable === '' ? "modal" : "modal active")}>
        <div className="p-6 bg-white rounded-lg flex flex-col justify-between min-w-150 min-h-125">
          <input className="m-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Name" name="Name" maxlength="20" value={task.Name} onChange={(e) => {handleChange(e)}} />
          <select className="m-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="Category" value={task.Category} onChange={(e) => {handleChange(e)}}>
            {category.map((cat)=>{
              return (
                <option key={cat} name={cat} >{cat}</option>
              )
            })}
          </select>
          <textarea name="Content" placeholder="Content" value={task.Content} className="m-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => {handleChange(e)}}/>
          <div className="flex justify-around ">
            <button type="button" className="cursor-pointer items-center m-2 px-6 py-2 text-white transition bg-slate-400 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-slate-500 hover:bg-slate-500" onClick={(e) => {handleSubmit(e, task)}}>{changeTable !== '' && changeTable !== 'adding' ? "Save" : "Add"}</button>
            <button type="button" className="cursor-pointer items-center m-2 px-6 py-2 text-white transition bg-slate-400 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-slate-500 hover:bg-slate-500" onClick={()=>{setChangeTable('')}} >Close</button>
          </div>
        </div>
    </div>
  );
}

export default Modal