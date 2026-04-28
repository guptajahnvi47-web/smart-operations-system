import React, { useState, useEffect } from "react";
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [users, setUsers] = useState([]);
  const [workloads, setWorkloads] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignedTo: '',
    dueDate: ''
  });

  useEffect(() => {
    const fetchUsersAndWorkload = async () => {
      try {
        const [usersRes, workloadRes] = await Promise.all([
          api.get('/auth/users'),
          api.get('/tasks/workload')
        ]);
        setUsers(usersRes.data);
        setWorkloads(workloadRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsersAndWorkload();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', formData);
      navigate('/tasks');
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task");
    }
  };

  const selectedUserWorkload = workloads[formData.assignedTo] || 0;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="text-h1">Create Task</h1>
        <p className="text-muted">Assign a new task to a team member.</p>
      </div>

      <div className="glass-panel">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="label">Task Title</label>
            <input 
              type="text" 
              required 
              className="input-field" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
            />
          </div>

          <div>
            <label className="label">Description</label>
            <textarea 
              required 
              className="input-field" 
              rows="4"
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <label className="label">Priority</label>
              <select 
                className="input-field" 
                value={formData.priority} 
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="label">Due Date</label>
              <input 
                type="date" 
                required 
                className="input-field" 
                value={formData.dueDate} 
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})} 
              />
            </div>
          </div>

          <div>
            <label className="label">Assign To</label>
            <select 
              required 
              className="input-field" 
              value={formData.assignedTo} 
              onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
            >
              <option value="" disabled>Select User</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>{user.name} ({user.role})</option>
              ))}
            </select>
          </div>

          {/* Smart Workload Insights (Invented Feature) */}
          {formData.assignedTo && (
            <div style={{ 
              padding: '1rem', 
              borderRadius: '8px', 
              background: selectedUserWorkload >= 5 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)',
              border: `1px solid ${selectedUserWorkload >= 5 ? 'var(--danger)' : 'var(--primary)'}`,
              marginTop: '0.5rem'
            }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 500, color: selectedUserWorkload >= 5 ? 'var(--danger)' : 'var(--primary)' }}>
                💡 Smart Workload Insights
              </p>
              <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                This user currently has <strong>{selectedUserWorkload}</strong> active task{selectedUserWorkload !== 1 ? 's' : ''}.
                {selectedUserWorkload >= 5 && " They might be overloaded. Consider assigning to someone else."}
              </p>
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;