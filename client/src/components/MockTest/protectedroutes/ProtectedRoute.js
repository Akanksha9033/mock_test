// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user } = useContext(AuthContext);

//   console.log("User in ProtectedRoute:", user);
//   console.log("Allowed Roles in ProtectedRoute:", allowedRoles);
//   console.log("User role being checked:", user ? user.role : "No role");

//   if (!user || !user.role) {
//     console.log(
//       "User not authenticated or role missing. Redirecting to /signin."
//     );
//     return <Navigate to="/signin" replace />;
//   }

//   // Normalize both user role and allowed roles
//   const userRole = user.role.toLowerCase();
//   const normalizedAllowedRoles = allowedRoles.map((role) => role.toLowerCase());

//   if (!normalizedAllowedRoles.includes(userRole)) {
//     console.warn(
//       `❌ User role "${userRole}" not authorized. Redirecting to /unauthorized.`
//     );
//     return <Navigate to="/unauthorized" />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useContext(AuthContext);

    console.log("🔑 ProtectedRoute check → user:", user);
    console.log("🔑 allowedRoles:", allowedRoles);

    if (user === null) {
        console.log("⏳ User still loading, showing fallback...");
        return <div>Checking authentication...</div>;
    }

    if (!user || !user.role) {
        console.warn("❌ No user or role, redirecting to /signin");
        return <Navigate to="/signin" replace />;
    }

    const userRole = user.role.toLowerCase();
    const normalizedAllowedRoles = allowedRoles.map(role => role.toLowerCase());

    console.log("✅ userRole:", userRole);
    console.log("✅ normalizedAllowedRoles:", normalizedAllowedRoles);

    if (!normalizedAllowedRoles.includes(userRole)) {
        console.warn(`❌ User role "${userRole}" not authorized → redirecting to /unauthorized`);
        return <Navigate to="/unauthorized" />;
    }

    console.log("✅ User authorized → rendering children");
    return children;
};

export default ProtectedRoute;
