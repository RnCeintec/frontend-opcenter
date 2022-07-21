import React, { useContext, useEffect, useState } from 'react';
import { useFetch } from '../../../hook';
import { errorAlert } from '../../../utils/alertNotify';
import Context from '../../context/context';

const withFetch = (Component) => (props) => {
  const [profileData, setProfileData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const fetchProfile = useFetch('users');
  const fetchLocal = useFetch('local');
  const { state: { isLocalSelected } } = useContext(Context);

  const getDataProfile = async () => {
    const idProfile = localStorage.getItem('id');
    try {
      const [result, status] = await fetchProfile.getById(idProfile);
      if (status === 200) {
        setProfileData(result);
      } else {
        errorAlert('No se pudo encontrar al Vendedor');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDataLocal = async () => {
    // const idLocal = JSON.parse(localStorage.getItem('localData')).id;
    try {
      const [result, status] = await fetchLocal.get('');
      if (status === 200) {
        setLocationData(result);
      } else {
        errorAlert('No se pudo encontrar al Vendedor');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataProfile();
    getDataLocal();
  }, [isLocalSelected]);

  return (
    <Component
      profileData={profileData?.result || 'loading'}
      locationData={locationData?.result || 'loading'}
      {...props}
    />
  );
};

export default withFetch;
