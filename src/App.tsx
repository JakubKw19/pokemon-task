// import { Card } from "@mui/material";
import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import Loading from "./components/Loading";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
        <Link to="/">Pokédex</Link>
      </nav>
      <main className="flex justify-center items-center h-full">
        <div className="p-4 w-3/5 h-full mx-auto">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default App;
