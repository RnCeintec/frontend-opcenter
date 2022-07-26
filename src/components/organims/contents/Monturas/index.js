/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  IconSelect, IconSearch,
  IconSpiner, IconDelete, IconPencil,
  IconRefresh, IconClose, IconAlert, IconProduct, IconProductCode, IconCategory, IconStock, IconNewCategory,
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
import FormTextInputMontura from '../../../atoms/formInputs/formTextInputMontura';


import FormSelectInput from '../../../atoms/formInputs/formSelectInput';

const Products = ({
  isLoadingSearchMonturas,
  setIsLoadingSearchMonturas,
  categoryId,
  monturasData,
  setMonturasMutate,
  proveedorData,
  setLimit,
  setSearchMontura,
  searchMontura,
  setIdMonturas,
  idMontura,
  monturasByIdData,
  setFilterStatus,
  filterStatus,
  page,
  pageRange,
  lastPage,
  nextPage,
  previusPage,
  jumpToPage,
  jumpToFirstPage,
  jumpToLastPage,
  monturasByUltima
}) => {
  const [openMenuFilterStatus, setOpenMenuFilterStatus] = useState(false);
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

  const fetchMontura = useFetch('monturas');
  // const fetchUploadImg = useFetch('');
  // FORM VARIABLES
  const {
    register, watch, reset, setValue, clearErrors, handleSubmit, setFocus, formState: { errors },
  } = useForm();

  // OPEN menu filter by status
  const handleFilterStatus = () => {
    setOpenMenuFilterStatus(!openMenuFilterStatus);
  };
  // FILTER status
  const onChangeFilterStatus = (e) => {
    const { checked, value } = e.target;

    if (filterStatus === 'Filtrar Estado') {
      if (checked) {
        setFilterStatus(value);
      }
    } else if (checked) {
      setFilterStatus(`${filterStatus},${value}`);
    } else {
      let newValue = filterStatus.split(`,${value}`).join('');
      newValue = newValue.split(`${value},`).join('');
      newValue = newValue.split(value).join('');
      if (newValue === '') {
        setFilterStatus('Filtrar Estado');
      } else { setFilterStatus(newValue); }
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
    setSearchMontura(search);
  };

  // CLEAN search
  const handleCleanSearch = () => {
    setSearchMontura('');
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
  const handleEditProduct = (id) => {
    setIdMonturas(id);
    setIsRowBlocked(true);
    setRowSelected(id);
    setTypeOfPanel('Editar');
    clearErrors();
    scrollTo(refEditPanel);
    if (idMontura !== id) {
      setIsLoadingSelectItem(true);
    }
    if (idMontura === id) {
      setFocus('idmontura');
    }
  };

  // INSERT DATA IN REACT HOOK FORM
  useEffect(() => {
    if (typeOfPanel === 'Editar') {
      setValue('idmontura', monturasByIdData.idmontura || '');
      setValue('idproveedor', monturasByIdData.ingreso?.proveedor?.id || '');
      setValue('marca', monturasByIdData.marca || '');
      setValue('modelo', monturasByIdData.modelo || '');
      setValue('tipo', monturasByIdData.tipo || '');
      setValue('color', monturasByIdData.color || '');
      setValue('documento', monturasByIdData.ingreso?.documento || '');
      setValue('numero', monturasByIdData.ingreso?.numero_documento || '');
      setValue('comentario', monturasByIdData.comentario || '');
      setValue('costo', monturasByIdData.costo || '');
      setValue('venta', monturasByIdData.venta || '');
      setValue('tope', monturasByIdData.tope || '');
      setValue('cantidad', 1 || '');

      // setValue('stock', monturasByIdData.stock || '');
      clearErrors();
      if (monturasByIdData.idmontura) {
        setIsLoadingSelectItem(false);
      }
    }
  }, [monturasByIdData]);

  // LIMPIAR EDIT PANEL
  const clearInputs = () => {
    setIdMonturas(-1);
    // setValue('id', '');
    setValue('idmontura', '');
    setValue('documento', '');
    setValue('numero', '');

    setValue('marca', '');
    setValue('modelo', '');
    setValue('tipo', '');
    setValue('color', '');
    setValue('costo', '');
    setValue('venta', '');
    setValue('tope', '');
    setValue('cantidad', '');

    clearErrors();
  };

  // CANCEL EDIT PANEL
  const handleCancel = () => {
    setIdMonturas(-1);
    setIsRowBlocked(false);
    setTypeOfPanel('Ingresar');
    clearInputs();
  };

  // CREATE ADMIN
  const createMontura = async (data) => {
    let local_storage = JSON.parse(localStorage.getItem("localData"))
debugger
    setIsLoaderSubmit(true);
    const dataToAdd = {
          marca:data.marca,
          modelo:data.modelo,
          tipo:data.tipo,
          color:data.color,
            comentario:data.comentario,
            venta:data.venta,
            costo:data.costo,
            tope:data.tope,
            idproveedor:data.idproveedor,
            documento:data.documento,
            numero:data.numero,
            idmontura:data.idmontura,
            cantidad:data.cantidad,
            local_id : local_storage.id
    };
    const [result, status] = await fetchMontura.post(dataToAdd);
    if (status !== 200) {
      errorAlert(result.message);
      setIsLoaderSubmit(false);
    } else {
      // await adminMutate();
      setIsLoaderSubmit(false);
      // await productByIdMutate();
      clearInputs();
      successAlert('Montura Creada Correctamente');
    }
    // }
    //   else {
    //   setIsLoaderSubmit(false);
    // }
    await setMonturasMutate(Date.now());
  };

  // EDIT ADMIN
  const editMontura = async (data) => {
    // console.log('editando');
    let local_storage = JSON.parse(localStorage.getItem("localData"))
    setIsLoaderSubmit(true);
    const dataToAdd = {
        marca:data.marca,
        modelo:data.modelo,
        tipo:data.tipo,
        color:data.color,
        comentario:data.comentario,
        venta:data.venta,
        costo:data.costo,
        tope:data.tope,
        idproveedor:data.idproveedor,
        documento:data.documento,
        numero:data.numero,
        idmontura:data.idmontura,
        local_id : local_storage.id
    };
    try {
      const [result, status] = await fetchMontura.put(idMontura, dataToAdd);
      if (status !== 200) {
        errorAlert(result.message);
        setIsLoaderSubmit(false);
      } else {
        // await adminMutate();
        await setIsLoaderSubmit(false);
        // await productByIdMutate();
        setTypeOfPanel('Ingresar');
        setIsRowBlocked(false);
        clearInputs();
        successAlert('Montura Actualizada Correctamente');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMonturasMutate(Date.now);
      scrollUp();
    }
  };

  const handleSelectCategory = (value) => {
    setValue('category', value);
  };

  // SUBMIT CREATE AND EDIT
  const onSubmit = async (data) => {
    if (typeOfPanel === 'Ingresar') {
      await createMontura(data);
    } else if (typeOfPanel === 'Editar') {
      await editMontura(data);
    }
  };

  // DELETE ADMIN
  const handleDeleteProduct = async () => {
    debugger
    setIsDeleteLoad(true);
    const id = idToDelete;
    try {
      const [result, status] = await fetchMontura.del(id);
      if (status !== 200) {
        errorAlert(result.message || 'Algo salió mal, intentelo nuevamente');
      } else {
        // await adminMutate();
        // await productByIdMutate();
        infoAlert('Eliminado Correctamente');
      }
    } catch (error) {
      errorAlert('Algo salió mal, intentelo nuevamente');
    } finally {
      await setMonturasMutate(Date.now());
    }
    if (idMontura === id) {
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
                  <p>la montura:</p>
                  <p className="pb-2">{`${monturasData?.filter((item) => item.id === idToDelete)[0]?.idmontura}?`}</p>
                </>
              )}
              titleFirstOption="   Cancelar   " // SPACES with alt + 0160
              titleSecondOption=" Eliminar "
              onClickFirstOption={() => { setIsOpenVerifyDelete(false); setIsDeleteLoad(false); }}
              onClickSecondOption={() => handleDeleteProduct()}
              isLoadSecondOption={isDeleteLoad}
              colorFirstButton="red-500"
            />
          </Portal>
        )}
      {isOpenNewCategoryModal
        && (
          <Portal>
            <NewCategory
              setIsOpenNewCategoryModal={setIsOpenNewCategoryModal}
              setCategoryId={setCategoryId}
              setCategoryListMutate={setCategoryListMutate}
              setMonturasMutate={setMonturasMutate}
              handleSelectCategory={handleSelectCategory}
            />
          </Portal>
        )}
      <div className="flex flex-col items-center bg-bg-blue w-full min-h-screen box-border">
        <div className="pl-4 pt-2 flex w-full h-12 sm:h-16 bg-white shadow-sm">
          <div className="flex text-2xl sm:text-4xl text-gray-800 font-semibold">
            Monturas
            <div className="text-red-500 opacity-80 w-7 sm:w-10 ml-1 mt-1">
              <iconMontura autosize />
            </div>
          </div>

        </div>
        <div className="flex flex-col items-start md:flex-row w-full h-full p-4 box-border">
          <div className="flex flex-col sm:flex-row mb-4 md:mb-0 w-full md:w-2/3">
            <div className="w-full bg-white rounded-xl shadow sm:mb-0">
              <div className="flex flex-col sm:flex-row justify-between border-b w-full text-gray-800 font-semibold px-4 p-2">
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

                 
                  <div
                    className="flex flex-row justify-end w-full sm:w-auto relative"
                  >
                    <input
                      ref={refSearch}
                      className="pl-3 pr-8 p-1 w-full bg-white rounded-xl appearance-none focus:outline-none border border-gray-300 focus:border-primary"
                      type="text"
                      placeholder="Buscar"
                      onChange={(e) => {
                        setIsLoadingSearchMonturas(true);
                        setTimeout(() => {
                          handleChangeSearch(e);
                        }, 1000);
                      }}
                    />
                    {searchMontura === ''
                      ? (
                        <span className="absolute right-1 top-0 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                          <IconSearch />
                        </span>
                      )
                      : isLoadingSearchMonturas
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
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium text-sm">Montura</th>
                      <th className="border-r border-b border-gray-200 px-6 py-2 font-medium whitespace-nowrap">Marca</th>
                      {/* <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">Categoria</th> */}
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">
                        <div className="text-sm">
                          <p className="whitespace-nowrap">Modelo</p>
                        </div>
                      </th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">
                        <div className="text-sm">
                          <p className="whitespace-nowrap">Tipo</p>
                        </div>
                      </th>
                   
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">
                        <div className="text-sm">
                          <p className="whitespace-nowrap">Color</p>
                        </div>
                      </th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">
                        <div className="text-sm">
                          <p className="whitespace-nowrap">Comentario</p>
                        </div>
                      </th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">
                        <div className="text-sm">
                          <p className="whitespace-nowrap">P. Costo</p>
                          <p className="text-xs">(S/)</p>
                        </div>
                      </th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">
                        <div className="text-sm">
                          <p className="whitespace-nowrap">P. Venta</p>
                          <p className="text-xs">(S/)</p>
                        </div>
                      </th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">
                        <div className="text-sm">
                          <p className="whitespace-nowrap">Tope</p>
                          <p className="text-xs">(S/)</p>
                        </div>
                      </th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">
                        <div className="text-sm">
                          <p className="whitespace-nowrap">Venta relacionada</p>
                        </div>
                      </th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">
                        <div className="text-sm">
                          <p className="whitespace-nowrap">Tienda</p>
                        </div>
                      </th>
                      {/* <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">Stock</th> */}
                      {/* <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">Estado</th> */}
                      <th className="border-b border-gray-200 px-2 py-2 font-medium">Editar</th>
                      <th className="border-l border-gray-400 bg-white select-none">0</th>
                    </tr>
                  </thead>
                  {Array.isArray(monturasData) && monturasData[0] !== 'loading'
                    && (
                      <tbody>
                        {monturasData.map((item) => (
                          <tr key={item.id} onClick={() => !isRowBlocked && setRowSelected(item.id)} className={`text-sm rowTable ${rowSelected === item.id && 'rowTableAdminSelected'}`}>
                            <td className="border border-gray-350 px-2 py-2 font-medium hidden">{item.id}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium whitespace-nowrap">{item.idmontura || ''}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize text-left">{item.marca || ''}</td>
                            {/* <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.category?.descripcion || ''}</td> */}
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.modelo || ''}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.tipo || ''}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.color || ''}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.comentario || ''}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.costo || ''}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.venta || ''}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.tope || ''}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.ventas?.comprobante || ''}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.tienda?.rz_social || ''}</td>

                            {/* <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.stock}</td> */}
                            {/* <td className="border border-gray-350 px-2 py-2 font-medium capitalize">Activo</td> */}
                            <td className="border border-gray-350 px-2 py-2 font-medium">
                              <div className="flex justify-center space-x-2">
                                <ButtonIcon
                                  icon={<IconPencil />}
                                  isBorder
                                  isBgColor
                                  colorBg="primary"
                                  onClick={() => {
                                    handleEditProduct(item.id);
                                  }}
                                  padding={1}
                                />
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
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                </table>
                <div>
                  {/* LOADING is here beacuse the loader have to be out of the table */}
                  {monturasData[0] === 'loading'
                    ? (
                      <div className="flex items-center justify-center py-8">
                        <IconSpiner dark medium />
                      </div>
                    )
                    : monturasData.length === 0 || !Array.isArray(monturasData)
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
                Montura
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
                          <FormSelectInput inputName="idproveedor"
                        title="Proveedor"
                        icon={<IconSearch />}
                        placeholder="Proveedor"
                        // onChange={(e) => handleChangeCantView(e)}
                        options={{
                          validate: {
                            value: (e) => e !== 'select' || 'Proveedor requerido',
                          },
                        }}
                        register={register} errors={errors} watch={watch}
                      >
                      {Array.isArray(proveedorData)
                            && proveedorData.map((item) => (
                              <option key={item.id} value={item.id} className="capitalize text-gray-700">
                                {item.razonsocial}
                              </option>
                            ))}
                      </FormSelectInput>
                      <FormSelectInput inputName="documento"
                        title="Documento"
                        icon={<IconCategory />}
                        placeholder="Documento"
                        // onChange={(e) => handleChangeCantView(e)}
                        options={{
                          validate: {
                            value: (e) => e !== 'select' || 'Documento requerido',
                          },
                        }}
                        register={register} errors={errors} watch={watch}
                      >
                        <option value="Factura" className="text-gray-700">
                        Factura
                        </option>
                        <option value="Nota_Pedido" className="text-gray-700">
                        Nota de pedido
                        </option>
                       
                        
                      </FormSelectInput>
                      <FormTextInput inputName="numero"
                        title="Numero"
                        icon={<IconProduct />}
                        placeholder="Ingresar Numero"
                        options={{
                          required: {
                            value: true,
                            message: 'Numero requerida',
                          },
                        }}
                        register={register} errors={errors}
                      />
                      <FormTextInputMontura inputName="idmontura"
                        title="Montura"
                       
                        icon={<IconProductCode />}
                        placeholder=""
                        options={{
                          required: {
                            value: true,
                            message: 'Código requerido',
                          },
                          pattern: {
                            value: /^[a-zA-Z0-9-ñÑ]+$/,
                            message: 'Código invalido',
                          },
                          
                        }}
                        register={register} errors={errors}
                        inputValue={"M"+monturasByUltima["id"] }
                      />
                      
                      <FormTextInput inputName="marca"
                        title="Marca"
                        icon={<IconProduct />}
                        placeholder="Ingresar Marca"
                        options={{
                          required: {
                            value: true,
                            message: 'Marca requerida',
                          },
                        }}
                        register={register} errors={errors}
                      />
                       
                     
                      <FormTextInput inputName="modelo"
                        title="Modelo"
                        placeholder="Ingresar modelo"
                        options={{
                          required: {
                            value: true,
                            message: 'Modelo requerido',
                          },
                        }}
                        register={register} errors={errors}
                      />
              
                             <FormSelectInput inputName="tipo"
                        title="Tipo"
                        icon={<IconCategory />}
                        placeholder="Tipo"
                        // onChange={(e) => handleChangeCantView(e)}
                        options={{
                          validate: {
                            value: (e) => e !== 'select' || 'Tipo requerido',
                          },
                        }}
                        register={register} errors={errors} watch={watch}
                      >
                        <option value="AL AIRE" className="text-gray-700">
                        AL AIRE
                        </option>
                        <option value="SEMI AL AIRE" className="text-gray-700">
                        SEMI AL AIRE
                        </option>
                        <option value="ARO COMPLETO" className="text-gray-700">
                        ARO COMPLETO
                        </option>
                        
                      </FormSelectInput>
                        
                      <FormTextInput inputName="color"
                        title="Color"
                        placeholder="Ingresar color"
                        options={{
                          required: {
                            value: true,
                            message: 'Color  requerido',
                          },
                        }}
                        register={register} errors={errors}
                      />
                      <FormTextInput inputName="comentario"
                        title="Comentario"
                        placeholder="Ingresar comentario"
                        options={{
                          required: {
                            value: true,
                            message: 'Color  requerido',
                          },
                        }}
                        register={register} errors={errors}
                      />

                      <FormTextInput inputName="costo"
                        title="Costo"
                        icon={<p>S/.</p>}
                        placeholder="Ingresar Costo"
                        options={{
                          required: {
                            value: true,
                            message: 'Costo requerido',
                          },
                          pattern: {
                            value: /^[0-9.]+$/,
                            message: 'Precio invalido',
                          },
                          min: {
                            value: 0.01,
                            message: 'Costo  debe ser mayor a 0',
                          },
                          onBlur: () => watch('costo') * 2 && setValue('costo', parseFloat(watch('costo')).toFixed(2)),
                        }}
                        register={register} errors={errors}
                      />
                      <FormTextInput inputName="venta"
                        title="Precio venta"
                        icon={<p>S/.</p>}
                        placeholder="Ingresar precio venta"
                        options={{
                          required: {
                            value: true,
                            message: 'Precio venta',
                          },
                          pattern: {
                            value: /^[0-9.]+$/,
                            message: 'Precio venta invalido',
                          },
                          min: {
                            value: 0.01,
                            message: 'Precio de venta debe ser mayor a 0',
                          }
                        }}
                        register={register} errors={errors}
                      />
 <FormTextInput inputName="tope"
                        title="Precio minimo"
                        icon={<p>S/.</p>}
                        placeholder="Ingresar precio minimo"
                        options={{
                          required: {
                            value: true,
                            message: 'Precio minimo',
                          },
                          pattern: {
                            value: /^[0-9.]+$/,
                            message: 'Precio invalido',
                          },
                          min: {
                            value: 0.01,
                            message: 'Precio debe ser mayor a 0',
                          }
                        }}
                        register={register} errors={errors}
                      />
                      <FormTextInput inputName="cantidad"
                        title="Cantidad"
                        icon={<IconStock />}
                        placeholder="Ingresar cantidad"
                        options={{
                          required: {
                            value: true,
                            message: 'Canttidad requerido',
                          },
                          pattern: {
                            value: /^[0-9]+$/,
                            message: 'Cantidad invalido',
                          },
                        }}
                        register={register} errors={errors}
                      />
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

Products.propTypes = {
  isLoadingSearchMonturas: PropTypes.bool.isRequired,
  setIsLoadingSearchMonturas: PropTypes.func.isRequired,
  // setCategoryListMutate: PropTypes.func.isRequired,
  // categoryId: PropTypes.number.isRequired,
  // setCategoryId: PropTypes.func.isRequired,
  monturasData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  setMonturasMutate: PropTypes.func.isRequired,
  proveedorData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  setLimit: PropTypes.func.isRequired,
  setSearchMontura: PropTypes.func.isRequired,
  searchMontura: PropTypes.string.isRequired,
  idMontura: PropTypes.number.isRequired,
  setIdMonturas: PropTypes.func.isRequired,
  monturasByIdData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  filterStatus: PropTypes.string.isRequired,
  setFilterStatus: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  lastPage: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  previusPage: PropTypes.func.isRequired,
  jumpToPage: PropTypes.func.isRequired,
  jumpToFirstPage: PropTypes.func.isRequired,
  jumpToLastPage: PropTypes.func.isRequired,
};

export default withFetch(Products);
