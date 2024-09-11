import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../routes/privateRoutes";
import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import Chat from "../pages/chat/src/App.jsx";

// Lazy pages import
const LoginPage = lazy(() => import("../pages/auth/login"));
const RegisterPage = lazy(() => import("../pages/auth/register"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
const ProjectsPage = lazy(() => import("../pages/projects"));
const InitialProcessPage = lazy(() => import("../pages/initialProcess"));
const DashboardPage = lazy(() => import("../pages/dashboard"));
const InventoryPage = lazy(() => import("../pages/inventory"));
const ConfigurationPage = lazy(() => import("../pages/Configuration"));
const AppCreator = lazy(() => import("../pages/appCreator/index.jsx"));
const ProjectPlanner = lazy(() => import("../pages/projectPlanning/index.jsx"));
const CodePush = lazy(() => import("../pages/codePush"));
const CustomEditor = lazy(() => import("../pages/customEditor"));
const ProjectCompletion = lazy(() => import("../pages/projectCompletion"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const BlockDiagram = lazy(() => import("../pages/BlockDiagram/index.jsx"));

function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={"/dashboard/projects"} />,
    },
    // {
    //   path: "/profile",
    //   element: <Navigate to={"/dashboard/profile"} />,
    // },
    {
      path: "/blockdiagram",
      element: <BlockDiagram />,
    },
    {
      path: "chat",
      element: <Chat />,
    },
    {
      path: "dashboard",
      element: <PrivateRoute />,
      children: [
        {
          path: "projects",
          element: <ProjectsPage />,
        },
        {
          path: "project/initial-process",
          element: <InitialProcessPage />,
        },
        {
          path: "home",
          element: <DashboardPage />,
        },
        {
          path: "projectplanner",
          element: <ProjectPlanner />,
        },
        // {
        //   path: "blockdiagram",
        //   element: <BlockDiagram />,
        // },
        {
          path: "inventory",
          element: <InventoryPage />,
        },
        {
          path: "configuration",
          element: <ConfigurationPage />,
        },
        {
          path: "app-creator",
          element: <AppCreator />,
        },
        {
          path: "code-push",
          element: <CodePush />,
        },
        {
          path: "project-completion",
          element: <ProjectCompletion />,
        },

        {
          path: "custom-editor",
          element: <CustomEditor />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "forgotPassword",
      element: <ForgotPassword />,
    },
    {
      path: "reset-password",
      element: <ResetPassword />,
    },
  ]);
  return (
    <>
      <Suspense fallback={<div></div>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default AppRoutes;
