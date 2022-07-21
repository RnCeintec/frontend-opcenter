/* eslint-disable max-len */
import { usePagination } from '@jsiapo/use-pagination';
import { useEffect, useState } from 'react';
// import useSWR from 'swr';
import { useFetch } from '../../../../hook';
import usePaginationTest from '../../../../hook/usePaginationtest';
import { errorAlert } from '../../../../utils/alertNotify';

const withFetch = (Component) => (props) => {
  const [saleReportCount, setSaleReportCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  // const [productMutate, setProductMutate] = useState(null);
  // const [filterStatus, setFilterStatus] = useState('Cocina,Baño,Sala');

  // const { data: adminData, error: adminError, mutate: adminMutate } = useSWR(
  //   `${APIAdmin}/?limit=${limit}&offset=${pageActual}&search=${searchAdmin}`,
  // );
  const [saleReportData, setSaleReportData] = useState('loading');

  // FETCHS
  const fetchSaleReport = useFetch('SaleFechas');

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
    dataLength: saleReportCount,
    size: 4,
    isOffsetZero: true,
    // isLoading,
  });

  const getDataSaleReport = async () => {
    if (!query) return;
    setSaleReportData(null);
    try {
      const [result, status] = await fetchSaleReport.get(`?${(fechaInicio && fechaFin) ? `fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&` : ''}${query}`);
      if (status === 200) {
        setSaleReportData(result);
        setSaleReportCount(result.count || 1);
      } else {
        errorAlert('Error al cargar Ventas');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Ventas');
      setSaleReportData({ result: [] });
    }
  };

  // useEffect(() => {
  //   getDataCategories();
  // }, [categoryId, categoryListMutate]);

  useEffect(() => {
    getDataSaleReport();
  }, [fechaInicio, fechaFin, query]);

  return (
    <Component
      // setCategoryListMutate={setCategoryListMutate}
      fechaInicio={fechaInicio}
      setFechaInicio={setFechaInicio}
      fechaFin={fechaFin}
      setFechaFin={setFechaFin}
      saleReportData={saleReportData?.result || 'loading'}
      gananciaTotal={Number.isNaN(saleReportData?.ganancias) ? 0 : saleReportData?.ganancias}
      totalVentas={Number.isNaN(saleReportData?.totalVentas) ? 0 : saleReportData?.totalVentas}
      setLimit={setLimit}
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
