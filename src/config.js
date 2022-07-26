/* eslint-disable object-curly-newline */
export const API = process.env.REACT_APP_PUBLIC_API;
export const API_FACTURADOR = process.env.REACT_APP_PUBLIC_API_FACTURADOR;
// export const UPLOAD_MS = process.env.REACT_APP_PUBLIC_UPLOAD_MS;

export const appVersion = '1.0.4';

export const menus = [
  { name: 'Dashboard', payload: 'HOME', icon: 'iconDashboard' },
  { name: 'Tiendas', payload: 'LOCALES', icon: 'iconLocal', role:'admin'},
  { name: 'Usuarios', payload: 'USERS', icon: 'iconUsers', role: 'admin' },
  { name: 'Vendedores', payload: 'VENDEDORES', icon: 'IconIdCard', role: 'admin' },
  { name: 'Proveedores', payload: 'PROVEEDORES', icon: 'iconClients', role: 'admin' },
  { name: 'Laboratorio', payload: 'c', icon: 'IconTickets', role: 'admin' },
  { name: 'Facturación Elect.', payload: 'BILLING', icon: 'iconBilling', role: 'admin' },
  { name: 'Ventas', payload: 'SALES', icon: 'iconSales' },
  { name: 'Monturas', payload: 'MONTURAS', icon: 'iconMontura' },
  { name: 'Productos', payload: 'PRODUCTS', icon: 'iconProducts' },
  { name: 'Clientes', payload: 'CLIENTS', icon: 'iconClients' },
  { name: 'Reporte de Ventas', payload: 'SALES_REPORT', icon: 'iconReport' },
 
];

export const optionsNotaDebito = [
  { value: '01', name: 'Intereses por mora' },
  { value: '02', name: 'Aumento en el valor' },
  { value: '03', name: 'Penalidades/ otros conceptos' },
  { value: '11', name: 'Ajustes de operaciones de exportación' },
  { value: '12', name: 'Ajustes afectos al IVAP' },
];

export const optionsNotaCredito = [
  { value: '01', name: 'Anulación de la operación' },
  { value: '02', name: 'Anulación por error en el RUC' },
  { value: '03', name: 'Correción por error en la descripción' },
  { value: '04', name: 'Descuento global' },
  { value: '05', name: 'Descuento por ítem' },
  { value: '06', name: 'Devolución total' },
  { value: '07', name: 'Devolución por ítem' },
  { value: '08', name: 'Bonificación' },
  { value: '09', name: 'Disminución en el valor' },
  { value: '10', name: 'Otros Conceptos' },
  { value: '11', name: 'Ajustes de operaciones de exportación' },
  { value: '12', name: 'Ajustes afectos al IVAP' },
];

// export const payMethods = [
//   { type: 'Culqi', isActive: false },
//   { type: 'PagoEfectivo', isActive: false },
//   { type: 'Izipay', isActive: true },
//   { type: 'Yape', isActive: false },
//   { type: 'Transferencia', isActive: true },
//   { type: 'None', isActive: false },
// ];

// export const saleStatus = [
//   { name: 'Pendiente' },
//   { name: 'Verificado' },
//   { name: 'Desplegado' },
//   { name: 'Vencido' },
//   { name: 'Cancelado' },
// ];

// export const servicesList = [
//   { name: 'Tamaño Disco', value: 'disk' },
//   { name: 'Ancho de Banda', value: 'bandwidth' },
//   { name: 'BD MySQL 5+', value: 'dataBases' },
//   { name: 'Cuentas Email', value: 'emailAccounts' },
//   { name: 'Cuentas FTP', value: 'ftpAccount' },
//   { name: 'Otros', value: 'other' },
// ];

export default menus;
