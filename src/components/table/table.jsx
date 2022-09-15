import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTaskToArchive, unarchiveTask, deleteTask} from "../../redux/reducers/reducer";
import './table.css'

const Table = ({ type, table, setToggle, toggle }) => {
  const dispatch = useDispatch()
  const [editToggle, setEditToggle] = useState(false)

  const handleButton = (value, item) => {
    console.log(value, item)
    if (value === 'Archive') {
      dispatch(addTaskToArchive(item))
    }
    if (value === "Unarchive") {
      dispatch(unarchiveTask(item))
    }
    if (value === 'Delete') {
      dispatch(deleteTask(item))
    }
    setToggle(!toggle);
  }

  let keysOnly = Object.keys(Object.values(table)[0]).filter((key) => key !== 'id')

  if (type === 'notes' || type === 'archive') {
    keysOnly.push('Actions')
  }
  console.log(keysOnly)
  return (
    <div>
      <table className="table">
        <thead className="table__header">
          <tr>
            {keysOnly.map((key) => {
              return (
                  <th key={`${type}+${key}`}>{key}</th>
              );
            })}
          </tr>
        </thead>
        <tbody className="table__body">
            {Object.values(table).map((task, index) => {
              return (
                <tr key={`${type}+${task.id}`}>
                  {keysOnly.map((key) => {
                    if (key !== 'Actions') {
                      return <td key={`${type}+${task.id}+${key}`}>{task[key]}</td>;
                    } else {
                      return type === "notes" ? (
                        <td className="table__body__buttons" key={`${type}+${task.id}+${key}`}>
                          <button type="button" name="Edit" onClick={()=>{setEditToggle(!editToggle)}}>Edit</button>
                          <button type="button" name="Delete" onClick={(e)=>{handleButton(e.target.name, task.id)}}>Delete</button>
                          <button type="button" name="Archive" onClick={(e)=>{handleButton(e.target.name, task.id)}}>Archive</button>
                        </td>
                      ) : (
                        <td key={`${type}+${task.id}+${key}`}>
                          <button type="button" name="Unarchive" onClick={(e)=>{handleButton(e.target.name, task.id)}}>Unarchive</button>
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Table