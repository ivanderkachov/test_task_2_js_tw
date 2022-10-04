import React from "react";
import Modal from "../components/modal/modal";
import { Provider } from "react-redux";
import store from "../redux";

export default {
  title: "Modal",
  component: Modal,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

// export const TableNotes = () => <Table />

const Template = (args) => <Modal {...args} />;

export const ModalComp = Template.bind({});
ModalComp.args = {
  category: ["Task", "Random thoughts", "Idea"],
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
  task: {
    id: 1662907031393,
    Name: "The theory",
    Created: new Date(1662907031393).toLocaleDateString(),
    Category: "Random thoughts",
    Content: "The theory ...",
    Dates: "",
  },
  changeTable: 1662907031393,
};