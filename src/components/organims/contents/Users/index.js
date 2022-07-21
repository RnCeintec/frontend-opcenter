/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  IconSelect, IconSearch,
  IconSpiner, IconDelete, IconPencil, IconKey, IconUser, IconUserCircle,
  IconRefresh, IconClose, IconAlert, IconFilter, IconIdCard, IconRole,
} from '../../../../assets/icons/icons';
import ButtonIcon from '../../../atoms/buttons/buttonIcon';
import withFetch from './withFetch';
import {
  errorAlert, infoAlert, successAlert, warningAlert,
} from '../../../../utils/alertNotify';
import useFetch from '../../../../hook/usefetch';
import ModalTwoOptions from '../../../molecules/modal/ModalTwoOptions';
import Portal from '../../../../utils/portal';
import { scrollTo, scrollUp } from '../../../../utils/scrolling';
import Pagination from '../../../atoms/buttons/paginationButtons';
import FormTextInput from '../../../atoms/formInputs/formTextInput';
import FormSelectInput from '../../../atoms/formInputs/formSelectInput';

const Users = ({
  isLoadingSearchUsers,
  setIsLoadingSearchUsers,
  usersData,
  setUserMutate,
  setLimit,
  setSearchUser,
  searchUser,
  setIdUser,
  idUser,
  userByIdData,
  setFilterRole,
  filterRole,
  page,
  pageRange,
  lastPage,
  nextPage,
  previusPage,
  jumpToPage,
  jumpToFirstPage,
  jumpToLastPage,
}) => {
  const [openMenuFilterRole, setOpenMenuFilterStatus] = useState(false);
  const [isLoadingSelectItem, setIsLoadingSelectItem] = useState(false);
  const [isLoaderSubmit, setIsLoaderSubmit] = useState(false);
  const [isOpenNewCategoryModal, setIsOpenNewCategoryModal] = useState(false);
  const [rowSelected, setRowSelected] = useState(null);
  const [isRowBlocked, setIsRowBlocked] = useState(false);
  const [typeOfPanel, setTypeOfPanel] = useState('Ingresar');
  const refEditPanel = useRef(null);
  const [isOpenVerifyDelete, setIsOpenVerifyDelete] = useState(false);
  const [isDeleteLoad, setIsDeleteLoad] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);
  const refSearch = useRef(null);

  const fetchUser = useFetch('users');
  // const fetchUploadImg = useFetch('');

  // FORM VARIABLES
  const {
    register, watch, reset, setValue, clearErrors, handleSubmit, setFocus, formState: { errors },
  } = useForm();

  // OPEN menu filter by status
  const handleFilterRole = () => {
    setOpenMenuFilterStatus(!openMenuFilterRole);
  };
  // FILTER status
  const onChangeFilterRole = (e) => {
    const { checked, value } = e.target;

    if (filterRole === 'Filtrar Tipo de Usuario') {
      if (checked) {
        setFilterRole(value);
      }
    } else if (checked) {
      setFilterRole(`${filterRole},${value}`);
    } else {
      let newValue = filterRole.split(`,${value}`).join('');
      newValue = newValue.split(`${value},`).join('');
      newValue = newValue.split(value).join('');
      if (newValue === '') {
        setFilterRole('Filtrar Tipo de Usuario');
      } else { setFilterRole(newValue); }
    }
  };

  // <--- FUNCTIONS TO SEARCH ---> 🔎

  // WRITTING word to search
  const handleChangeSearch = (event) => {
    const { value } = event.target;
    // VERIFY IF KEYWORD WITH "/" or "\" AND START/END SPACES
    let search = value.split('/').join(' ');
    search = search.split('\\').join(' ');
    search = search.trim();
    setSearchUser(search);
  };

  // CLEAN search
  const handleCleanSearch = () => {
    setSearchUser('');
    refSearch.current.value = '';
    refSearch.current.focus();
  };

  // <--------- CANT ROWS FUNCTIONS --------->
  const handleChangeCantView = (e) => {
    const { value } = e.target;
    setLimit(value);
  };

  // <--------- EDIT AND CREATE ADMIN ---------> ✍
  // SELECT ADMIN TO EDIT
  const handleEditUser = (id) => {
    setIdUser(id);
    setIsRowBlocked(true);
    setRowSelected(id);
    setTypeOfPanel('Editar');
    clearErrors();
    scrollTo(refEditPanel);
    if (idUser !== id) {
      setIsLoadingSelectItem(true);
    }
    if (idUser === id) {
      setFocus('name');
    }
  };

  // INSERT DATA IN REACT HOOK FORM
  useEffect(() => {
    if (typeOfPanel === 'Editar') {
      setValue('name', userByIdData.nombre || '');
      setValue('document', userByIdData.documento || '');
      setValue('user', userByIdData.username || '');
      setValue('role', userByIdData.role || 'select');
      clearErrors();
      if (userByIdData.nombre) {
        setIsLoadingSelectItem(false);
      }
    }
  }, [userByIdData]);

  // LIMPIAR EDIT PANEL
  const clearInputs = () => {
    setIdUser(-1);
    setValue('name', '');
    setValue('document', '');
    setValue('user', '');
    setValue('pass', '');
    setValue('repPass', '');
    setValue('role', 'select');
    clearErrors();
  };

  // CANCEL EDIT PANEL
  const handleCancel = () => {
    setIdUser(-1);
    setIsRowBlocked(false);
    setTypeOfPanel('Ingresar');
    clearInputs();
  };

  // CREATE ADMIN
  const createUser = async (data) => {
    setIsLoaderSubmit(true);
    const dataToAdd = {
      nombre: data.name,
      documento: data.document,
      usuario: data.user,
      password: data.pass,
      role: data.role,
    };
    const [result, status] = await fetchUser.post(dataToAdd);
    if (status !== 200) {
      errorAlert(result.message);
      setIsLoaderSubmit(false);
    } else {
      // await adminMutate();
      setIsLoaderSubmit(false);
      // await userByIdMutate();
      clearInputs();
      successAlert('Usuario Creado Correctamente');
    }
    await setUserMutate(Date.now());
  };

  // EDIT ADMIN
  const editUser = async (data) => {
    // console.log('editando');
    setIsLoaderSubmit(true);
    const dataToAdd = {
      nombre: data.name,
      documento: data.document,
      usuario: data.user,
      password: data.pass !== '' ? data.pass : undefined,
      role: data.role,
    };
    try {
      const [result, status] = await fetchUser.put(idUser, dataToAdd);
      if (status !== 200) {
        errorAlert(result.message);
        setIsLoaderSubmit(false);
      } else {
        // await adminMutate();
        await setIsLoaderSubmit(false);
        // await userByIdMutate();
        setTypeOfPanel('Ingresar');
        setIsRowBlocked(false);
        clearInputs();
        successAlert('Usuario Actualizado Correctamente');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUserMutate(Date.now);
      scrollUp();
    }
  };

  // SUBMIT CREATE AND EDIT
  const onSubmit = async (data) => {
    if (typeOfPanel === 'Ingresar') {
      await createUser(data);
    } else if (typeOfPanel === 'Editar') {
      await editUser(data);
    }
  };

  // DELETE USER
  const handleDeleteUser = async () => {
    setIsDeleteLoad(true);
    const id = idToDelete;
    try {
      const [result, status] = await fetchUser.del(id);
      if (status !== 200) {
        errorAlert(result.message || 'Algo salió mal, intentelo nuevamente');
      } else {
        // await adminMutate();
        // await userByIdMutate();
        infoAlert('Eliminado Correctamente');
      }
    } catch (error) {
      errorAlert('Algo salió mal, intentelo nuevamente');
      console.log(error);
    } finally {
      await setUserMutate(Date.now());
    }
    if (idUser === id) {
      handleCancel();
    }
    setIsDeleteLoad(false);
    setIsOpenVerifyDelete(false);
    setIdToDelete(-1);
  };

  // <--------- REFRESH FUNCTION ---------> 🔄
  const handleRefresh = async () => {
    // await adminMutate();
  };

  return (
    <>
      {isOpenVerifyDelete
        && (
          <Portal>
            <ModalTwoOptions
              titleModal={(
                <>
                  <div className="-mt-2 flex justify-center items-center text-center text-yellow-500 w-20"><IconAlert /></div>
                  <p className="-mt-2">¿Esta seguro de Eliminar</p>
                  <p>el Usuario:</p>
                  <p className="pb-2">{`${usersData?.filter((item) => item.id === idToDelete)[0]?.username}?`}</p>
                </>
              )}
              titleFirstOption="   Cancelar   " // SPACES with alt + 0160
              titleSecondOption=" Eliminar "
              onClickFirstOption={() => { setIsOpenVerifyDelete(false); setIsDeleteLoad(false); }}
              onClickSecondOption={() => handleDeleteUser()}
              isLoadSecondOption={isDeleteLoad}
              colorFirstButton="red-500"
            />
          </Portal>
        )}
      <div className="flex flex-col items-center bg-bg-blue w-full min-h-screen box-border">
        <div className="pl-4 pt-2 flex w-full h-12 sm:h-16 bg-white shadow-sm">
          <div className="flex text-2xl sm:text-4xl text-gray-800 font-semibold">
            Usuarios
            <div className="text-red-500 opacity-80 w-6 sm:w-10 ml-1 mt-0.5">
              <IconUserCircle autosize borderRed />
            </div>
          </div>

        </div>
        <div className="flex flex-col items-start md:flex-row w-full h-full p-4 box-border">
          <div className="flex flex-col sm:flex-row mb-4 md:mb-0 w-full md:w-2/3">
            <div className="w-full bg-white rounded-xl shadow sm:mb-0">
              <div className="flex flex-col sm:flex-row justify-between border-b w-full text-gray-800 font-semibold px-4 p-2">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex">

                    <div className="flex relative w-1/3 sm:w-20 mr-3">
                      <select
                        onChange={(e) => handleChangeCantView(e)}
                        className="rounded-xl border appearance-none bg-white border-gray-300 py-1 w-full focus:outline-none focus:border-primary text-base pl-3 pr-4"
                      >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                      <span className="absolute right-0 top-0 h-full w-7 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <IconSelect />
                      </span>
                    </div>

                    {/* FILTER STATUS */}
                    <div className="relative w-full sm:w-40 sm:mr-3 ">
                      <button
                        type="button"
                        onClick={handleFilterRole}
                        className={`text-left ${openMenuFilterRole ? 'rounded-t-xl' : 'rounded-xl'}  border bg-white border-gray-300 py-1 w-full focus:outline-none focus:border-primary text-base pl-2 pr-7`}
                      >
                        <div className={`whitespace-nowrap overflow-hidden ${filterRole.length > 15 ? 'text-xs py-1' : ''}`}>
                          {filterRole}
                        </div>
                      </button>
                      <span className="absolute right-0 top-0 h-full w-7 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <IconFilter />
                      </span>
                      <form className={`${openMenuFilterRole ? 'flex' : 'hidden'} flex-col absolute bg-white border-r border-b border-l border-gray-300 w-full rounded-b-md p-2 z-10`}>
                        <label htmlFor="Vendedor" className="flex items-center ">
                          <input type="checkbox" checked={filterRole.split(',').includes('Vendedor')} value="Vendedor" id="Vendedor" onChange={(e) => onChangeFilterRole(e)} className="checked:bg-blue-600 checked-border-transparent mr-1" />
                          <p>Vendedor</p>
                        </label>
                        <label htmlFor="Optometra" className="flex items-center ">
                          <input type="checkbox" checked={filterRole.split(',').includes('Optometra')} value="Optometra" id="Optometra" onChange={(e) => onChangeFilterRole(e)} className="checked:bg-blue-600 checked-border-transparent mr-1" />
                          <p>Optometra</p>
                        </label>
                        <label htmlFor="Mensajero" className="flex items-center ">
                          <input type="checkbox" checked={filterRole.split(',').includes('Mensajero')} value="Mensajero" id="Mensajero" onChange={(e) => onChangeFilterRole(e)} className="checked:bg-blue-600 checked-border-transparent mr-1" />
                          <p>Mensajero</p>
                        </label>
                        <label htmlFor="Laboratorio" className="flex items-center ">
                          <input type="checkbox" checked={filterRole.split(',').includes('Laboratorio')} value="Laboratorio" id="Laboratorio" onChange={(e) => onChangeFilterRole(e)} className="checked:bg-blue-600 checked-border-transparent mr-1" />
                          <p>Laboratorio</p>
                        </label>
                        <label htmlFor="Administrador" className="flex items-center ">
                          <input type="checkbox" checked={filterRole.split(',').includes('Administrador')} value="Administrador" id="Administrador" onChange={(e) => onChangeFilterRole(e)} className="checked:bg-blue-600 checked-border-transparent mr-1" />
                          <p>Administrador</p>
                        </label>
                      </form>
                    </div>
                  </div>

                  <div
                    className="flex flex-row justify-end w-full sm:w-auto mt-1.5 sm:mt-0 relative"
                  >
                    <input
                      ref={refSearch}
                      className="pl-3 pr-8 p-1 w-full bg-white rounded-xl appearance-none focus:outline-none border border-gray-300 focus:border-primary"
                      type="text"
                      placeholder="Buscar"
                      onChange={(e) => {
                        setIsLoadingSearchUsers(true);
                        setTimeout(() => {
                          handleChangeSearch(e);
                        }, 1000);
                      }}
                    />
                    {searchUser === ''
                      ? (
                        <span className="absolute right-1 top-0 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                          <IconSearch />
                        </span>
                      )
                      : isLoadingSearchUsers
                        ? (
                          <span className="absolute right-1 top-0 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                            <IconSpiner dark mini />
                          </span>
                        )
                        : (
                          <span className="absolute right-1 top-0 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                            <ButtonIcon
                              icon={(<IconClose />)}
                              isColorHover
                              colorHover="primary"
                              colorText="gray-600"
                              padding={1}
                              onClick={() => handleCleanSearch()}
                            />
                          </span>
                        )}
                  </div>
                </div>
              </div>

              {/* <--TABLE DATA--> */}
              <div className="p-4 overflow-auto h-96">
                <table id="tableAdmin" className="table-auto text-center text-gray-700 w-full">
                  <thead>
                    <tr className="border-l border-gray-400 bg-red-500 opacity-90 text-white">
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium hidden">ID</th>
                      <th className="border-r border-b border-gray-200 px-12 py-2 font-medium whitespace-nowrap">Nombre</th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">Documento</th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">Usuario</th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">Tipo Usuario</th>
                      <th className="border-b border-gray-200 px-2 py-2 font-medium">Editar</th>
                      <th className="border-l border-gray-400 bg-white select-none">0</th>
                    </tr>
                  </thead>
                  {Array.isArray(usersData) && usersData[0] !== 'loading'
                    && (
                      <tbody>
                        {usersData.map((item) => (
                          <tr key={item.id} onClick={() => !isRowBlocked && setRowSelected(item.id)} className={`text-sm rowTable ${rowSelected === item.id && 'rowTableAdminSelected'}`}>
                            <td className="border border-gray-350 px-2 py-2 font-medium hidden">{item.id}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.nombre || ''}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize text-left">{item.documento || ''}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium">{item.username || ''}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.role || ''}</td>
                            {/* <td className="border border-gray-350 px-2 py-2 font-medium capitalize">Activo</td> */}
                            <td className="border border-gray-350 px-2 py-2 font-medium">
                              <div className="flex justify-center space-x-2">
                                <ButtonIcon
                                  icon={<IconPencil />}
                                  isBorder
                                  isBgColor
                                  colorBg="primary"
                                  onClick={() => {
                                    handleEditUser(item.id);
                                  }}
                                  padding={1}
                                />
                                {'id' in localStorage && +localStorage.id !== item.id
                                  && (
                                    <ButtonIcon
                                      icon={<IconDelete />}
                                      isBorder
                                      isBgColor
                                      colorBg="red-500"
                                      onClick={() => {
                                        setIsOpenVerifyDelete(true);
                                        setIdToDelete(item.id);
                                      }}
                                      padding={1}
                                    />
                                  )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                </table>
                <div>
                  {/* LOADING is here beacuse the loader have to be out of the table */}
                  {Array.isArray(usersData) && usersData[0] === 'loading'
                    ? (
                      <div className="flex items-center justify-center py-8">
                        <IconSpiner dark medium />
                      </div>
                    )
                    : !Array.isArray(usersData) || usersData.length === 0
                      ? (
                        <div className="flex items-center justify-center py-8 italic text-gray-700">
                          No se Encontraron Resultados
                        </div>
                      ) : ''}
                </div>
              </div>
              <div className="border-t text-gray-800 font-semibold pl-4 p-2 select-none relative">
                {/* <div className="flex absolute -mt-0.5 -ml-2.5 sm:-ml-0 justify-between sm:justify-start">
                  <ButtonIcon
                    icon={<IconRefresh />}
                    colorText="primary"
                    isColorHover
                    colorHover="blue-500"
                    onClick={() => handleRefresh()}
                  />
                </div> */}
                <div className="flex justify-center">
                  <Pagination
                    page={page}
                    pageRange={pageRange}
                    nextPage={nextPage}
                    previusPage={previusPage}
                    jumpToPage={jumpToPage}
                    jumpToFirstPage={jumpToFirstPage}
                    jumpToLastPage={jumpToLastPage}
                    lastPage={lastPage}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <-- PANEL TO EDIT Admin --> */}
          <div className=" w-full md:w-1/3 md:pl-4">
            <div ref={refEditPanel} className=" bg-white rounded-xl shadow">
              <div className="text-green-600 border-b border-gray-300 rounded-t font-bold pl-4 p-2">
                {typeOfPanel}
                {' '}
                Usuario
              </div>
              <div className="flex flex-col w-full pt-3 p-4">

                {isLoaderSubmit ? (
                  <div className="flex flex-col items-center w-full h-full">
                    <IconSpiner dark big />
                    Guardando...
                  </div>
                )
                  : (
                    <form className="flex flex-col w-full -mt-2 relative" onSubmit={handleSubmit(onSubmit)}>
                      <FormTextInput inputName="name"
                        title="Nombre"
                        icon={<IconUser />}
                        placeholder="Ingresar Nombre"
                        options={{
                          required: {
                            value: true,
                            message: 'Nombre requerido',
                          },
                          pattern: {
                            value: /^[a-zA-Z0-9 áéíóúüÁÉÍÓÚÜñÑ]+$/,
                            message: 'Nombre invalido',
                          },
                        }}
                        register={register} errors={errors}
                      />
                      <FormTextInput inputName="document"
                        title="Documento"
                        icon={<IconIdCard />}
                        placeholder="Ingresar Documento"
                        options={{
                          required: {
                            value: true,
                            message: 'Documento requerido',
                          },
                        }}
                        type="number"
                        register={register} errors={errors}
                      />

                      <FormTextInput inputName="user"
                        title="Usuario"
                        icon={<IconUserCircle />}
                        placeholder="Ingresar Usuario"
                        options={{
                          required: {
                            value: true,
                            message: 'Usuario requerido',
                          },
                          pattern: {
                            value: /^[a-zA-Z0-9ñÑ]+$/,
                            message: 'Usuario invalido',
                          },
                        }}
                        register={register} errors={errors}
                      />

                      <FormTextInput inputName="pass"
                        title="Contraseña"
                        icon={<IconKey />}
                        placeholder="Ingresar Contraseña"
                        options={{
                          required: {
                            value: typeOfPanel === 'Ingresar',
                            message: 'Contraseña requerida',
                          },
                          minLength: {
                            value: 4,
                            message: 'Debe tener mínimo 4 caracteres',
                          },
                        }}
                        type="password"
                        register={register} errors={errors}
                      />

                      <FormTextInput inputName="repPass"
                        title="Repetir Contraseña"
                        icon={<IconKey />}
                        placeholder="Repetir Contraseña"
                        options={{
                          required: {
                            value: typeOfPanel === 'Ingresar',
                            message: 'Verificación requerida',
                          },
                          validate: {
                            same: (e) => e === watch('pass') || 'Contraseñas no coinciden',
                          },
                        }}
                        type="password"
                        register={register} errors={errors}
                      />
                      <FormSelectInput inputName="role"
                        title="Tipo de Usuario"
                        icon={<IconRole />}
                        placeholder="Tipo de Usuario"
                        // onChange={(e) => handleChangeCantView(e)}
                        options={{
                          validate: {
                            value: (e) => e !== 'select' || 'Tipo de usuario requerido',
                          },
                        }}
                        register={register} errors={errors} watch={watch}
                      >
                        <option value="vendedor" className="text-gray-700">
                          Vendedor
                        </option>
                        <option value="optometra" className="text-gray-700">
                        Optometra
                        </option>
                        <option value="laboratorio" className="text-gray-700">
                        Laboratorio
                        </option>
                        <option value="mensajero" className="text-gray-700">
                        Mensajero
                        </option>
                        <option value="admin" className="text-gray-700">
                          Administrador
                        </option>
                      </FormSelectInput>
                      <div className="flex justify-end space-x-5  mt-3 sm:mt-4">
                        <button
                          className="flex items-center justify-center p-1.5 text-white text-sm sm:text-base bg-red-500 hover:bg-red-600 opacity-90 hover:opacity-100 rounded-xl w-24 sm:w-40 cursor-pointer focus:outline-none"
                          type="button"
                          onClick={() => handleCancel()}
                        >
                          <div className="">Cancelar</div>
                        </button>
                        <button
                          className="flex items-center justify-center p-1.5 text-white text-sm sm:text-base bg-primary hover:bg-primary opacity-90 hover:opacity-100 rounded-xl w-24 sm:w-40 cursor-pointer focus:outline-none"
                          type="submit"
                          onClick={() => handleSubmit()}
                        >
                          <div className="">
                            {typeOfPanel === 'Ingresar' ? 'Ingresar' : 'Actualizar'}
                          </div>
                        </button>
                      </div>
                      {isLoadingSelectItem
                        && (
                          <div className="flex items-center justify-center absolute top-0 bg-white bg-opacity-50 h-full w-full">
                            <IconSpiner dark medium />
                          </div>
                        )}
                    </form>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Users.propTypes = {
  isLoadingSearchUsers: PropTypes.bool.isRequired,
  setIsLoadingSearchUsers: PropTypes.func.isRequired,
  usersData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  setUserMutate: PropTypes.func.isRequired,
  setLimit: PropTypes.func.isRequired,
  setSearchUser: PropTypes.func.isRequired,
  searchUser: PropTypes.string.isRequired,
  idUser: PropTypes.number.isRequired,
  setIdUser: PropTypes.func.isRequired,
  userByIdData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  filterRole: PropTypes.string.isRequired,
  setFilterRole: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  lastPage: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  previusPage: PropTypes.func.isRequired,
  jumpToPage: PropTypes.func.isRequired,
  jumpToFirstPage: PropTypes.func.isRequired,
  jumpToLastPage: PropTypes.func.isRequired,
};

export default withFetch(Users);
