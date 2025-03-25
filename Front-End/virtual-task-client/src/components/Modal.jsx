import { Component } from "react";

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: props.activeItem || {
        title: "",
        description: "",
        completed: false,
      },
    };
  }

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState((prevState) => ({
      activeItem: {
        ...prevState.activeItem,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  render() {
    const { toggle, onSave } = this.props;

    if (typeof toggle !== "function" || typeof onSave !== "function") {
      console.error(
        "Error: Missing `toggle` or `onSave` function in CustomModal."
      );
      return null;
    }

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-gray-900">📝 Task Item</h2>

          {/* Title Input */}
          <label className="block mb-2 font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={this.state.activeItem.title}
            onChange={this.handleChange}
            className="w-full p-2 border border-gray-400 rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Task Title"
          />

          {/* Description Input */}
          <label className="block mb-2 font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={this.state.activeItem.description}
            onChange={this.handleChange}
            className="w-full p-2 border border-gray-400 rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Task Description"
          />

          {/* Completed Checkbox */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="completed"
              checked={this.state.activeItem.completed}
              onChange={this.handleChange}
              className="mr-2 accent-green-500"
            />
            <label className="font-medium text-gray-700">✅ Completed</label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={toggle}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              ❌ Cancel
            </button>
            <button
              onClick={() => onSave(this.state.activeItem)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              💾 Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomModal;
