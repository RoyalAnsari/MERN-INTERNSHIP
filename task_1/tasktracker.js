const fs = require("fs");
//loading data from json file
function loadTasks() {
  try {
    const data = fs.readFileSync("Tasks.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Failed to load tasks file.");
  }
}

function saveTasks(tasks) {
  fs.writeFileSync("Tasks.json", JSON.stringify(tasks, null, 2));
}

// ===== Closure for Private Counter =====
function createTaskCounter() {
  let count = 0; // private variable

  return {
    increment() {
      count++;
    },
    getCount() {
      return count;
    },
  };
}

const counter = createTaskCounter();

// ===== Task Manager Object =====
const TaskManager = {
  addTask(title, priority, dueDate) {
    if (!title || !priority || !dueDate) {
      throw new Error("Missing required fields.");
    }

    const tasks = loadTasks();
    const newTask = {
      id: Date.now(),
      title,
      priority,
      dueDate,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks(tasks);
    counter.increment();
    console.log("Task added.");
  },
  removeTask(id) {
    const tasks = loadTasks();
    const filtered = tasks.filter((task) => task.id != id);
    if (tasks.length === filtered.length) {
      throw new Error("Task not found.");
    }
    saveTasks(filtered);
    console.log("Task removed.");
  },
  searchTask(keyword) {
    const tasks = loadTasks();
    const results = tasks.filter((task) =>
      task.title.toLowerCase().includes(keyword.toLowerCase()),
    );
    console.log(results);
  },
  sortByPriority() {
    const tasks = loadTasks();
    tasks.sort((a, b) => a.priority.localeCompare(b.priority));
    console.log(tasks);
  },
  sortByDate() {
    const tasks = loadTasks();
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    console.log(tasks);
  },
  showStats() {
    const tasks = loadTasks();
    const total = tasks.length;

    const completedCount = tasks.reduce((acc, task) => {
      return task.completed ? acc + 1 : acc;
    }, 0);

    const hasHighPriority = tasks.some((task) => task.priority === "high");
    const allCompleted = tasks.every((task) => task.completed);
    console.log({ total, completedCount, hasHighPriority, allCompleted });
  },
};

process.stdin.on("data", (input) => {
  const [command, ...args] = input.toString().trim().split(" ");
  try {
    switch (command) {
      case "add":
        TaskManager.addTask(args[0], args[1], args[2]);
        break;
      case "remove":
        TaskManager.removeTask(args[0]);
        break;
      case "search":
        TaskManager.searchTask(args[0]);
        break;
      case "sortPriority":
        TaskManager.sortByPriority();
        break;
      case "sortDate":
        TaskManager.sortByDate();
        break;
      case "stats":
        TaskManager.showStats();
        break;
      default:
        console.log("Invalid command.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
});

