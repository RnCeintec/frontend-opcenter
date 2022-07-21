/* eslint-disable max-len */
import { usePagination } from '@jsiapo/use-pagination';
import { useEffect, useState } from 'react';
// import useSWR from 'swr';
import { useFetch } from '../../../hook';
import usePaginationTest from '../../../hook/usePaginationtest';
// import usePaginationTest from '../../../hook/usePaginationtest';
import { errorAlert } from '../../../utils/alertNotify';

const withFetch = (Component) => (props) => {
  const [limit, setLimit] = useState(10);
  const [isLoadingSearchCategory, setIsLoadingSearchCategory] = useState(false);
  const [categoriesCount, setCategoriesCount] = useState(1);
  // const [pageActual, setPageActual] = useState(0);
  const [searchCategory, setSearchCategory] = useState('');
  const [categoryMutate, setCategoryMutate] = useState(null);

  // const { data: adminData, error: adminError, mutate: adminMutate } = useSWR(
  //   `${APIAdmin}/?limit=${limit}&offset=${pageActual}&search=${searchAdmin}`,
  // );
  const [categoryData, setCategoryData] = useState('');

  // FETCHS
  const fetchCategory = useFetch('category');

  const [idCategory, setIdCategory] = useState(0);
  const [categoryByIdData, setCategoryByIdData] = useState(null);

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
    dataLength: categoriesCount,
    size: 4,
    isOffsetZero: true,
    // isLoading,
  });

  const getDataCategories = async () => {
    // debugger;
    if (!query) return;
    try {
      const [result, status] = await fetchCategory.get(`?search=${searchCategory}&${query}`);
      if (status === 200) {
        // console.log(result);
        setCategoryData(result);
        setCategoriesCount(result.count || 1);
      } else {
        errorAlert('Error al cargar Categorias');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Categorias');
      setCategoryData({ result: [] });
      setCategoriesCount({ count: 1 });
    } finally {
      setIsLoadingSearchCategory(false);
    }
  };

  const getCategoryByIdData = async () => {
    try {
      const [result, status] = await fetchCategory.getById(idCategory);
      if (status === 200) {
        setCategoryByIdData(result);
      } else {
        errorAlert('Error al cargar Categorias');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Categorias');
      setCategoryByIdData({ result: [] });
      setCategoriesCount({ count: 1 });
    }
  };

  useEffect(() => {
    setCategoryData(['loading']);
    getDataCategories();
    // setPageActual(0);
  }, [searchCategory, categoryMutate, query]);

  useEffect(() => {
    if (idCategory > 0) {
      getCategoryByIdData();
    }
  }, [idCategory]);

  // useEffect(() => {
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
      // pageActual={pageActual}
      // setPageActual={setPageActual}
      isLoadingSearchCategory={isLoadingSearchCategory}
      setIsLoadingSearchCategory={setIsLoadingSearchCategory}
      categoryData={categoryData?.result || ['loading']}
      setCategoryMutate={setCategoryMutate}
      // pages={categoryData?.pages || 1}
      setLimit={setLimit}
      setSearchCategory={setSearchCategory}
      searchCategory={searchCategory}
      idCategory={idCategory}
      setIdCategory={setIdCategory}
      categoryByIdData={categoryByIdData?.result || ['loading']}
      page={page || 1}
      pageRange={pageRange}
      nextPage={nextPage}
      previusPage={previusPage}
      jumpToPage={jumpToPage}
      jumpToFirstPage={jumpToFirstPage}
      jumpToLastPage={jumpToLastPage}
      lastPage={lastPage}
      isLoading
      {...props}
    />
  );
};

export default withFetch;
