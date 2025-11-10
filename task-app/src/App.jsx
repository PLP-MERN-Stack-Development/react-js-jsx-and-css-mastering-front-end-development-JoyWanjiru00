import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import ApiData from "./pages/ApiData";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/api" element={<ApiData />} />
      </Routes>
    </Layout>
  );
}

export default App;
