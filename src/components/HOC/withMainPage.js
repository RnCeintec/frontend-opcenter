import { lazy, useContext } from 'react';
import Context from '../context/context';

const AsyncHomeContent = lazy(() => import('../organims/contents/Home'));
const AsyncLocalContent = lazy(() => import('../organims/contents/Tienda'));
const AsyncSalesContent = lazy(() => import('../organims/contents/Sales'));
const AsyncProductsContent = lazy(() => import('../organims/contents/Products'));
const AsyncBillingContent = lazy(() => import('../organims/contents/Billing'));
const AsyncClientContent = lazy(() => import('../organims/contents/Clients'));
const AsyncSalesReportContent = lazy(() => import('../organims/contents/SalesReport'));
const AsyncUsersReportContent = lazy(() => import('../organims/contents/Users'));
const AsyncMonturasContent = lazy(() => import('../organims/contents/Monturas'));

const withMainPage = (Component) => (props) => {
  const { state: { page } } = useContext(Context);
  if (page === 'HOME') return <Component {...props} childComponent={<AsyncHomeContent />} />;
  if (page === 'LOCALES') return <Component {...props} childComponent={<AsyncLocalContent />} />;
  if (page === 'SALES') return <Component {...props} childComponent={<AsyncSalesContent />} />;
  if (page === 'PRODUCTS') return <Component {...props} childComponent={<AsyncProductsContent />} />;
  if (page === 'BILLING') return <Component {...props} childComponent={<AsyncBillingContent />} />;
  if (page === 'CLIENTS') return <Component {...props} childComponent={<AsyncClientContent />} />;
  if (page === 'SALES_REPORT') return <Component {...props} childComponent={<AsyncSalesReportContent />} />;
  if (page === 'USERS') return <Component {...props} childComponent={<AsyncUsersReportContent />} />;
  if (page === 'MONTURAS') return <Component {...props} childComponent={<AsyncMonturasContent />} />;

  return <Component {...props} childComponent={<AsyncHomeContent />} />;
};

export default withMainPage;
