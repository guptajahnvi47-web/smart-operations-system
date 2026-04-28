import React, { useState } from "react";
import api from '../services/api';
import { Calendar, User } from 'lucide-react';

const TaskCard = ({ task, onTaskUpdate, userRole }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setIsUpdating(true);
    try {
      const res = await api.put(`/tasks/${task._id}`, { status: newStatus });
      onTaskUpdate(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
        <span className={`badge badge-${task.status}`}>
          {task.status.replace('-', ' ')}
        </span>
        <span className={`text-muted ${getPriorityColor(task.priority)}`} style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
          {task.priority}
        </span>
      </div>
      
      <h3 className="text-h3" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{task.title}</h3>
      <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {task.description}
      </p>

      <div className="flex flex-col gap-2" style={{ marginBottom: '1.5rem' }}>
        <div className="flex items-center gap-2 text-muted" style={{ fontSize: '0.75rem' }}>
          <Calendar size={14} />
          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-muted" style={{ fontSize: '0.75rem' }}>
          <User size={14} />
          <span>Assigned to: {task.assignedTo?.name || 'Unknown'}</span>
        </div>
        <div className="flex items-center gap-2 text-muted" style={{ fontSize: '0.75rem' }}>
          <User size={14} />
          <span>Assigned by: {task.createdBy?.name || 'Unknown'}</span>
        </div>
      </div>

      <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
        <label className="label" style={{ fontSize: '0.75rem' }}>Update Status</label>
        <select 
          className="input-field" 
          style={{ padding: '0.5rem', fontSize: '0.875rem' }}
          value={task.status}
          onChange={handleStatusChange}
          disabled={isUpdating}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
};

export default TaskCard;