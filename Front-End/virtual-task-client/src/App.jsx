import React, { Component } from "react";

{
  const tasks = [
    {
      id: 1,
      title: "Weekly Reports",
      description: "",
      completed: true,
    },
    {
      id: 2,
      title: "Weekly Reports",
      description: "",
      completed: true,
    },
    {
      id: 3,
      title: "Order Realease",
      description:
        "Check out coustomers accounts and release or block orders accordingly",
      completed: true,
    },
    {
      id: 4,
      title: "Weekly Reports",
      description: "Sending the Weekly reports for overdue invoices",
      completed: false,
    },
  ];
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      taskList: tasks,
    };
  }
  displayCompleted = (status) => {
    if (status) {
      return this.setstatus({ viewCompleted: true });
    }
    return this.setstatus({ viewCompleted: true });
  };
}

export default App;
