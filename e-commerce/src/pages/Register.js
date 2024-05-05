import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kullanıcı verilerini doğrula
    if (!name || !email || !password) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    // Kullanıcı verilerini kaydet (localStorage veya bir API kullanarak)
    const newUser = { name, email, password };
    localStorage.setItem('user', JSON.stringify(newUser));

    // Kullanıcıyı giriş sayfasına yönlendir
    navigate('/login');
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <label>
          İsim:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
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
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
};

export default Register;