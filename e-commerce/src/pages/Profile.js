import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { user, updateUser } = useContext(UserContext);
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const navigate = useNavigate();

  const handleUpdate = () => {
    if (user) {
      updateUser({ name, email });
      alert('Profil bilgileri güncellendi.');
    }
  };

  const handleLogout = () => {
    // Kullanıcının oturumunu kapat ve ana sayfaya yönlendir
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h2>Profil</h2>
          <p>Henüz giriş yapmadınız.</p>
          <Link to="/login">Giriş Yap</Link>
          <Link to="/register">Kayıt Ol</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Profil</h2>
        <label>
          İsim:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button onClick={handleUpdate}>Güncelle</button>
        <button onClick={handleLogout} className="logout-button">
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default Profile;