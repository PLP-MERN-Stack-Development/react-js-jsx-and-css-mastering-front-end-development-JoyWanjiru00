import DashboardStats from "../components/DashboardStats";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold">Welcome to TaskApp Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Track your tasks, explore public API data, and manage your workflow — all in one simple app.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
          <Link to="/tasks">
            <Button className="w-full sm:w-auto">Go to Tasks</Button>
          </Link>
          <Link to="/api">
            <Button variant="secondary" className="w-full sm:w-auto">
              Explore API Data
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Your Overview</h2>
        <DashboardStats />
      </div>
    </section>
  );
}

