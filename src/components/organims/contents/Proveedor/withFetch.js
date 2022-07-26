/* eslint-disable max-len */
import { usePagination } from '@jsiapo/use-pagination';
import { useEffect, useState } from 'react';
// import useSWR from 'swr';
import { useFetch } from '../../../../hook';
import usePaginationTest from '../../../../hook/usePaginationtest';
import { errorAlert } from '../../../../utils/alertNotify';

const withFetch = (Component) => (props) => {
  const [isLoadingSearchProveedor, setIsLoadingSearchProveedor] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [proveedorCount, setProveedorCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageActual, setPageActual] = useState(0);
  const [searchProveedor, setSearchProveedor] = useState('');
  const [proveedorMutate, setProveedorMutate] = useState(null);
  const [categoryListMutate, setCategoryListMutate] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Cocina,Baño,Sala');

  // const { data: adminData, error: adminError, mutate: adminMutate } = useSWR(
  //   `${APIAdmin}/?limit=${limit}&offset=${pageActual}&search=${searchAdmin}`,
  // );
  const [proveedorData, setProveedorData] = useState('');
  const [categoriesData, setCategoriesData] = useState('');

  // FETCHS
  const fetchProveedor = useFetch('proveedor');

  const [idProveedor, setIdProveedor] = useState(-1);
  const [proveedorByIdData, setProveedorByIdData] = useState(null);

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
    dataLength: proveedorCount,
    size: 4,
    isOffsetZero: true,
    // isLoading,
  });

  const getDataProveedor = async () => {
    try {
      const [result, status] = await fetchProveedor.get(`?search=${searchProveedor}&${query}`);
      // const [result, status] = await fetchProveedor.post({ descripcion: searchProveedor }); // ONLY FOR TEST
      if (status === 200) {
        setProveedorData(result);
        setProveedorCount(result.count || 1);
      } else {
        errorAlert('Error al cargar Vendedores');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Vendedores');
      setProveedorData({ result: [] });
    } finally {
      setIsLoadingSearchProveedor(false);
    }
  };

  const getProveedorByIdData = async () => {
    try {
      const [result, status] = await fetchProveedor.getById(idProveedor);
      // const [result, status] = await fetchCategories.post({ descripcion: searchProveedor }); // ONLY FOR TEST
      if (status === 200) {
        setProveedorByIdData(result);
      } else {
        errorAlert('Error al cargar Proveedor');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Proveedor');
      setProveedorByIdData([]);
    }
  };

  useEffect(() => {
    getDataProveedor();
    setPageActual(0);
  }, [searchProveedor, proveedorMutate, limit]);

  useEffect(() => {
    if (idProveedor > -1) {
      getProveedorByIdData();
    }
  }, [idProveedor]);

  useEffect(() => {
    getDataProveedor();
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
      isLoadingSearchProveedor={isLoadingSearchProveedor}
      setIsLoadingSearchProveedor={setIsLoadingSearchProveedor}
      categoryId={categoryId}
      setCategoryId={setCategoryId}
      setCategoryListMutate={setCategoryListMutate}
      pageActual={pageActual}
      setPageActual={setPageActual}
      proveedorData={proveedorData?.result || ['loading']}
      setProveedorMutate={setProveedorMutate}
      categoriesData={categoriesData?.result || ['loading']}
      pages={proveedorData?.pages || 1}
      setLimit={setLimit}
      setSearchProveedor={setSearchProveedor}
      searchProveedor={searchProveedor}
      idProveedor={idProveedor}
      setIdProveedor={setIdProveedor}
      proveedorByIdData={proveedorByIdData?.result || ['loading']}
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
