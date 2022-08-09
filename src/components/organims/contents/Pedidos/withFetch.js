/* eslint-disable max-len */
import { usePagination } from '@jsiapo/use-pagination';
import { useEffect, useState } from 'react';
// import useSWR from 'swr';
import { useFetch } from '../../../../hook';
import usePaginationTest from '../../../../hook/usePaginationtest';
import { errorAlert } from '../../../../utils/alertNotify';

const withFetch = (Component) => (props) => {
  const [isLoadingSearchVendedor, setIsLoadingSearchVendedor] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [vendedorCount, setVendedorCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageActual, setPageActual] = useState(0);
  const [searchVendedor, setSearchVendedor] = useState('');
  const [vendedorMutate, setVendedorMutate] = useState(null);
  const [categoryListMutate, setCategoryListMutate] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Cocina,Baño,Sala');
  const [isLoadingSearchClient, setIsLoadingSearchClient] = useState(false);

  // const { data: adminData, error: adminError, mutate: adminMutate } = useSWR(
  //   `${APIAdmin}/?limit=${limit}&offset=${pageActual}&search=${searchAdmin}`,
  // );
  const [vendedorData, setVendedorData] = useState('');
  const [categoriesData, setCategoriesData] = useState('');

    // CLIENT
    const [searchClient, setSearchClient] = useState('');
    const [clientsData, setClientsData] = useState(['loading']);
    const [clientMutate, setClientMutate] = useState(null);
    const [clientId, setClientId] = useState(0);
    const [clientDataById, setClientDataById] = useState(null);
  // FETCHS
  const fetchVendedor = useFetch('diotrias');
  const fetchClients = useFetch('client');

  // const [idVendedor, setIdVendedor] = useState(-1);
  const [idVendedor, setIdVendedor] = useState(0);

  const [vendedorByIdData, setVendedorByIdData] = useState(null);

  const {
    page,
    query,
    pageRange,
    lastPage,
    nextPage,
    previusPage,
    jumpToPage,
    jumpToFirstPage,
    jumpToLastPage,
  } = usePagination({
    itemsPerPage: limit,
    dataLength: vendedorCount,
    size: 4,
    isOffsetZero: true,
    // isLoading,
  });

  
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


  const getDataVendedor = async () => {
    try {
      const [result, status] = await fetchVendedor.get(`?search=${searchVendedor}&${query}`);
      // const [result, status] = await fetchVendedor.post({ descripcion: searchVendedor }); // ONLY FOR TEST
      if (status === 200) {
        setVendedorData(result);
        setVendedorCount(result.count || 1);
      } else {
        errorAlert('Error al cargar Vendedores');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Vendedores');
      setVendedorData({ result: [] });
    } finally {
      setIsLoadingSearchVendedor(false);
    }
  };

  const getVendedorByIdData = async () => {
    try {
      const [result, status] = await fetchVendedor.getById(idVendedor);
      // const [result, status] = await fetchCategories.post({ descripcion: searchVendedor }); // ONLY FOR TEST
      if (status === 200) {
        setVendedorByIdData(result);
      } else {
        errorAlert('Error al cargar Vendedor');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Vendedor');
      setVendedorByIdData([]);
    }
  };

  useEffect(() => {
    getDataVendedor();
    setPageActual(0);
  }, [searchVendedor, vendedorMutate, limit]);

  useEffect(() => {
    if (idVendedor > -1) {
      getVendedorByIdData();
    }
  }, [idVendedor]);

  useEffect(() => {
    getDataVendedor();
    window.scrollTo({
      top: (0, 0),
      behavior: 'smooth',
    });
  }, [pageActual]);

  useEffect(() => {
    if (searchClient) {
      searchClients();
    }
  }, [searchClient, clientMutate]);

  useEffect(() => {
    getClientDataById();
  }, [clientId]);
  // const {
  //   data: adminByIdData,
  //   error: adminByIdError,
  //   mutate: adminByIdMutate,
  // } = useSWR(
  //   idAdmin !== -1
  //     ? `${APIAdmin}/${idAdmin}`
  //     : null,
  // );

  return (
    
    <Component
      isLoadingSearchVendedor={isLoadingSearchVendedor}
      setIsLoadingSearchVendedor={setIsLoadingSearchVendedor}
      categoryId={categoryId}
      setCategoryId={setCategoryId}
      setCategoryListMutate={setCategoryListMutate}
      pageActual={pageActual}
      clientsData={clientsData?.result || ['loading']}

      clientDataById={clientDataById?.result || {}}

      searchClient={searchClient}

      setSearchClient={setSearchClient}

      setClientMutate={setClientMutate}

      clientId={clientId}

      setClientId={setClientId}

      setPageActual={setPageActual}
      vendedorData={vendedorData?.result || ['loading']}
      setVendedorMutate={setVendedorMutate}
      categoriesData={categoriesData?.result || ['loading']}
      pages={vendedorData?.pages || 1}
      setLimit={setLimit}
      vendedorByIdData={vendedorByIdData?.result || ['loading']}
      setSearchVendedor={setSearchVendedor}
      searchVendedor={searchVendedor}
      idVendedor={idVendedor}
      setIdVendedor={setIdVendedor}
      filterStatus={filterStatus}
      setFilterStatus={setFilterStatus}
      setIsLoadingSearchClient={setIsLoadingSearchClient}
      isLoadingSearchClient={isLoadingSearchClient}
      page={page || 1}
      pageRange={pageRange}
      lastPage={lastPage}
      nextPage={nextPage}
      previusPage={previusPage}
      jumpToPage={jumpToPage}
      jumpToFirstPage={jumpToFirstPage}
      jumpToLastPage={jumpToLastPage}
      {...props}
    />
  );
};

export default withFetch;
