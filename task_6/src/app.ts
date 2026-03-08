import * as fs from "fs";

/* =========================
   ENUM FOR PRIORITY
   ========================= */

enum Priority {
  High = "high",
  Medium = "medium",
  Low = "low",
}

/* =========================
   INTERFACE FOR TASK
   ========================= */

interface Task {
  id: number;
  title: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
}

/* =========================
   LOAD TASKS FROM JSON
   ========================= */

function loadTasks(): Task[] {
  try {
    const data = fs.readFileSync("Tasks.json", "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/* =========================
   SAVE TASKS TO JSON
   ========================= */

function saveTasks(tasks: Task[]): void {
  fs.writeFileSync("Tasks.json", JSON.stringify(tasks, null, 2));
}

/* =========================
   GENERIC FUNCTION
   reusable filter function
   ========================= */

function findByProp<T>(items: T[], key: keyof T, value: any): T[] {
  return items.filter((item) => item[key] === value);
}

/* =========================
   CLOSURE TASK COUNTER
   ========================= */

function createTaskCounter() {
  let count: number = 0;

  return {
    increment(): void {
      count++;
    },

    getCount(): number {
      return count;
    },
  };
}

const counter = createTaskCounter();

/* =========================
   TASK MANAGER OBJECT
   ========================= */

const TaskManager = {
  /* ADD TASK */

  addTask(title: string, priority: Priority, dueDate: string): void {
    if (!title || !priority || !dueDate) {
      throw new Error("Missing required fields.");
    }

    const tasks = loadTasks();

    const newTask: Task = {
      id: Date.now(),
      title: title,
      priority: priority,
      dueDate: dueDate,
      completed: false,
    };

    tasks.push(newTask);

    saveTasks(tasks);

    counter.increment();

    console.log("Task added successfully.");
  },

  /* REMOVE TASK */

  removeTask(id: number): void {
    const tasks = loadTasks();

    const filtered = tasks.filter((task) => task.id != id);

    if (tasks.length === filtered.length) {
      throw new Error("Task not found.");
    }

    saveTasks(filtered);

    console.log("Task removed.");
  },

  /* SEARCH TASK */

  searchTask(keyword?: string): void {
    const tasks = loadTasks();

    if (!keyword) {
      console.log(tasks);
      return;
    }

    const results = tasks.filter((task) =>
      task.title.toLowerCase().includes(keyword.toLowerCase())
    );

    console.log(results);
  },

  /* SORT BY PRIORITY */

  sortByPriority(): void {
    const tasks = loadTasks();

    tasks.sort((a, b) => a.priority.localeCompare(b.priority));

    console.log(tasks);
  },

  /* SORT BY DATE */

  sortByDate(): void {
    const tasks = loadTasks();

    tasks.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

    console.log(tasks);
  },

  /* SHOW STATS */

  showStats(): void {
    const tasks = loadTasks();

    const total = tasks.length;

    const completedCount = tasks.reduce((acc, task) => {
      return task.completed ? acc + 1 : acc;
    }, 0);

    const hasHighPriority = tasks.some(
      (task) => task.priority === Priority.High
    );

    const allCompleted = tasks.every((task) => task.completed);

    console.log({
      total,
      completedCount,
      hasHighPriority,
      allCompleted,
      createdInSession: counter.getCount(),
    });
  },

  /* FIND TASKS BY PRIORITY USING GENERIC */

  findTasksByPriority(priority: Priority): void {
    const tasks = loadTasks();

    const result = findByProp(tasks, "priority", priority);

    console.log(result);
  },
};

/* =========================
   CLI INPUT HANDLER
   ========================= */

process.stdin.on("data", (input) => {
  const [command, ...args] = input.toString().trim().split(" ");

  try {
    switch (command) {
      case "add":
        TaskManager.addTask(
          args[0],
          args[1] as Priority,
          args[2]
        );
        break;

      case "remove":
        TaskManager.removeTask(Number(args[0]));
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

      case "findPriority":
        TaskManager.findTasksByPriority(args[0] as Priority);
        break;

      default:
        console.log("Invalid command.");
    }
  } catch (error: any) {
    console.error("Error:", error.message);
  }
});