import { useSelector } from "react-redux";

const ADD_TASK_TO_ARCHIVE = "ADD_TASK_TO_ARCHIVE";
const UNARCHIVE_TASK = "UNARCHIVE_TASK";
const DELETE_TASK = "DELETE_TASK";
const ADD_TASK = "ADD_TASK";
const SUMMARY = "SUMMARY"

const category = ["Task", "Random thoughts", "Idea"];

const initialState = {
  taskData: {
    1662907031392: {
      id: 1662907031392,
      Name: "Shopping list",
      Created: new Date(1662907031392).toLocaleDateString(),
      Category: "Task",
      Content: "Tomatoes, bread",
      Dates: "",
    },
    1662907031393: {
      id: 1662907031393,
      Name: "The theory",
      Created: new Date(1662907031393).toLocaleDateString(),
      Category: "Random thoughts",
      Content: "The theory ...",
      Dates: "",
    },
    1662907031394: {
      id: 1662907031394,
      Name: "New feature",
      Created: new Date(1662907031394).toLocaleDateString(),
      Category: "Idea",
      Content: "Implement new feature",
      Dates: "",
    },
  },
  taskDataArchive: {},
  taskDataSummary: "",
  category
};

function getDates(str) {
  const cond = /\s|\n/;
  if (str.length > 0) {
    const arr = str
      .split(cond)
      .map((it) => +new Date(it))
      .filter((it) => typeof it === "number" && it)
      .sort()
      .map((it) => new Date(it).toLocaleDateString())
      .join(", ");
    return arr;
  } else {
    return "";
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SUMMARY: {
      return {
        ...state,
        taskDataSummary: action.taskDataSummary,
      };
    }
    case ADD_TASK_TO_ARCHIVE: {
      return {
        ...state,
        taskData: action.newTaskData,
        taskDataArchive: action.newTaskDataArchive,
      };
    }
    case UNARCHIVE_TASK: {
      return {
        ...state,
        taskData: action.newTaskData,
        taskDataArchive: action.newTaskDataArchive,
      };
    }
    case ADD_TASK: {
      return {
        ...state,
        taskData: action.newTaskData
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
        taskData: action.newTaskData,
      };
    }
    default:
      return state;
  }
};


export function summary() {
  return (dispatch, getState) => {
    const { taskData, taskDataArchive } = getState().reducer;
    const summaryTable = category.reduce((acc, rec, index) => {
      return { ...acc, [rec]: Object.values(taskData).filter((it) => it.Category === rec).length} ;
    }, {});
    const summaryTableArchive = category.reduce((acc, rec, index) => {
      return { ...acc, [rec]: Object.values(taskDataArchive).filter((it) => it.Category === rec).length };
    }, {});
    const summaryAll = category.reduce((acc, rec) => {
      return { ...acc, [rec]: {Category: [rec], Active: summaryTable[rec], Archived: summaryTableArchive[rec] }};
    }, {});
    dispatch({
      type: SUMMARY,
      taskDataSummary: summaryAll
    })
  };
}

export function addTaskToArchive(taskId) {
  return (dispatch, getState) => {
    const {taskData, taskDataArchive} = getState().reducer
    const newTaskDataArchive = { ...taskDataArchive, [taskId]: taskData[taskId]}
    const newTaskData = taskData
    delete newTaskData[taskId]
    dispatch({
      type: ADD_TASK_TO_ARCHIVE,
      newTaskData,
      newTaskDataArchive
    })
  }
}
export function unarchiveTask(taskId) {
  return (dispatch, getState) => {
    const {taskData, taskDataArchive} = getState().reducer
    const newTaskData = { ...taskData, [taskId]: taskDataArchive[taskId]}
    const newTaskDataArchive = taskDataArchive
    delete newTaskDataArchive[taskId]
    dispatch({
      type: UNARCHIVE_TASK,
      newTaskData,
      newTaskDataArchive
    })
  }
}
export function deleteTask(taskId) {
  return (dispatch, getState) => {
    const { taskData } = getState().reducer
     const newTaskData = taskData;
     delete newTaskData[taskId];
     dispatch({
       type: DELETE_TASK,
       newTaskData
     })
  }
}
export function addTask(task) {
  return (dispatch, getState) => {
    const { taskData } = getState().reducer;
    task.Dates = getDates(task.Content)
    const newTaskData = { ...taskData, [task.id]: task}
    dispatch({
      type: ADD_TASK,
      newTaskData,
    });
  };
}