/* eslint-disable max-len */
import { usePagination } from '@jsiapo/use-pagination';
import { useEffect, useState } from 'react';
// import useSWR from 'swr';
import { useFetch } from '../../../../hook';
import usePaginationTest from '../../../../hook/usePaginationtest';
import { errorAlert } from '../../../../utils/alertNotify';

const withFetch = (Component) => (props) => {
  const [isLoadingSearchUsers, setIsLoadingSearchUsers] = useState(false);
  const [usersCount, setUsersCount] = useState(1);
  const [limit, setLimit] = useState(10);
  // const [pageActual, setPageActual] = useState(0);
  const [searchUser, setSearchUser] = useState('');
  const [userMutate, setUserMutate] = useState(null);
  const [filterRole, setFilterRole] = useState('Vendedor,Administrador,Optometra,Mensajero,Laboratorio');

  // const { data: adminData, error: adminError, mutate: adminMutate } = useSWR(
  //   `${APIAdmin}/?limit=${limit}&offset=${pageActual}&search=${searchAdmin}`,
  // );
  const [usersData, setUsersData] = useState('');

  // FETCHS
  const fetchUsers = useFetch('users');

  const [idUser, setIdUser] = useState(-1);
  const [userByIdData, setUserByIdData] = useState(null);

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
    dataLength: usersCount,
    size: 4,
    isOffsetZero: true,
    // isLoading,
  });

  const getDataUsers = async () => {
    const filter = (filterRole.indexOf('Vendedor') !== -1 && filterRole.indexOf('Administrador') !== -1 && filterRole.indexOf('Optometra') !== -1 && filterRole.indexOf('Mensajero') !== -1 && filterRole.indexOf('Laboratorio') !== -1)
      ? '' : filterRole.indexOf('Vendedor') !== -1
        ? 'vendedor' : filterRole.indexOf('Administrador') !== -1
          ? 'admin' : 'null';
    try {
      const [result, status] = await fetchUsers.get(`?search=${searchUser}&role=${filter}&${query}`);
      // const [result, status] = await fetchUsers.post({ descripcion: searchUser }); // ONLY FOR TEST
      if (status === 200) {
        setUsersData(result);
        setUsersCount(result.count || 1);
      } else {
        errorAlert('Error al cargar Useros');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Useros');
      setUsersData({ result: [] });
    } finally {
      setIsLoadingSearchUsers(false);
    }
  };

  const getUserByIdData = async () => {
    try {
      const [result, status] = await fetchUsers.getById(idUser);
      // const [result, status] = await fetchCategories.post({ descripcion: searchUser }); // ONLY FOR TEST
      if (status === 200) {
        setUserByIdData(result);
      } else {
        errorAlert('Error al cargar Usuario');
      }
    } catch (error) {
      console.log(error);
      errorAlert('Error al cargar Usuario');
      setUserByIdData([]);
    }
  };

  useEffect(() => {
    setUsersData(['loading']);
    getDataUsers();
    // setPageActual(0);
  }, [searchUser, userMutate, filterRole, query]);

  useEffect(() => {
    if (idUser > -1) {
      getUserByIdData();
    }
  }, [idUser]);

  // useEffect(() => {
  //   getDataUsers();
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
      isLoadingSearchUsers={isLoadingSearchUsers}
      setIsLoadingSearchUsers={setIsLoadingSearchUsers}
      usersData={usersData?.result || ['loading']}
      setUserMutate={setUserMutate}
      setLimit={setLimit}
      setSearchUser={setSearchUser}
      searchUser={searchUser}
      idUser={idUser}
      setIdUser={setIdUser}
      userByIdData={userByIdData?.result || ['loading']}
      filterRole={filterRole}
      setFilterRole={setFilterRole}
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
