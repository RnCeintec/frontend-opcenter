import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { APILogin } from '../../API/endpoint';
import {
  IconLock, IconSpiner, IconUnLock, IconUser,
} from '../../assets/icons/icons';
import ButtonIcon from '../atoms/buttons/buttonIcon';
import { errorAlert } from '../../utils/alertNotify';
import { appVersion } from '../../config';
import Context from '../context/context';
import LogoDefault from '../../assets/img/localLogo/default.png';

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [isDisableButton, setIsDisableButton] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { push } = useHistory();

  const { dispatch } = useContext(Context);

  const onSubmit = async (data) => {
    setIsDisableButton(true);
    const { user, password } = data;
    const dataUser = { user, password };
    try {
      const fetchLogin = await fetch(APILogin, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataUser),
      });
      const { status } = fetchLogin;
      const dataLogin = await fetchLogin.json();

      if (status === 200) {
        localStorage.setItem('id', dataLogin.id);
        localStorage.setItem('token', dataLogin.token);
        localStorage.setItem('name', `${dataLogin.name}`);
        localStorage.setItem('role', `${dataLogin.role}`);
        if (!('cart' in localStorage)) localStorage.setItem('cart', '[]');
        if ('localData' in localStorage) {
          dispatch({ type: 'SET_IS_LOCAL_SELECTED', payload: true });
        } else {
          dispatch({ type: 'SET_IS_LOCAL_SELECTED', payload: false });
        }

        push('/');
      } else {
        errorAlert(dataLogin.message.toString() || 'Ocurrió un error');
      }
    } catch (error) {
      if (error === 'TypeError: Failed to fetch') {
        errorAlert('Error al conectar con el Servidor');
      } else {
        errorAlert('Algo salió mal, vuelva a intentarlo');
      }
    } finally {
      setIsDisableButton(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-red-800 absolute">
      <form className="p-4 flex flex-col bg-white shadow-md border rounded-xl w-11/12 md:w-3/5 lg:w-1/3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center mb-1.5">
          <img src={LogoDefault} alt="logo" className="rounded-3xl h-28" />
        </div>
        
        <p className="text-2xl font-semibold text-center text-gray-700 mb-3">
          Iniciar Sesión
        </p>

        <div className="relative  mb-2">
          <div>
            <input
              placeholder="Usuario"
              className="w-full pl-2 p-1 rounded-lg border border-gray-300 focus:border-blue-300 focus:outline-none"
              {...register(
                'user',
                {
                  required: {
                    value: true,
                    message: 'Usuario requerido',
                  },
                },
              )}
            />
            <div className="absolute top-1 right-2 text-gray-600">
              <IconUser />
            </div>
          </div>
          <span className={`text-red-500 text-start ${errors?.user ? 'pl-2' : 'hidden'}`}>
            {errors?.user?.message}
          </span>
        </div>

        <div className="relative mb-2">
          <input
            placeholder="Contraseña"
            type={showPass ? 'text' : 'password'}
            className="w-full pl-2 p-1 rounded-lg border border-gray-300 focus:border-blue-300 focus:outline-none"
            {...register(
              'password',
              {
                required: {
                  value: true,
                  message: 'Contraseña requerida',
                },
              },
            )}
          />
          <span className={`text-red-500 text-start ${errors?.password ? 'pl-2' : 'hidden'} `}>
            {errors?.password?.message}
          </span>
          {showPass
            ? (
              <div className="absolute top-1.5 right-2 text-gray-500">
                <ButtonIcon
                  icon={<IconUnLock />}
                  isColorHover
                  colorHover="green-500"
                  colorText="gray-600"
                  padding={0}
                  onClick={() => setShowPass(false)}
                />
              </div>
            )
            : (
              <div className="absolute top-1.5 right-2 text-gray-500">
                <ButtonIcon
                  icon={<IconLock />}
                  isColorHover
                  colorHover="green-500"
                  colorText="gray-600"
                  padding={0}
                  onClick={() => setShowPass(true)}
                />
              </div>
            )}
        </div>
        <div className="w-full flex justify-end">
          <button
            type="submit"
            disabled={isDisableButton}
            className={`py-1.5 px-1 bg-blue-500 text-white rounded-lg w-full sm:w-2/5 focus:ring-2 focus:outline-none mb-1 ${isDisableButton ? 'cursor-not-allowed ring-2' : ''} `}
          >
            {isDisableButton
              ? <div className="flex justify-center"><IconSpiner /></div>
              : <p>Ingresar</p>}
          </button>
        </div>
      </form>
      <p className="text-gray-200 text-center text-xs absolute mb-2 bottom-0">
        {`v${appVersion}`}
      </p>
    </div>
  );
};

export default Login;
