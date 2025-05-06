
 
 
// import { createContext, useState, useEffect, useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         const storedUser = localStorage.getItem("user");

//         console.log("Auth useEffect");
//         console.log("Token in localStorage:", token);
//         console.log("User in localStorage:", storedUser);

//         if (token) {
//             try {
//                 const decodedToken = jwtDecode(token);

//                 if (decodedToken.exp * 1000 < Date.now()) {
//                     console.log("Token expired. Logging out...");
//                     handleLogout();
//                 } else {
//                     if (storedUser) {
//                         setUser(JSON.parse(storedUser));
//                     } else {
//                         const newUser = {
//                             id: decodedToken.id,
//                             name: decodedToken.name,
//                             role: decodedToken.role,
//                         };
//                         setUser(newUser);
//                         localStorage.setItem("user", JSON.stringify(newUser));
//                     }
//                 }
//             } catch (error) {
//                 console.error("Invalid token. Logging out...");
//                 handleLogout();
//             }
//         } else {
//             setUser(null);
//         }
//         setIsLoading(false);
//     }, [location.pathname]);

//     const login = (token) => {
//         try {
//             const decodedToken = jwtDecode(token);
//             const userData = {
//                 id: decodedToken.id,
//                 name: decodedToken.name,
//                 role: decodedToken.role,
//             };
//             localStorage.setItem("token", token);
//             localStorage.setItem("user", JSON.stringify(userData));
//             setUser(userData);
//         } catch (error) {
//             console.error("Invalid token provided during login.");
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setUser(null);
//         window.location.href = "/exam";
//     };

//     if (isLoading) return <div>Loading...</div>;

//     return (
//         <AuthContext.Provider value={{ user, setUser, login, logout: handleLogout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;


import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("🔄 AuthProvider useEffect running (app mount)");
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            console.log("🔍 token from localStorage:", token);
            console.log("🔍 user from localStorage:", storedUser);

            if (token && storedUser) {
                try {
                    const decodedToken = jwtDecode(token);
                    console.log("✅ decodedToken:", decodedToken);

                    if (decodedToken.exp * 1000 < Date.now()) {
                        console.warn("⚠️ Token expired, logging out...");
                        handleLogout();
                    } else {
                        const parsedUser = JSON.parse(storedUser);
                        console.log("✅ Restoring user from storage:", parsedUser);
                        setUser(parsedUser);
                    }
                } catch (error) {
                    console.error("❌ Invalid token, logging out...");
                    handleLogout();
                }
            } else {
                console.warn("⚠️ No token/user found, setting user to null");
                setUser(null);
            }
        }
        setIsLoading(false);
    }, []); // 🔑 run only once on app load

    const login = (token, userData) => {
        console.log("✅ login() called with token and userData:", token, userData);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const handleLogout = () => {
        console.log("🔒 Logging out user...");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/signin";
    };

    if (isLoading) {
        console.log("⏳ AuthProvider still loading user...");
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
