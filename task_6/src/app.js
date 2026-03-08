"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
/* =========================
   ENUM FOR PRIORITY
   ========================= */
var Priority;
(function (Priority) {
    Priority["High"] = "high";
    Priority["Medium"] = "medium";
    Priority["Low"] = "low";
})(Priority || (Priority = {}));
/* =========================
   LOAD TASKS FROM JSON
   ========================= */
function loadTasks() {
    try {
        const data = fs.readFileSync("Tasks.json", "utf8");
        return JSON.parse(data);
    }
    catch {
        return [];
    }
}
/* =========================
   SAVE TASKS TO JSON
   ========================= */
function saveTasks(tasks) {
    fs.writeFileSync("Tasks.json", JSON.stringify(tasks, null, 2));
}
/* =========================
   GENERIC FUNCTION
   reusable filter function
   ========================= */
function findByProp(items, key, value) {
    return items.filter((item) => item[key] === value);
}
/* =========================
   CLOSURE TASK COUNTER
   ========================= */
function createTaskCounter() {
    let count = 0;
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
/* =========================
   TASK MANAGER OBJECT
   ========================= */
const TaskManager = {
    /* ADD TASK */
    addTask(title, priority, dueDate) {
        if (!title || !priority || !dueDate) {
            throw new Error("Missing required fields.");
        }
        const tasks = loadTasks();
        const newTask = {
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
    removeTask(id) {
        const tasks = loadTasks();
        const filtered = tasks.filter((task) => task.id != id);
        if (tasks.length === filtered.length) {
            throw new Error("Task not found.");
        }
        saveTasks(filtered);
        console.log("Task removed.");
    },
    /* SEARCH TASK */
    searchTask(keyword) {
        const tasks = loadTasks();
        if (!keyword) {
            console.log(tasks);
            return;
        }
        const results = tasks.filter((task) => task.title.toLowerCase().includes(keyword.toLowerCase()));
        console.log(results);
    },
    /* SORT BY PRIORITY */
    sortByPriority() {
        const tasks = loadTasks();
        tasks.sort((a, b) => a.priority.localeCompare(b.priority));
        console.log(tasks);
    },
    /* SORT BY DATE */
    sortByDate() {
        const tasks = loadTasks();
        tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        console.log(tasks);
    },
    /* SHOW STATS */
    showStats() {
        const tasks = loadTasks();
        const total = tasks.length;
        const completedCount = tasks.reduce((acc, task) => {
            return task.completed ? acc + 1 : acc;
        }, 0);
        const hasHighPriority = tasks.some((task) => task.priority === Priority.High);
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
    findTasksByPriority(priority) {
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
                TaskManager.addTask(args[0], args[1], args[2]);
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
                TaskManager.findTasksByPriority(args[0]);
                break;
            default:
                console.log("Invalid command.");
        }
    }
    catch (error) {
        console.error("Error:", error.message);
    }
});
//# sourceMappingURL=app.js.map