/* eslint-disable max-len */
import { usePagination } from '@jsiapo/use-pagination';
import { useEffect, useState } from 'react';
import { useFetch } from '../../../../hook';
import usePaginationTest from '../../../../hook/usePaginationtest';
import { errorAlert } from '../../../../utils/alertNotify';

const withFetch = (Component) => (props) => {
    const [isLoadingSearchLocal, setIsLoadingSearchLocal] = useState(false);
    const [localCount, setLocalCount] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchShop, setSearchLocal] = useState('');
    const [localMutate, setLocalMutate] = useState(null);
    const [filterStatus, setFilterStatus] = useState('Mercaderes,Virrey');
    const [localData, setLocalData] = useState('');
  
    // FETCHS
    const fetchLocal = useFetch('local');
    //const fetchCategories = useFetch('category');
  
    const [idLocal, setIdLocal] = useState(-1);
    const [localByIdData, setLocalByIdData] = useState(null);
  
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
      dataLength: localCount,
      size: 4,
      isOffsetZero: true,
      // isLoading,
    });

    const getDataLocal = async () => {
        if (!query) return;
        try {
          const [result, status] = await fetchLocal.get(`?search=${searchShop}&${query}`);
          //* const [result, status] = await fetchLocal.post({ descripcion: searchShop }); // ONLY FOR TEST
          if (status === 200) {
            setLocalData(result);
            setLocalCount(result.count || 1);
          } else {
            errorAlert('Error al cargar Local');
          }
        } catch (error) {
          console.log(error);
          errorAlert('Error al cargar Local');
          setLocalData({ result: [] });
        } finally {
          setIsLoadingSearchLocal(false);
        }
      };

      const getLocalByIdData = async () => {
        try {
          const [result, status] = await fetchLocal.getById(idLocal);
          // const [result, status] = await fetchCategories.post({ descripcion: searchShop }); // ONLY FOR TEST
          if (status === 200) {
            setLocalByIdData(result);
          } else {
            errorAlert('Error al cargar Local');
          }
        } catch (error) {
          console.log(error);
          errorAlert('Error al cargar Local');
          setLocalByIdData([]);
        }
      };

      useEffect(() => {
        setLocalData(['loading']);
        getDataLocal();
        
      }, [searchShop, localMutate, filterStatus, query]);
      
      useEffect(() => {
        if (idLocal > -1) {
          getLocalByIdData();
        }
      }, [idLocal]);

      return (
        <Component
          isLoadingSearchLocal={isLoadingSearchLocal}
          setIsLoadingSearchLocal={setIsLoadingSearchLocal}
          localData={localData?.result || ['loading']}
          setLocalMutate={setLocalMutate}
           pages={localData?.pages || 1}
          setLimit={setLimit}
          setSearchLocal={setSearchLocal}
          searchShop={searchShop}
          idLocal={idLocal}
          setIdLocal={setIdLocal}
          localByIdData={localByIdData?.result || ['loading']}
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