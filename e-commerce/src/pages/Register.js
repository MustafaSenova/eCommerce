import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});
    const validationErrors = {};

    if (!name.trim()) {
      validationErrors.name = 'İsim alanı zorunludur.';
    }
    if (!email.trim()) {
      validationErrors.email = 'Email alanı zorunludur.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Geçerli bir email adresi girin.';
    }
    if (!password.trim()) {
      validationErrors.password = 'Şifre alanı zorunludur.';
    } else if (password.length < 6) {
      validationErrors.password = 'Şifre en az 6 karakter olmalıdır.';
    }
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Şifreler eşleşmiyor.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newUser = { name, email, password };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div>
          <label htmlFor="name">İsim:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
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
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Şifreyi Onayla:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>
        <button type="submit">Kayıt Ol</button>
      </form>
      <p>
        Zaten bir hesabınız var mı? <Link to="/login">Giriş Yapın</Link>
      </p>
    </div>
  );
};

export default Register;