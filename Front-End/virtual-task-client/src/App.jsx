import { Component } from "react";
import CustomModal from "./components/CustomModal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: { title: "", description: "", completed: false },
      taskList: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/tasks/")
      .then((res) => this.setState({ taskList: res.data }))
      .catch((err) => console.log("Error fetching tasks:", err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then(() => this.refreshList());
    } else {
      axios
        .post("http://localhost:8000/api/tasks/", item)
        .then(() => this.refreshList());
    }
  };

  handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then(() => this.refreshList());
  };

  createItem = () => {
    this.setState({
      activeItem: { title: "", description: "", completed: false },
      modal: true,
    });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: true });
  };

  displayCompleted = (status) => {
    this.setState({ viewCompleted: status });
  };

  renderTabList = () => (
    <div className="my-5 flex space-x-4">
      <button
        onClick={() => this.displayCompleted(true)}
        className={`px-6 py-3 text-lg font-semibold rounded-md ${
          this.state.viewCompleted
            ? "bg-purple-600 text-white"
            : "bg-gray-300 text-gray-700"
        }`}
      >
        ✅ Completed
      </button>
      <button
        onClick={() => this.displayCompleted(false)}
        className={`px-6 py-3 text-lg font-semibold rounded-md ${
          this.state.viewCompleted
            ? "bg-gray-300 text-gray-700"
            : "bg-blue-600 text-white"
        }`}
      >
        ⏳ Incomplete
      </button>
    </div>
  );

  renderItems = () => {
    const { viewCompleted, taskList } = this.state;
    const filteredTasks = taskList.filter(
      (item) => item.completed === viewCompleted
    );

    return filteredTasks.map((item) => (
      <li
        key={item.id}
        className="flex justify-between items-center p-4 mb-3 rounded-xl border-2 shadow-md text-lg bg-white"
      >
        <span
          className={`font-semibold ${
            item.completed ? "line-through text-gray-600" : "text-gray-900"
          }`}
        >
          {item.title}
        </span>
        <div>
          <button
            onClick={() => this.editItem(item)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-lg mr-3"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-lg"
          >
            🗑️ Delete
          </button>
        </div>
      </li>
    ));
  };

  render() {
    return (
      <main className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl border-2 border-gray-400">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">
            📝 TASK MANAGER
          </h1>
          <button
            onClick={this.createItem}
            className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-md text-lg w-full mb-6"
          >
            ➕ Add Task
          </button>
          {this.renderTabList()}
          <ul className="w-full">{this.renderItems()}</ul>
        </div>

        <footer className="mt-6 text-gray-400 text-lg text-center">
          <span className="text-gray-600 font-semibold">
            © 2025 All Rights Reserved
          </span>
        </footer>

        {this.state.modal && (
          <CustomModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        )}
      </main>
    );
  }
}

export default App;
