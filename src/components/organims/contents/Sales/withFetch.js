/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useFetch } from '../../../../hook/index';
import { errorAlert } from '../../../../utils/alertNotify';

const withFetch = (Component) => (props) => {
  // PRODUCT
  const [isLoadingSearchProduct, setIsLoadingSearchProduct] = useState(false);
  const [isLoadingSearchClient, setIsLoadingSearchClient] = useState(false);
  const [searchProduct, setSearchProduct] = useState('');
  const [productsData, setProductsData] = useState(['loading']);
  const [searchType, setSearchType] = useState('desc');
  // CLIENT
  const [searchClient, setSearchClient] = useState('');
  const [clientsData, setClientsData] = useState(['loading']);
  const [clientMutate, setClientMutate] = useState(null);
  const [clientId, setClientId] = useState(0);
  const [clientDataById, setClientDataById] = useState(null);

  // PAYMENT
  const [paymentTypes, setPaymentTypes] = useState([]);

  // FETCHS
  // const fetchProducts = useFetch(searchType === 'desc' ? 'searchProductsDesc.php' : 'searchProductsCod.php');
  const fetchProducts = useFetch('product');
  const fetchClients = useFetch('client');
  const fetchPayments = useFetch('pyment');

  const searchProducts = async () => {
    // const body = searchType === 'desc' ? { descripcion: searchProduct } : { codigo: searchProduct };
    try {
      const [result, status] = await fetchProducts.get(`?search=${searchProduct}&limit=all&offset=0`);
      if (status === 200) setProductsData(result);
      else errorAlert('Error al Conectar, vuelta a intentarlo');
    } catch (error) {
      console.log(error);
      errorAlert('Error al Conectar, vuelta a intentarlo');
      setProductsData({ result: [] });
    } finally {
      setIsLoadingSearchProduct(false);
    }
  };

  const searchClients = async () => {
    // const body = { descripcion: searchClient };
    try {
      setClientsData(['loading']);
      const [result, status] = await fetchClients.get(`?search=${searchClient}&limit=all&offset=0`);
      if (status === 200) setClientsData(result);
      else errorAlert('Error al Conectar, vuelta a intentarlo');
    } catch (error) {
      console.log(error);
      errorAlert('Error al Conectar, vuelta a intentarlo');
      setClientsData({ result: [] });
    } finally {
      setIsLoadingSearchClient(false);
    }
  };

  const getClientDataById = async () => {
    // const body = { descripcion: searchClient };
    try {
      const [result, status] = await fetchClients.getById(clientId);
      if (status === 200) setClientDataById(result);
      else errorAlert('Error al Conectar, vuelta a intentarlo');
    } catch (error) {
      console.log(error);
      errorAlert('Error al Conectar, vuelta a intentarlo');
      setClientDataById({ result: [] });
    }
  };

  const getPaymentsData = async () => {
    try {
      const [result, status] = await fetchPayments.get('');
      if (status === 200) {
        setPaymentTypes(result);
        // console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentsData();
  }, []);

  useEffect(() => {
    searchProducts();
  }, [searchProduct, searchType]);

  useEffect(() => {
    if (searchClient) {
      searchClients();
    }
  }, [searchClient, clientMutate]);

  useEffect(() => {
    getClientDataById();
  }, [clientId]);

  return (
    <Component
      isLoadingSearchProduct={isLoadingSearchProduct}
      setIsLoadingSearchProduct={setIsLoadingSearchProduct}
      isLoadingSearchClient={isLoadingSearchClient}
      setIsLoadingSearchClient={setIsLoadingSearchClient}
      productsData={productsData?.result || ['loading']}
      clientsData={clientsData?.result || ['loading']}
      clientDataById={clientDataById?.result || {}}
      searchProduct={searchProduct}
      searchClient={searchClient}
      setSearchProduct={setSearchProduct}
      setSearchClient={setSearchClient}
      searchType={searchType}
      setSearchType={setSearchType}
      setClientMutate={setClientMutate}
      clientId={clientId}
      setClientId={setClientId}
      paymentTypes={paymentTypes?.result}
      {...props}
    />
  );
};

export default withFetch;
