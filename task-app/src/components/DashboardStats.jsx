import { useEffect, useState } from "react";
import Card from "./Card";
import { motion } from "framer-motion";
import { ClipboardList, CheckCircle, Loader, Database } from "lucide-react";

export default function DashboardStats() {
  const [taskStats, setTaskStats] = useState({ total: 0, active: 0, completed: 0 });
  const [apiCount, setApiCount] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const total = savedTasks.length;
    const completed = savedTasks.filter(t => t.completed).length;
    const active = total - completed;
    setTaskStats({ total, active, completed });
  }, []);

  // Fetch API post count
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        setApiCount(data.length);
      } catch {
        setApiCount("Error");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const cards = [
    {
      title: "Total Tasks",
      value: taskStats.total,
      icon: <ClipboardList className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      title: "Active Tasks",
      value: taskStats.active,
      icon: <Loader className="w-6 h-6 text-yellow-500" />,
    },
    {
      title: "Completed Tasks",
      value: taskStats.completed,
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    },
    {
      title: "API Posts",
      value: loading ? "..." : apiCount,
      icon: <Database className="w-6 h-6 text-blue-500" />,
    },
  ];

  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {cards.map((card, i) => (
        <motion.div
          key={i}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <Card className="flex items-center justify-between p-4 hover:shadow-lg transition">
            <div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400">{card.title}</h3>
              <p className="text-2xl font-bold mt-1">{card.value}</p>
            </div>
            {card.icon}
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
