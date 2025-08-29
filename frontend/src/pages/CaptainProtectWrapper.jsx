import React, { useEffect, useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { captain, setCaptain, isLoading, setIsLoading } = useContext(CaptainDataContext);

  useEffect(() => {
    const fetchCaptain = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/captain-login');
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // backend returns { captain }
          setCaptain(response.data.captain || response.data);
        } else {
          localStorage.removeItem('token');
          navigate('/captain-login');
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem('token');
        navigate('/captain-login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaptain();
  }, [navigate, setCaptain, setIsLoading]);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
