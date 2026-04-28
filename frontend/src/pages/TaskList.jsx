import { useEffect, useState } from 'react';
import api from '../services/api';
import TaskCard from '../components/TaskCard';
import { useAuth } from '../context/AuthContext';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        setTasks(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
  };

  const filteredTasks = tasks.filter(t => filter === 'all' || t.status === filter);

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="text-h1">Tasks</h1>
          <p className="text-muted">Manage your tasks and priorities.</p>
        </div>
        <select 
          className="input-field" 
          style={{ width: 'auto' }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map(task => (
          <TaskCard key={task._id} task={task} onTaskUpdate={handleTaskUpdate} userRole={user.role} />
        ))}
      </div>
      
      {filteredTasks.length === 0 && (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <p className="text-muted">No tasks found.</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
