/* eslint-disable max-len */
import { usePagination } from '@jsiapo/use-pagination';
import { useEffect, useState } from 'react';
import { useFetch } from '../../../hook';
import usePaginationTest from '../../../hook/usePaginationtest';
import { errorAlert } from '../../../utils/alertNotify';

const withFetch = (Component) => (props) => {
  const [isLoadingSearchCategory, setIsLoadingSearchCategory] = useState(false);
  const [isLoadingSearchProduct, setIsLoadingSearchProduct] = useState(false);
  const [categoryActive, setCategoryActive] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [categoriesData, setCategoriesData] = useState(null);
  const [productsData, setProductsData] = useState({ result: [] });
  const [limitProduct, setLimitProduct] = useState(10);
  const [productsCount, setProductsCount] = useState(1);
  const fetchSearchCategory = useFetch('category');
  const fetchSearchProduct = useFetch('product');

  const getDataCategories = async () => {
    try {
      const [result, status] = await fetchSearchCategory.get(`?search=${searchCategory}&limit=all&offset=0`);
      if (status === 200) {
        setCategoriesData(result);
      } else {
        errorAlert('Error al cargar Categorias');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Categorias');
      setCategoriesData({ result: [] });
    } finally {
      setIsLoadingSearchCategory(false);
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
    getDataCategories();
  }, [searchCategory]);

  useEffect(() => {
    if (searchCategory) {
      getDataProducts();
    }
  }, [categoryActive, searchProduct, query]);

  return (
    <Component
      isLoadingSearchCategory={isLoadingSearchCategory}
      setIsLoadingSearchCategory={setIsLoadingSearchCategory}
      isLoadingSearchProduct={isLoadingSearchProduct}
      setIsLoadingSearchProduct={setIsLoadingSearchProduct}
      categoryActive={categoryActive}
      setCategoryActive={setCategoryActive}
      categoriesData={categoriesData?.result || ['loading']}
      productsData={productsData?.result || ['loading']}
      searchCategory={searchCategory}
      searchProduct={searchProduct}
      setSearchCategory={setSearchCategory}
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
