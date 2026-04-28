import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import CreateTask from './pages/CreateTask';
import ActivityLogs from './pages/ActivityLogs';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
       <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </ProtectedRoute>
  } />
  <Route path="/tasks" element={
    <ProtectedRoute>
      <DashboardLayout>
        <TaskList />
      </DashboardLayout>
    </ProtectedRoute>
  } />
  <Route path="/create-task" element={
    <ProtectedRoute allowedRoles={['admin', 'manager']}>
      <DashboardLayout>
        <CreateTask />
      </DashboardLayout>
    </ProtectedRoute>
  } />
  <Route path="/logs" element={
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout>
        <ActivityLogs />
      </DashboardLayout>
    </ProtectedRoute>
  } />

  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
