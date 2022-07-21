/* eslint-disable max-len */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {
  IconAdminSolid, IconPrev, IconNext, IconFirst, IconLast, IconSelect, IconSearch,
  IconSpiner, IconDelete, IconPencil, IconKey, IconImage, IconUser, IconUserCircle,
  IconRefresh, IconUpload, IconClose, IconAlert, IconProduct, IconProductCode, IconCategory, IconFilter, IconStock, IconNewClient, IconNewCategory, IconBilling, IconCalendar,
} from '../../../../assets/icons/icons';
import ButtonIcon from '../../../atoms/buttons/buttonIcon';
import withFetch from './withFetch';
import {
  errorAlert, infoAlert, successAlert, warningAlert,
} from '../../../../utils/alertNotify';
import useFetch from '../../../../hook/usefetch';
import ModalTwoOptions from '../../../molecules/modal/ModalTwoOptions';
import Portal from '../../../../utils/portal';
// import NewCategory from '../../../molecules/newCategory/newCategory';
import { scrollTo, scrollUp } from '../../../../utils/scrolling';
import Pagination from '../../../atoms/buttons/paginationButtons';
import ModalAnular from '../../../molecules/modalAnular/modalAnular';
import Context from '../../../context/context';
import numberToLetters from '../../../../utils/numberToLetters';
import { API_FACTURADOR, optionsNotaCredito, optionsNotaDebito } from '../../../../config';

const Billing = ({
  setFechaInicio,
  setFechaFin,
  billingData,
  setBillingMutate,
  setLimit,
  // filterBillingType,
  // setFilterBillingType,
  page,
  pageRange,
  lastPage,
  nextPage,
  previusPage,
  jumpToPage,
  jumpToFirstPage,
  jumpToLastPage,
}) => {
  // filter
  // const [openMenuFilterStatus, setOpenMenuFilterStatus] = useState(false);
  // const [isLoaderSubmit, setIsLoaderSubmit] = useState(false);
  // const [isOpenNewCategoryModal, setIsOpenNewCategoryModal] = useState(false);
  const [rowSelected, setRowSelected] = useState(null);
  const [isRowBlocked, setIsRowBlocked] = useState(false);
  // const [typeOfPanel, setTypeOfPanel] = useState('Ingresar');
  // const refEditPanel = useRef(null);
  const [isOpenVerifyDelete, setIsOpenVerifyDelete] = useState(false);
  const [isDeleteLoad, setIsDeleteLoad] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);
  const [comprobanteToDelete, setComprobanteToDelete] = useState('');

  // const [openMenuFilterBillingType, setOpenMenuFilterBillingType] = useState(false);
  const [controller, setController] = useState(null);

  const fetchSaleDetails = useFetch('detail/sale');
  // const fetchGenerarNota = useFetch('');
  const fetchAnularBilling = useFetch('anular');
  // const fetchUploadImg = useFetch('');

  // FORM VARIABLES
  const {
    register, watch, reset, setValue, clearErrors, handleSubmit, setFocus, formState: { errors },
  } = useForm();

  const { state: { localData } } = useContext(Context);

  // <--- FUNCTIONS TO SEARCH ---> 🔎

  // WRITTING word to search
  // const handleChangeSearch = (event) => {
  //   const { value } = event.target;
  //   // VERIFY IF KEYWORD WITH "/" or "\" AND START/END SPACES
  //   let search = value.split('/').join(' ');
  //   search = search.split('\\').join(' ');
  //   search = search.trim();
  //   setSearchProduct(search);
  // };

  // CLEAN search
  // const handleCleanSearch = () => {
  //   setSearchProduct('');
  //   refSearch.current.value = '';
  //   refSearch.current.focus();
  // };

  // <--------- CANT ROWS FUNCTIONS --------->
  const handleChangeCantView = (e) => {
    const { value } = e.target;
    setLimit(value);
  };

  // OPEN menu filter by BillingType
  // const handleFilterBillingType = () => {
  //   setOpenMenuFilterBillingType(!openMenuFilterBillingType);
  // };
  // FILTER BillingType
  // const onChangeFilterBillingType = (e) => {
  //   const { checked, value } = e.target;

  //   if (filterBillingType === 'Tipo Comprobante') {
  //     if (checked) {
  //       setFilterBillingType(value);
  //     }
  //   } else if (checked) {
  //     setFilterBillingType(`${filterBillingType},${value}`);
  //   } else {
  //     let newValue = filterBillingType.split(`,${value}`).join('');
  //     newValue = newValue.split(`${value},`).join('');
  //     newValue = newValue.split(value).join('');
  //     if (newValue === '') {
  //       setFilterBillingType('Tipo Comprobante');
  //     } else { setFilterBillingType(newValue); }
  //   }
  // };

  // DELETE ADMIN
  const handleDeleteBilling = async (modalData) => {
    setIsDeleteLoad(true);
    const comprobanteData = billingData.filter((item) => item.id === idToDelete)[0];
    const venta = comprobanteData.ventas;
    const comprobante = { comprobante: comprobanteToDelete };
    // const localData = JSON.parse(localStorage.getItem('localData'));
    // console.log(comprobanteData);
    let dataToXML = {};
    let cabecera = {
      serie: comprobanteToDelete,
      nombreNota: '',
      rucEmpresa: localData?.RUC,
      fechaEmision: dayjs(Date.now()).format('YYYY-MM-DD'),
      horaEmision: dayjs(Date.now()).format('HH:mm:ss'),
      totalLetras: numberToLetters(venta.total).toUpperCase(),
      tipoComp: comprobanteData?.tipo_comprobante === 'factura' ? '01' : '03',
      rzEmisor: localData?.rz_social.toUpperCase(),
      docReceptor: '',
      rzReceptor: '',
      montoTotal: (+comprobanteData.total).toFixed(2),
      codDomFiscal: localData?.codDomicilioFiscal,
      tipoNota: modalData.tipoNota,
      descTipoNota: modalData.tipoNota === '07'
        ? 'Nota de Crédito'
        : 'Nota de Débito',
      codNotaCredito: modalData?.motivo,
      desNota: modalData.tipoNota === '07'
        ? optionsNotaCredito.filter((item) => item.value === modalData.motivo)[0]?.name
        : optionsNotaDebito.filter((item) => item.value === modalData.motivo)[0]?.name,
    };
    let detalle = [];

    try {
      const [resultSaleDetails, statusSaleDetails] = await fetchSaleDetails.getById(venta.id);
      if (statusSaleDetails === 200) {
        Array.prototype.map.call(resultSaleDetails.result, (item) => {
          detalle = [...detalle, {
            cantidad: item.cantidad, descProd: item.product.descripcion.toUpperCase(), codProd: item.product.codigo, precioUnitario: (+item.product.precio_sugerido).toFixed(2), totalProd: (item.cantidad * item.product.precio_sugerido).toFixed(2),
          }];
        });
        cabecera = {
          ...cabecera, docReceptor: resultSaleDetails.result[0].ventas.clientes.documento, rzReceptor: resultSaleDetails.result[0].ventas.clientes.rz_social.toUpperCase(),
        };
      } else {
        errorAlert('Error al obtener detalle de Venta');
        return;
      }

      try {
        const [resultAnular, statusAnular] = await fetchAnularBilling.put(venta.id, comprobante, true, controller.signal);
        if (statusAnular !== 200) {
          errorAlert(resultAnular.message || 'Algo salió mal, intentelo nuevamente');
        } else {
          cabecera = { ...cabecera, nombreNota: resultAnular?.result?.numero_comprobante };
          dataToXML = {
            cabecera,
            detalle,
          };
          try {
            // const [resultGenerarNota, statusGenerarNota] = fetchGenerarNota.post(dataToXML, true, APIGenerarNota);
            const fetchGenerarNota = await fetch(API_FACTURADOR, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: '7MfGJa4&j_apwE3jd+wrL54JbAN-CZ',
              },
              body: JSON.stringify(dataToXML),
            });
            const response = await fetchGenerarNota.json();
            // console.log(response);
            if (response.status === 200) {
              if (response.message) {
                infoAlert(response.message);
              }
            }
          } catch (error) {
            console.log('GenerarNota: ', error);
          }
          // await adminMutate();
          // await productByIdMutate();
          infoAlert('Anulado Correctamente');
        }

        // console.log(dataToXML);
      } catch (error) {
        console.log('Anular Venta: ', error);
      } finally {
        if ('adminMode' in localStorage) {
          dataToXML = {
            cabecera,
            detalle,
          };
          console.log('Authorization: 7MfGJa4&j_apwE3jd+wrL54JbAN-CZ', dataToXML);
        }
        await setBillingMutate(Date.now());
        setIsDeleteLoad(false);
        setIsOpenVerifyDelete(false);
        setIdToDelete(-1);
        setComprobanteToDelete('');
      }
    } catch (error) {
      console.log('SaleDetails: ', error);
    }
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
            <ModalAnular
              billingData={billingData}
              idToDelete={idToDelete}
              onClickFirstOption={() => { setIsOpenVerifyDelete(false); setIsDeleteLoad(false); controller.abort(); }}
              onClickSecondOption={handleDeleteBilling}
              isLoadSecondOption={isDeleteLoad}
            />

            {/* <ModalTwoOptions
              titleModal={(
                <>
                  <div className="-mt-2 flex justify-center items-center text-center text-yellow-500 w-20"><IconAlert /></div>
                  <p className="-mt-2">¿Esta seguro de Anular</p>
                  <p>el Comprobante:</p>
                  <p className="pb-2">{`${billingData?.filter((item) => item.ventas?.id === idToDelete)[0]?.numero_comprobante}?`}</p>
                </>
              )}
              titleFirstOption="Cancelar" // SPACES with alt + 0160
              titleSecondOption="Anular comprobante"
              onClickFirstOption={() => { setIsOpenVerifyDelete(false); setIsDeleteLoad(false); controller.abort(); }}
              onClickSecondOption={() => { handleDeleteBilling(); }}
              isLoadSecondOption={isDeleteLoad}
              colorFirstButton="red-500"
              closeButton
            /> */}
          </Portal>
        )}

      <div className="flex flex-col items-center bg-bg-blue w-full min-h-screen box-border">
        <div className="pl-4 pt-2 flex w-full h-12 sm:h-16 bg-white shadow-sm">
          <div className="flex text-2xl sm:text-4xl text-gray-800 font-semibold">
            Facturación Electrónica
            <div className="text-green-500 opacity-80 w-5 sm:w-8 ml-2 mt-0.5">
              <IconBilling autosize />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start w-full h-full p-4 box-border ">
          <div className="flex flex-col sm:flex-row mb-4 w-full">
            <div className="w-full bg-white rounded-xl shadow sm:mb-0">
              <div className="flex flex-wrap p-4">
                <label htmlFor="fechaInicio" className="w-1/2 sm:w-1/3 pr-2 relative">
                  <p className="pl-2 -mt-1">Fecha Inicio</p>
                  <input
                    type="date"
                    id="fechaInicio"
                    name="fechaInicio"
                    required
                    onChange={(e) => {
                      setTimeout(() => {
                        setFechaInicio(e.target.value);
                      }, 500);
                    }}
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                    className="w-full appearance-none p-1.5 bg-white text-gray-800 border border-blue-400 rounded-xl focus:outline-none"
                  />
                  <span className="sm:hidden absolute bottom-3.5 right-4"><IconCalendar /></span>
                  {/* <p className="sm:hidden absolute bottom-3.5 left-3">dd/mm/aaaa</p> */}
                  {/* <span className="validity" /> */}
                </label>
                <label htmlFor="fechaFin" className="w-1/2 sm:w-1/3 mb-1.5 sm:mb-0 sm:pr-2 relative">
                  <p className="pl-2 -mt-1">Fecha Fin</p>
                  <input
                    type="date"
                    id="fechaFin"
                    name="fechaFin"
                    required
                    onChange={(e) => {
                      setTimeout(() => {
                        setFechaFin(dayjs(e.target.value).add(1, 'day').format('YYYY-MM-DD'));
                      }, 500);
                    }}
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                    className="w-full appearance-none p-1.5 bg-white text-gray-800 border border-blue-400 rounded-xl focus:outline-none"
                  />
                  <span className="sm:hidden absolute bottom-2 right-2"><IconCalendar /></span>
                  {/* <p className="sm:hidden absolute bottom-2 left-3">dd/mm/aaaa</p> */}
                  {/* <span className="validity" /> */}
                </label>
                {/* FILTER BILLING */}
                {/* <div className="relative w-full sm:w-1/3">
                  <p className="pl-2 -mt-1">Filtrar</p>
                  <button
                    type="button"
                    onClick={handleFilterBillingType}
                    className={`text-left ${openMenuFilterBillingType ? 'rounded-t-xl' : 'rounded-xl'} bg-white border border-blue-400 w-full focus:outline-none py-1.5 pl-2 pr-7`}
                  >
                    <div className={`whitespace-nowrap overflow-hidden ${filterBillingType.length > 20 ? 'text-xs py-1.5' : ''}`}>
                      {filterBillingType}
                    </div>
                  </button>
                  <span className="absolute right-1.5 bottom-3 w-7 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <IconFilter />
                  </span>
                  <form className={`${openMenuFilterBillingType ? 'flex' : 'hidden'} flex-col absolute bg-white border-r border-b border-l border-gray-300 w-full rounded-b-md p-2 z-10`}>
                    <label htmlFor="Boleta" className="flex items-center ">
                      <input type="checkbox" checked={filterBillingType.split(',').includes('Boleta')} value="Boleta" id="Boleta" onChange={(e) => onChangeFilterBillingType(e)} className="checked:bg-blue-600 checked-border-transparent mr-1" />
                      <p>Boleta</p>
                    </label>
                    <label htmlFor="Factura" className="flex items-center ">
                      <input type="checkbox" checked={filterBillingType.split(',').includes('Factura')} value="Factura" id="Factura" onChange={(e) => onChangeFilterBillingType(e)} className="checked:bg-blue-600 checked-border-transparent mr-1" />
                      <p>Factura</p>
                    </label>
                  </form>
                </div> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 md:mb-0 w-full">
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
                </div>
              </div>

              {/* <--TABLE DATA--> */}
              <div className="p-4 overflow-auto h-96">
                <table id="tableBilling" className="table-auto text-center text-gray-700 w-full">
                  <thead>
                    <tr className="border-l border-gray-400 bg-green-500 opacity-90 text-white">
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium w-32">Tipo Comprobante</th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium text-sm whitespace-nowrap w-36">N° Comprobante</th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium w-32">Fecha Comprobante</th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium w-32  whitespace-nowrap ">Fecha Envio</th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">Estado</th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">Total (S/)</th>
                      {/* <th className="border-r border-b border-gray-200 px-11 py-2 font-medium">Observacion</th> */}
                      <th className="border-r border-b border-gray-200 px-11 py-2 font-medium">Respuesta</th>
                      <th className="border-b border-gray-200 px-2 py-2 font-medium w-24">Anulación</th>
                      <th className="border-l border-gray-400 bg-white select-none">0</th>
                    </tr>
                  </thead>
                  {Array.isArray(billingData) && billingData[0] !== 'loading'
                    && (
                      <tbody>
                        {billingData.map((item) => (
                          <tr key={item.id} onClick={() => !isRowBlocked && setRowSelected(item.id)} className={`text-sm rowTable ${rowSelected === item.id && 'rowTableBillingSelected'}`}>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.tipo_comprobante === 'nota' ? 'Nota de Credito' : item.tipo_comprobante}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.numero_comprobante}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium">{dayjs(item.fecha_creacion).format('DD-MM-YYYY hh:mm a')}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium">{dayjs(item.fecha_envio).format('DD-MM-YYYY')}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.estado}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.total}</td>
                            {/* <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.observaciones}</td> */}
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.respuesta.split('}').join('')}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium">
                              <div className="flex justify-center space-x-2">
                                {/* <ButtonIcon
                                  icon={<IconPencil />}
                                  isBorder
                                  isBgColor
                                  colorBg="primary"
                                  onClick={() => {
                                    handleEditProduct(item.id);
                                  }}
                                  padding={1}
                                /> */}
                                {item.tipo_comprobante === 'nota'
                                  ? (
                                    <p className="whitespace-nowrap text-sm">
                                      {item.codigo_anulado}
                                    </p>
                                  )
                                  : (
                                    <ButtonIcon
                                      icon={(
                                        <div className="flex">
                                          <IconDelete />
                                          <p>Anular</p>
                                        </div>
                                      )}
                                      isBorder
                                      isBgColor
                                      colorBg="red-500"
                                      onClick={() => {
                                        // if (billingData.filter((bil) => bil.id === item.id)[0].ventas.estado === 'anulado') {
                                        //   errorAlert('Anulación procesada anteriormente');
                                        //   return;
                                        // }
                                        setController(new AbortController());
                                        setIsOpenVerifyDelete(true);
                                        setIdToDelete(item.id);
                                        setComprobanteToDelete(item.numero_comprobante);
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
                  {billingData[0] === 'loading'
                    ? (
                      <div className="flex items-center justify-center py-8">
                        <IconSpiner dark medium />
                      </div>
                    )
                    : billingData.length === 0 || !Array.isArray(billingData)
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
        </div>
      </div>
    </>
  );
};

Billing.propTypes = {
  setFechaInicio: PropTypes.func.isRequired,
  setFechaFin: PropTypes.func.isRequired,
  billingData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  setBillingMutate: PropTypes.func.isRequired,
  setLimit: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  lastPage: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  previusPage: PropTypes.func.isRequired,
  jumpToPage: PropTypes.func.isRequired,
  jumpToFirstPage: PropTypes.func.isRequired,
  jumpToLastPage: PropTypes.func.isRequired,
  // filterBillingType: PropTypes.string.isRequired,
  // setFilterBillingType: PropTypes.func.isRequired,
};

export default withFetch(Billing);
