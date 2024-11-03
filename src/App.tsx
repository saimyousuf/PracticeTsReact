import MyForm from "./components/MyForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserDetail from "./components/UserDetail";

const router = createBrowserRouter([
  { path: "/", element: <MyForm /> },
  { path: "/UserDetail", element: <UserDetail /> },
]);

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
