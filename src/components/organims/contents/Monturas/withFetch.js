/* eslint-disable max-len */
import { usePagination } from '@jsiapo/use-pagination';
import { useEffect, useState } from 'react';
// import useSWR from 'swr';
import { useFetch } from '../../../../hook';
import usePaginationTest from '../../../../hook/usePaginationtest';
import { errorAlert } from '../../../../utils/alertNotify';

const withFetch = (Component) => (props) => {
  const [isLoadingSearchMonturas, setIsLoadingSearchMonturas] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [monturasCount, setMonturasCount] = useState(1);
  const [limit, setLimit] = useState(10);
  // const [pageActual, setPageActual] = useState(0);
  const [searchMontura, setSearchMontura] = useState('');
  const [monturasMutate, setMonturasMutate] = useState(null);
  const [categoryListMutate, setCategoryListMutate] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Cocina,Baño,Sala');

  // const { data: adminData, error: adminError, mutate: adminMutate } = useSWR(
  //   `${APIAdmin}/?limit=${limit}&offset=${pageActual}&search=${searchAdmin}`,
  // );
  const [monturasData, setMonturasData] = useState('');
  const [categoriesData, setCategoriesData] = useState('');

  // FETCHS
  const fetchMonturas = useFetch('monturas');
  const fetchCategories = useFetch('category');

  const [idMontura, setIdMonturas] = useState(-1);
  const [monturasByIdData, setMonturasByIdData] = useState(null);

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
    dataLength: monturasCount,
    size: 4,
    isOffsetZero: true,
    // isLoading,
  });

  const getDataMonturas = async () => {
    if (!query) return;
    try {
      const [result, status] = await fetchMonturas.get(`?search=${searchMontura}&${query}`);
      // const [result, status] = await fetchMonturas.post({ descripcion: searchMontura }); // ONLY FOR TEST
      if (status === 200) {
        setMonturasData(result);
        setMonturasCount(result.count || 1);
      } else {
        errorAlert('Error al cargar Monturas');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Monturas');
      setMonturasData({ result: [] });
    } finally {
      setIsLoadingSearchMonturas(false);
    }
  };

  const getDataCategories = async () => {
    try {
      const [result, status] = await fetchCategories.get('?search=&limit=all&offset=0');
      // const [result, status] = await fetchCategories.post({ descripcion: searchMontura }); // ONLY FOR TEST
      if (status === 200) {
        setCategoriesData(result);
      } else {
        errorAlert('Error al cargar Categorias');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Categorias');
      setCategoriesData({ result: [] });
    }
  };

  const getMonturasByIdData = async () => {
    try {
      const [result, status] = await fetchMonturas.getById(idMontura);
      // const [result, status] = await fetchCategories.post({ descripcion: searchMontura }); // ONLY FOR TEST
      if (status === 200) {
        setMonturasByIdData(result);
      } else {
        errorAlert('Error al cargar Montura');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Montura');
      setMonturasByIdData([]);
    }
  };

  useEffect(() => {
    getDataCategories();
  }, [categoryId, categoryListMutate]);

  useEffect(() => {
    setMonturasData(['loading']);
    getDataMonturas();
    // setPageActual(0);
  }, [searchMontura, monturasMutate, query]);

  useEffect(() => {
    if (idMontura > -1) {
      getMonturasByIdData();
    }
  }, [idMontura]);

  // useEffect(() => {
  //   getDataMonturas();
  //   window.scrollTo({
  //     top: (0, 0),
  //     behavior: 'smooth',
  //   });
  // }, [pageActual]);

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
      isLoadingSearchMonturas={isLoadingSearchMonturas}
      setIsLoadingSearchMonturas={setIsLoadingSearchMonturas}
      categoryId={categoryId}
      setCategoryId={setCategoryId}
      setCategoryListMutate={setCategoryListMutate}
      // pageActual={pageActual}
      // setPageActual={setPageActual}
      monturasData={monturasData?.result || ['loading']}
      setMonturasMutate={setMonturasMutate}
      categoriesData={categoriesData?.result || ['loading']}
      pages={monturasData?.pages || 1}
      setLimit={setLimit}
      setSearchMontura={setSearchMontura}
      searchMontura={searchMontura}
      idMontura={idMontura}
      setIdMonturas={setIdMonturas}
      monturasByIdData={monturasByIdData?.result || ['loading']}
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
