import React, { useState, useEffect }from "react";
import { useSelector, useDispatch } from "react-redux";

import { summary } from "../../redux/reducers/reducer";
import Table from "../../components/table/table";
import './main.css'

const Main = () => {

  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    dispatch(summary())
  },[toggle])

  const { taskData, taskDataArchive, taskDataSummary } = useSelector((store) => store.reducer)
  const tables= [['notes', taskData], ['archive',taskDataArchive], ['summary',taskDataSummary]]
  return (
    <div className="worksheet">
      {tables.map((table) => {
        return (
          Object.keys(table[1]).length > 0
          ?
          <div key={table[0]}>
            <Table type={table[0]} table={table[1]} setToggle={setToggle} toggle={toggle} />
          </div>
          : <div key={table[0]}>No Data</div>
        );
      })}
    </div>
  );
}

export default Main