/* eslint-disable max-len */
import { usePagination } from '@jsiapo/use-pagination';
import { useEffect, useState } from 'react';
// import useSWR from 'swr';
import { useFetch } from '../../../../hook';
import usePaginationTest from '../../../../hook/usePaginationtest';
import { errorAlert } from '../../../../utils/alertNotify';

const withFetch = (Component) => (props) => {
  // const [isLoadingSearchProducts, setIsLoadingSearchProducts] = useState(false);
  const [billingCount, setBillingCount] = useState(1);
  const [filterBillingType, setFilterBillingType] = useState('Boleta,Factura');
  const [limit, setLimit] = useState(10);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [billingData, setBillingData] = useState('');
  const [billingMutate, setBillingMutate] = useState(null);

  // const { data: adminData, error: adminError, mutate: adminMutate } = useSWR(
  //   `${APIAdmin}/?limit=${limit}&offset=${pageActual}&search=${searchAdmin}`,
  // );
  // const [categoriesData, setCategoriesData] = useState('');

  // FETCHS
  const fetchBilling = useFetch('facturas');

  // const [idBilling, setIdBilling] = useState(-1);
  // const [billingByIdData, setBillingByIdData] = useState(null);

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
    dataLength: billingCount,
    size: 4,
    isOffsetZero: true,
    // isLoading,
  });

  const getDataBilling = async () => {
    if (!query) return;
    // const filterBoleta = filterBillingType.indexOf('Boleta') !== -1 ? 1 : 0;
    // const filterFactura = filterBillingType.indexOf('Factura') !== -1 ? 1 : 0;
    try {
      const [result, status] = await fetchBilling.get(
        // `?${(fechaInicio && fechaFin) ? `fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&` : ''}boleta=${filterBoleta}&factura=${filterFactura}&${query}`, // WITH FILTER
        `?${(fechaInicio && fechaFin) ? `fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&` : ''}&${query}`,
      );
      if (status === 200) {
        setBillingData(result);
        setBillingCount(result.count || 1);
      } else {
        errorAlert('Error al cargar Comprobantes');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Comprobantes');
      setBillingData({ result: [] });
    }
  };

  // const getBillingByIdData = async () => {
  //   try {
  //     const [result, status] = await fetchBilling.getById(idBilling);
  //     // const [result, status] = await fetchCategories.post({ descripcion: searchProduct }); // ONLY FOR TEST
  //     if (status === 200) {
  //       setBillingByIdData(result);
  //     } else {
  //       errorAlert('Error al cargar Comprobantes');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     errorAlert('Error al cargar Comprobantes');
  //     setBillingByIdData([]);
  //   }
  // };

  useEffect(() => {
    getDataBilling();
  }, [billingMutate, fechaInicio, fechaFin, filterBillingType, query]);

  // useEffect(() => {
  //   getDataCategories();
  // }, [categoryId, categoryListMutate]);

  // useEffect(() => {
  //   if (idBilling > -1) {
  //     getBillingByIdData();
  //   }
  // }, [idBilling]);

  // useEffect(() => {
  //   getDataBilling();
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
      setFechaInicio={setFechaInicio}
      setFechaFin={setFechaFin}
      billingData={billingData?.result || ['loading']}
      setBillingMutate={setBillingMutate}
      setLimit={setLimit}
      // idBilling={idBilling}
      // setIdBilling={setIdBilling}
      // billingByIdData={billingByIdData?.result || ['loading']}
      filterBillingType={filterBillingType}
      setFilterBillingType={setFilterBillingType}
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
