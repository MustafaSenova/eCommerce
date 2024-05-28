import React, { useContext } from 'react';
import membershipTypes from '../data/MembershipTypes';
import { UserContext } from '../context/UserContext';

const Memberships = () => {
  const { updateUser } = useContext(UserContext);

  const handleMembershipChange = (membershipId) => {
    // Kullanıcının seçtiği üyeliği localStorage'a kaydet
    updateUser({ membershipId: membershipId }); 
    alert('Üyelik tipi başarıyla değiştirildi!');
  };

  return (
    <div className="membership-page">
      <h2>Üyelik Tipleri</h2>
      <div className="membership-options">
        {membershipTypes.map((membership) => (
          <div key={membership.id} className="membership-option">
            <h3>{membership.name}</h3>
            <p>İndirim Oranı: %{(membership.discount * 100).toFixed(0)}</p>
            <button onClick={() => handleMembershipChange(membership.id)}>
              Bu Üyeliğe Geç
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Memberships;