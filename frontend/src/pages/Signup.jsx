import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData.name, formData.email, formData.password, formData.role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center" style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem', width: '100%', maxWidth: '400px' }}>
        <h1 className="text-h2" style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Create Account</h1>
        <p className="text-muted" style={{ marginBottom: '2rem', textAlign: 'center' }}>Join SmartOps today</p>
        
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="label">Full Name</label>
            <input type="text" required className="input-field" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="label">Email Address</label>
            <input type="email" required className="input-field" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" required className="input-field" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>
          <div>
            <label className="label">Role</label>
            <select className="input-field" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Sign Up</button>
        </form>
        
        <p className="text-muted" style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
