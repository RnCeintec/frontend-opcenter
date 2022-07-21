/* eslint-disable max-len */
import { usePagination } from '@jsiapo/use-pagination';
import { useEffect, useState } from 'react';
// import useSWR from 'swr';
import { useFetch } from '../../../../hook';
import usePaginationTest from '../../../../hook/usePaginationtest';
import { errorAlert } from '../../../../utils/alertNotify';

const withFetch = (Component) => (props) => {
  const [isLoadingSearchProducts, setIsLoadingSearchProducts] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [productsCount, setProductsCount] = useState(1);
  const [limit, setLimit] = useState(10);
  // const [pageActual, setPageActual] = useState(0);
  const [searchProduct, setSearchProduct] = useState('');
  const [productMutate, setProductMutate] = useState(null);
  const [categoryListMutate, setCategoryListMutate] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Cocina,Baño,Sala');

  // const { data: adminData, error: adminError, mutate: adminMutate } = useSWR(
  //   `${APIAdmin}/?limit=${limit}&offset=${pageActual}&search=${searchAdmin}`,
  // );
  const [productsData, setProductsData] = useState('');
  const [categoriesData, setCategoriesData] = useState('');

  // FETCHS
  const fetchProducts = useFetch('product');
  const fetchCategories = useFetch('category');

  const [idProduct, setIdProduct] = useState(-1);
  const [productByIdData, setProductByIdData] = useState(null);

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
    dataLength: productsCount,
    size: 4,
    isOffsetZero: true,
    // isLoading,
  });

  const getDataProducts = async () => {
    if (!query) return;
    try {
      const [result, status] = await fetchProducts.get(`?search=${searchProduct}&${query}`);
      // const [result, status] = await fetchProducts.post({ descripcion: searchProduct }); // ONLY FOR TEST
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
      setIsLoadingSearchProducts(false);
    }
  };

  const getDataCategories = async () => {
    try {
      const [result, status] = await fetchCategories.get('?search=&limit=all&offset=0');
      // const [result, status] = await fetchCategories.post({ descripcion: searchProduct }); // ONLY FOR TEST
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

  const getProductByIdData = async () => {
    try {
      const [result, status] = await fetchProducts.getById(idProduct);
      // const [result, status] = await fetchCategories.post({ descripcion: searchProduct }); // ONLY FOR TEST
      if (status === 200) {
        setProductByIdData(result);
      } else {
        errorAlert('Error al cargar Producto');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Producto');
      setProductByIdData([]);
    }
  };

  useEffect(() => {
    getDataCategories();
  }, [categoryId, categoryListMutate]);

  useEffect(() => {
    setProductsData(['loading']);
    getDataProducts();
    // setPageActual(0);
  }, [searchProduct, productMutate, query]);

  useEffect(() => {
    if (idProduct > -1) {
      getProductByIdData();
    }
  }, [idProduct]);

  // useEffect(() => {
  //   getDataProducts();
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
      isLoadingSearchProducts={isLoadingSearchProducts}
      setIsLoadingSearchProducts={setIsLoadingSearchProducts}
      categoryId={categoryId}
      setCategoryId={setCategoryId}
      setCategoryListMutate={setCategoryListMutate}
      // pageActual={pageActual}
      // setPageActual={setPageActual}
      productsData={productsData?.result || ['loading']}
      setProductMutate={setProductMutate}
      categoriesData={categoriesData?.result || ['loading']}
      pages={productsData?.pages || 1}
      setLimit={setLimit}
      setSearchProduct={setSearchProduct}
      searchProduct={searchProduct}
      idProduct={idProduct}
      setIdProduct={setIdProduct}
      productByIdData={productByIdData?.result || ['loading']}
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
