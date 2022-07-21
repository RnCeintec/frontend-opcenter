//* Config
const header = { 'Content-Type': 'application/json' };

export const fetcher = async (...args) => {
  try {
    const response = await fetch(...args, {
      headers:
        'token' in localStorage
          ? {
            ...header,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
          : header,
    });
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!response.ok) {
      const error = new Error(
        response.status !== 401
          ? 'Ocurrió un error al obtener la información'
          : 'Acceso no autorizado',
      );
      // Attach extra info to the error object.
      error.info = await response.json();
      error.status = response.status;
      throw error;
    }
    return response.json();
  } catch (error) {
    const errorFetch = new Error(
      error.status !== 401
        ? 'Ocurrió un error al obtener la información'
        : 'Acceso no autorizado',
    );
    errorFetch.status = error.status;
    throw errorFetch;
  }
};

export default fetcher;
