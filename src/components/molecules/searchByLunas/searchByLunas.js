/* eslint-disable react/prop-types */
//
import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
    IconAdminSolid, IconPrev, IconNext, IconFirst, IconLast, IconSelect, IconSearch,
    IconSpiner, IconDelete, IconPencil, IconKey, IconImage, IconUser, IconUserCircle,
    IconRefresh, IconUpload, IconClose, IconAlert, IconProduct, IconProductCode, IconCategory, IconFilter, IconStock, IconNewClient, IconNewCategory, IconUsersSolid, IconIdCard, IconGPS, IconPhone, IconObservation,    
} from '../../../assets/icons/icons';
import ButtonIcon from '../../atoms/buttons/buttonIcon';
import withFetch from './withFetch';
import Context from '../../context/context';
import { warningAlert } from '../../../utils/alertNotify';
import Pagination from '../../atoms/buttons/paginationButtons';
import { useForm } from 'react-hook-form';
import FormTextInput from '../../atoms/formInputs/formTextInput';
import FormSelectInput from '../../atoms/formInputs/formSelectInput';


const SearchByLunas = ({
  setIsOpenSearchByLunasModal,
  isLoadingSearchLunas,
  setIsLoadingSearchLunas,
  isLoadingSearchProduct,
  setIsLoadingSearchProduct,
  categoryActive,
  setLunasActive,
  proveedorData,
  lunasData,
  productsData,
  setSearchLunas,
  setSearchProduct,
  searchProduct,
  setLimitProduct,
  page,
  pageRange,
  nextPage,
  previusPage,
  jumpToPage,
  jumpToFirstPage,
  jumpToLastPage,
  lastPage,
}) => {
  const [isOpenSearchListLunas, setIsOpenSearchListLunas] = useState(false);
  const [dataLunasSelected, setDataLunasSelected] = useState(null);
  const { cart, setCart } = useContext(Context);
  const refLunas = useRef(null);
  const refProduct = useRef(null);

  const [typeOfPanel, setTypeOfPanel] = useState('Ingresar');
  const {
    register, watch, reset, setValue, clearErrors, handleSubmit, setFocus, formState: { errors },
  } = useForm();
  const handleCleanSearchLunas = () => {
    if (!isOpenSearchListLunas) {
      setDataLunasSelected(null);
      refLunas.current.value = '';
      setSearchLunas('');
    } else if (dataLunasSelected) {
      refLunas.current.value = dataLunasSelected.descripcion;
      setSearchLunas(dataLunasSelected.descripcion);
    } else {
      refLunas.current.value = '';
      setSearchLunas('');
    }
    setIsOpenSearchListLunas(false);
  };

  const handleCleanSearchProduct = () => {
    setSearchProduct('');
    refProduct.current.value = '';
    refProduct.current.focus();
  };

  const handleChangeLunas = () => {
    const category = refLunas.current.value;
    setIsLoadingSearchLunas(true);
    setSearchLunas(category);
    setIsOpenSearchListLunas(true);

    // DELETE THIS IF PEOPLE WANT SEE ALL PRODUCTS
    // if (!product) {
    //   setIsOpenSearchListLunas(false);
    // }
  };

  // WRITTING word to search
  const handleChangeProduct = (event) => {
    const { value } = event.target;
    // VERIFY IF KEYWORD WITH "/" or "\" AND START/END SPACES
    let search = value.split('/').join(' ');
    search = search.split('\\').join(' ');
    search = search.trim();
    setSearchProduct(search);
  };
  const onSubmit = async (data) => {
    if (typeOfPanel === 'Ingresar') {
      await createLaboratorio(data);
    } else if (typeOfPanel === 'Editar') {
      await editLaboratorio(data);
    }
  };
  const handleSelectLunas = (idValue) => {
    const dataToInsert = lunasData.filter((item) => item.id === idValue)[0];
    setDataLunasSelected(dataToInsert);
    refLunas.current.value = dataToInsert.descripcion;
    setLunasActive(dataToInsert.descripcion);
    setSearchLunas(dataToInsert.descripcion);
    setIsOpenSearchListLunas(false);
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

    if ('cart' in localStorage) {
      let cartLocal = JSON.parse(localStorage.getItem('cart'));
      if (cartLocal.filter((item) => item.id === idValue).length === 0) {
        cartLocal = [...cartLocal, productToAdd];
        localStorage.setItem('cart', JSON.stringify(cartLocal));
        setCart(cartLocal);
        setIsOpenSearchByLunasModal(false);
      } else {
        warningAlert('El producto ya existe en el pedido');
      }
    } else {
      localStorage.setItem('cart', JSON.stringify([productToAdd]));
      setCart([productToAdd]);
    }
  };

  // <--------- CANT ROWS FUNCTIONS --------->
  const handleChangeCantView = (e) => {
    const { value } = e.target;
    setLimitProduct(value);
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-full z-50 fixed">
        <div className="flex p-4 pt-6 mt-2 flex-col justify-center absolute z-20 bg-white rounded-xl
      w-11/12 sm:w-5/6 md:w-3/4 lg:w-1/2 max-h-screen">
          <button type="button" onClick={() => setIsOpenSearchByLunasModal(false)} className="absolute right-5 top-3 text-gray-600 hover:text-gray-800 z-40">
            <IconClose />
          </button>
          <p className="font-semibold text-gray-600 ml-3 mb-1 sm:font-semibold text-center text-xl">INGRESAR LUNAS</p>

          <div className="flex flex-col md:flex-row p-4 bg-white rounded-b-xl">{/*border border-red-400 */}
						{/*LADO IZQUIERDO */}
						<div className="flex flex-col w-full md:w-2/5">
							<form className="flex flex-col w-full -mt-2 relative" onSubmit={handleSubmit(onSubmit)}>
								<FormSelectInput inputName="tipo_documento"
														title="Laboratorio"
														icon={<IconIdCard />}
														options={{
															validate: {
																select: (e) => e !== 'select' || 'Campo Obligatorio',
															},
														}}
														register={register} watch={watch} errors={errors}
													>
														<option value="dni" className="text-gray-700">OPCION 1</option>
														<option value="carnet" className="text-gray-700">OPCION 2</option>
													</FormSelectInput>
									<FormSelectInput inputName="tipo_documento"
														title="Producto"
														icon={<IconIdCard />}
														options={{
															validate: {
																select: (e) => e !== 'select' || 'Campo Obligatorio',
															},
														}}
														register={register} watch={watch} errors={errors}
													>
														<option value="dni" className="text-gray-700">OPCION 1</option>
														<option value="carnet" className="text-gray-700">OPCION 2</option>
													</FormSelectInput>
									<FormSelectInput inputName="tipo_documento"
														title="Detalle"
														icon={<IconIdCard />}
														options={{
															validate: {
																select: (e) => e !== 'select' || 'Campo Obligatorio',
															},
														}}
														register={register} watch={watch} errors={errors}
													>
														<option value="dni" className="text-gray-700">OPCION 1</option>
														<option value="carnet" className="text-gray-700">OPCION 2</option>
													</FormSelectInput>
							</form>
						</div>
						{/*LADO DERECHO */}
						<div className="flex flex-col w-full md:w-3/5 md:-mt-1 md:pl-4">
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
											{/*Siguiente Parte */}
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
					
						</div>
						
          </div>
        </div>
        {/* THIS DIV IS FOR BLACK BACKGROUND */}
        <div
          className="w-full h-full z-10 bg-gray-600 opacity-60"
        />
      </div>

    </>
  );
};

SearchByLunas.propTypes = {
  setIsOpenSearchByLunasModal: PropTypes.func.isRequired,
  lunasData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  proveedorData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  productsData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setSearchLunas: PropTypes.func.isRequired,
  setSearchProduct: PropTypes.func.isRequired,
  searchProduct: PropTypes.string.isRequired,
  setLimitProduct: PropTypes.func.isRequired,
};

export default withFetch(SearchByLunas);
