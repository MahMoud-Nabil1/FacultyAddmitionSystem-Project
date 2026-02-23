import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import GuestRoute from './components/GuestRoute.jsx';
import Login from './components/Login.jsx';
import AdminDashboard from './components/adminDashboard.jsx';
import {CreatStaff, CreatStudent} from "./services/api";


function App() {
    return (
        <div className="App">

            <Routes>
                {/* Protected home route — require login */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <h1>Home</h1>
                            <button onClick={() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("role");
                                localStorage.removeItem("user");
                                window.location.href = "/login";
                            }}>
                                Sign out
                            </button>
                        </ProtectedRoute>
                    }
                />

                {/* Unprotected admin dashboard route for testing */}
                <Route
                    path="/admin-dashboard-test"
                    element={
                        <div style={{padding: "2rem"}}>
                            <h1>Admin Dashboard (Test)</h1>
                            <hr/>
                            <AdminDashboard
                                onAddStaff={CreatStaff}
                                onAddStudent={CreatStudent}
                            />
                        </div>
                    }
                />
                {/* Guest-only routes — redirect to / if already logged in */}
                <Route path="/login" element={
                    <GuestRoute>
                        <Login/>
                    </GuestRoute>
                }/>
                <Route path="/ForgotPassWord" element={
                    <GuestRoute>
                        <h1>ForgotPassWord</h1>
                    </GuestRoute>
                }/>

                {/* Catch-all: redirect unknown routes */}
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </div>
    );
}

export default App;

