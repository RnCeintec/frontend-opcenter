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

  // const { data: adminData, error: adminError, mutate: adminMutate } = useSWR(
  //   `${APIAdmin}/?limit=${limit}&offset=${pageActual}&search=${searchAdmin}`,
  // );
  const [vendedorData, setVendedorData] = useState('');
  const [categoriesData, setCategoriesData] = useState('');

  // FETCHS
  const fetchVendedor = useFetch('vendedor');

  const [idVendedor, setIdVendedor] = useState(-1);
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
      setPageActual={setPageActual}
      vendedorData={vendedorData?.result || ['loading']}
      setVendedorMutate={setVendedorMutate}
      categoriesData={categoriesData?.result || ['loading']}
      pages={vendedorData?.pages || 1}
      setLimit={setLimit}
      setSearchVendedor={setSearchVendedor}
      searchVendedor={searchVendedor}
      idVendedor={idVendedor}
      setIdVendedor={setIdVendedor}
      vendedorByIdData={vendedorByIdData?.result || ['loading']}
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
