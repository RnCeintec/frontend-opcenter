/* eslint-disable max-len */
import { usePagination } from '@jsiapo/use-pagination';
import { useEffect, useState } from 'react';
// import useSWR from 'swr';
import { useFetch } from '../../../../hook';
import usePaginationTest from '../../../../hook/usePaginationtest';
import { errorAlert } from '../../../../utils/alertNotify';

const withFetch = (Component) => (props) => {
  const [isLoadingSearchClients, setIsLoadingSearchClients] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [clientsCount, setClientsCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageActual, setPageActual] = useState(0);
  const [searchClient, setSearchClient] = useState('');
  const [clientMutate, setClientMutate] = useState(null);
  const [categoryListMutate, setCategoryListMutate] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Cocina,Baño,Sala');

  // const { data: adminData, error: adminError, mutate: adminMutate } = useSWR(
  //   `${APIAdmin}/?limit=${limit}&offset=${pageActual}&search=${searchAdmin}`,
  // );
  const [clientsData, setClientsData] = useState('');
  const [categoriesData, setCategoriesData] = useState('');

  // FETCHS
  const fetchClients = useFetch('client');

  const [idClient, setIdClient] = useState(-1);
  const [clientByIdData, setClientByIdData] = useState(null);

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
    dataLength: clientsCount,
    size: 4,
    isOffsetZero: true,
    // isLoading,
  });

  const getDataClients = async () => {
    try {
      const [result, status] = await fetchClients.get(`?search=${searchClient}&${query}`);
      // const [result, status] = await fetchClients.post({ descripcion: searchClient }); // ONLY FOR TEST
      if (status === 200) {
        setClientsData(result);
        setClientsCount(result.count || 1);
      } else {
        errorAlert('Error al cargar Clientos');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Clientos');
      setClientsData({ result: [] });
    } finally {
      setIsLoadingSearchClients(false);
    }
  };

  const getClientByIdData = async () => {
    try {
      const [result, status] = await fetchClients.getById(idClient);
      // const [result, status] = await fetchCategories.post({ descripcion: searchClient }); // ONLY FOR TEST
      if (status === 200) {
        setClientByIdData(result);
      } else {
        errorAlert('Error al cargar Cliente');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Cliente');
      setClientByIdData([]);
    }
  };

  useEffect(() => {
    getDataClients();
    setPageActual(0);
  }, [searchClient, clientMutate, limit]);

  useEffect(() => {
    if (idClient > -1) {
      getClientByIdData();
    }
  }, [idClient]);

  useEffect(() => {
    getDataClients();
    window.scrollTo({
      top: (0, 0),
      behavior: 'smooth',
    });
  }, [pageActual]);

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
      isLoadingSearchClients={isLoadingSearchClients}
      setIsLoadingSearchClients={setIsLoadingSearchClients}
      categoryId={categoryId}
      setCategoryId={setCategoryId}
      setCategoryListMutate={setCategoryListMutate}
      pageActual={pageActual}
      setPageActual={setPageActual}
      clientsData={clientsData?.result || ['loading']}
      setClientMutate={setClientMutate}
      categoriesData={categoriesData?.result || ['loading']}
      pages={clientsData?.pages || 1}
      setLimit={setLimit}
      setSearchClient={setSearchClient}
      searchClient={searchClient}
      idClient={idClient}
      setIdClient={setIdClient}
      clientByIdData={clientByIdData?.result || ['loading']}
      filterStatus={filterStatus}
      setFilterStatus={setFilterStatus}
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
