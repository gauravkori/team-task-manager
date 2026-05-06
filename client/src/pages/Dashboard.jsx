import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);

  const [users, setUsers] = useState([]);

  const [taskData, setTaskData] =
    useState({
      title: "",
      description: "",
      assignedTo: "",
      dueDate: "",
    });

  // TASK STATS
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "done"
  ).length;

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/";
  };

  useEffect(() => {

    fetchTasks();

    fetchUsers();

  }, []);

  // FETCH TASKS
  const fetchTasks = async () => {
    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  // FETCH USERS
  const fetchUsers = async () => {
    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setUsers(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  // CREATE TASK
  const createTask = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        {
          title: taskData.title,
          description:
            taskData.description,
          dueDate: taskData.dueDate,

          // TEMP PROJECT ID
          project:
            "69fad9a02d543f60fb8c36a7",

          assignedTo:
            taskData.assignedTo,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Task Created");

      setTaskData({
        title: "",
        description: "",
        assignedTo: "",
        dueDate: "",
      });

      fetchTasks();

    } catch (error) {

      console.log(error);

      alert("Task creation failed");
    }
  };

  // UPDATE TASK STATUS
  const updateStatus = async (
    taskId,
    status
  ) => {
    try {

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,
        { status },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f4f4",
        padding: "20px",
      }}
    >

      {/* HEADER */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow:
            "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <div>
          <h1>Dashboard</h1>

          <h3>
            Welcome {user?.name}
          </h3>

          <p>
            Role: {user?.role}
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 15px",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Logout
        </button>
      </div>


      {/* CREATE TASK */}
      {
        user?.role === "admin" && (
          <form
            onSubmit={createTask}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "30px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              boxShadow:
                "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2>Create Task</h2>

            <input
              type="text"
              placeholder="Task title"
              value={taskData.title}
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  title: e.target.value,
                })
              }
              required
              style={{
                padding: "10px",
              }}
            />

            <textarea
              placeholder="Description"
              value={
                taskData.description
              }
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  description:
                    e.target.value,
                })
              }
              required
              style={{
                padding: "10px",
              }}
            />

            <input
              type="date"
              value={taskData.dueDate}
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  dueDate:
                    e.target.value,
                })
              }
              required
              style={{
                padding: "10px",
              }}
            />

            <select
              value={
                taskData.assignedTo
              }
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  assignedTo:
                    e.target.value,
                })
              }
              required
              style={{
                padding: "10px",
              }}
            >
              <option value="">
                Select User
              </option>

              {users.map((u) => (
                <option
                  key={u._id}
                  value={u._id}
                >
                  {u.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              style={{
                padding: "10px",
                background: "black",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Create Task
            </button>
          </form>
        )
      }


      {/* STATS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
        }}
      >

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            flex: 1,
            boxShadow:
              "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Tasks</h3>

          <h1>{totalTasks}</h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            flex: 1,
            boxShadow:
              "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Completed</h3>

          <h1>{completedTasks}</h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            flex: 1,
            boxShadow:
              "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Pending</h3>

          <h1>{pendingTasks}</h1>
        </div>

      </div>


      {/* TASKS */}
      <h2 style={{
        marginBottom: "20px",
      }}>
        Tasks
      </h2>

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "15px",
            boxShadow:
              "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>
            <strong>Status:</strong>{" "}
            {task.status}

            {
              new Date(task.dueDate) <
                new Date() &&
              task.status !== "done" && (
                <span
                  style={{
                    marginLeft: "10px",
                    color: "red",
                    fontWeight:
                      "bold",
                  }}
                >
                  OVERDUE
                </span>
              )
            }
          </p>

          <p>
            <strong>Project:</strong>{" "}
            {task.project?.name}
          </p>

          <p>
            <strong>Due Date:</strong>{" "}
            {
              task.dueDate
                ? new Date(
                    task.dueDate
                  ).toLocaleDateString()
                : "No due date"
            }
          </p>

          <p>
            <strong>Assigned To:</strong>{" "}
            {task.assignedTo?.name}
          </p>

          {/* STATUS BUTTONS */}
          <div
            style={{
              marginTop: "15px",
              display: "flex",
              gap: "10px",
            }}
          >
            <button
              onClick={() =>
                updateStatus(
                  task._id,
                  "todo"
                )
              }
            >
              Todo
            </button>

            <button
              onClick={() =>
                updateStatus(
                  task._id,
                  "in-progress"
                )
              }
            >
              In Progress
            </button>

            <button
              onClick={() =>
                updateStatus(
                  task._id,
                  "done"
                )
              }
            >
              Done
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;