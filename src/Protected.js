import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // ← Add this

const Protected = ({ Component }) => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth); // ← Paste here

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else if (user.role !== 'admin') {
      navigate('/');
    }
  }, [user]);

  return user && user.role === 'admin' ? <Component /> : null;
};

export default Protected;
