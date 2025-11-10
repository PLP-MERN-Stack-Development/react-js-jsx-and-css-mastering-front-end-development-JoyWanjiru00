import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../components/Card";
import { CheckCircle, Trash2 } from "lucide-react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All");

  const addTask = () => {
    if (!newTask.trim()) return;
    console.log("addTask called:", newTask);
    setTasks(prev => [...prev, { id: Date.now(), text: newTask.trim(), completed: false }]);
    setNewTask("");
  };

  const toggleTask = id =>
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const deleteTask = id => setTasks(prev => prev.filter(t => t.id !== id));

  const filteredTasks =
    filter === "All"
      ? tasks
      : filter === "Active"
      ? tasks.filter(t => !t.completed)
      : tasks.filter(t => t.completed);

  return (
    <motion.section
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="space-y-6">
        <h1 className="text-2xl font-semibold text-center">Task Manager</h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            className="flex-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            placeholder="Add a new task..."
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTask()}
          />
          <button
            type="button"
            onClick={addTask}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {["All", "Active", "Completed"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-sm w-full sm:w-auto transition ${
                filter === f
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="space-y-2">
          <AnimatePresence>
            {filteredTasks.map(task => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className={`flex justify-between items-center p-3 rounded-lg border dark:border-gray-700 ${
                  task.completed ? "bg-green-50 dark:bg-green-900/30" : "bg-gray-50 dark:bg-gray-800"
                }`}
              >
                <span
                  className={`flex-1 cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.text}
                </span>
                <div className="flex gap-2">
                  <CheckCircle
                    className="w-5 h-5 text-green-500 cursor-pointer"
                    onClick={() => toggleTask(task.id)}
                  />
                  <Trash2
                    className="w-5 h-5 text-red-500 cursor-pointer"
                    onClick={() => deleteTask(task.id)}
                  />
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {filteredTasks.length === 0 && (
          <motion.p
            className="text-center text-gray-500 dark:text-gray-400 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No tasks found.
          </motion.p>
        )}
      </Card>
    </motion.section>
  );
}
