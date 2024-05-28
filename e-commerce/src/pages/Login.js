import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});
    const validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = 'Email alanı zorunludur.';
    }
    if (!password.trim()) {
      validationErrors.password = 'Şifre alanı zorunludur.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      login(foundUser);
      navigate('/');
    } else {
      alert('Geçersiz email veya şifre.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Şifre:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="error">{errors.password}</span>
          )}
        </div>
        <button type="submit">Giriş Yap</button>
      </form>
      <p>
        Hesabınız yok mu? <Link to="/register">Kayıt Olun</Link>
      </p>
    </div>
  );
};

export default Login;