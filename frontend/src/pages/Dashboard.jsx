import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { BarChart3, CheckCircle, Clock, ListTodo } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, todo: 0, inProgress: 0, done: 0 });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        const tasks = res.data;
        setStats({
          total: tasks.length,
          todo: tasks.filter(t => t.status === 'todo').length,
          inProgress: tasks.filter(t => t.status === 'in-progress').length,
          done: tasks.filter(t => t.status === 'done').length,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ padding: '1rem', borderRadius: 'var(--radius-full)', background: `rgba(${color}, 0.1)`, color: `rgb(${color})` }}>
        {icon}
      </div>
      <div>
        <p className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500 }}>{title}</p>
        <p className="text-h2">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="text-h1">Dashboard</h1>
        <p className="text-muted">Welcome back, {user?.name}. Here's what's happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Tasks" value={stats.total} icon={<ListTodo size={24} />} color="79, 70, 229" />
        <StatCard title="To Do" value={stats.todo} icon={<Clock size={24} />} color="148, 163, 184" />
        <StatCard title="In Progress" value={stats.inProgress} icon={<BarChart3 size={24} />} color="59, 130, 246" />
        <StatCard title="Done" value={stats.done} icon={<CheckCircle size={24} />} color="16, 185, 129" />
      </div>
    </div>
  );
};

export default Dashboard;
