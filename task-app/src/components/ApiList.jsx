import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../components/Card";
import Button from "../components/Button";

export default function ApiList() {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        setPosts(data.slice(0, 20));
        setFiltered(data.slice(0, 20));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(posts.filter(p => p.title.toLowerCase().includes(q)));
  }, [search, posts]);

  return (
    <motion.section
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">API Data</h1>
        <input
          placeholder="Search posts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-64 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      {loading ? (
        <motion.p
          className="text-center text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading data...
        </motion.p>
      ) : (
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          <AnimatePresence>
            {filtered.map(post => (
              <motion.div
                key={post.id}
                variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                exit={{ opacity: 0 }}
              >
                <Card className="hover:scale-[1.02] transition-transform">
                  <h3 className="font-semibold mb-1">{post.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {post.body.slice(0, 80)}...
                  </p>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.section>
  );
}
