import React from "react";
import { useDispatch } from "react-redux";

import { addTaskToArchive, unarchiveTask, deleteTask} from "../../redux/reducers/reducer";
import './table.css'

const Table = ({ type, table, setToggle, toggle, changeTable, setChangeTable }) => {
  const dispatch = useDispatch()

  const handleButton = (value, item) => {
    if (value === 'Archive') {
      dispatch(addTaskToArchive(item))
    }
    if (value === "Unarchive") {
      dispatch(unarchiveTask(item))
    }
    if (value === 'Delete') {
      dispatch(deleteTask(item))
    }
    if (value === 'Edit') {
      setChangeTable(item);
    }
    setToggle(!toggle);
  }

  let keysOnly = Object.keys(Object.values(table)[0]).filter((key) => key !== 'id')

  if (type === 'notes' || type === 'archive') {
    keysOnly.push('Actions')
  }

  return (
    <div>
      <table className="border-separate border-spacing-y-2 w-10/12 text-left">
        <thead className="text-white bg-slate-400">
          <tr>
            {keysOnly.map((key) => {
              return (
                  <th className="px-2 py-5 m-2 h-30 w-20" key={`${type}+${key}`}>{key}</th>
              );
            })}
          </tr>
        </thead>
        <tbody className="bg-slate-300">
            {Object.values(table).map((task, index) => {
              return (
                <tr key={type!=='summary' ? `${type}+${task.id}`: `${type} table ${index}`}>
                  {keysOnly.map((key) => {
                    if (key !== 'Actions') {
                      return <td className="px-2 py-5 m-2 h-30 w-20 text-gray-500" key={`${type}+${task.id}+${key}`}>{task[key]}</td>;
                    } else {
                      return type === "notes" ? (
                        <td className="px-2 py-5 m-2 h-30 w-20" key={`${type}+${task.id}+${key}`}>
                          <button type="button" className="cursor-pointer items-center m-2 px-6 py-2 text-white transition bg-slate-400 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-slate-500 hover:bg-slate-500" name="Edit" onClick={(e)=>{handleButton(e.target.name, task.id)}}>Edit</button>
                          <button type="button" className="cursor-pointer items-center m-2 px-6 py-2 text-white transition bg-slate-400 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-slate-500 hover:bg-slate-500" name="Delete" onClick={(e)=>{handleButton(e.target.name, task.id)}}>Delete</button>
                          <button type="button" className="cursor-pointer items-center m-2 px-6 py-2 text-white transition bg-slate-400 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-slate-500 hover:bg-slate-500" name="Archive" onClick={(e)=>{handleButton(e.target.name, task.id)}}>Archive</button>
                        </td>
                      ) : (
                        <td className="px-2 py-5 m-2 h-30 w-20" key={`${type}+${task.id}+${key}`}>
                          <button type="button" className="cursor-pointer text-white m-2 p-3 bg-slate-400 rounded border-solid" name="Unarchive" onClick={(e)=>{handleButton(e.target.name, task.id)}}>Unarchive</button>
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      {type==='notes'&& <div className="flex w-10/12 justify-end"><button className="cursor-pointer items-center m-2 px-6 py-2 text-white transition bg-slate-400 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-slate-500 hover:bg-slate-500" name="Add" onClick={() => {setChangeTable('adding')}}> + Add task</button></div>}
    </div>
  );
}

export default Table