import React from "react";
import Table from "../components/table/table";
import { Provider } from "react-redux";
import store from "../redux";

export default {
  title: "Table",
  component: Table,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

// export const TableNotes = () => <Table />

const Template = (args) => <Table {...args} />;

export const TableNotes = Template.bind({});
TableNotes.args = {
type: "notes",
table: {
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
  // toggle: false,
  // setChangeTable: "",
  // setToggle:""
};


//type, table, setToggle, toggle, changeTable, setChangeTable;

