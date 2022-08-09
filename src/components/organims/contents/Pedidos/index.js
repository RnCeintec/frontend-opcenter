/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import {
  IconAdminSolid,
  IconPrev,
  IconNext,
  IconFirst,
  IconLast,
  IconSelect,
  IconSearch,
  IconSpiner,
  IconDelete,
  IconPencil,
  IconKey,
  IconImage,
  IconUser,
  IconUserCircle,
  IconRefresh,
  IconUpload,
  IconClose,
  IconAlert,
  IconProduct,
  IconProductCode,
  IconCategory,
  IconFilter,
  IconStock,
  IconNewClient,
  IconNewCategory,
  IconUsersSolid,
  IconIdCard,
  IconGPS,
  IconPhone,
  IconObservation,
} from "../../../../assets/icons/icons";
import ButtonIcon from "../../../atoms/buttons/buttonIcon";
import withFetch from "./withFetch";
import {
  errorAlert,
  infoAlert,
  successAlert,
  warningAlert,
} from "../../../../utils/alertNotify";
import useFetch from "../../../../hook/usefetch";
import ModalTwoOptions from "../../../molecules/modal/ModalTwoOptions";
import Portal from "../../../../utils/portal";
import NewCategory from "../../../molecules/newCategory/newCategory";
import { scrollTo, scrollUp } from "../../../../utils/scrolling";
import Pagination from "../../../atoms/buttons/paginationButtons";
import FormTextInput from "../../../atoms/formInputs/formTextInput";
import FormSelectInput from "../../../atoms/formInputs/formSelectInput";
import NewClient from "../../../molecules/newClient/newClient";

function toMedida(val) {
  var num;
  if (val == "") {
      num = '+0.00';
  } else if (val.substr(0, 1) == '+' || val.substr(0, 1) == '-') {
      num = val.substring(1, val.length);
      if (num == "") {
          num = '0.00';
      }
      num = parseFloat(num);
      if (num == 'NaN') {
          num = '0.00';
      }
      num = val.substr(0, 1) + "" + num;
  } else {
      num = parseFloat(val);
      if (num == 'NaN') {
          num = '0.00';
      }
      num = "+" + num;
  }
  return num;
}



const Diotrias = ({
  isLoadingSearchVendedor,
  setIsLoadingSearchVendedor,
  // isLoadingSearchClient,
  categoryId,
  setCategoryId,
  setCategoryListMutate,
  pageActual,
  setPageActual,
  vendedorData,
  setVendedorMutate,
  categoriesData,
  pages,
  setLimit,
  setSearchVendedor,
  searchVendedor,
  setIdVendedor,
  idVendedor,
  tiendaData,
  vendedorByIdData,
  setFilterStatus,
  isLoadingSearchClient,
  setIsLoadingSearchClient,
  filterStatus,
  page,
  pageRange,
  lastPage,
  nextPage,
  previusPage,
  jumpToPage,
  jumpToFirstPage,
  jumpToLastPage,
  clientsData,
  setSearchClient,
  setClientMutate,
  clientDataById,
  clientId,
  setClientId,
}) => {
  // filter
  const [openMenuFilterStatus, setOpenMenuFilterStatus] = useState(false);
  const [isLoadingSelectItem, setIsLoadingSelectItem] = useState(false);
  const [isLoaderSubmit, setIsLoaderSubmit] = useState(false);
  const [rowSelected, setRowSelected] = useState(null);
  const [isRowBlocked, setIsRowBlocked] = useState(false);
  const [typeOfPanel, setTypeOfPanel] = useState("Ingresar");
  const refEditPanel = useRef(null);
  const [isOpenVerifyDelete, setIsOpenVerifyDelete] = useState(false);
  const [isDeleteLoad, setIsDeleteLoad] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);
  const refSearch = useRef(null);
  const refClient = useRef(null);
  // const [clientType, setClientType] = useState('tick');

  const [isOpenSearchListClients, setIsOpenSearchListClients] = useState(false);
  const [isOpenNewClientModal, setIsOpenNewClientModal] = useState(false);
  const fetchVendedor = useFetch("diotrias");
  // const fetchUploadImg = useFetch('');

  // FORM VARIABLES
  const {
    register,
    watch,
    reset,
    setValue,
    clearErrors,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  // <------------- FILTER status ----------->
  // OPEN menu filter by status
  // const handleFilterStatus = () => {
  //   setOpenMenuFilterStatus(!openMenuFilterStatus);
  // };
  // const onChangeFilterStatus = (e) => {
  //   const { checked, value } = e.target;

  //   if (filterStatus === 'Filtrar Estado') {
  //     if (checked) {
  //       setFilterStatus(value);
  //     }
  //   } else if (checked) {
  //     setFilterStatus(`${filterStatus},${value}`);
  //   } else {
  //     let newValue = filterStatus.split(`,${value}`).join('');
  //     newValue = newValue.split(`${value},`).join('');
  //     newValue = newValue.split(value).join('');
  //     if (newValue === '') {
  //       setFilterStatus('Filtrar Estado');
  //     } else { setFilterStatus(newValue); }
  //   }
  // };

  // <--- FUNCTIONS TO SEARCH ---> 🔎

  // WRITTING word to search
  const handleChangeSearch = (event) => {
    const { value } = event.target;
    // VERIFY IF KEYWORD WITH "/" or "\" AND START/END SPACES
    let search = value.split("/").join(" ");
    search = search.split("\\").join(" ");
    search = search.trim();
    setSearchVendedor(search);
  };

  const handleCleanSearchClients = () => {
    refClient.current.value = "";
    setSearchClient("");
    setIsOpenSearchListClients(false);
  };

  // CLEAN search
  const handleCleanSearch = () => {
    setSearchVendedor("");
    refSearch.current.value = "";
    refSearch.current.focus();
  };

  // <--------- CANT ROWS FUNCTIONS --------->
  const handleChangeCantView = (e) => {
    const { value } = e.target;
    setLimit(value);
  };

  // <--------- EDIT AND CREATE ADMIN ---------> ✍
  // SELECT ADMIN TO EDIT
  const handleEditVendedor = (id) => {
    setIdVendedor(id);
    setIsRowBlocked(true);
    setRowSelected(id);
    setTypeOfPanel("Editar");
    clearErrors();
    scrollTo(refEditPanel);
    if (idVendedor !== id) {
      setIsLoadingSelectItem(true);
    }
    // if (idVendedor === id) {
    //   setFocus('document');
    // } // borrar
  };

  // INSERT DATA IN REACT HOOK FORM
  useEffect(() => {
    if (typeOfPanel === "Editar") {
      debugger
      setValue("client", vendedorByIdData[0].paciente.rz_social || "");
      setValue("documentType", vendedorByIdData[0].paciente.rz_social|| "");
      setValue("document", vendedorByIdData[0]?.paciente.documento || "");
      setValue("address",vendedorByIdData[0]?.paciente.direccion|| "");
      setValue("phone", vendedorByIdData[0]?.paciente.telefono || "");
      setValue("vision", vendedorByIdData[0].vision || "select");
      setValue("receta", vendedorByIdData[0].receta || "select");
      setValue("dip", vendedorByIdData[0]?.dip || "");
      setValue("add", vendedorByIdData[0]?.add || "");

      setValue("esfi", vendedorByIdData[0].esf || "");
      setValue("cili", vendedorByIdData[0].cil || "");
      setValue("ejei", vendedorByIdData[0].eje || "");
      setValue("precioi", vendedorByIdData[0].precio || "");

      setValue("esfd", vendedorByIdData[1].esf || "");
      setValue("cild", vendedorByIdData[1].cil || "");
      setValue("ejed", vendedorByIdData[1].eje || "");
      setValue("preciod", vendedorByIdData[1].precio || "");

      clearErrors();
      if (vendedorByIdData[0].ojo) {
        setIsLoadingSelectItem(false);
        // setFocus('NumDocu');
      }
    }
  }, [vendedorByIdData]);



  
  // LIMPIAR EDIT PANEL
  const clearInputs = () => {
    setIdVendedor(-1);
    setValue("client", "");
    setValue("documentType", "");
    setValue("document", "");
    setValue("address","");
    setValue("phone", "");
    setValue("vision",  "select");
    setValue("receta",  "select");
    setValue("dip",  "");
    setValue("add",  "");

    setValue("esfi",  "");
    setValue("cili",  "");
    setValue("ejei",  "");
    setValue("precioi",  "");

    setValue("esfd",  "");
    setValue("cild",  "");
    setValue("ejed",  "");
    setValue("preciod",  "");
    clearErrors();
  };

  // CANCEL EDIT PANEL
  const handleCancel = () => {
    setIdVendedor(-1);
    setIsRowBlocked(false);
    setTypeOfPanel("Ingresar");
    clearInputs();
  };

  // CREATE ADMIN
  const createVendedor = async (data) => {
    let local_storage = JSON.parse(localStorage.getItem("localData"))
    setIsLoaderSubmit(true);
    const dataToAdd = {
      paciente_id: clientDataById?.id || 1,
      dip: data.dip,
      vision: data.vision,
      receta: data.receta,
      esfi: data.esfi,
      cili: data.cili,
      precioi: data.precioi,
      cili: data.cili,
      ejei: data.ejei,
      esfd: data.esfd,
      cild: data.cild,
      preciod: data.preciod,
      cild: data.cild,
      ejed: data.ejed,
      add: data.add,
      local_id : local_storage.id

    };
    const [result, status] = await fetchVendedor.post(dataToAdd);
    if (status !== 200) {
      errorAlert(result.message);
      setIsLoaderSubmit(false);
    } else {
      // await adminMutate();
      setIsLoaderSubmit(false);
      // await clientByIdMutate();
      clearInputs();
      successAlert("Vendedor Creado Correctamente");
    }
    // }
    //   else {
    //   setIsLoaderSubmit(false);
    // }
    await setVendedorMutate(Date.now());
  };

  // EDIT ADMIN
  const editVendedor = async (data) => {
    // console.log('editando');
    let local_storage = JSON.parse(localStorage.getItem("localData"))
    setIsLoaderSubmit(true);
    debugger
    const dataToAdd = {
      paciente_id: clientDataById?.id || 1,
      dip: data.dip,
      vision: data.vision,
      receta: data.receta,
      esfi: data.esfi,
      cili: data.cili,
      precioi: data.precioi,
      cili: data.cili,
      ejei: data.ejei,
      esfd: data.esfd,
      cild: data.cild,
      preciod: data.preciod,
      cild: data.cild,
      ejed: data.ejed,
      add: data.add,
      local_id : local_storage.id
    };
    try {
      const [result, status] = await fetchVendedor.put(idVendedor, dataToAdd);
      if (status !== 200) {
        errorAlert(result.message);
        setIsLoaderSubmit(false);
      } else {
        // await adminMutate();
        await setIsLoaderSubmit(false);
        // await clientByIdMutate();
        setTypeOfPanel("Ingresar");
        setIsRowBlocked(false);
        clearInputs();
        successAlert("Medida Actualizada Correctamente");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setVendedorMutate(Date.now);
      scrollUp();
    }
  };

  // SUBMIT CREATE AND EDIT
  const onSubmit = async (data) => {
    if (typeOfPanel === "Ingresar") {
      await createVendedor(data);
    } else if (typeOfPanel === "Editar") {
      await editVendedor(data);
    }
  };

  const handleChangeClient = () => {
    const client = refClient.current.value;
    setSearchClient(client);
    setIsOpenSearchListClients(true);

    // DELETE THIS IF PEOPLE WANT SEE ALL CLIENTS
    if (!client) {
      setIsOpenSearchListClients(false);
    }
  };
  // DELETE ADMIN
  const handleDeleteClient = async () => {
    setIsDeleteLoad(true);
    const id = idToDelete;
    try {
      const [result, status] = await fetchVendedor.del(id);
      if (status !== 200) {
        errorAlert(result.message || "Algo salió mal, intentelo nuevamente");
      } else {
        // await adminMutate();
        // await clientByIdMutate();
        infoAlert("Eliminado Correctamente");
      }
    } catch (error) {
      errorAlert("Algo salió mal, intentelo nuevamente");
    } finally {
      await setVendedorMutate(Date.now());
    }
    if (idVendedor === id) {
      handleCancel();
    }
    setIsDeleteLoad(false);
    setIsOpenVerifyDelete(false);
    setIdToDelete(-1);
  };
  const handleSelectClient = () => {
    setValue("client", clientDataById?.rz_social || "");
    setValue("documentType", clientDataById?.tipo_documento || "");
    setValue("document", clientDataById?.documento || "");
    setValue("address", clientDataById?.direccion || "");
    setValue("phone", clientDataById?.telefono || "");

    if (watch("client")) clearErrors("client");
    if (watch("documentType")) clearErrors("documentType");
    if (watch("document")) clearErrors("document");
    if (watch("address")) clearErrors("address");
    if (watch("phone")) clearErrors("phone");
    handleCleanSearchClients();
  };

  useEffect(() => {
    if (clientId > 0) {
      handleSelectClient();
    }
  }, [clientDataById]);

  // <--------- REFRESH FUNCTION ---------> 🔄
  const handleRefresh = async () => {
    // await adminMutate();
  };

  return (
    <>
      {isOpenVerifyDelete && (
        <Portal>
          <ModalTwoOptions
            titleModal={
              <>
                <div className="-mt-2 flex justify-center items-center text-center text-yellow-500 w-20">
                  <IconAlert />
                </div>
                <p className="-mt-2">¿Esta seguro de Eliminar</p>
                <p>la medida:</p>
                <p className="pb-2">{`${
                  vendedorData?.filter((item) => item.id === idToDelete)[0]
                    ?.ojo
                }?`}</p>
              </>
            }
            titleFirstOption="   Cancelar   " // SPACES with alt + 0160
            titleSecondOption=" Eliminar "
            onClickFirstOption={() => {
              setIsOpenVerifyDelete(false);
              setIsDeleteLoad(false);
            }}
            onClickSecondOption={() => handleDeleteClient()}
            isLoadSecondOption={isDeleteLoad}
            colorFirstButton="red-500"
          />
        </Portal>
      )}
      {isOpenNewClientModal && (
        <Portal>
          <NewClient
            setIsOpenNewClientModal={setIsOpenNewClientModal}
            setClientMutate={setClientMutate}
            setClientId={setClientId}
          />
        </Portal>
      )}
      <div className="flex flex-col items-center bg-bg-blue w-full min-h-screen box-border">
        <div className="pl-4 pt-2 flex w-full h-12 sm:h-16 bg-white shadow-sm">
          <div className="flex text-2xl sm:text-4xl text-gray-800 font-semibold">
            Pacientes por atender
            <div className="text-primary opacity-80 w-7 sm:w-10 ml-1">
              <IconUsersSolid autosize />
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

                  {/* FILTER STATUS */}
                  {/* <div className="relative w-1/2 sm:w-40 mr-3">
                    <button
                      type="button"
                      onClick={handleFilterStatus}
                      className={`text-left ${openMenuFilterStatus ? 'rounded-t-xl' : 'rounded-xl'}  border bg-white border-gray-300 py-1 w-full focus:outline-none focus:border-primary text-base pl-2 pr-7`}
                    >
                      <div className={`whitespace-nowrap overflow-hidden ${filterStatus.length > 15 ? 'text-xs py-1' : ''}`}>
                        {filterStatus}
                      </div>
                    </button>
                    <span className="absolute right-0 top-0 h-full w-7 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <IconFilter />
                    </span>
                    <form className={`${openMenuFilterStatus ? 'flex' : 'hidden'} flex-col absolute bg-white border-r border-b border-l border-gray-300 w-full rounded-b-md p-2 z-10`}>
                      {/* {saleStatus.map((item) => (
                        <label key={item.name} htmlFor={item.name} className="flex items-center ">
                          <input type="checkbox" checked={filterStatus.split(',').includes(item.name)} value={item.name} id={item.name} onChange={(e) => onChangeFilterStatus(e)} className="checked:bg-blue-600 checked-border-transparent mr-1" />
                          <p>{item.name}</p>
                        </label>
                      ))} */}
                  {/* <label htmlFor="Cocina" className="flex items-center ">
                        <input type="checkbox" checked value="Cocina" id="Cocina" onChange={(e) => onChangeFilterStatus(e)} className="checked:bg-blue-600 checked-border-transparent mr-1" />
                        <p>Cocina</p>
                      </label>
                      <label htmlFor="Baño" className="flex items-center ">
                        <input type="checkbox" checked value="Baño" id="Baño" onChange={(e) => onChangeFilterStatus(e)} className="checked:bg-blue-600 checked-border-transparent mr-1" />
                        <p>Baño</p>
                      </label>
                      <label htmlFor="Sala" className="flex items-center ">
                        <input type="checkbox" checked value="Sala" id="Sala" onChange={(e) => onChangeFilterStatus(e)} className="checked:bg-blue-600 checked-border-transparent mr-1" />
                        <p>Sala</p>
                      </label>
                    </form>
                  </div>  */}

                  <div className="flex flex-row justify-end w-full sm:w-auto relative">
                    <input
                      ref={refSearch}
                      className="pl-3 pr-8 p-1 w-full bg-white rounded-xl appearance-none focus:outline-none border border-gray-300 focus:border-primary"
                      type="text"
                      placeholder="Buscar"
                      onChange={(e) => {
                        setIsLoadingSearchVendedor(true);
                        setTimeout(() => {
                          handleChangeSearch(e);
                        }, 1000);
                      }}
                    />
                    {searchVendedor === "" ? (
                      <span className="absolute right-1 top-0 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                        <IconSearch />
                      </span>
                    ) : isLoadingSearchVendedor ? (
                      <span className="absolute right-1 top-0 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                        <IconSpiner dark mini />
                      </span>
                    ) : (
                      <span className="absolute right-1 top-0 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                        <ButtonIcon
                          icon={<IconClose />}
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
              <div className="p-4 overflow-auto max-h-96">
                <table
                  id="tableAdmin"
                  className="table-auto text-center text-gray-700 w-full"
                >
                  <thead>
                    <tr className="border-l border-gray-400 bg-primary opacity-90 text-white">
                      {/* <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">Documento</th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium text-sm">N° Documento</th> */}
                      <th className="border-r border-b border-gray-200 px-6 py-2 font-medium whitespace-nowrap">
                        Paciente
                      </th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">
                        Documento
                      </th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">
                        Ojo
                      </th>
                      {/* <th className="border-r border-b border-gray-200 px-12 py-2 font-medium">Dirección</th> */}
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">
                        Fecha
                      </th>
                      <th className="border-b border-gray-200 px-2 py-2 font-medium">
                        Editar
                      </th>
                      <th className="border-l border-gray-400 bg-white select-none">
                        0
                      </th>
                    </tr>
                  </thead>
                  {Array.isArray(vendedorData) &&
                    vendedorData[0] !== "loading" && (
                      <tbody>
                        {vendedorData.map((item) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              !isRowBlocked && setRowSelected(item.id)
                            }
                            className={`text-sm rowTable ${
                              rowSelected === item.id && "rowTableAdminSelected"
                            }`}
                          >
                            {/* <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{(item.tipo_documento === 'dni' ? 'DNI' : item.tipo_documento === 'ruc' ? 'RUC' : item.tipo_documento) || ''}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium">{item.NumDocu || ''}</td> */}
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize text-left">
                              {item.paciente.rz_social || ""}
                            </td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">
                              {item.paciente.documento || ""}
                            </td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">
                              {item.ojo || ""}
                            </td>
                            {/* <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.Direccion || ''}</td> */}
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">
                              {item.fecha_creacion || ""}
                            </td>
                            <td className="border border-gray-350 px-2 py-2 font-medium">
                              <div className="flex justify-center space-x-2">
                                <ButtonIcon
                                  icon={<IconPencil />}
                                  isBorder
                                  isBgColor
                                  colorBg="primary"
                                  onClick={() => {
                                    handleEditVendedor(item.diotria_id.id);
                                  }}
                                  padding={1}
                                />
                                { (
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
                  {vendedorData[0] === "loading" ? (
                    <div className="flex items-center justify-center py-8">
                      <IconSpiner dark medium />
                    </div>
                  ) : vendedorData.length === 0 ||
                    !Array.isArray(vendedorData) ? (
                    <div className="flex items-center justify-center py-8 italic text-gray-700">
                      No se Encontraron Resultados
                    </div>
                  ) : (
                    ""
                  )}
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
                {typeOfPanel} atencion
              </div>
              <div className="flex flex-col w-full pt-3 p-4">
                <label
                  htmlFor="client"
                  className="w-full relative mb-2 flex flex-col justify-center "
                >
                  <div className="flex text-sm">
                    <p className="font-semibold text-gray-600 ml-2 pl-1  sm:font-semibold ">
                      Buscar Paciente
                    </p>
                    {/* <p className="text-red-600 pr-1">*</p> */}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center w-full relative">
                      <input
                        ref={refClient}
                        placeholder="Nombre / N° Documento / Teléfono"
                        type="text"
                        id="client"
                        autoComplete="off"
                        onChange={() => {
                          setIsLoadingSearchClient(true);
                          setTimeout(() => {
                            handleChangeClient();
                          }, 1000);
                        }}
                        className={`${
                          errors?.client ? "ring-red-500" : "ring-blue-400"
                        } ${
                          isOpenSearchListClients
                            ? "rounded-t-xl"
                            : "rounded-xl"
                        } bg-white pl-3 pr-3 py-0.5 text-sm  w-full ring-1 focus:ring-2 focus:outline-none text-gray-800`}
                      />
                      {isOpenSearchListClients ? (
                        isLoadingSearchClient ? (
                          <span className="absolute right-1 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                            <IconSpiner dark mini />
                          </span>
                        ) : (
                          <span className="absolute right-1 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                            <ButtonIcon
                              icon={<IconClose />}
                              isColorHover
                              colorHover="primary"
                              colorText="gray-600"
                              padding={1}
                              onClick={() => handleCleanSearchClients()}
                            />
                          </span>
                        )
                      ) : (
                        <span className="absolute right-1 h-full w-7 text-center text-gray-600 flex items-center justify-center">
                          <IconSearch />
                        </span>
                      )}
                      {isOpenSearchListClients && (
                        <div className="flex flex-col w-full bg-white absolute top-6.5 z-20 rounded-b-xl ring-blue-400 ring-2 pb-2 max-h-96 overflow-auto">
                          {clientsData[0] === "loading" ? (
                            <div className="w-full flex justify-center pb-1 pt-2">
                              <IconSpiner primary />
                            </div>
                          ) : clientsData.length === 0 ||
                            !Array.isArray(clientsData) ? (
                            <div className="w-full flex justify-center pt-1.5 pb-0.5 italic text-gray-400">
                              Sin Resultados
                            </div>
                          ) : (
                            clientsData.map((item, i) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() =>
                                  clientId === item.id
                                    ? handleSelectClient()
                                    : setClientId(item.id)
                                }
                                className={`${
                                  clientsData.length - 1 !== i ? "border-b" : ""
                                } pl-2 py-2 p-1 flex flex-wrap justify-start w-full hover:bg-blue-500 hover:text-white text-xs sm:text-sm md:text-xs`}
                              >
                                <p className="text-left mr-0.5">{`${item.documento} - `}</p>
                                <p className="text-left">{item.rz_social}</p>
                                {/* <p className="text-left">BRYAN PAUL BRICEÑO CHICLAYO</p> */}
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsOpenNewClientModal(true)}
                      className="flex rounded-full py-1 px-2.5 text-sm bg-primary hover:opacity-90 hover:ring ring-gray-200 text-white tap-highline-none"
                    >
                      <p className="mr-1.5 hidden sm:flex md:hidden lg:flex">
                        Nuevo
                      </p>
                      <span>
                        <IconNewClient />
                      </span>
                    </button>
                  </div>
                </label>
                {isLoaderSubmit ? (
                  <div className="flex flex-col items-center w-full h-full">
                    <IconSpiner dark big />
                    Guardando...
                  </div>
                ) : (
                  <>
                    <form
                      className="flex flex-col w-full -mt-2 relative"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      
                <div className="pl-3 py-2 pr-2 ring-1 ring-blue-400 rounded-2xl">
                  <div className="flex flex-wrap text-sm relative">
                    <p className="font-semibold text-primary sm:font-semibold">
                      Cliente:
                    </p>
                    <p className="font-semibold ml-2 text-gray-600 capitalize">{`${
                      (watch("client") && watch("client").toLowerCase()) || "-"
                    }`}</p>
                  </div>
                  <div className="flex text-sm relative">
                    <p className="font-semibold text-primary sm:font-semibold">
                      Docum.:
                    </p>
                    <div className="flex text-gray-600 font-semibold ml-2">
                      <p className="">{`${
                        (watch("documentType") === "dni" && "DNI") ||
                        (watch("documentType") === "ruc" && "RUC") ||
                        (watch("documentType") === "carnet" &&
                          "Carnet Extr.") ||
                        ""
                      }`}</p>

                      <p className={`${watch("documentType") && "mx-1"}`}>-</p>
                      <p className="">{`${watch("document") || ""}`}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap text-sm">
                    <p className="font-semibold text-primary sm:font-semibold">
                      Dirección:
                    </p>
                    <p className="font-semibold ml-2 text-gray-600 capitalize">{`${
                      (watch("address") && watch("address").toLowerCase()) ||
                      "-"
                    }`}</p>
                  </div>
                </div>
                      <div className={`flex items-start space-x-2 mt-2`}>
                        <div class="flex relative w-full    bg-blue-400  bg-opacity-90 text-white  shadow  items-center justify-center p-2">
                          <div class="z-10"></div>
                          <div className="w-1/2">
                            <div className="flex flex-wrap text-sm relative">
                              <p className="font-semibold sm:font-semibold p-2">
                                Vision
                              </p>
                              <p className="font-semibold text-primary sm:font-semibold">
                                <FormSelectInput
                                  inputName="vision"
                                  // title=""
                                  // onChange={(e) => handleChangeCantView(e)}
                                  options={{
                                    validate: {
                                      value: (e) =>
                                        e !== "select" || "Vision requerida",
                                    },
                                  }}
                                  register={register}
                                  errors={errors}
                                  watch={watch}
                                >
                                  <option
                                    value="CERCA"
                                    className="text-gray-700"
                                  >
                                    CERCA
                                  </option>
                                  <option
                                    value="INTERMEDIO"
                                    className="text-gray-700"
                                  >
                                    INTERMEDIO
                                  </option>
                                  <option
                                    value="LEJOS"
                                    className="text-gray-700"
                                  >
                                    LEJOS
                                  </option>
                                  <option
                                    value="LEJOS Y CERCA"
                                    className="text-gray-700"
                                  >
                                    LEJOS Y CERCA
                                  </option>
                                </FormSelectInput>
                              </p>
                            </div>
                          </div>

                          <div className="w-1/2">
                            <div className="flex flex-wrap text-sm relative">
                              <p className="font-semibold  sm:font-semibold p-2">
                                Receta
                              </p>
                              <p className="font-semibold text-primary sm:font-semibold">
                                <FormSelectInput
                                  inputName="receta"
                                  // title="Receta"
                                  // onChange={(e) => handleChangeCantView(e)}
                                  options={{
                                    validate: {
                                      value: (e) =>
                                        e !== "select" || "Receta requerida",
                                    },
                                  }}
                                  register={register}
                                  errors={errors}
                                  watch={watch}
                                >
                                  <option
                                    value="INTERNA"
                                    className="text-gray-700"
                                  >
                                    INTERNA
                                  </option>
                                  <option
                                    value="EXTERNA"
                                    className="text-gray-700"
                                  >
                                    EXTERNA
                                  </option>
                                </FormSelectInput>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 mt-2">
                        <div className="w-1/2">
                          <div class="pl-3 py-2 pr-2  bg-primary rounded-t-lg ">
                            <div class="flex relative w-full   text-white    items-center justify-center p-2">
                              <div class="z-10"></div>
                              <p className="font-semibold text-white sm:font-semibold">
                                DERECHA
                              </p>
                            </div>
                          </div>
                          <div class="pl-3 py-2 pr-2 ring-1 ring-blue-400 rounded-t-lg ">
                            <p className="font-semibold text-primary sm:font-semibold">
                              <FormTextInput
                                inputName="esfd"
                                icon="Esf."
                                options={{
                                  required: {
                                    value: true,
                                    message: "Eje. requerido",
                                    pattern:"[0-9]",
                                    step:"0.25"
                                    
                                  },
                                  onBlur: () => watch('esfd')  && setValue('esfd', toMedida(watch('esfd'))),
                                }}
                                register={register}
                                errors={errors}
                              />
                            </p>
                            <p className="font-semibold text-primary sm:font-semibold">
                              <FormTextInput
                                inputName="cild"
                                icon="Cil."
                                options={{
                                  required: {
                                    value: true,
                                    message: "Eje. requerido",
                                    pattern:"[0-9]",
                                    step:"0.25"
                                    
                                  },
                                  onBlur: () => watch('cild')  && setValue('cild', toMedida(watch('cild'))),
                                }}
                                register={register}
                                errors={errors}
                              />
                            </p>
                            <p className="font-semibold text-primary sm:font-semibold">
                              <FormTextInput
                                inputName="ejed"
                                icon="Eje."
                                options={{
                                  required: {
                                    value: true,
                                    message: "Eje. requerido",
                                    pattern:"[0-9]",
                                    step:"0.25"
                                    
                                  },
                                  onBlur: () => watch('ejed')  && setValue('ejed', toMedida(watch('ejed'))),
                                }}
                                register={register}
                                errors={errors}
                              />
                            </p>
                          </div>

                          <div class="pl-3 py-2 pr-2 ring-1 bg-gray-350 ">
                            <p className="font-semibold text-primary sm:font-semibold ">
                              <FormTextInput
                                inputName="dip"
                                icon="DIP."
                                options={{
                                  required: {
                                    value: true,
                                    message: "Dip. requerido",
                                    pattern:"[0-9]",
                                    step:"0.25"
                                  },
                                  onBlur: () => watch('dip')  && setValue('dip', toMedida(watch('dip'))),
                                }}

                                register={register}
                                errors={errors}
                              />
                            </p>
                          </div>
                          
                          <div class="pl-3 py-2 pr-2 ring-1   rounded-b-lg  ">
                            <p className="font-semibold text-primary sm:font-semibold ">
                              <FormTextInput
                                inputName="precioi"
                                icon="S/"
                                options={{
                                  required: {
                                    value: true,
                                    message: "precio. requerido",
                                  },
                                  pattern: {
                                    value: /^[0-9.]+$/,
                                    message: 'Precio invalido',
                                  },
                                  min: {
                                    value: 0.01,
                                    message: 'Precio debe ser mayor a 0',
                                  },
                                  onBlur: () => watch('precioi')  && setValue('precioi', parseFloat(watch('precioi')).toFixed(2)),

                                }}

                                register={register}
                                errors={errors}
                              />
                            </p>
                          </div>

                        </div>
                        <div className="w-1/2">
                          <div class="pl-3 py-2 pr-2  bg-primary rounded-t-lg ">
                            <div class="flex relative w-full   text-white    items-center justify-center p-2">
                              <div class="z-10"></div>
                              <p className="font-semibold text-white sm:font-semibold">
                                IZQUIERDA
                              </p>
                            </div>
                          </div>
                         
                          <div class="pl-3 py-2 pr-2 ring-1 ring-blue-400 rounded-t-lg ">
                            <p className="font-semibold text-primary sm:font-semibold">
                              <FormTextInput
                                inputName="esfi"
                                icon="Esf."
                                options={{
                                  required: {
                                    value: true,
                                    message: "Eje. requerido",
                                    pattern:"[0-9]",
                                    step:"0.25"
                                    
                                  },
                                  onBlur: () => watch('esfi')  && setValue('esfi', toMedida(watch('esfi'))),
                                }}
                                register={register}
                                errors={errors}
                              />
                            </p>
                            <p className="font-semibold text-primary sm:font-semibold">
                              <FormTextInput
                                inputName="cili"
                                icon="Cil."
                                options={{
                                  required: {
                                    value: true,
                                    message: "Eje. requerido",
                                    pattern:"[0-9]",
                                    step:"0.25"
                                    
                                  },
                                  onBlur: () => watch('cili')  && setValue('cili', toMedida(watch('cili'))),
                                }}
                                register={register}
                                errors={errors}
                              />
                            </p>
                            <p className="font-semibold text-primary sm:font-semibold">
                              <FormTextInput
                                inputName="ejei"
                                icon="Eje."
                                options={{
                                  required: {
                                    value: true,
                                    message: "Eje. requerido",
                                    pattern:"[0-9]",
                                    step:"0.25"
                                    
                                  },
                                  onBlur: () => watch('ejei')  && setValue('ejei', toMedida(watch('ejei'))),
                                }}
                                register={register}
                                errors={errors}
                              />
                            </p>
                          </div>
                          <div class="pl-3 py-2 pr-2 ring-1 bg-gray-350 ">
                            <p className="font-semibold text-primary sm:font-semibold">
                              <FormTextInput
                                inputName="add"
                                icon="ADD."
                                 options={{
                                  required: {
                                    value: true,
                                    message: "Eje. requerido",
                                    pattern:"[0-9]",
                                    step:"0.25"
                                    
                                  },
                                  onBlur: () => watch('add')  && setValue('add', toMedida(watch('add'))),
                                }}
                                register={register}
                                errors={errors}
                              />
                            </p>
                          </div>
                          <div class="pl-3 py-2 pr-2 ring-1   rounded-b-lg  ">
                            <p className="font-semibold text-primary sm:font-semibold ">
                              <FormTextInput
                                inputName="preciod"
                                icon="S/"
                                options={{
                                  required: {
                                    value: true,
                                    message: "precio. requerido",
                                  },
                                  pattern: {
                                    value: /^[0-9.]+$/,
                                    message: 'Precio invalido',
                                  },
                                  min: {
                                    value: 0.01,
                                    message: 'Precio debe ser mayor a 0',
                                  },
                                  onBlur: () => watch('preciod')  && setValue('preciod', parseFloat(watch('preciod')).toFixed(2)),

                                }}
                                register={register}
                                errors={errors}
                              />
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* <FormSelectInput inputName="idtienda"
                        title="Tienda"
                        icon={<IconSearch />}
                        placeholder="Tienda"
                        // onChange={(e) => handleChangeCantView(e)}
                        options={{
                          validate: {
                            value: (e) => e !== 'select' || 'Tienda requerido',
                          },
                        

                        }}
                        register={register} errors={errors} watch={watch}
                      >
                         {Array.isArray(tiendaData)
                            && tiendaData.map((item) => (
                              <option key={item.id} value={item.id} className="capitalize text-gray-700">
                                {item.nombre}
                              </option>
                            ))}
                        </FormSelectInput> */}
                             
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
                            {typeOfPanel === "Ingresar"
                              ? "Ingresar"
                              : "Actualizar"}
                          </div>
                        </button>
                      </div>
                      {isLoadingSelectItem && (
                        <div className="flex items-center justify-center absolute top-0 bg-white bg-opacity-50 h-full w-full">
                          <IconSpiner dark medium />
                        </div>
                      )}
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Diotrias.propTypes = {
  isLoadingSearchVendedor: PropTypes.bool.isRequired,
  setIsLoadingSearchVendedor: PropTypes.func.isRequired,
  setIsLoadingSearchClient: PropTypes.func.isRequired,
  setCategoryListMutate: PropTypes.func.isRequired,
  categoryId: PropTypes.number.isRequired,
  setCategoryId: PropTypes.func.isRequired,
  pageActual: PropTypes.number.isRequired,
  setPageActual: PropTypes.func.isRequired,
  vendedorData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  clientsData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  clientId: PropTypes.number.isRequired,
  setClientId: PropTypes.func.isRequired,
  setSearchClient: PropTypes.func.isRequired,
  setClientMutate: PropTypes.func.isRequired,
  clientDataById: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  setVendedorMutate: PropTypes.func.isRequired,
  categoriesData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  tiendaData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  pages: PropTypes.number.isRequired,
  vendedorByIdData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  setLimit: PropTypes.func.isRequired,

  setSearchVendedor: PropTypes.func.isRequired,
  searchVendedor: PropTypes.string.isRequired,
  idVendedor: PropTypes.number.isRequired,
  setIdVendedor: PropTypes.func.isRequired,
 
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

export default withFetch(Diotrias);
