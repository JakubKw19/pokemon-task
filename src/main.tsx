import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { pokemonDetailsLoader, pokemonListLoader } from "./loader";
import PokemonList from "./routes";
import ErrorBoundary from "./ErrorBoundary";
import PokemonId from "./routes/pokemon.$id";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <PokemonList />,
        loader: pokemonListLoader,
      },
      {
        path: "pokemon/:id",
        element: <PokemonId />,
        loader: pokemonDetailsLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
