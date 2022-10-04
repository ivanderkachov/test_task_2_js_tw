import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { summary } from "../../redux/reducers/reducer";
import Table from "../../components/table/table";
import Modal from "../../components/modal/modal";
import "./main.css";

const Main = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [changeTable, setChangeTable] = useState("");

  useEffect(() => {
    dispatch(summary());
  }, [toggle]);

  const { taskData, taskDataArchive, taskDataSummary, category } = useSelector(
    (store) => store.reducer
  );
  const tables = [
    ["notes", taskData],
    ["archive", taskDataArchive],
    ["summary", taskDataSummary],
  ];
  return (
    <>
      <Modal
        taskData={taskData}
        category={category}
        changeTable={changeTable}
        setChangeTable={setChangeTable}
        toggle={toggle}
        setToggle={setToggle}
      />
      <div className="m-10">
        {tables.map((table) => {
          return Object.keys(table[1]).length > 0 ? (
            <div key={table[0]}>
              <Table
                type={table[0]}
                table={table[1]}
                toggle={toggle}
                setToggle={setToggle}
                changeTable={changeTable}
                setChangeTable={setChangeTable}
              />
            </div>
          ) : (
            <div key={`${table[0]} field`}>
            <div className="w-10/12 text-white bg-slate-400 mt-5 font-bold"    key={`${table[0]} nodata`}>No Data in {table[0]}</div>
             {table[0]==='notes'&&
              <div key={`${table[0]} buttondiv`} className="tableAddButton">
               <button className="cursor-pointer items-center m-2 px-6 py-2 text-white transition bg-slate-400 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-slate-500 hover:bg-slate-500" key={`${table[0]} button`} name="Add" onClick={() => {setChangeTable('adding')}}> + Add task</button>
               </div>}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Main;
