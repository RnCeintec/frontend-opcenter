/* eslint-disable max-len */
import { usePagination } from '@jsiapo/use-pagination';
import { useEffect, useState } from 'react';
// import useSWR from 'swr';
import { useFetch } from '../../../../hook';
import usePaginationTest from '../../../../hook/usePaginationtest';
import { errorAlert } from '../../../../utils/alertNotify';
//
const withFetch = (Component) => (props) => {
    const [isLoadingSearchLaboratorio, setIsLoadingSearchLaboratorio] = useState(false);
    const [categoryId, setCategoryId] = useState(0);
    const [nivelLaboratorioId, setNivelLaboratorioId] = useState(0);
    const [laboratorioCount, setLaboratorioCount] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pageActual, setPageActual] = useState(0);
    const [searchLaboratorio, setSearchLaboratorio] = useState('');
    const [laboratorioMutate, setLaboratorioMutate] = useState(null);
    const [nivelLaboratorioListMutate, setNivelLaboratorioListMutate] = useState(null);
    const [categoryListMutate, setCategoryListMutate] = useState(null);
    const [filterStatus, setFilterStatus] = useState('Cocina,Baño,Sala');
    const [proveedorData, setProveedorData] = useState('');
    const [nivelLaboratorioData, setNivelLaboratorioData] = useState('');

    // const { data: adminData, error: adminError, mutate: adminMutate } = useSWR(
    //   `${APIAdmin}/?limit=${limit}&offset=${pageActual}&search=${searchAdmin}`,
    // );
    const [laboratorioData, setLaboratorioData] = useState('');
    const [categoriesData, setCategoriesData] = useState('');
  
    // FETCHS
    const fetchLaboratorio = useFetch('laboratorio');
    const fetchProveedor = useFetch('proveedor');
    const fetchNivelLaboratorio = useFetch('nivellaboratorio');
  
    const [idLaboratorio, setIdLaboratorio] = useState(-1);
    const [laboratorioByIdData, setLaboratorioByIdData] = useState(null);
  
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
      dataLength: laboratorioCount,
      size: 4,
      isOffsetZero: true,
      // isLoading,
    });
  
    const getDataCategories = async () => {
      try {
        const [result, status] = await fetchProveedor.get('?search=&limit=all&offset=0');
        // const [result, status] = await fetchProveedor.post({ descripcion: searchMontura }); // ONLY FOR TEST
        if (status === 200) {
          setProveedorData(result);
        } else {
          errorAlert('Error al cargar Categorias');
        }
      } catch (error) {
        console.log(error);
        errorAlert('Error al cargar Categorias');
        setProveedorData({ result: [] });
      }
    };
    const getDataNivelLaboratorio = async () => {
      try {
        const [result, status] = await fetchNivelLaboratorio.get('?search=&limit=all&offset=0');
        // const [result, status] = await fetchProveedor.post({ descripcion: searchMontura }); // ONLY FOR TEST
        if (status === 200) {
          setNivelLaboratorioData(result);
        } else {
          errorAlert('Error al cargar Categorias');
        }
      } catch (error) {
        console.log(error);
        errorAlert('Error al cargar Categorias');
        setNivelLaboratorioData({ result: [] });
      }
    };
    const getDataLaboratorio = async () => {
      try {
        const [result, status] = await fetchLaboratorio.get(`?search=${searchLaboratorio}&${query}`);
        // const [result, status] = await fetchLaboratorio.post({ descripcion: searchLaboratorio }); // ONLY FOR TEST
        if (status === 200) {
          setLaboratorioData(result);
          setLaboratorioCount(result.count || 1);
        } else {
          errorAlert('Error al cargar Laboratorios');
        }
      } catch (error) {
        console.log(error);
        errorAlert('Error al cargar Laboratorios');
        setLaboratorioData({ result: [] });
      } finally {
        setIsLoadingSearchLaboratorio(false);
      }
    };
  
    const getLaboratorioByIdData = async () => {
      try {
        const [result, status] = await fetchLaboratorio.getById(idLaboratorio);
        // const [result, status] = await fetchCategories.post({ descripcion: searchLaboratorio }); // ONLY FOR TEST
        if (status === 200) {
          setLaboratorioByIdData(result);
        } else {
          errorAlert('Error al cargar Laboratorio');
        }
      } catch (error) {
        console.log(error);
        errorAlert('Error al cargar Laboratorio');
        setLaboratorioByIdData([]);
      }
    };
    useEffect(() => {
      getDataCategories();
    }, [categoryId, categoryListMutate]);

    useEffect(() => {
      getDataNivelLaboratorio();
    }, [nivelLaboratorioId, nivelLaboratorioListMutate]);
  
    useEffect(() => {
      getDataLaboratorio();
      setPageActual(0);
    }, [searchLaboratorio, laboratorioMutate, limit]);
  
    useEffect(() => {
      if (idLaboratorio > -1) {
        getLaboratorioByIdData();
      }
    }, [idLaboratorio]);
  
    useEffect(() => {
      getDataLaboratorio();
      window.scrollTo({
        top: (0, 0),
        behavior: 'smooth',
      });
    }, [pageActual]);

    return (
        <Component
          isLoadingSearchLaboratorio={isLoadingSearchLaboratorio}
          setIsLoadingSearchLaboratorio={setIsLoadingSearchLaboratorio}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          setCategoryListMutate={setCategoryListMutate}
          nivelLaboratorioId={nivelLaboratorioId}
          setNivelLaboratorioId={setNivelLaboratorioId}
          setNivelLaboratorioListMutate={setNivelLaboratorioListMutate}
          pageActual={pageActual}
          setPageActual={setPageActual}
          laboratorioData={laboratorioData?.result || ['loading']}
          setLaboratorioMutate={setLaboratorioMutate}
          categoriesData={categoriesData?.result || ['loading']}
          pages={laboratorioData?.pages || 1}
          setLimit={setLimit}
          setSearchLaboratorio={setSearchLaboratorio}
          searchLaboratorio={searchLaboratorio}
          idLaboratorio={idLaboratorio}
          setIdLaboratorio={setIdLaboratorio}
          laboratorioByIdData={laboratorioByIdData?.result || ['loading']}
          filterStatus={filterStatus}
          proveedorData={proveedorData?.result || ['loading']}
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
    