import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kullanıcı verilerini doğrula
    if (!email || !password) {
      alert('Lütfen email ve şifre alanlarını doldurun.');
      return;
    }

    // Kullanıcının kayıtlı olup olmadığını kontrol et
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
      alert('Geçersiz email veya şifre.');
      return;
    }

    // Kullanıcıyı ana sayfaya yönlendir
    navigate('/');
  };

  return (
    <div>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Şifre:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default Login;