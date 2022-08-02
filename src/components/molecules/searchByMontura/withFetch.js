/* eslint-disable max-len */
import { usePagination } from '@jsiapo/use-pagination';
import { useEffect, useState } from 'react';
import { useFetch } from '../../../hook';
import usePaginationTest from '../../../hook/usePaginationtest';
import { errorAlert } from '../../../utils/alertNotify';

const withFetch = (Component) => (props) => {
  const [isLoadingSearchMontura, setIsLoadingSearchMontura] = useState(false);
  const [isLoadingSearchProduct, setIsLoadingSearchProduct] = useState(false);
  const [categoryActive, setMonturaActive] = useState('');
  const [searchMontura, setSearchMontura] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [monturasData, setMonturaData] = useState(null);
  const [productsData, setProductsData] = useState({ result: [] });
  const [limitProduct, setLimitProduct] = useState(10);
  const [productsCount, setProductsCount] = useState(1);
  const fetchSearchMontura = useFetch('monturas');
  const fetchSearchProduct = useFetch('product');

  const getDataMonturas = async () => {
    try {
      const [result, status] = await fetchSearchMontura.get(`?search=${searchMontura}&limit=all&offset=0`);
      if (status === 200) {
        setMonturaData(result);
      } else {
        errorAlert('Error al cargar Monturas');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Monturas');
      setMonturaData({ result: [] });
    } finally {
      setIsLoadingSearchMontura(false);
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
      const [result, status] = await fetchSearchProduct.get(`?search=${searchProduct}&category=${categoryActive}&${query}`);
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
    getDataMonturas();
  }, [searchMontura]);

  useEffect(() => {
    if (searchMontura) {
      getDataProducts();
    }
  }, [categoryActive, searchProduct, query]);

  return (
    <Component
      isLoadingSearchMontura={isLoadingSearchMontura}
      setIsLoadingSearchMontura={setIsLoadingSearchMontura}
      isLoadingSearchProduct={isLoadingSearchProduct}
      setIsLoadingSearchProduct={setIsLoadingSearchProduct}
      categoryActive={categoryActive}
      setMonturaActive={setMonturaActive}
      monturasData={monturasData?.result || ['loading']}
      productsData={productsData?.result || ['loading']}
      searchMontura={searchMontura}
      searchProduct={searchProduct}
      setSearchMontura={setSearchMontura}
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
