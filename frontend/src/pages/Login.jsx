import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login Error details:', err);
      setError(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center" style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem', width: '100%', maxWidth: '400px' }}>
        <h1 className="text-h2" style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Welcome Back</h1>
        <p className="text-muted" style={{ marginBottom: '2rem', textAlign: 'center' }}>Sign in to SmartOps</p>
        
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="label">Email Address</label>
            <input type="email" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" required className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Sign In</button>
        </form>
        
        <p className="text-muted" style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
