// import useSWR from 'swr';
import { useContext, useEffect, useState } from 'react';
// import { APIDashboard } from '../../../../API/endpoint';
import { useFetch } from '../../../../hook/index';
import Context from '../../../context/context';

const withFetch = (Component) => (props) => {
  const { state: { isLocalSelected } } = useContext(Context);

  const [dataDashboard, setDataDashboard] = useState('loading');
  const fetchDashboard = useFetch('dashboard');

  // const { data: dataDashboard, error: errorDashboard } = useSWR(
  //   `${APIDashboard}`,
  // );

  const getData = async () => {
    try {
      const [result, status] = await fetchDashboard.get('');
      if (status === 200) {
        setDataDashboard(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLocalSelected) { getData(); }
  }, [isLocalSelected]);

  // console.log(localData);

  return (
    <Component
      dataDashboard={dataDashboard || 'Loading'}
      // DashboardError={errorDashboard}
      {...props}
    />
  );
};

export default withFetch;
