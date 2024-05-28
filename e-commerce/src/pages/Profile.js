import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { user, updateUser, logout } = useContext(UserContext);
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const navigate = useNavigate();

  const handleUpdate = () => {
    updateUser({ name, email });
    alert('Profil bilgileri güncellendi.'); 
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Çıkış yaptıktan sonra ana sayfaya yönlendir
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
        <label htmlFor="name">
          İsim:
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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