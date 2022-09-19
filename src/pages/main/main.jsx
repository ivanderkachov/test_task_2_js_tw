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
      <div className="worksheet">
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
            <div key={table[0]}>No Data</div>
          );
        })}
      </div>
    </>
  );
};

export default Main;
