/* eslint-disable no-irregular-whitespace */
/* eslint-disable max-len */
import React, {
  useContext, useState,
} from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {
  IconSelect, IconSpiner, IconCalendar, IconComputer, IconPrint, IconWhatsapp, IconEyeOpen, IconVoucher, IconResume, IconProduct,
} from '../../../../assets/icons/icons';
import ButtonIcon from '../../../atoms/buttons/buttonIcon';
import withFetch from './withFetch';
import ModalTwoOptions from '../../../molecules/modal/ModalTwoOptions';
import Portal from '../../../../utils/portal';
import Pagination from '../../../atoms/buttons/paginationButtons';
import Context from '../../../context/context';
import ModalInput from '../../../molecules/modalInput/modalInput';
import ModalDetails from '../../../molecules/modalDetails/modalDetails';

const SalesReport = ({
  gananciaTotal,
  totalVentas,
  setFechaInicio,
  setFechaFin,
  saleReportData,
  setLimit,
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
  const [rowSelected, setRowSelected] = useState(null);
  const [isRowBlocked, setIsRowBlocked] = useState(false);
  const [isOpenModalPrint, setIsOpenModalPrint] = useState(false);
  const [isOpenModalWhatsapp, setIsOpenModalWhatsapp] = useState(false);
  const [isOpenModalDetails, setIsOpenModalDetails] = useState(false);
  const [whatsappData, setWhatsappData] = useState(null);
  const [detailsData, setDetailsData] = useState(null);
  const [isLoadingIframe, setIsLoadingIframe] = useState(false);
  const [resetIframe, setResetIframe] = useState('');
  const [buttonPressed, setButtonPressed] = useState('');
  const { state: { localData }, dispatch } = useContext(Context);

  // <--- FUNCTIONS TO SEARCH ---> 🔎

  // // WRITTING word to search
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

  // // <--------- REFRESH FUNCTION ---------> 🔄
  // const handleRefresh = async () => {
  //   // await adminMutate();
  // };

  const handleViewDetails = (data) => {
    setIsOpenModalDetails(true);
    setDetailsData(data);
  };

  const handleWhatsapp = (data) => {
    setIsOpenModalWhatsapp(true);
    setWhatsappData(data);
  };

  const sendByWhatsapp = (phone) => {
    let whatsDetalle = '';
    Array.prototype.map.call(whatsappData?.salesDetails, (item) => {
      const { cantidad: cant, salePrice: price } = item;
      const { descripcion: product } = item.product;
      whatsDetalle = `${whatsDetalle}▫${product}%0A%09cant:%20${cant}%20%20%20precio%20unid:%20S/.${(+price).toFixed(2)}%0A`;
    });
    whatsDetalle = whatsDetalle.split('&').join('%26');
    const payType = whatsappData.efectivo < whatsappData.total ? `Efectivo y ${whatsappData?.pymentTypes?.nombre}` : whatsappData?.pymentTypes?.nombre;
    let whatsAPI = `https://api.whatsapp.com/send?phone=+51${phone}&text=*🛒FORMATO%20DE%20PEDIDO*%0A%0A▪NOMBRE%20:%20${(whatsappData.clientes?.rz_social).split('&').join('%26')}%0A▪CELULAR%20:%20${phone}%0A▪DIRECCIÓN%20:%20${whatsappData.clientes?.direccion}%0A▪FECHA%20:%20${dayjs(whatsappData.fecha_creacion).format('DD-MM-YYYY')}%0A▪HORA%20:%20${dayjs(whatsappData.fecha_creacion).format('hh:mm a')}%0A▪DETALLE%20VENTA%20:%0A${whatsDetalle}%0A▪TIPO%20DE%20PAGO%20:%20${payType}✅%0A▫TOTAL%20:%20S/.${(+whatsappData.total).toFixed(2)}%0A------------------------------------------------------%0A▪PUNTO%20VENTA%20:%20*${localData.businessName.split('&').join('%26')}*`;
    whatsAPI = whatsAPI.split('#').join('%23');
    window.open(whatsAPI);
    setWhatsappData(null);
  };

  const printPdf = () => {
    const iframe = document.getElementById('pdfIframe');
    iframe.focus();
    document.title = JSON.parse(localStorage.getItem('lastSale')).numComprobante;
    iframe.contentWindow.print();
    document.title = 'Sistema de Venta';
    setIsOpenModalPrint(false);
  };

  const handlePrint = (sale) => {
    setIsLoadingIframe(true);
    setButtonPressed(sale.tipo_comprobante);

    let productToPrint = [];
    Array.prototype.map.call(sale?.salesDetails, (item) => {
      const { cantidad: cant, salePrice: price } = item;
      const {
        codigo: cod, descripcion: product,
      } = item.product;
      productToPrint = [...productToPrint, {
        cod,
        product,
        cant: +cant,
        price: +price,
        total: +cant * +price,
      }];
    });
    const dataToPrint = {
      tipoComprobante: sale.tipo_comprobante,
      numComprobante: sale.comprobante,
      client: sale.clientes?.rz_social,
      clientDoc: sale.clientes?.documento,
      clientTypeDoc: sale.clientes?.tipo_documento,
      clientAddress: sale.clientes?.direccion,
      date: dayjs(sale.fecha_creacion).format('DD/MM/YYYY'),
      products: productToPrint,
      payType: sale.efectivo < sale.total ? `Efectivo y ${sale?.pymentTypes?.nombre}` : sale?.pymentTypes?.nombre,
      amount: sale.total,
    };
    dispatch({ type: 'SET_SALE_DATA', payload: dataToPrint });
    localStorage.setItem('lastSale', JSON.stringify(dataToPrint));

    setResetIframe(Date.now());
    setIsOpenModalPrint(true);
  };

  return (
    <>
      {isOpenModalPrint
        && (
          <Portal>
            <ModalTwoOptions
              titleModal={<p className="capitalize">{`¿Imprimir ${buttonPressed}?`}</p>}
              colorFirstButton="red-500"
              titleFirstOption="NO"
              titleSecondOption="  SÍ  "
              onClickFirstOption={() => setIsOpenModalPrint(false)}
              onClickSecondOption={() => printPdf()}
              isLoadSecondOption={isLoadingIframe}
            />
          </Portal>
        )}
      {isOpenModalWhatsapp
        && (
          <Portal>
            <ModalInput
              titleModal="Enviar por Whatsapp"
              titleClickFunction="Enviar"
              closeFunction={() => setIsOpenModalWhatsapp(false)}
              onClickFunction={sendByWhatsapp}
              defaultNumber={whatsappData?.clientes?.telefono}
            />
          </Portal>
        )}
      {isOpenModalDetails
        && (
          <Portal>
            <ModalDetails
              setIsOpenModalDetails={setIsOpenModalDetails}
              detailsData={detailsData}
            />
          </Portal>
        )}
      <iframe onLoad={() => setIsLoadingIframe(false)} key={resetIframe} title="pdfIframe" id="pdfIframe" src="/pdfByHtml" className="hidden pdfIframe " />
      <div className="flex flex-col items-center bg-bg-blue w-full min-h-screen box-border">
        <div className="pl-4 pt-2 flex w-full h-12 sm:h-16 bg-white shadow-sm">
          <div className="flex text-2xl sm:text-4xl text-gray-800 font-semibold">
            Reporte de Ventas
            <div className="text-green-500 opacity-80 w-8 sm:w-10 ml-2 mt-0.5">
              <IconComputer autosize />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start w-full h-full p-4 box-border ">
          <div className="flex flex-col sm:flex-row mb-4 w-full">
            <div className="w-full bg-white rounded-xl shadow sm:mb-0">
              <div className="flex flex-wrap p-4 text-gray-800">
                <label htmlFor="fechaInicio" className="w-1/2 sm:w-1/4 pr-2 relative">
                  <p className="pl-2 -mt-1 font-semibold">Fecha Inicio</p>
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
                </label>
                <label htmlFor="fechaFin" className="w-1/2 sm:w-1/4 mb-1.5 sm:mb-0 sm:pr-2 relative">
                  <p className="pl-2 -mt-1 font-semibold">Fecha Fin</p>
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
                <div className="flex py-2 px-4 w-full sm:w-2/5 md:w-1/3 rounded-xl border border-blue-400 ml-auto">
                  <div className="flex flex-col mr-2.5 font-semibold">
                    <p className="whitespace-nowrap">Venta Total:</p>
                    <p className="whitespace-nowrap">Ganancia Total:</p>
                  </div>
                  <div className="flex flex-col ml-auto text-right">
                    <p>{parseFloat(totalVentas || 0).toFixed(2)}</p>
                    <p>{parseFloat(gananciaTotal || 0).toFixed(2)}</p>
                  </div>
                </div>
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

                  <div
                    className="flex flex-row justify-end w-full sm:w-auto relative"
                  />
                </div>
              </div>

              {/* <--TABLE DATA--> */}
              <div className="p-4 overflow-auto h-96">
                <table id="tableBilling" className="table-auto text-center text-gray-700 w-full">
                  <thead>
                    <tr className="border-l border-gray-400 bg-green-500 opacity-90 text-white">
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium w-32 whitespace-nowrap">Fecha Venta</th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium w-32">Tipo Comprobante</th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium text-sm whitespace-nowrap w-36">N° Comprobante</th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium white whitespace-nowrap">Nombre de Cliente</th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium whitespace-nowrap">Total (S/)</th>
                      <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">Estado</th>
                      <th className="border-r border-b border-gray-200 px-10 py-2 font-medium">Vendedor</th>
                      <th className="border-b border-gray-200 px-2 py-2 font-medium w-24">Acciones</th>
                      <th className="border-l border-gray-400 bg-white select-none">0</th>
                    </tr>
                  </thead>
                  {Array.isArray(saleReportData) && saleReportData !== 'loading'
                    && (
                      <tbody>
                        {saleReportData.map((item) => (
                          <tr key={item.id} onClick={() => !isRowBlocked && setRowSelected(item.id)} className={`text-sm rowTable ${rowSelected === item.id && 'rowTableBillingSelected'}`}>
                            <td className="border border-gray-350 px-2 py-2 font-medium ">{dayjs(item.fecha_creacion).format('DD-MM-YYYY hh:mm a')}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.tipo_comprobante}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.comprobante}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.clientes?.rz_social}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{parseFloat(item.total).toFixed(2)}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.estado}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium capitalize">{item.user?.nombre}</td>
                            <td className="border border-gray-350 px-2 py-2 font-medium">
                              <div className="flex justify-center space-x-2">
                                <ButtonIcon
                                  icon={<IconVoucher />}
                                  isBorder
                                  isBgColor
                                  colorBg="primary"
                                  onClick={() => {
                                    handleViewDetails(item);
                                  }}
                                  padding={1.5}
                                />
                                <ButtonIcon
                                  icon={<IconWhatsapp />}
                                  isBorder
                                  isBgColor
                                  colorBg="green-500"
                                  onClick={() => {
                                    handleWhatsapp(item);
                                  }}
                                  padding={1}
                                />
                                <ButtonIcon
                                  icon={<IconPrint />}
                                  isBorder
                                  isBgColor
                                  colorBg="primary"
                                  onClick={() => {
                                    handlePrint(item);
                                  }}
                                  padding={2}
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
                  {saleReportData === 'loading'
                    ? (
                      <div className="flex items-center justify-center py-8">
                        <IconSpiner dark medium />
                      </div>
                    )
                    : !Array.isArray(saleReportData) || saleReportData.length === 0
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

SalesReport.propTypes = {
  gananciaTotal: PropTypes.number.isRequired,
  totalVentas: PropTypes.number.isRequired,
  setFechaInicio: PropTypes.func.isRequired,
  setFechaFin: PropTypes.func.isRequired,
  saleReportData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape()),
    PropTypes.string,
  ]).isRequired,
  setLimit: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  lastPage: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  previusPage: PropTypes.func.isRequired,
  jumpToPage: PropTypes.func.isRequired,
  jumpToFirstPage: PropTypes.func.isRequired,
  jumpToLastPage: PropTypes.func.isRequired,
};

export default withFetch(SalesReport);
