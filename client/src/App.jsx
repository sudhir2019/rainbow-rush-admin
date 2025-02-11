import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useSession from "./hooks/Authentication/useSession";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import AdminLayout from "./layouts/AdminLayout";
import SuperDistributorLayout from "./layouts/SuperDistributorLayout";
import DistributorLayout from "./layouts/DistributorLayout";
import RetailerLayout from "./layouts/RetailerLayout";
import Loader from "./components/Loader/Loader";
import ToastContainers from "./components/Toast/ToastContainer";
import roleBasedRoutes from "./routesConfig";
import Home from "./pages/Home/Home";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";

// Protected Route Component
const ProtectedRoute = ({ element, requiredRoles = [], redirectTo = "/auth/login" }) => {
    const { role, isLoggedIn, isLoadingSession } = useSession();

    if (isLoadingSession) return <Loader />;

    if (!isLoggedIn || (requiredRoles.length && !requiredRoles.includes(role))) {
        return <Navigate to={redirectTo} />;
    }

    return element;
};

// Function to Render Routes for Different Roles
// const renderRoleRoutes = (role, layout) => {
//     console.log("Rendering role routes for:", role);

//     // Prevents crashing if the role is undefined or not in the config
//     if (!role || !roleBasedRoutes[role]) {
//         console.error(`No routes found for role: ${role}`);
//         return null;
//     }

//     return (
//         <Route path={role} element={layout}>
//             {roleBasedRoutes[role].map((route) => (
//                 <Route
//                     key={route.path}
//                     path={route.path}
//                     element={<ProtectedRoute element={route.element} requiredRoles={[role]} />}
//                 />
//             ))}
//             <Route path="*" element={<Navigate to={`/${role}/dashboard`} />} />
//         </Route>
//     );
// };

const renderRoleRoutes = (role, layout) => {
    // console.log("Rendering role routes for:", role);

    // Prevents crashing if the role is undefined or not in the config
    if (!role || !roleBasedRoutes[role]) {
        // console.error(`No routes found for role: ${role}`);
        return null;
    }

    return (
        <Route path={role} element={layout}>
            {roleBasedRoutes[role].map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.element} // Removed ProtectedRoute
                />
            ))}
            <Route path="*" element={<Navigate to={`/${role}/dashboard`} />} />
        </Route>
    );
};

export default function App() {
    const { isLoadingSession, isLoggedIn } = useSession();

    if (isLoadingSession) return <Loader />;

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                </Route>

                <Route path="auth" element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Route>

                {/* Protected Role-Based Routes */}
                {renderRoleRoutes("superadmin", <SuperAdminLayout />)}
                {renderRoleRoutes("admin", <AdminLayout />)}
                {renderRoleRoutes("superdistributer", <SuperDistributorLayout />)}
                {renderRoleRoutes("distributer", <DistributorLayout />)}
                {renderRoleRoutes("retailer", <RetailerLayout />)}

                {/* Redirect Unknown Paths */}
                <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/auth/login"} replace />} />
            </Routes>

            <ToastContainers />
        </BrowserRouter>
    );
}
