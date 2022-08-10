/* eslint-disable max-len */
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { es } from 'dayjs/locale/es';
import {
  IconDashboardSolid, IconProduct, IconSalesSolid,
  IconSpiner, IconGain, IconEyeOpen,
} from '../../../../assets/icons/icons';
import withFetch from './withFetch';
import ButtonPrimaryOnclick from "../../../atoms/buttons/buttonPrimaryOnclick";
import { lazy,Component } from 'react';
const AsyncSalesContent = lazy(() => import('../Sales'));

dayjs.locale('es');
debugger

const Home = ({ dataDashboard }) => {
  const {
    TgananciaMensual, TgananciaSemanal, TotalAnulado,
    TotalPagado, TotalProductos, TotalVentas,
    masVendidos, ultimasVentas,pedidosLunas
  } = dataDashboard;
  
  const handlePasarVenta= (id) => (props)=> {
    // alert("Pasar a venta "+id)
  

    // if (idVendedor === id) {
    //   setFocus('document');
    // } // borrar
  };
  // console.log(dataDashboard);

  return (
    <div className="flex flex-col items-center bg-bg-blue w-full min-h-screen">
      <div className="pl-4 pt-2 flex w-full h-12 sm:h-16 bg-white shadow-sm">
        <div className="flex text-3xl sm:text-4xl text-gray-800 font-semibold">
          <p>Opticenter</p>
          <div className="text-gray-600 w-8 sm:w-10 mt-1 sm:mt-0.5">
           {/*  <IconDashboardSolid /> */}
           <IconEyeOpen/>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full h-full p-4">

        {/* <------ CARDS -------> */}
        <div className="flex w-full">
          <div className="flex flex-col sm:flex-row w-full mb-4 mr-4">
            <div className="flex relative w-full sm:w-1/2 bg-green-500 text-white rounded-xl shadow sm:mr-4 mb-4 sm:mb-0">
              <div className="z-10">
                <p className="text-4xl font-semibold pl-6 pt-3">
                  {TotalVentas || 0}
                </p>
                <p className="pl-6 pt-3 pr-4 pb-4 font-medium">
                  Ventas
                </p>
              </div>
              <div className="text-green-700 w-16 absolute bottom-3 right-3">
                <IconSalesSolid />
              </div>
              <div className="bg-gray-900 opacity-20 rounded-b-lg w-full h-2 absolute bottom-0">
                {' '}
              </div>
            </div>
            <div className="flex relative w-full sm:w-1/2 bg-red-500 text-white rounded-xl shadow">
              <div className="z-10">
                <p className="text-4xl font-semibold pl-6 pt-3">
                  {TotalProductos || 0}
                </p>
                <p className="pl-6 pt-3 pr-4 pb-4 font-medium">
                  Productos
                </p>
              </div>
              <div className="text-red-700 w-16 absolute bottom-4 right-3">
                <IconProduct autosize />
              </div>
              <div className="bg-gray-900 opacity-20 rounded-b-lg w-full h-2 absolute bottom-0">
                {' '}
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row w-full mb-4">
            <div className="flex relative w-full sm:w-1/2 bg-yellow-500 text-white rounded-xl shadow sm:mr-4 mb-4 sm:mb-0">
              <div className="z-10">
                <div className="pl-4 sm:pl-6 pt-1 flex items-end">
                  <p className="text-lg font-bold">S/</p>
                  <p className="text-3xl font-semibold pt-3">
                    {`${Math.trunc(TgananciaSemanal || 0)}`}
                  </p>
                  <p className="text-sm font-semibold mx-0.5 pb-3">
                    {`.${(((TgananciaSemanal || 0) - Math.trunc(TgananciaSemanal || 0)) * 100).toLocaleString('en-US', {
                      minimumIntegerDigits: 2,
                      useGrouping: false,
                    })}`}
                  </p>
                </div>
                <p className="pl-4 sm:pl-6 pt-3 pr-4 pb-4 font-medium">
                  G. Semanal
                </p>
              </div>
              <div className="text-gray-900 opacity-30 w-16 absolute bottom-5 right-3">
                <IconGain />
              </div>
              <div className="bg-gray-900 opacity-20 rounded-b-lg w-full h-2 absolute bottom-0">
                {' '}
              </div>
            </div>
            <div className="flex relative w-full sm:w-1/2 bg-custom-blue-card text-white rounded-xl shadow">
              <div className="z-10">
                <div className="pl-4 sm:pl-6 pt-1 flex items-end">
                  <p className="text-lg font-bold">S/</p>
                  <p className="text-3xl font-semibold pt-3">
                    {`${Math.trunc(TgananciaMensual || 0)}`}
                  </p>
                  <p className="text-sm font-semibold mx-0.5 pb-3">
                    {`.${(((TgananciaMensual || 0) - Math.trunc(TgananciaMensual || 0)) * 100).toLocaleString('en-US', {
                      minimumIntegerDigits: 2,
                      useGrouping: false,
                    })}`}
                  </p>
                </div>
                <p className="pl-4 sm:pl-6 pt-3 pr-4 pb-4 font-medium">
                  G. Mensual
                </p>
              </div>
              <div className="text-gray-800 opacity-40 w-16 absolute bottom-5 right-3">
                <IconGain />
              </div>
              <div className="bg-gray-900 opacity-20 rounded-b-lg w-full h-2 absolute bottom-0">
                {' '}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row mb-4">
          <div className="w-full sm:w-1/2 bg-white rounded-xl shadow sm:mr-4 mb-4 sm:mb-0">
            <div className="border-b text-gray-800 font-semibold pl-4 p-2">
              Resumen de Ventas
            </div>
            <div className="p-3">
              <Doughnut
                data={{
                  labels: ['Pagados', 'Anulados'],
                  datasets: [
                    {
                      data: [
                        TotalPagado, TotalAnulado,
                      ],
                      // data: [
                      //   3, 1, 17,
                      //   8, 1,
                      // ],
                      backgroundColor: ['#10B981', '#EF4444'],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
                height={250}
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2 bg-white rounded-xl shadow">
            <div className="border-b text-gray-800 font-semibold pl-4 p-2">
              Pacientes por atender - Consultas
            </div>
            <div className="p-4 ">
              {dataDashboard === 'loading'
                ? (
                  <div className="flex items-center justify-center py-2">
                    <IconSpiner dark medium />
                  </div>
                )
                : pedidosLunas.length === 0
                  ? <div className="text-gray-600 italic">No hay Registro de Ventas</div>
                  : (
                    <table className="table-fixed text-center text-gray-700 w-full">
                      <thead>
                        <tr className="border-l border-r border-gray-400 bg-green-500 text-white">
                          <th className="border-r border-b border-gray-200 py-2 font-medium">Paciente</th>
                          <th className="border-r border-b border-gray-200 py-2 px-1.5 font-medium">Documento</th>
                          <th className="border-b border-gray-200 py-2 px-1.5 font-medium">Precio (S/)</th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {pedidosLunas.map((item) => (
                          <tr key={item.id}>
                            <td className="border border-gray-350 py-2 font-medium capitalize" > <ButtonPrimaryOnclick
            title={item.paciente.rz_social}
            onClick={() => handlePasarVenta(item.diotria_id.id)}></ButtonPrimaryOnclick></td>
                            <td className="border border-gray-350 py-2 font-medium text-sm whitespace-nowrap"><a href="#" class="no-underline hover:underline" onClick={() => { handlePasarVenta(item.diotria_id.id);}}>{item.paciente.documento}</a></td>
                            {/* <td className="text-sm border border-gray-350 py-2 font-medium">{`s/${item.finalAmount}`}</td> */}
                            <td className="border border-gray-350 py-2 font-medium"><a href="#" class="no-underline hover:underline" onClick={() => { handlePasarVenta(item.diotria_id.id);}}>{item.precio}</a></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
            </div>
            {/* <div className="p-4 ">
              {dataDashboard === 'loading'
                ? (
                  <div className="flex items-center justify-center py-2">
                    <IconSpiner dark medium />
                  </div>
                )
                : !Array.isArray(ultimasVentas[0]) || ultimasVentas[0].length === 0
                  ? <div className="text-gray-600 italic">No hay Registro de Ventas</div>
                  : (
                    <table className="table-fixed text-center text-gray-700 w-full">
                      <thead>
                        <tr className="border-l border-r border-gray-400 bg-green-500 text-white">
                          <th className="border-r border-b border-gray-200 py-2 font-medium">Tipo Comprobante</th>
                          <th className="border-r border-b border-gray-200 py-2 px-1.5 font-medium">N° Comprobante</th>
                          <th className="border-b border-gray-200 py-2 px-1.5 font-medium">Monto total (S/)</th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {ultimasVentas[0].map((item) => (
                          <tr key={item.id}>
                            <td className="border border-gray-350 py-2 font-medium capitalize">{item.tipo_comprobante}</td>
                            <td className="border border-gray-350 py-2 font-medium text-sm whitespace-nowrap">{item.comprobante}</td>
                            <td className="border border-gray-350 py-2 font-medium">{item.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
            </div> */}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row mb-4">
          {/* <div className="w-full sm:w-1/2 bg-white rounded-xl shadow sm:mr-4 mb-4 sm:mb-0">
            <div className="border-b text-gray-800 font-semibold pl-4 p-2">
              Ultimos 7 días
            </div>
            <div className="p-4 ">
              {dataDashboard === 'loading'
                ? (
                  <div className="flex items-center justify-center py-2">
                    <IconSpiner dark medium />
                  </div>
                )
                : !Array.isArray(masVendidos[0]) || masVendidos[0].length === 0
                  ? <div className="text-gray-600 italic">Sin Resultados</div>
                  : (
                    <table className="table-fixed text-center text-gray-700 w-full">
                      <thead>
                        <tr className="border-l border-r border-gray-400 bg-yellow-500 text-white">
                          <th className="border-r border-b border-gray-200 px-2 py-2 font-medium">Fecha</th>
                          <th className="border-b border-gray-200 px-2 py-2 font-medium">Monto Total (S/)</th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {masVendidos[0].map((item) => (
                          <tr key={item.id} className="text-sm">
                            <td className="capitalize border border-gray-350 px-2 py-2 font-medium capitalize-first">{dayjs(item.fecha_actualizacion).format('dddd - DD/MM/YYYY')}</td>
                            <td className="capitalize border border-gray-350 px-2 py-2 font-medium">
                              {item.asunto}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
            </div>
          </div> */}
          <div className="w-full bg-white rounded-xl shadow">
            <div className="border-b text-gray-800 font-semibold pl-4 p-2">
              Productos más vendidos
            </div>
            <div className="p-4 overflow-x-auto">
              {dataDashboard === 'loading'
                ? (
                  <div className="flex items-center justify-center py-2">
                    <IconSpiner dark medium />
                  </div>
                )
                : !Array.isArray(masVendidos) || masVendidos?.length === 0
                  ? <div className="text-gray-600 italic">No hay Registros</div>
                  : (
                    <table className="table-auto text-center text-gray-700 w-full">
                      <thead>
                        <tr className=" bg-primary text-white">
                          <th className="w-1/6 border-r border-b border-gray-200 font-medium px-2">Código</th>
                          <th className="w-1/3 border-r border-b border-gray-200 font-medium px-14">Producto</th>
                          <th className="py-2 border-r border-b border-gray-200 font-medium px-2">Stock</th>
                          <th className=" border-r border-b border-gray-200 font-medium px-3 whitespace-nowrap">
                            <p>Precio</p>
                            <p>Unid. (S/)</p>
                          </th>
                          <th className=" border-r border-b border-gray-200 font-medium px-3">
                            <p>Total</p>
                            <p className="whitespace-nowrap">Ventas (S/)</p>
                          </th>
                          <th className="border-b border-gray-200 font-medium px-2">Vendidos</th>
                          <th className="border-l border-gray-400 bg-white select-none sm:hidden">0</th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {masVendidos.map((item) => (
                          <tr key={item.codigo} className="text-sm">
                            <td className="border border-gray-350 px-2 py-2 font-medium whitespace-nowrap">{item?.codigo}</td>
                            <td className="border border-gray-350 px-2 font-medium">
                              {item?.descripcion}
                            </td>
                            <td className="border border-gray-350 py-2 font-medium">{item?.stock}</td>
                            <td className="border border-gray-350 py-2 font-medium">{item?.precio_sugerido}</td>
                            <td className="border border-gray-350 py-2 font-medium">{(item?.precio_sugerido * item.cantidad).toFixed(2)}</td>
                            <td className="border border-gray-350 py-1 font-medium">{item?.cantidad}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Home.propTypes = {
  dataDashboard: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]).isRequired,
};
export default withFetch(Home);
