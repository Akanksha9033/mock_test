// import { Link, useLocation, useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   FaTachometerAlt,
//   FaFileAlt,
//   FaUser,
//   FaWallet,
//   FaAngleDoubleLeft,
//   FaAngleDoubleRight,
//   FaSignOutAlt,
// } from "react-icons/fa";

// const MockSidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isExamPage = location.pathname.includes("/exam");

//   // 🟡 Get user role from localStorage
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userRole = user?.role;

//   // 🟡 Dynamically set dashboard path
//   const dashboardPath =
//     userRole === "Admin"
//       ? "/admin-dashboard"
//       : userRole === "Teacher"
//       ? "/teacher-dashboard"
//       : userRole === "Student"
//       ? "/student-dashboard"
//       : userRole === "Management"
//       ? "/management-dashboard"
//       : "/";

//   useEffect(() => {
//     if (isExamPage) {
//       setIsCollapsed(true);
//     }
//   }, [location.pathname, isExamPage]);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     !isExamPage && (
//       <div>
//         <div
//           className={`bg-light border-end p-3 sidebar position-fixed d-flex flex-column justify-content-between`}
//           style={{
//             width: isCollapsed ? "60px" : "250px",
//             height: "100vh",
//             zIndex: 1050,
//             overflow: "hidden",
//             transition: "width 0.3s ease",
//           }}
//         >
//           <div>
//             {!isCollapsed && (
//               <h4 className="mb-4" style={{ whiteSpace: "nowrap" }}>
//                 Admin Panel
//               </h4>
//             )}

//             <ul className="list-unstyled sidebar-links w-100">
//               <li className="mb-3 d-flex align-items-center">
//                 <Link
//                   to={dashboardPath}
//                   className="sidebar-link d-flex align-items-center"
//                 >
//                   <FaTachometerAlt className="me-2" />
//                   {!isCollapsed && "Dashboard"}
//                 </Link>
//               </li>
//               <li className="mb-3 d-flex align-items-center">
//                 <Link
//                   to="/mock-tests"
//                   className="sidebar-link d-flex align-items-center"
//                 >
//                   <FaFileAlt className="me-2" />
//                   {!isCollapsed && "Mock Tests"}
//                 </Link>
//               </li>
//               <li className="mb-3 d-flex align-items-center">
//                 <Link
//                   to="/profile"
//                   className="sidebar-link d-flex align-items-center"
//                 >
//                   <FaUser className="me-2" />
//                   {!isCollapsed && "Profile"}
//                 </Link>
//               </li>
//               <li className="mb-3 d-flex align-items-center">
//                 <Link
//                   to="/accounts"
//                   className="sidebar-link d-flex align-items-center"
//                 >
//                   <FaWallet className="me-2" />
//                   {!isCollapsed && "Accounts"}
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div
//             className="sidebar-link d-flex align-items-center mb-2"
//             onClick={handleLogout}
//             style={{ cursor: "pointer" }}
//           >
//             <FaSignOutAlt className="me-2" />
//             {!isCollapsed && "Logout"}
//           </div>
//         </div>

//         <div
//           className="position-fixed"
//           style={{
//             top: "20px",
//             left: isCollapsed ? "60px" : "250px",
//             zIndex: 1060,
//             cursor: "pointer",
//             transition: "left 0.3s ease",
//           }}
//           onClick={toggleSidebar}
//         >
//           <span style={{ fontSize: "20px", color: "#000" }}>
//             {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
//           </span>
//         </div>

//         <style>
//           {`
//             .sidebar-links .sidebar-link {
//               display: block;
//               padding: 10px 15px;
//               color: #343a40;
//               font-weight: 600;
//               border-radius: 4px;
//               transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s;
//               white-space: nowrap;
//               text-decoration: none;
//             }
//             .sidebar-links .sidebar-link:hover,
//             .sidebar-link:hover {
//               background-color: #4748ac;
//               color: #fff;
//               transform: translateX(4px);
//             }
//           `}
//         </style>
//       </div>
//     )
//   );
// };

// export default MockSidebar;


import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    FaTachometerAlt,
    FaFileAlt,
    FaUser,
    FaWallet,
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaSignOutAlt,
} from "react-icons/fa";

const MockSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isExamPage = location.pathname.includes("/exam");
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = JSON.parse(localStorage.getItem("user"));
            setUserRole(user?.role);
        }
    }, []);

    const dashboardPath =
        userRole === "Admin"
            ? "/admin-dashboard"
            : userRole === "Teacher"
            ? "/teacher-dashboard"
            : userRole === "Student"
            ? "/student-dashboard"
            : userRole === "Management"
            ? "/management-dashboard"
            : "/";

    useEffect(() => {
        if (isExamPage) {
            setIsCollapsed(true);
        }
    }, [location.pathname, isExamPage]);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/signin");
    };

    return (
        !isExamPage && (
            <div>
                <div
                    className={`bg-light border-end p-3 sidebar position-fixed d-flex flex-column justify-content-between`}
                    style={{
                        width: isCollapsed ? "60px" : "250px",
                        height: "100vh",
                        zIndex: 1050,
                        overflow: "hidden",
                        transition: "width 0.3s ease",
                    }}
                >
                    <div>
                        {!isCollapsed && (
                            <h4 className="mb-4" style={{ whiteSpace: "nowrap" }}>
                                Admin Panel
                            </h4>
                        )}

                        <ul className="list-unstyled sidebar-links w-100">
                            <li className="mb-3 d-flex align-items-center">
                                <Link to={dashboardPath} className="sidebar-link d-flex align-items-center">
                                    <FaTachometerAlt className="me-2" />
                                    {!isCollapsed && "Dashboard"}
                                </Link>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <Link to="/mock-tests" className="sidebar-link d-flex align-items-center">
                                    <FaFileAlt className="me-2" />
                                    {!isCollapsed && "Mock Tests"}
                                </Link>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <Link to="/profile" className="sidebar-link d-flex align-items-center">
                                    <FaUser className="me-2" />
                                    {!isCollapsed && "Profile"}
                                </Link>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <Link to="/accounts" className="sidebar-link d-flex align-items-center">
                                    <FaWallet className="me-2" />
                                    {!isCollapsed && "Accounts"}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div
                        className="sidebar-link d-flex align-items-center mb-2"
                        onClick={handleLogout}
                        style={{ cursor: "pointer" }}
                    >
                        <FaSignOutAlt className="me-2" />
                        {!isCollapsed && "Logout"}
                    </div>
                </div>

                <div
                    className="position-fixed"
                    style={{
                        top: "20px",
                        left: isCollapsed ? "60px" : "250px",
                        zIndex: 1060,
                        cursor: "pointer",
                        transition: "left 0.3s ease",
                    }}
                    onClick={toggleSidebar}
                >
                    <span style={{ fontSize: "20px", color: "#000" }}>
                        {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
                    </span>
                </div>

                <style>
                    {`
                    .sidebar-links .sidebar-link {
                        display: block;
                        padding: 10px 15px;
                        color: #343a40;
                        font-weight: 600;
                        border-radius: 4px;
                        transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s;
                        white-space: nowrap;
                        text-decoration: none;
                    }
                    .sidebar-links .sidebar-link:hover,
                    .sidebar-link:hover {
                        background-color: #4748ac;
                        color: #fff;
                        transform: translateX(4px);
                    }
                `}
                </style>
            </div>
        )
    );
};

export default MockSidebar;
