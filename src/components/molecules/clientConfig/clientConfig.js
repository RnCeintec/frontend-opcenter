import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  IconClose, IconEmail, IconGPS, IconIdCard, IconKey,
  IconLocal,
  IconObservation, IconPhone, IconProduct, IconScrollDown, IconSpiner, IconUser, IconUserCircle,
} from '../../../assets/icons/icons';
import withFetch from './withFetch';
import FormTextInput from '../../atoms/formInputs/formTextInput';
import { useFetch } from '../../../hook';
import { successAlert, warningAlert } from '../../../utils/alertNotify';
import Context from '../../context/context';

const ProfileEdit = ({ profileData }) => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const fetchProfile = useFetch('users');

  const { nombre, documento, username } = profileData;
  // FORM VARIABLES
  const {
    register, handleSubmit, watch, reset, setValue, clearErrors, setFocus, formState: { errors },
  } = useForm({
    defaultValues: {
      name: nombre, document: documento, user: username,
    },
  });

  const onSubmit = async (data) => {
    setIsLoadingSubmit(true);
    const idProfile = localStorage.getItem('id');
    const dataToSend = {
      nombre: data.name,
      usuario: data.user,
      documento: data.document,
      password: data.password ? data.password : undefined,
    };

    try {
      const [result, status] = await fetchProfile.put(idProfile, dataToSend);
      if (status === 200) {
        successAlert('Datos Actualizados Correctamente');
        localStorage.setItem('name', `${result.result?.nombre}`);
        localStorage.setItem('role', `${result.result?.role}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-xl font-semibold flex flex-col justify-center items-center">
          Editar Perfíl
        </h1>
      </div>
      <form className="flex flex-col w-full relative" onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          inputName="name"
          title="Nombre Vendedor"
          icon={<IconUserCircle />}
          placeholder="Ingresar Nombre del Vendedor"
          options={{
            required: {
              value: true,
              message: 'Nombre requerido',
            },
            pattern: {
              value: /^[a-zA-Z áéíóúüÁÉÍÓÚÜñÑ]+$/,
              message: 'Nombre invalido',
            },
          }}
          register={register}
          errors={errors}
        />
        <FormTextInput
          inputName="user"
          title="Nombre Usuario"
          icon={<IconUser />}
          placeholder="Ingresar Nombre de Usuario"
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
          register={register}
          errors={errors}
        />
        <FormTextInput
          inputName="document"
          title="N° Documento"
          icon={<IconIdCard />}
          placeholder="Ingresar N° de Documento"
          options={{
            required: {
              value: true,
              message: 'Documento requerido',
            },
            pattern: {
              value: /^[0-9]+$/,
              message: 'Documento invalido',
            },
          }}
          type="number"
          register={register}
          errors={errors}
        />
        <FormTextInput
          inputName="password"
          title="Cambiar Contraseña (opcional)"
          icon={<IconKey />}
          placeholder="Ingresar Nueva Contraseña"
          type="password"
          register={register}
          errors={errors}
        />
        <button
          type="submit"
          className={`flex justify-center items-center py-1.5 px-3 mt-6 mb-1 bg-primary opacity-90 hover:opacity-100 text-white rounded-xl ${isLoadingSubmit ? 'cursor-not-allowed' : ''}`}
          disabled={isLoadingSubmit}
        >
          {isLoadingSubmit && <IconSpiner />}
          <p>Actualizar Datos</p>
        </button>
      </form>
    </>
  );
};

ProfileEdit.propTypes = {
  profileData: PropTypes.shape().isRequired,
};

const LocalEdit = ({ locationData }) => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [scrollerY, setScrollerY] = useState(0);
  const fetchLocal = useFetch('local');
  const { state: { localData, isLocalSelected }, dispatch } = useContext(Context);

  // const idLocal = JSON.parse(localStorage.getItem('localData')).id;
  const {
    rz_social: rzSocial, num_documento: numDocumento, codDomicilioFiscal,
    nombre, eslogan, ciudad, direccion, correo, telefono,
  } = locationData.filter((item) => localData?.id === item.id)[0];

  // FORM VARIABLES
  const {
    register, handleSubmit, watch, reset, setValue, clearErrors, setFocus, formState: { errors },
  } = useForm({
    defaultValues: {
      rz_social: rzSocial,
      ruc: numDocumento,
      codDomicilioFiscal,
      name: nombre,
      slogan: eslogan,
      city: ciudad,
      address: direccion,
      email: correo,
      phone: telefono,
    },
  });

  const onSubmit = async (data) => {
    if (localStorage.getItem('role') === 'admin') {
      setIsLoadingSubmit(true);
      // const { id } = JSON.parse(localStorage.getItem('localData'));
      const dataToSend = {
        rz_social: data.rz_social.trim().toUpperCase(),
        num_documento: data.ruc,
        codDomicilioFiscal: data.codDomicilioFiscal,
        nombre: data.name,
        eslogan: data.slogan ? data.slogan : undefined,
        ciudad: data.city,
        direccion: data.address,
        correo: data.email ? data.email : undefined,
        telefono: data.phone ? data.phone : undefined,
      };
      const dataToAdd = {
        id: localData?.id,
        rz_social: data.rz_social.trim(),
        RUC: data.ruc,
        codDomicilioFiscal: data.codDomicilioFiscal,
        businessName: data.name,
        slogan: data.slogan,
        city: data.city,
        address: data.address,
        email: data.email,
        phone: data.phone,
      };
      try {
        const [result, status] = await fetchLocal.put(localData?.id, dataToSend);
        if (status === 200) {
          successAlert('Datos Actualizados Correctamente');
          localStorage.setItem('localData', JSON.stringify(dataToAdd));
          dispatch({ type: 'SET_LOCAL_DATA', payload: dataToAdd });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingSubmit(false);
      }
    }
  };

  useEffect(() => {
    setValue('rz_social', localData?.rz_social);
    setValue('ruc', localData?.RUC);
    setValue('codDomicilioFiscal', localData?.codDomicilioFiscal);
    setValue('name', localData?.businessName);
    setValue('slogan', localData?.slogan);
    setValue('city', localData?.city);
    setValue('address', localData?.address);
    setValue('email', localData?.email);
    setValue('phone', localData?.phone);
  }, [localData]);

  document.getElementById('scroller').onscroll = () => {
    // if (document.getElementById('scroller')) {
    setScrollerY(document.getElementById('scroller').scrollTop);
    // }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-xl font-semibold flex flex-col justify-center items-center">
          {`${localStorage.getItem('role') === 'admin' ? 'Editar ' : ''}Datos del Local`}
        </h1>
      </div>
      <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          inputName="rz_social"
          title="Razon Social"
          icon={<IconProduct />}
          placeholder="Ingresar Razon Social del Negocio"
          options={{
            required: {
              value: true,
              message: 'Razon Social requerida',
            },
            pattern: {
              value: /^[a-zA-Z ñÑ]+$/,
              message: 'Razón Social invalida',
            },
            onBlur: (e) => {
              e.target.value = e.target.value.toUpperCase();
            },
          }}
          uppercase
          disabled={localStorage.getItem('role') !== 'admin'}
          register={register}
          errors={errors}
          watch={watch}
        />
        <div className="flex flex-col sm:flex-row sm:space-x-2">
          <FormTextInput
            inputName="ruc"
            title="RUC"
            icon={<IconIdCard />}
            placeholder="Ingresar RUC"
            options={{
              required: {
                value: true,
                message: 'RUC requerido',
              },
              pattern: {
                value: /^[0-9]+$/,
                message: 'RUC invalido',
              },
              validate: {
                length: (e) => e.length === 11 || 'RUC debe tener 11 números',
              },
            }}
            type="number"
            disabled={localStorage.getItem('role') !== 'admin'}
            register={register}
            errors={errors}
          />
          <FormTextInput
            inputName="codDomicilioFiscal"
            title="Código de Domicilio Fiscal"
            icon={<IconIdCard />}
            placeholder="Ingresar Código de Domicilio Fiscal"
            options={{
              required: {
                value: true,
                message: 'Domicilio Fiscal requerido',
              },
              pattern: {
                value: /^[0-9]+$/,
                message: 'Domicilio Fiscal invalido',
              },
              validate: {
                length: (e) => e.length === 4 || 'Domicilio Fiscal debe tener 4 números',
              },
            }}
            type="number"
            disabled={localStorage.getItem('role') !== 'admin'}
            register={register}
            errors={errors}
          />

        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-2">
          <FormTextInput
            inputName="name"
            title="Nombre del Negocio"
            icon={<IconProduct />}
            placeholder="Ingresar Nombre del Negocio"
            options={{
              required: {
                value: true,
                message: 'Nombre requerido',
              },
              pattern: {
                value: /^[a-zA-Z0-9¡!¿? áéíóúüÁÉÍÓÚÜñÑ]+$/,
                message: 'Nombre invalido',
              },
            }}
            disabled={localStorage.getItem('role') !== 'admin'}
            register={register}
            errors={errors}
          />
          <FormTextInput
            inputName="slogan"
            title="Eslogan"
            icon={<IconObservation />}
            placeholder="Ingresar Eslogan"
            disabled={localStorage.getItem('role') !== 'admin'}
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-2">
          <FormTextInput
            inputName="city"
            title="Ciudad"
            icon={<IconGPS />}
            placeholder="Ingresar Ciudad y Departamento"
            options={{
              required: {
                value: true,
                message: 'Ciudad requerida',
              },
            }}
            disabled={localStorage.getItem('role') !== 'admin'}
            register={register}
            errors={errors}
          />
          <FormTextInput
            inputName="address"
            title="Dirección"
            icon={<IconGPS />}
            placeholder="Ingresar Dirección"
            options={{
              required: {
                value: true,
                message: 'Dirección requerida',
              },
            }}
            disabled={localStorage.getItem('role') !== 'admin'}
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-2">
          <FormTextInput
            inputName="email"
            title="Correo"
            icon={<IconEmail />}
            placeholder="Ingresar Correo"
            options={{
              pattern: {
                value: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/,
                message: 'Correo invalido',
              },
            }}
            disabled={localStorage.getItem('role') !== 'admin'}
            register={register}
            errors={errors}
          />
          <FormTextInput
            inputName="phone"
            title="Teléfono"
            icon={<IconPhone />}
            placeholder="Ingresar Teléfono"
            options={{
              pattern: {
                value: /^[0-9]+$/,
                message: 'Teléfono invalido',
              },
              validate: {
                length: (e) => (e !== '' ? e.length === 9 : true) || 'Teléfono debe tener 9 números',
              },
            }}
            disabled={localStorage.getItem('role') !== 'admin'}
            type="number"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex justify-center space-x-3 w-full mt-6 sm:mb-1">
          <button
            type="button"
            onClick={() => dispatch({ type: 'SET_IS_LOCAL_SELECTED', payload: false })}
            className={`flex w-1/2 justify-center items-center py-1.5 px-3 bg-white hover:bg-primary border-2 border-primary text-primary hover:text-white font-semibold hover:font-normal rounded-xl ${isLoadingSubmit ? 'cursor-not-allowed' : ''}`}
            disabled={isLoadingSubmit}
          >
            <span className="w-6 mr-2"><IconLocal /></span>
            <p>Cambiar Local</p>
          </button>
          {localStorage.getItem('role') === 'admin'
            && (
              <button
                type="submit"
                className={`flex w-1/2 justify-center items-center py-1.5 px-3 bg-primary opacity-90 hover:opacity-100 text-white rounded-xl ${isLoadingSubmit ? 'cursor-not-allowed' : ''}`}
                disabled={isLoadingSubmit}
              >
                {isLoadingSubmit && <IconSpiner />}
                <p>Actualizar Datos</p>
              </button>
            )}
        </div>
      </form>
      <button
        type="button"
        onClick={() => {
          document.getElementById('scroller').scroll({
            top: 500,
            left: 0,
            behavior: 'smooth',
          });
        }}
        className={`${scrollerY > 200 ? 'hidden' : 'flex'} sm:hidden items-center justify-center p-1.5 ml-auto w-9 rounded-full bg-primary ring-2 ring-dark-primary sticky bottom-1 animate-pulse focus:outline-none`}
      >
        <span className="text-white">
          <IconScrollDown />
        </span>
      </button>
    </>
  );
};

LocalEdit.propTypes = {
  locationData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.shape()),
  ]),
};

LocalEdit.defaultProps = {
  locationData: [{}],
};

const ClientConfig = ({
  setIsOpenModalConfig, profileData, locationData,
}) => {
  const [panelActive, setPanelActive] = useState('profile');

  return (
    <div className="flex items-center justify-center w-full h-full z-40 fixed">
      <div className="flex flex-col absolute z-20
      w-11/12 sm:w-5/6 md:w-2/3 lg:w-3/6 max-h-screen overflow-y-auto"
      >
        <div className="flex ">
          <button
            type="button"
            onClick={() => setPanelActive('profile')}
            className={`${panelActive === 'profile' ? 'border-b-4 border-primary' : 'border-b border-gray-200'} px-4 py-2 rounded-tl-xl w-full font-semibold text-gray-800 hover:text-white bg-white hover:bg-primary`}
          >
            <p>Perfil</p>
          </button>
          <div className="w-0.5 bg-gray-200" />
          <button
            type="button"
            onClick={() => (locationData !== 'loading' ? setPanelActive('local') : warningAlert('Cargando Datos, por favor espere'))}
            className={`${panelActive === 'local' ? 'border-b-4 border-primary' : 'border-b border-gray-200'} group flex items-center justify-center px-4 py-2 w-full font-semibold text-gray-800 hover:text-white bg-white hover:bg-primary`}
          >
            <p>Local</p>
            {locationData === 'loading' && (
              <>
                <span className="ml-2 group-hover:hidden"><IconSpiner primary /></span>
                <span className="ml-2 hidden group-hover:flex"><IconSpiner /></span>
              </>
            )}
          </button>
          <div className="w-0.5 bg-gray-200" />
          <button
            type="button"
            onClick={() => setIsOpenModalConfig(false)}
            className="border-b border-gray-200 px-3 py-2 rounded-tr-xl font-semibold text-red-500 hover:text-white bg-white hover:bg-red-500"
          >
            <span><IconClose /></span>
          </button>
        </div>
        <div id="scroller" className={`px-4 pb-6 pt-4 rounded-b-xl bg-white overflow-y-auto relative sm:max-h-screen ${panelActive === 'profile' ? '' : 'max-h-96'}`}>
          {profileData === 'loading'
            ? <div className="flex justify-center p-10"><IconSpiner dark medium /></div>
            : panelActive === 'profile'
              ? <ProfileEdit profileData={profileData} />
              : <LocalEdit locationData={locationData} />}
        </div>
      </div>

      {/* THIS DIV IS FOR BLACK BACKGROUND */}
      <div
        className="w-full h-full z-10 bg-gray-600 opacity-60"
      />
    </div>
  );
};

ClientConfig.propTypes = {
  setIsOpenModalConfig: PropTypes.func.isRequired,
  profileData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]).isRequired,
  locationData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
};

export default withFetch(ClientConfig);
