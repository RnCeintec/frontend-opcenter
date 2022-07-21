import { toast } from 'react-toastify';

export const errorAlert = (message) => {
  toast.error((message
    ? (
      <div className="">
        <p className="ml-1">{message}</p>
      </div>
    ) : 'Ocurrió un error'), {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const successAlert = (message) => {
  toast.success((message
    ? (
      <div className="">
        <p className="ml-1">{message}</p>
      </div>
    )
    : 'Cambio exitoso'), {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const warningAlert = (message) => {
  toast.warning((message
    ? (
      <div className="flex">
        <p className="ml-1">{message}</p>
      </div>
    )
    : 'Warning'), {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const infoAlert = (message) => {
  toast.info((message
    ? (
      <div className="">
        <p className="ml-1">{message}</p>
      </div>
    )
    : 'Info'), {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifyMe = (cantNotify) => {
  try {
    if (!('Notification' in window)) {
      console.log('Este navegador no soporta notificaciones de escritorio');
    } else if (Notification.permission === 'granted') {
      const options = {
        body: `${cantNotify === 1 ? 'Hay 1 Ticket Nuevo ' : `Hay ${cantNotify} Tickets por Atender`}`,
        icon: 'favicon.ico',
        dir: 'ltr',
      };
      try {
        const notification = new Notification('Soporte', options);
      } catch (error) {
        console.log(error);
      }
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission((permission) => {
        if (!('permission' in Notification)) {
          Notification.permission = permission;
        }
        if (permission === 'granted') {
          const options = {
            body: `${cantNotify === 1 ? 'Hay 1 Ticket Nuevo ' : `Hay ${cantNotify} Tickets por Atender`}`,
            icon: 'favicon.ico',
            dir: 'ltr',
          };
          try {
            const notification = new Notification('Soporte', options);
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
