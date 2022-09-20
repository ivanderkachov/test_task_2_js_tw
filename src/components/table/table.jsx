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
                <tr key={type!=='summary' ? `${type}+${task.id}`: `${type} table ${index}`}>
                  {keysOnly.map((key) => {
                    if (key !== 'Actions') {
                      return <td className={`table__body__${key}`} key={`${type}+${task.id}+${key}`}>{task[key]}</td>;
                    } else {
                      return type === "notes" ? (
                        <td className="table__body__buttons" key={`${type}+${task.id}+${key}`}>
                          <button type="button" name="Edit" onClick={(e)=>{handleButton(e.target.name, task.id)}}>Edit</button>
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
      {type==='notes'&& <div className="tableAddButton"><button name="Add" onClick={() => {setChangeTable('adding')}}> + Add task</button></div>}
    </div>
  );
}

export default Table