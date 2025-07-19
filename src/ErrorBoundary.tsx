import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
        <h1 className=" text-red-500 text-6xl">Error {error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
        <h1 className=" text-red-500 text-6xl">Unexpected Error</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return <div>Unknown error occurred.</div>;
}
