/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import React, { useContext } from 'react';
import NumeroALetras from '../../../utils/numberToLetters';
import Context from '../../context/context';

let Logo;
try {
  Logo = require(`../../../assets/img/localLogo/${JSON.parse(localStorage.getItem('localData')).id}.png`).default;
} catch (error) {
  Logo = require('../../../assets/img/localLogo/default.png').default;
}

const PdfByHtml = () => {
  const { state: { localData, saleData } } = useContext(Context);
  return (
    <div
      // className="flex flex-col text-xs min-h-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: '0.75rem',
        lineHeight: '1rem',
        minHeight: '100vh',
      }}
    >
      {/* // HEADDER */}
      <div
        // className="flex items-center"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img src={Logo} alt="logo" className="w-36 mr-10 ml-4" />
        <div
          // className="flex w-full justify-between"
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <div className="flex flex-col space-y-2">
            <p className="font-semibold">{localData.businessName}</p>
            <p>{localData.address}</p>
            <p>{localData.city}</p>
            {localData?.phone && <p>{localData.phone}</p>}
            {localData?.email && <p>{localData.email}</p>}
          </div>
          <div className="flex flex-col space-y-2.5 font-semibold mr-7">
            <p>{`${saleData.tipoComprobante === 'boleta' ? 'BOLETA ELECTRÓNICA' : saleData.tipoComprobante === 'factura' ? 'FACTURA ELECTRÓNICA' : 'NOTA DE VENTA'} `}</p>
            {localData.RUC
              && (
                <div className="flex space-x-1">
                  <p className="uppercase">RUC:</p>
                  <p>{localData.RUC}</p>
                </div>
              )}
            <p>{saleData.numComprobante}</p>
          </div>
        </div>
      </div>

      {/* // LINE SEPARATOR */}
      <div className="mt-2 w-full border-b border-gray-900" />

      {/* <div className="flex flex-col bg-blue-500"> */}
      <div className="flex flex-col items-center m-7 h-full">
        {/* // SUB-HEADDER  - CLIENT DETAILS */}
        <div className="flex w-full justify-between">
          <div className="flex space-x-2.5">
            <div className="flex flex-col space-y-1">
              <p className="font-semibold">Cliente:</p>
              <p className="font-semibold uppercase">{`${saleData.clientTypeDoc}:`}</p>
              <p className="font-semibold">Direccion:</p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="">{saleData.client}</p>
              <p className="">{saleData.clientDoc}</p>
              <p className="">{saleData.clientAddress}</p>
            </div>
          </div>
          <div className="flex space-x-2.5">
            <div className="flex flex-col space-y-1">
              <p className="font-semibold">Fecha Emisión:</p>
              <p className="font-semibold capitalize">{`N° ${saleData.tipoComprobante}:`}</p>
              <p className="font-semibold">Moneda:</p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="">{saleData.date}</p>
              <p className="">{saleData.numComprobante}</p>
              <p className="">Soles</p>
            </div>
          </div>
        </div>

        {/* // BODY - PRODUCT LIST */}
        <div className="flex flex-col w-full mt-4">
          <div className="grid grid-cols-products font-semibold my-1">
            <div className=" ">ITEM</div>
            <div className="">DESCRIPCION</div>
            <div className=" ">CANT</div>
            {/* <div className="">UND</div> */}
            <div className="text-right whitespace-nowrap">PRE UNIT</div>
            <div className="text-right">TOTAL</div>
          </div>
          {Array.isArray(saleData.products)
            && saleData.products.map((item) => (
              <div key={item.cod} className="grid grid-cols-products  my-1">
                <div className=" ">{item.cod}</div>
                <div className="font-semibold">{item.product}</div>
                <div className=" ">{item.cant}</div>
                {/* <div className="">PZA</div> */}
                <div className="text-right whitespace-nowrap">{(+item.price).toFixed(2)}</div>
                <div className="text-right">{(item.price * item.cant).toFixed(2)}</div>
              </div>
            ))}
        </div>
      </div>

      {/* <div> */}
      {/* // LINE SEPARATOR */}
      <div className="w-full border-b border-gray-900 mt-auto" />

      {/* // FOOTTER */}
      <div className="flex w-full px-7 pt-4 pb-10">
        <div className="flex flex-col w-2/3">
          <div className="flex  my-1">
            <div className="font-semibold pr-1">ESTADO:</div>
            <div className=" ">Pagado</div>
          </div>
          <div className="flex my-1">
            <div className="font-semibold pr-1">TIPO DE PAGO:</div>
            <div className=" ">{saleData.payType}</div>
          </div>
          <div className="flex my-1">
            <div className=" font-semibold pr-1">SON:</div>
            <div className=" ">
              {NumeroALetras(+saleData.amount)}
            </div>
          </div>
          {localData.slogan
            && (
              <div className="flex my-1">
                <div className="font-semibold pr-1 capitalize-first">{localData.slogan}</div>
              </div>
            )}
        </div>
        <div className="flex w-1/3 ">
          <div className="flex flex-col w-full">
            <div className="font-semibold my-1 pr-1 whitespace-nowrap">SUB TOTAL:</div>
            <div className="font-semibold my-1 pr-1">IGV:</div>
            <div className="font-semibold my-1 pr-1">TOTAL:</div>
          </div>
          <div className="flex flex-col w-full text-right ">
            <div className="font-semibold my-1 pr-1">{(saleData.amount / 1.18).toFixed(2)}</div>
            <div className="font-semibold my-1 pr-1">{((saleData.amount * 0.18) / 1.18).toFixed(2)}</div>
            <div className="font-semibold my-1 pr-1">{(+saleData.amount).toFixed(2)}</div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default PdfByHtml;
