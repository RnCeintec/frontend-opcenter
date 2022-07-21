import { useEffect, useState } from 'react';
import ModalOneOption from './components/molecules/modal/ModalOneOption';
import Portal from './utils/portal';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const ServiceWorkerWrapper = () => {
  const [showReload, setShowReload] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);

  const onSWUpdate = (registration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };

  useEffect(() => {
    serviceWorkerRegistration.register({ onUpdate: onSWUpdate });
  }, []);

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(false);
    window.location.reload();
  };

  return (
    <>
      {
        showReload
        && (
          <Portal>
            <ModalOneOption
              titleModal="Actualizacion Disponible"
              titleFirstOption="Actualizar!"
              onClickFirstOption={() => reloadPage()}
              colorFirstButton="green-500"
            />
          </Portal>
        )
      }
    </>
  );
};

export default ServiceWorkerWrapper;
