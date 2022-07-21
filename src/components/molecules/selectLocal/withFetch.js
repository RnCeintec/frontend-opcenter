import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../hook';
import { errorAlert } from '../../../utils/alertNotify';

const withFetch = (Component) => (props) => {
  const [localData, setLocalData] = useState(null);
  const fetchLocal = useFetch('local');

  const getDataLocal = async () => {
    try {
      const [result, status] = await fetchLocal.get('');
      if (status === 200) {
        setLocalData(result.result ? result : { result: [] });
      } else {
        errorAlert('Error al cargar Locales');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Locales');
      setLocalData({ result: [] });
    }
  };

  useEffect(() => {
    getDataLocal();
  }, []);

  return (
    <Component
      localData={localData?.result || ['Loading']}
      {...props}
    />
  );
};

export default withFetch;
