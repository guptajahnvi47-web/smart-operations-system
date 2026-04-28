import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import CreateTask from './pages/CreateTask';
import ActivityLogs from './pages/ActivityLogs';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
          <Route path="/create-task" element={<ProtectedRoute allowedRoles={['admin', 'manager']}><CreateTask /></ProtectedRoute>} />
          <Route path="/logs" element={<ProtectedRoute allowedRoles={['admin']}><ActivityLogs /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
