/* eslint-disable max-len */
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
// import { useHistory } from 'react-router';
// import { jsPDF } from 'jspdf';
import {
  IconSalesSolid,
  IconSearch,
  IconSpiner,
  IconClose,
  IconCategory,
  IconSelect,
  IconCheck,
  IconWhatsDoc,
  IconNewClient,
  IconFilter,
} from "../../../../assets/icons/icons";
import ButtonIcon from "../../../atoms/buttons/buttonIcon";
import Portal from "../../../../utils/portal";
import ModalTwoOptions from "../../../molecules/modal/ModalTwoOptions";
import withFetch from "./withFetch";
import Context from "../../../context/context";
import useFetch from "../../../../hook/usefetch";
import {
  errorAlert,
  infoAlert,
  successAlert,
  warningAlert,
} from "../../../../utils/alertNotify";
import Product from "../../../molecules/product/product";
import SearchByCategory from "../../../molecules/searchByCategory/searchByCategory";
import SearchByLunas from "../../../molecules/searchByLunas/searchByLunas";
import SearchByMontura from "../../../molecules/searchByMontura/searchByMontura";
import FormTextInput from "../../../atoms/formInputs/formTextInput";
import FormSelectInput from "../../../atoms/formInputs/formSelectInput";

import NewClient from "../../../molecules/newClient/newClient";
// import PdfByHtml from '../../../pages/PDF/pdfByHtml';


const Sales = ({
  productsData,
  setSearchProduct,
  clientsData,
  setSearchClient,
  setClientMutate,
  clientDataById,
  clientId,
  setClientId,
  isLoadingSearchProduct,
  setIsLoadingSearchProduct,
  isLoadingSearchClient,
  setIsLoadingSearchClient,
  paymentTypes,
  // searchType, setSearchType,
}) => {
  const [buttonPressed, setButtonPressed] = useState(null);

  // PRODUCTS
  const [isOpenSearchListProducts, setIsOpenSearchListProducts] =
    useState(false);
  const [isOpenSearchByCategoryModal, setIsOpenSearchByCategoryModal] =
    useState(false);
    const [isOpenSearchByLunasModal, setIsOpenSearchByLunasModal] =
    useState(false);
  const [isOpenSearchByMonturaModal, setIsOpenSearchByMonturaModal] =
    useState(false);

  const [priceProducts, setPriceProducts] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const { cart, setCart } = useContext(Context);

  // CLIENTS
  // const [clientType, setClientType] = useState('tick');
  const [isOpenSearchListClients, setIsOpenSearchListClients] = useState(false);
  const [isOpenNewClientModal, setIsOpenNewClientModal] = useState(false);
  const [isWhatsappChecked, setIsWhatsappChecked] = useState(false);

  // PAY
  const [isOpenModalFinally, setisOpenModalFinally] = useState(false);
  const [isOpenModalPrint, setIsOpenModalPrint] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [data, setData] = useState({});
  const [isTwoPaysChecked, setIsTwoPaysChecked] = useState(false);
  const [isAcuentaChecked, setIsAcuentaChecked] = useState(false);

  const [payCantOne, setPayCantOne] = useState((0).toFixed(2));
  const [payCantTwo, setPayCantTwo] = useState((0).toFixed(2));
  const [resetIframe, setResetIframe] = useState("");
  const [isLoadingIframe, setIsLoadingIframe] = useState(true);

  // PDF
  const {
    state: { localData },
    dispatch,
  } = useContext(Context);

  const refProduct = useRef(null);
  const refClient = useRef(null);
  const refPayMethodOne = useRef(null);
  const refPayMethodTwo = useRef(null);
  const fetchOrders = useFetch("sale");

  // FORM VARIABLES
  const {
    register,
    watch,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const doc = new jsPDF();

  // <-------- CLEAN INPUTS AFTER SEARCH --------->
  const handleCleanSearchProducts = () => {
    refProduct.current.value = "";
    setSearchProduct("");
    setIsOpenSearchListProducts(false);
  };

  const handleCleanSearchClients = () => {
    refClient.current.value = "";
    setSearchClient("");
    setIsOpenSearchListClients(false);
  };

  // <----- SEARCH WHEN WRITING INTO INPUTS -------->
  const handleChangeProduct = () => {
    const product = refProduct.current.value;
    setSearchProduct(product);
    setIsOpenSearchListProducts(true);

    // DELETE THIS IF PEOPLE WANT SEE ALL PRODUCTS
    if (!product) {
      setIsOpenSearchListProducts(false);
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

  // <----- SELECT AN ELEMENT OF THE SEARCH -------->
  const handleSelectProduct = (idValue) => {
    const product = productsData.filter((item) => item.id === idValue)[0];
    const productToAdd = {
      id: product.id,
      cod: product.codigo,
      product: product.descripcion,
      category: product.category.descripcion,
      // precioCompra: product.precio_compra,
      price: product.precio_sugerido,
      cant: 1,
    };
    // FINAL TODO

    if ("cart" in localStorage) {
      let cartLocal = JSON.parse(localStorage.getItem("cart"));
      if (cartLocal.filter((item) => item.id === idValue).length === 0) {
        cartLocal = [...cartLocal, productToAdd];
        localStorage.setItem("cart", JSON.stringify(cartLocal));
        setCart(cartLocal);
      } else {
        warningAlert("El producto ya existe en el pedido");
      }
    } else {
      localStorage.setItem("cart", JSON.stringify([productToAdd]));
      setCart([productToAdd]);
    }
    handleCleanSearchProducts();
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

  // <----- CHANGE CANT OF PRODUCTS OF CART -------->
  const handleChangeCant = (idProduct, value) => {
    const cartLocal = JSON.parse(localStorage.getItem("cart"));
    const product = cartLocal.filter((item) => item.id === idProduct)[0];
    const indexToEdit = cartLocal.findIndex((item) => item.id === idProduct);
    const productToAdd = { ...product, cant: value };
    cartLocal.splice(indexToEdit, 1, productToAdd);
    localStorage.setItem("cart", JSON.stringify(cartLocal));
    setCart(cartLocal);
  };

  // <----- CHANGE PRICE OF PRODUCTS OF CART -------->
  const handleChangePrice = (
    e,
    setter,
    setterOperation,
    setValueOne,
    setValueTwo
  ) => {
    const { value } = e.target;
    if (!Number.isNaN(value * 2)) {
      setter(value);
      setValue(setValueOne, value);
      if (value >= 0.01) clearErrors(setValueOne);
      setterOperation((priceProducts - value).toFixed(2));
      setValue(setValueTwo, (priceProducts - value).toFixed(2));
      if (priceProducts - value >= 0.01) clearErrors(setValueTwo);
    }
  };

  // <----- DELETE PRODUCTS OF CART -------->
  const handleDeleteProduct = (idValue) => {
    let cartLocal = JSON.parse(localStorage.getItem("cart"));
    cartLocal = cartLocal.filter((item) => item.id !== idValue);
    localStorage.setItem("cart", JSON.stringify(cartLocal));
    setCart(cartLocal);
  };

  const handleCancel = () => {
    localStorage.removeItem("cart");
    setCart([]);
    setValue("client", "");
    clearErrors();
  };

  const onSubmit = (formData) => {
    if (buttonPressed === "ticket") {
      setisOpenModalFinally(true);
      setData(
        formData?.client
          ? formData
          : {
              ...formData,
              client: "Cliente Universal",
              documentType: "DNI",
              document: "12345678",
              address: "---",
            }
      );
      // console.log(formData);
    } else {
      errorAlert("Temporalmente Desabilitado");
    }
  };

  const sendByWhatsapp = (whatsappData, phone, date) => {
    let whatsDetalle = "";

    Array.prototype.map.call(whatsappData.products, (item) => {
      const { product, cant, price } = item;
      whatsDetalle = `${whatsDetalle}▫${product}%0A%09cant:%20${cant}%20%20%20precio%20unid:%20S/.${(+price).toFixed(
        2
      )}%0A`;
    });
    //     For Each row As DataGridViewRow In DgvDetalle.Rows
    // whatsDetalle = whatsDetalle & row.Cells(2).Value & "%20" & row.Cells(1).Value & "%0A"
    whatsDetalle = whatsDetalle.split("&").join("%26");
    let whatsAPI = `https://api.whatsapp.com/send?phone=+51${phone}&text=*🛒FORMATO%20DE%20PEDIDO*%0A%0A▪NOMBRE%20:%20${whatsappData.client
      .split("&")
      .join("%26")}%0A▪CELULAR%20:%20${phone}%0A▪DIRECCION%20:%20${
      whatsappData.clientAddress
    }%0A▪FECHA%20:%20${dayjs(date).format("DD-MM-YYYY")}%0A▪HORA%20:%20${dayjs(
      date
    ).format(
      "hh:mm a"
    )}%0A▪DETALLE%20VENTA%20:%0A${whatsDetalle}%0A▪TIPO%20DE%20PAGO%20:%20${
      whatsappData.payType
    }✅%0A▫TOTAL%20:%20S/.${(+whatsappData.amount).toFixed(
      2
    )}%0A------------------------------------------------------%0A▪PUNTO%20VENTA%20:%20*${localData.businessName
      .split("&")
      .join("%26")}*`;
    whatsAPI = whatsAPI.split("#").join("%23");
    window.open(whatsAPI);
  };

  const setIsLoadingSearchClientSunat = (documento) =>{
    debugger
    // let url = 'http://dniruc.apisperu.com/api/v1/ruc/'+documento+'?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFqYW0udmlyZ29AZ21haWwuY29tIn0.TNEnUDcGJyZpwJonnsb87j2uEp01QRYdigG0wdZ54yI'
    // const response =  useFetch(url);
    //   const jsonResonse =  response.json();
    // fetch('http://dniruc.apisperu.com/api/v1/ruc/'+documento+'?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFqYW0udmlyZ29AZ21haWwuY29tIn0.TNEnUDcGJyZpwJonnsb87j2uEp01QRYdigG0wdZ54yI')
    // .then(response => response.json())
    // .then(data => console.log(data));
    // let client_sunat = document.getElementsByTagName("client_sunat");
    // fetch('http://dniruc.apisperu.com/api/v1/ruc/'+documento+'?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFqYW0udmlyZ29AZ21haWwuY29tIn0.TNEnUDcGJyZpwJonnsb87j2uEp01QRYdigG0wdZ54yI')
    // .then((response) => {
    //   return response.json()
    // })
    // .then((articulos) => {
    //   setArticulos(articulos)
    // })

  }
  const saveSale = async () => {
    setIsLoadingSubmit(true);
    setIsLoadingIframe(true);
    const cartLocal = JSON.parse(localStorage.getItem("cart"));
    const seller = parseFloat(localStorage.getItem("id"));
    const sellerLocal = +localData?.id;
    const total = cartLocal.reduce(
      (acc, { cant, price }) => acc + cant * price,
      0
    );
    let productToAdd = [];
    Array.prototype.map.call(cartLocal, (item) => {
      const { id, cant } = item;
      productToAdd = [
        ...productToAdd,
        {
          id: +id,
          cantidad: +cant,
          // precio: parseFloat(price),
        },
      ];
    });
    const dataToSend = {
      tipo_comprobante: buttonPressed,
      tipo_pago: isTwoPaysChecked
        ? refPayMethodTwo.current.value
        : refPayMethodOne.current.value,
      local_id: sellerLocal,
      cliente_id: clientDataById?.id || 1, // HERE IS ID UNIVERSAL CLIENT
      total, // NOT RECOMENDED
      efectivo: data.payCantOne,
      usuario_id: seller,
      productos: productToAdd,
    };
    try {
      const [result, status] = await fetchOrders.post(dataToSend);
      if (status === 200) {
        successAlert("Pedido Guardado Correctamente");
        let productToPrint = [];
        Array.prototype.map.call(cartLocal, (item) => {
          const { cod, product, cant, price } = item;
          productToPrint = [
            ...productToPrint,
            {
              cod,
              product,
              cant: +cant,
              price: +price,
              total: +cant * +price,
            },
          ];
        });
        const dataToPrint = {
          tipoComprobante: result.result.tipo_comprobante,
          numComprobante: result.result.comprobante,
          client: data.client,
          clientDoc: data.document,
          clientTypeDoc: data.documentType,
          clientAddress: data.address,
          date: dayjs(result.fecha_creacion).format("DD/MM/YYYY"),
          products: productToPrint,
          payType: isTwoPaysChecked
            ? `Efectivo y ${refPayMethodTwo.current.value}`
            : refPayMethodOne.current.value,
          amount: total,
        };
        dispatch({ type: "SET_SALE_DATA", payload: dataToPrint });
        localStorage.setItem("lastSale", JSON.stringify(dataToPrint));
        if (isWhatsappChecked)
          sendByWhatsapp(dataToPrint, data.phone, result.fecha_creacion);
        localStorage.setItem("cart", "[]");
        setValue("client", "");
        setValue("document", "");
        setValue("documentType", "");
        setValue("address", "");
        setValue("phone", "");
        setValue("payCantOne", "");
        setValue("payCantTwo", "");
        setPayCantOne("0.00");
        setPayCantTwo("0.00");
        refPayMethodOne.current.value = "Efectivo";
        setIsTwoPaysChecked(false);
        setIsWhatsappChecked(false);
        setCart([]);
        setIsOpenModalPrint(true);
        setResetIframe(Date.now());
      } else {
        errorAlert(result.message || "algo salió mal, Vuelva a intentarlo");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingSubmit(false);
      setisOpenModalFinally(false);
    }
  };

  useEffect(() => {
    let cartLocal = [];
    let cantProducts = 0;
    let totalPriceProducts = 0;
    if ("cart" in localStorage) {
      cartLocal = JSON.parse(localStorage.getItem("cart"));
      // COUNT PRODUCTS
      cantProducts = cartLocal.reduce((acc, { cant }) => acc + cant, 0);
      totalPriceProducts = cartLocal.reduce(
        (acc, { cant, price }) => acc + cant * price,
        0
      );
    }
    setCartProducts(cartLocal);
    setPriceProducts(totalPriceProducts);
    setValue("products", cantProducts);
    if (cartLocal.length !== 0) clearErrors("products");

    setPayCantOne((totalPriceProducts - payCantTwo).toFixed(2));
    setValue("payCantOne", (totalPriceProducts - payCantTwo).toFixed(2));
    if (payCantTwo >= 0.01) clearErrors("payCantTwo");
    if (totalPriceProducts - payCantTwo >= 0.01) clearErrors("payCantOne");
    if (totalPriceProducts < 700) clearErrors("client");
    if (totalPriceProducts < 700) clearErrors("document");
    if (totalPriceProducts < 700) clearErrors("documentType");
    if (totalPriceProducts < 700) clearErrors("address");
  }, [cart]);

  const printPdf = () => {
    const iframe = document.getElementById("pdfIframe");
    iframe.focus();
    document.title = JSON.parse(
      localStorage.getItem("lastSale")
    ).numComprobante;
    iframe.contentWindow.print();
    document.title = "Sistema de Venta";
    setIsOpenModalPrint(false);
  };

  return (
    <>
      {isOpenSearchByCategoryModal && (
        <Portal>
          <SearchByCategory
            setIsOpenSearchByCategoryModal={setIsOpenSearchByCategoryModal}
          />
        </Portal>
      )}
      {isOpenSearchByLunasModal && (
        <Portal>
          <SearchByLunas
            setIsOpenSearchByLunasModal={setIsOpenSearchByLunasModal}
          />
        </Portal>
      )}
      {isOpenSearchByMonturaModal && (
        <Portal>
          <SearchByMontura
            setIsOpenSearchByMonturaModal={setIsOpenSearchByMonturaModal}
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
      {isOpenModalFinally && (
        <Portal>
          <ModalTwoOptions
            titleModal="¿Desea Efectuar la Venta?"
            colorFirstButton="red-500"
            titleFirstOption="NO"
            titleSecondOption="  SÍ  "
            onClickFirstOption={() => setisOpenModalFinally(false)}
            onClickSecondOption={() => saveSale()}
            isLoadSecondOption={isLoadingSubmit}
          />
        </Portal>
      )}
      {isOpenModalPrint && (
        <Portal>
          <ModalTwoOptions
            titleModal={
              <p className="capitalize">{`¿Imprimir ${buttonPressed}?`}</p>
            }
            colorFirstButton="red-500"
            titleFirstOption="NO"
            titleSecondOption="  SÍ  "
            onClickFirstOption={() => setIsOpenModalPrint(false)}
            onClickSecondOption={() => printPdf()}
            isLoadSecondOption={isLoadingIframe}
          />
        </Portal>
      )}
      <iframe
        onLoad={() => setIsLoadingIframe(false)}
        key={resetIframe}
        title="pdfIframe"
        id="pdfIframe"
        src="/pdfByHtml"
        className="hidden pdfIframe "
      />
      {/* <div id="pdfIframe">
        <PdfByHtml />
      </div> */}
      <div className="flex flex-col items-center bg-bg-blue w-full min-h-screen box-border">
        <div className="pl-4 pt-2 flex w-full h-12 sm:h-16 bg-white shadow-sm">
          <div className="flex text-3xl sm:text-4xl text-gray-800 font-semibold">
            <p>Ventas</p>
            <div className="text-green-500 w-8 sm:w-10 mt-1 sm:mt-0.5">
              <IconSalesSolid />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full h-full p-4 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="shadow-md rounded-xl"
          >
            {/* WELCOME */}
            <div className="w-full px-3 sm:px-4 flex justify-center items-center bg-white rounded-t-xl border-b relative">
              <p className="sm:text-xl text-left text-gray-600 py-1.5 sm:py-2 truncate">
                Venta Externa
              </p>
            </div>
            <div className="flex flex-col md:flex-row p-4 bg-white rounded-b-xl">
              <div className="flex flex-col w-full md:w-3/5 ">
                <div className=" mb-1">
                  {/* Toggle switch */}
                  {/* <div className="w-full flex items-center justify-center tap-highline-none text-sm bg-gray-200 p-2">
                    <div className="flex items-center text-gray-700">
                      <span className="w-4"><IconFilter autosize /></span>
                      <p className="hidden sm:flex whitespace-nowrap mr-1.5">Filtrar por:</p>
                      <p className="sm:hidden whitespace-nowrap mr-1.5">Filtro:</p>
                    </div>
                    <button type="button" onClick={() => setSearchType('desc')} className="">
                      <div className={`${searchType === 'desc' ? 'font-semibold bg-primary text-white' : 'text-gray-700 bg-white '} w-28 py-1 rounded-l-full border border-primary font-medium`}>
                        Descripción
                      </div>
                    </button>
                    <button type="button" onClick={() => setSearchType('cod')} className="">
                      <div className={`${searchType === 'cod' ? 'font-semibold bg-primary text-white' : 'text-gray-700 bg-white'} w-24 sm:w-28 py-1 rounded-r-full border border-primary  font-medium`}>
                        Código
                      </div>
                    </button>
                    <button type="button" onClick={() => setIsOpenSearchByCategoryModal(true)} className="flex items-center justify-center ml-1.5 sm:ml-4 sm:h-auto w-8 sm:w-36 py-1.5 sm:py-1 rounded-full border border-primary font-medium text-gray-700 bg-white hover:text-white hover:bg-primary">
                      <div className="hidden sm:flex">
                        Categorias
                      </div>
                      <span className="sm:hidden"><IconCategory /></span>
                    </button>
                  </div> */}
                  {/* PRODUCT */}
                  <div className="flex space-x-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setIsOpenSearchByMonturaModal(true)}
                      className="flex items-center justify-center rounded-full py-1 px-2.5 text-sm bg-red-500 hover:opacity-90 hover:ring ring-gray-200 text-white tap-highline-none"
                    >
                      <p className="mr-1.5 hidden sm:flex md:hidden lg:flex">
                        Monturas
                      </p>
                      {/* <span><IconCategory /></span> */}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOpenSearchByLunasModal(true)}
                      className="flex items-center justify-center rounded-full py-1 px-2.5 text-sm bg-yellow-500 hover:opacity-90 hover:ring ring-gray-200 text-white tap-highline-none"
                    >
                      <p className="mr-1.5 hidden sm:flex md:hidden lg:flex">
                        Lunas
                      </p>
                      {/* <span><IconCategory /></span> */}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOpenSearchByCategoryModal(true)}
                      className="flex items-center justify-center rounded-full py-1 px-2.5 text-sm bg-bg-purple hover:opacity-90 hover:ring ring-gray-200 text-white tap-highline-none"
                    >
                      <p className="mr-1.5 hidden sm:flex md:hidden lg:flex">
                        Accessorios
                      </p>
                      {/* <span><IconCategory /></span> */}
                    </button>
                  </div>

                  
                  <div className="rounded-t-xl ring-blue-400 ring-1 p-1.5 pb-2.5 max-h-screen flex flex-col space-y-1.5 overflow-y-auto bg-white">
                    {cartProducts.length === 0 ||
                    !Array.isArray(cartProducts) ? (
                      <div className="flex justify-center items-center text-gray-500">
                        <h4 className="flex my-5 text-lg italic">
                          A la Espera de Productos!
                        </h4>
                      </div>
                    ) : (
                      cartProducts.map((item) => (
                        <Product
                          key={item.id}
                          item={item}
                          handleDeleteProduct={handleDeleteProduct}
                          handleChangeCant={handleChangeCant}
                        />
                      ))
                    )}
                  </div>
                  <div className="flex justify-between rounded-b-xl ring-1 ring-blue-400 -mt-0.5 bg-white px-2.5 py-1.5 text-sm">
                    <div className="flex">
                      <p className="mr-1">Cant. Productos: </p>
                      <input
                        type="text"
                        readOnly
                        className="font-semibold slect-none w-10 focus:outline-none"
                        {...register("products", {
                          min: {
                            value: 1,
                            message: "No se han agregado productos al pedido",
                          },
                        })}
                      />
                    </div>
                    <div className="flex">
                      <p className="">Prec. Total: s/</p>
                      <p className="font-semibold mr-1">
                        {parseFloat(priceProducts).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <span className="pl-2 text-xs text-red-500 mb-0.5 -mt-0.5">
                  {errors?.products?.message}
                </span>
              </div>

              <div className=" md:hidden border-b border-blue-400 px-2 my-2" />

              <div className="flex flex-col w-full md:w-2/5 md:-mt-1 md:pl-4">
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
               
                <span
                  className={`${
                    errors?.client ||
                    errors?.documentType ||
                    errors?.document ||
                    errors?.address
                      ? ""
                      : "hidden"
                  } pl-2 text-xs text-red-500 mb-0.5 -mt-1.5`}
                >
                  {errors?.client?.message ||
                    errors?.documentType?.message ||
                    errors?.document?.message ||
                    errors?.address?.message}
                </span>


                <input
                  readOnly
                  type="text"
                  className="hidden"
                  {...register("client", {
                    required: {
                      value: buttonPressed === "factura",
                      message: "No hay paciente seleccionado",
                    },
                    validate: {
                      minBoleta: (e) =>
                        (buttonPressed === "boleta"
                          ? priceProducts > 699
                            ? e !== ""
                            : true
                          : true) ||
                        "Venta con Boleta mayor a S/700 requiere pliente",
                    },
                  })}
                />
                <input
                  readOnly
                  type="text"
                  className="hidden"
                  {...register("documentType", {
                    required: {
                      value: buttonPressed === "factura",
                      message: "Error con Tipo de Documento",
                    },
                    validate: {
                      minBoleta: (e) =>
                        (buttonPressed === "boleta"
                          ? priceProducts > 699
                            ? e !== ""
                            : true
                          : true) ||
                        "Error con Tipo de Documento en Venta mayor a S/700",
                    },
                  })}
                />
                <input
                  readOnly
                  type="text"
                  className="hidden"
                  {...register("document", {
                    required: {
                      value: buttonPressed === "factura",
                      message: "Error con Num. de Documento",
                    },
                    validate: {
                      minBoleta: (e) =>
                        (buttonPressed === "boleta"
                          ? priceProducts > 699
                            ? e !== ""
                            : true
                          : true) ||
                        "Error con N° de Documento en Venta mayor a S/700",
                    },
                  })}
                />
                <input
                  readOnly
                  type="text"
                  className="hidden"
                  {...register("address", {
                    required: {
                      value: buttonPressed === "factura",
                      message: "Error con la Direccion",
                    },
                    validate: {
                      minBoleta: (e) =>
                        (buttonPressed === "boleta"
                          ? priceProducts > 699
                            ? e !== ""
                            : true
                          : true) ||
                        "Error en la Dirección en Venta mayor a S/700",
                    },
                  })}
                />

                <div className="pl-3 py-2 pr-2 ring-1 ring-blue-400 rounded-2xl">
                  <div className="flex flex-wrap text-sm relative">
                    <p className="font-semibold text-primary sm:font-semibold">
                      Paciente:
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
                
                <label
                  htmlFor="client"
                  className="w-full relative mb-2 flex flex-col justify-center "
                >
                  <div className="flex text-sm">
                    <p className="font-semibold text-gray-600 ml-2 pl-1  sm:font-semibold ">
                      Buscar Cliente
                    </p>
                    {/* <p className="text-red-600 pr-1">*</p> */}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center w-full relative">
                      <input
                        // ref={refClient}
                        placeholder="RUC"
                        type="text"
                        id="client_sunat"
                        autoComplete="off"
                        onChange={(e) => {
                          setIsLoadingSearchClientSunat(e.target.value);
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

                    
                  </div>
                </label>

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
                <div
                  className={`flex items-start space-x-2 mt-2 ${
                    errors?.phone ? "" : "mb-1"
                  }`}
                >
                  <div className="w-1/2">
                    <div htmlFor="phone" className="flex items-center text-sm">
                      <p className=" font-semibold text-gray-700 ml-2 pl-1 sm:font-semibold ">
                        N° Teléfono
                      </p>
                      <p className="text-red-600 pr-1">
                        {isWhatsappChecked ? "*" : ""}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {!isWhatsappChecked ? "(opcional)" : ""}
                      </p>
                    </div>
                    <label
                      htmlFor="phone"
                      className="w-full relative flex flex-col justify-center "
                    >
                      <input
                        placeholder="Ingresar Teléfono"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        type="text"
                        id="phone"
                        className={`${
                          errors?.phone ? "ring-red-500" : "ring-blue-400"
                        } bg-white pl-3 pr-3 py-0.5 text-sm rounded-xl w-full ring-1 focus:ring-2 focus:outline-none text-gray-800`}
                        {...register("phone", {
                          required: {
                            value: isWhatsappChecked,
                            message: "Teléfono requerido",
                          },
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Teléfono invalido",
                          },
                          validate: {
                            length: (e) =>
                              (isWhatsappChecked
                                ? `${e}`.length === 9
                                : true) || "Debe tener 9 digitos",
                          },
                        })}
                      />
                      <span
                        className={`${
                          errors?.phone ? "" : "hidden"
                        } pl-2 text-xs text-red-500 mt-0.5`}
                      >
                        {errors?.phone?.message}
                      </span>
                    </label>
                  </div>
                  <div className="w-1/2">
                    {/* <p className="font-semibold text-gray-600 ml-3 mb-1 sm:font-semibold ">Enviar Recibo</p> */}
                    <label
                      htmlFor="checkWhatsapp"
                      className="relative flex items-center space-x-3 mt-2.5 mb-1 select-none w-full"
                    >
                      <div
                        className={`${
                          isWhatsappChecked ? "" : " "
                        } flex items-center pl-2.5 pr-2.5 py-0.5 w-full bg-white text-gray-800 rounded-full focus:outline-none`}
                      >
                        <input
                          type="checkbox"
                          id="checkWhatsapp"
                          checked={isWhatsappChecked}
                          onChange={(e) => {
                            setIsWhatsappChecked(e.target.checked);
                            if (!e.target.checked) clearErrors("phone");
                          }}
                          className={`${
                            isWhatsappChecked
                              ? "border-primary"
                              : "md:hover:border-primary border-gray-400"
                          } relative appearance-none h-4 w-4 checked:bg-primary border rounded-full focus:outline-none`}
                        />
                        <span className="flex items-center ml-0.5 w-3 h-3 text-white absolute">
                          <IconCheck />
                        </span>
                        <div className="flex items-center ml-1">
                          <span className="">
                            <IconWhatsDoc black={!isWhatsappChecked} />
                          </span>
                          <div
                            className={`${
                              isWhatsappChecked
                                ? "text-gray-700"
                                : "text-gray-500"
                            } ml-1 text-sm whitespace-nowrap`}
                          >
                            {isWhatsappChecked ? "Enviar" : "No Enviar"}
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex border-b border-blue-400 px-2 my-2" />

                <div className="flex items-start">
                  {/* FIRST METHOD */}
                  <label
                    htmlFor="checkTwoPays"
                    className="relative flex items-center space-x-3 mb-1 select-none"
                  >
                    <div
                      className={`${
                        isTwoPaysChecked ? "ring-blue-400" : " "
                      } group flex items-center pl-2.5 pr-2.5 py-0.5 w-full ring-0 focus:ring-0 md:hover:ring-primary bg-white ring-gray-400 text-gray-800 rounded-full focus:outline-none`}
                    >
                      <input
                        type="checkbox"
                        id="checkTwoPays"
                        checked={isTwoPaysChecked}
                        onChange={(e) => {
                          setIsTwoPaysChecked(e.target.checked);
                          refPayMethodOne.current.value = "Efectivo";
                        }}
                        className={`${
                          isTwoPaysChecked
                            ? "border-primary"
                            : "md:group-hover:border-primary border-gray-400"
                        } relative appearance-none h-4 w-4 checked:bg-primary border rounded-full focus:outline-none`}
                      />
                      <span className="flex items-center ml-0.5 w-3 h-3 text-white absolute">
                        <IconCheck />
                      </span>
                      <div className="flex items-center ml-1">
                        <div
                          className={`${
                            isTwoPaysChecked ? "text-gray-700" : "text-gray-500"
                          } ml-1 text-sm whitespace-nowrap`}
                        >
                          Dos metodos de pago
                        </div>
                      </div>
                    </div>
                  </label>
                  <label
                    htmlFor="checkAcuenta"
                    className="relative flex items-center space-x-3 mb-1 select-none"
                  >
                    <div
                      className={`${
                        isAcuentaChecked ? "ring-blue-400" : " "
                      } group flex items-center pl-2.5 pr-2.5 py-0.5 w-full ring-0 focus:ring-0 md:hover:ring-primary bg-white ring-gray-400 text-gray-800 rounded-full focus:outline-none`}
                    >
                      <input
                        type="checkbox"
                        id="checkAcuenta"
                        checked={isAcuentaChecked}
                        onChange={(e) => {
                          setIsAcuentaChecked(e.target.checked);
                          refPayMethodOne.current.value = "acuenta";
                        }}
                        className={`${
                          isAcuentaChecked
                            ? "border-primary"
                            : "md:group-hover:border-primary border-gray-400"
                        } relative appearance-none h-4 w-4 checked:bg-primary border rounded-full focus:outline-none`}
                      />
                      <span className="flex items-center ml-0.5 w-3 h-3 text-white absolute">
                        <IconCheck />
                      </span>
                      <div className="flex items-center ml-1">
                        <div
                          className={`${
                            isAcuentaChecked ? "text-gray-700" : "text-gray-500"
                          } ml-1 text-sm whitespace-nowrap`}
                        >
                          A cuenta
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="">
                  <div className="flex text-sm relative">
                    <p className="font-semibold text-gray-700 ml-2 pl-1 sm:font-semibold ">{`${
                      isAcuentaChecked ? "A Cuenta" : ""
                    } `}</p>
                  </div>
                  <div className="flex items-start space-x-2 mb-2">
                    <label
                      htmlFor="checkAcuenta"
                      className={`flex flex-col justify-center ${
                        isAcuentaChecked ? " w-1/2" : "w-full"
                      }`}
                    >
                        {isAcuentaChecked && (
                      <div className="relative">
                      <input
                            placeholder="Ingresar Monto"
                            inputMode="decimal"
                            pattern="[0-9.]*"
                            step={0.01}
                            type="number"
                            onChange={(e) =>
                              handleChangePrice(
                                e,
                                setPayCantOne,
                                setPayCantTwo,
                                "payCantOne",
                                "payCantTwo"
                              )
                            }
                       
                            className={`${
                              errors?.payCantOne
                                ? "ring-red-500"
                                : "ring-blue-400"
                            } bg-white pl-3 pr-3 py-0.5 text-sm rounded-xl w-full ring-1 focus:ring-2 focus:outline-none text-gray-800`}
                          />
                      </div>
                        )}
                    </label>
                  </div>
                </div>

                <div className="">
                  <div className="flex text-sm relative">
                    <p className="font-semibold text-gray-700 ml-2 pl-1 sm:font-semibold ">{`Metodo${
                      isTwoPaysChecked ? "s" : ""
                    } de Pago`}</p>
                  </div>
                  <div className="flex items-start space-x-2 mb-2">
                    <label
                      htmlFor="payMethodOne"
                      className={`flex flex-col justify-center ${
                        isTwoPaysChecked ? " w-1/2" : "w-full"
                      }`}
                    >
                      <div className="relative">
                        <select
                          ref={refPayMethodOne}
                          disabled={isTwoPaysChecked}
                          id="payMethodOne"
                          className={`appearance-none bg-white pl-3 py-0.5 text-sm rounded-xl w-full ring-1 ${
                            isTwoPaysChecked ? "" : "focus:ring-2"
                          } focus:outline-none ring-blue-400 text-gray-800'`}
                        >
                          <option value="Efectivo">Efectivo</option>
                          {Array.isArray(paymentTypes) &&
                            paymentTypes.map((item) => (
                              <>
                                {item.nombre !== "Efectivo" && (
                                  <option
                                    key={item.nombre}
                                    value={item.nombre}
                                    className="text-gray-700 capitalize"
                                  >
                                    {item.nombre}
                                  </option>
                                )}
                              </>
                            ))}
                          {/* <option value="izipay" className="text-gray-700">Izipay</option>
                          <option value="Yape" className="text-gray-700">Yape</option>
                          <option value="tarjeta" className="text-gray-700">Tarjeta</option> */}
                        </select>
                        {!isTwoPaysChecked && (
                          <span className="absolute right-0 top-1 h-5 w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center rounded-full bg-white">
                            <IconSelect />
                          </span>
                        )}
                      </div>
                    </label>
                    {isTwoPaysChecked && (
                      <div className="w-1/2">
                        <label
                          htmlFor="payCantOne"
                          className="w-full relative flex flex-col justify-center "
                        >
                          {/* <p className="font-semibold text-gray-600 ml-3 mb-1 sm:font-semibold ">N° payCantOneo</p> */}
                          <input
                            placeholder="Ingresar Monto"
                            inputMode="decimal"
                            pattern="[0-9.]*"
                            step={0.01}
                            type="number"
                            onChange={(e) =>
                              handleChangePrice(
                                e,
                                setPayCantOne,
                                setPayCantTwo,
                                "payCantOne",
                                "payCantTwo"
                              )
                            }
                            onBlur={() =>
                              payCantOne === ""
                                ? handleChangePrice(
                                    { target: { value: 0 } },
                                    setPayCantOne,
                                    setPayCantTwo,
                                    "payCantOne",
                                    "payCantTwo"
                                  )
                                : setPayCantOne(
                                    parseFloat(payCantOne).toFixed(2)
                                  )
                            }
                            value={payCantOne}
                            className={`${
                              errors?.payCantOne
                                ? "ring-red-500"
                                : "ring-blue-400"
                            } bg-white pl-3 pr-3 py-0.5 text-sm rounded-xl w-full ring-1 focus:ring-2 focus:outline-none text-gray-800`}
                          />
                          <input
                            type="text"
                            className="hidden"
                            {...register("payCantOne", {
                              min: {
                                value: 0.1,
                                message: "Monto debe ser mayor a 0",
                              },
                              required: {
                                value: isTwoPaysChecked,
                                message: "Monto requerido",
                              },
                              pattern: "[0-9.]*",
                            })}
                          />
                          {/* <span className={`${errors?.payCantOne ? '' : 'hidden'} pl-2 text-xs text-red-500 mt-0.5`}>
                            {errors?.payCantOne?.message}
                          </span> */}
                        </label>
                      </div>
                    )}
                  </div>
                  {/* SECOND METHOD */}
                  {isTwoPaysChecked && (
                    <div className="flex items-start space-x-2 mb-2">
                      <label
                        htmlFor="payMethodTwo"
                        className="flex flex-col justify-center w-1/2"
                      >
                        <div className="relative">
                          <select
                            ref={refPayMethodTwo}
                            id="payMethodTwo"
                            className="appearance-none bg-white pl-3 py-0.5 text-sm rounded-xl w-full ring-1 focus:ring-2 focus:outline-none ring-blue-400 text-gray-800"
                          >
                            {/* <option value="select">Seleccionar</option> */}
                            {Array.isArray(paymentTypes) &&
                              paymentTypes.map((item) => (
                                <>
                                  {item.nombre !== "Efectivo" && (
                                    <option
                                      key={`${item.nombre}Two`}
                                      value={item.nombre}
                                      className="text-gray-700 capitalize"
                                    >
                                      {item.nombre}
                                    </option>
                                  )}
                                </>
                              ))}
                          </select>
                          <span className="absolute right-0 top-1 h-5 w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center rounded-full bg-white">
                            <IconSelect />
                          </span>
                        </div>
                      </label>
                      <div className="w-1/2">
                        <label
                          htmlFor="payCantTwo"
                          className="w-full relative flex flex-col justify-center "
                        >
                          <input
                            placeholder="Ingresar Monto"
                            inputMode="decimal"
                            pattern="[0-9.]*"
                            step={0.01}
                            onChange={(e) =>
                              handleChangePrice(
                                e,
                                setPayCantTwo,
                                setPayCantOne,
                                "payCantTwo",
                                "payCantOne"
                              )
                            }
                            // onBlur={() => payCantOne === '' && handleChangePrice({ target: { value: 0 } }, setPayCantOne, setPayCantTwo, 'payCantTwo', 'payCantOne')}
                            onBlur={() =>
                              payCantTwo === ""
                                ? handleChangePrice(
                                    { target: { value: 0 } },
                                    setPayCantTwo,
                                    setPayCantOne,
                                    "payCantTwo",
                                    "payCantOne"
                                  )
                                : setPayCantTwo(
                                    parseFloat(payCantTwo).toFixed(2)
                                  )
                            }
                            value={payCantTwo}
                            type="number"
                            className={`${
                              errors?.payCantTwo
                                ? "ring-red-500"
                                : "ring-blue-400"
                            } bg-white pl-3 pr-3 py-0.5 text-sm rounded-xl w-full ring-1 focus:ring-2 focus:outline-none text-gray-800`}
                          />
                          <input
                            type="text"
                            className="hidden"
                            {...register("payCantTwo", {
                              min: {
                                value: 0.1,
                                message: "Monto debe ser mayor a 0",
                              },
                              required: {
                                value: isTwoPaysChecked,
                                message: "Monto debe ser mayor a 0",
                              },
                            })}
                          />
                          <span
                            className={`${
                              errors?.payCantOne || errors?.payCantTwo
                                ? ""
                                : "hidden"
                            } pl-2 text-xs text-red-500 mt-0.5`}
                          >
                            {errors?.payCantOne?.message ||
                              errors?.payCantTwo?.message}
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-end p-1">
                  <div className="flex flex-col items-end space-y-1 justify-center text-xs text-red-500 font-semibold w-full mr-1">
                    <p className="whitespace-nowrap">Sub Total</p>
                    <p className="whitespace-nowrap">IGV(18%)</p>
                    <p className="whitespace-nowrap">Total</p>
                  </div>
                  <div className="flex flex-col items-end text-sm text-gray-600 font-semibold ">
                    <p className="px-2.5 text-right whitespace-nowrap">{`S/ ${(
                      priceProducts / 1.18
                    ).toFixed(2)}`}</p>
                    <p className="px-2.5 text-right whitespace-nowrap">{`S/ ${(
                      (priceProducts * 0.18) /
                      1.18
                    ).toFixed(2)}`}</p>
                    <p className="px-2.5 text-right whitespace-nowrap">{`S/ ${priceProducts.toFixed(
                      2
                    )}`}</p>
                  </div>
                </div>

                {/* Toggle switch */}
                <div className="flex space-x-2 items-center justify-center tap-highline-none mt-3.5 mb-1 text-sm">
                  <button
                    type="submit"
                    name="b1"
                    value="button1"
                    onClick={() => setButtonPressed("ticket")}
                    className="bg-primary hover:bg-dark-primary text-white w-28 py-1 rounded-full border-2 border-dark-primary ring-gray-200 hover:ring font-semibold "
                  >
                    <div className="">Ticket</div>
                  </button>
                  <button
                    type="submit"
                    name="b2"
                    value="button2"
                    onClick={() => setButtonPressed("boleta")}
                    className="bg-primary hover:bg-dark-primary text-white w-28 py-1 rounded-full border-2 border-dark-primary ring-gray-200 hover:ring font-semibold "
                  >
                    <div className="">Boleta</div>
                  </button>
                  <button
                    type="submit"
                    name="b3"
                    value="button3"
                    onClick={() => setButtonPressed("factura")}
                    className="bg-primary hover:bg-dark-primary text-white w-28 py-1 rounded-full border-2 border-dark-primary ring-gray-200 hover:ring font-semibold "
                  >
                    <p className="">Factura</p>
                  </button>
                </div>

                {/* BUTTONS FINALY */}
                {/* <div className="flex space-x-5 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpenModalCancel(true)}
                    className="border-2 border-red-600 bg-red-500 hover:bg-red-600 hover:ring ring-gray-300 pt-1 pb-1.5 rounded-full w-full focus:outline-none text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="border-2 border-blue-600 bg-blue-500 hover:bg-blue-600 hover:ring ring-gray-300 pt-1 pb-1.5 rounded-full w-full focus:outline-none text-white"
                  >
                    Guardar
                  </button>
                </div> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

Sales.propTypes = {
  isLoadingSearchProduct: PropTypes.bool.isRequired,
  setIsLoadingSearchProduct: PropTypes.func.isRequired,
  isLoadingSearchClient: PropTypes.bool.isRequired,
  setIsLoadingSearchClient: PropTypes.func.isRequired,
  productsData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  clientsData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  setSearchProduct: PropTypes.func.isRequired,
  clientId: PropTypes.number.isRequired,
  setClientId: PropTypes.func.isRequired,
  setSearchClient: PropTypes.func.isRequired,
  setClientMutate: PropTypes.func.isRequired,
  clientDataById: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  paymentTypes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  // searchType: PropTypes.string.isRequired,
  // setSearchType: PropTypes.func.isRequired,
};

export default withFetch(Sales);
