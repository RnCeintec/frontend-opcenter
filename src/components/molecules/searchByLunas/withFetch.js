/* eslint-disable max-len */
import { usePagination } from '@jsiapo/use-pagination';
import { useEffect, useState } from 'react';
import { useFetch } from '../../../hook';
import usePaginationTest from '../../../hook/usePaginationtest';
import { errorAlert } from '../../../utils/alertNotify';

const withFetch = (Component) => (props) => {
  const [isLoadingSearchLunas, setIsLoadingSearchLunas] = useState(false);
  const [isLoadingSearchProduct, setIsLoadingSearchProduct] = useState(false);
  const [lunasActive, setLunasActive] = useState('');
  const [searchLunas, setSearchLunas] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [lunasData, setLunasData] = useState(null);
  const [productsData, setProductsData] = useState({ result: [] });
  const [limitProduct, setLimitProduct] = useState(10);
  const [productsCount, setProductsCount] = useState(1);
  const fetchSearchLunas = useFetch('lunas');
  const fetchSearchProduct = useFetch('product');

  const getDataLunas = async () => {
    try {
      const [result, status] = await fetchSearchLunas.get(`?search=${searchLunas}&limit=all&offset=0`);
      if (status === 200) {
        setLunasData(result);
      } else {
        errorAlert('Error al cargar Categorias');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Categorias');
      setLunasData({ result: [] });
    } finally {
      setIsLoadingSearchLunas(false);
    }
  };

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
    itemsPerPage: limitProduct,
    dataLength: productsCount,
    size: 4,
    isOffsetZero: true,
    // isLoading,
  });

  const getDataProducts = async () => {
    try {
      const [result, status] = await fetchSearchProduct.get(`?search=${searchProduct}&lunas=${lunasActive}&${query}`);
      if (status === 200) {
        setProductsData(result);
        setProductsCount(result.count || 1);
      } else {
        errorAlert('Error al cargar Productos');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Productos');
      setProductsData({ result: [] });
    } finally {
      setIsLoadingSearchProduct(false);
    }
  };

  useEffect(() => {
    getDataLunas();
  }, [searchLunas]);

  useEffect(() => {
    if (searchLunas) {
      getDataProducts();
    }
  }, [lunasActive, searchProduct, query]);

  return (
    <Component
      isLoadingSearchLunas={isLoadingSearchLunas}
      setIsLoadingSearchLunas={setIsLoadingSearchLunas}
      isLoadingSearchProduct={isLoadingSearchProduct}
      setIsLoadingSearchProduct={setIsLoadingSearchProduct}
      lunasActive={lunasActive}
      setLunasActive={setLunasActive}
      lunasData={lunasData?.result || ['loading']}
      productsData={productsData?.result || ['loading']}
      searchLunas={searchLunas}
      searchProduct={searchProduct}
      setSearchLunas={setSearchLunas}
      setSearchProduct={setSearchProduct}
      limitProduct={limitProduct}
      setLimitProduct={setLimitProduct}
      page={page || 1}
      pageRange={pageRange}
      nextPage={nextPage}
      previusPage={previusPage}
      jumpToPage={jumpToPage}
      jumpToFirstPage={jumpToFirstPage}
      jumpToLastPage={jumpToLastPage}
      lastPage={lastPage}
      {...props}
    />
  );
};

export default withFetch;
