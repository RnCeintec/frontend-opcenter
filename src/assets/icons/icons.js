import PropTypes from 'prop-types';

export const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export const IconUserCircle = ({ borderWhite, borderRed, autosize }) => (
  <div className={`p-0.5 rounded-full border-2 ${borderWhite ? "border-white" : borderRed ? "border-red-500" : "border-gray-600"} `}>
    <svg xmlns="http://www.w3.org/2000/svg" className={autosize ? "" : "h-4 w-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  </div>
);

export const IconNotificacion = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

export const IconLock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);
export const IconUnLock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
  </svg>
);

export const IconSpiner = ({
  medium, big, dark, primary, mini
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`animate-spin
      ${mini ? '' : '-ml-1 mr-2'}  
      ${mini ? 'h-4 w-4' : medium ? 'h-12 w-12' : big ? 'h-24 w-24' : 'h-5 w-5'}
      ${dark ? 'text-gray-500' : primary ? 'text-primary' : 'text-white'}`}
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

export const IconSave = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 1 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

export const IconDelete = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const IconComputer = ({ autosize }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={autosize ? '' : 'h-6 w-6'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export const IconDashboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export const IconDashboardSolid = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
  </svg>
);

export const IconSales = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const IconSalesSolid = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  </svg>
);

export const IconUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const IconUsersSolid = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
  </svg>
);

export const IconTickets = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
  </svg>
);

export const IconTicketsSolid = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
  </svg>
);

export const IconMenu = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const IconClose = ({ autosize }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={autosize ? "" : "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const IconPrev = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
  </svg>
);

export const IconNext = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
  </svg>
);

export const IconFirst = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
  </svg>
);

export const IconLast = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
  </svg>
);

export const IconSearch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

export const IconSelect = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

export const IconMinus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M18 12H6" />
  </svg>
);

export const IconPlus = ({ autosize }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={autosize ? "" : "h-7 w-7"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

export const IconRefresh = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

export const IconFilter = ({ autosize }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={autosize ? '' : 'h-5 w-5'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

export const IconExcel = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 26 26">
    <path d="M 15 0 L 0 2.875 L 0 23.125 L 15 26 Z M 16 3 L 16 5.96875 L 19.03125 5.96875 L 19.03125 8 L 16 8 L 16 10 L 19 10 L 19 12 L 16 12 L 16 14 L 19 14 L 19 16 L 16 16 L 16 18 L 19 18 L 19 20 L 16 20 L 16 23 L 25.15625 23 C 25.617188 23 26 22.605469 26 22.125 L 26 3.875 C 26 3.394531 25.617188 3 25.15625 3 Z M 20 6 L 24 6 L 24 8 L 20 8 Z M 3.09375 7.9375 L 5.84375 7.9375 L 7.3125 11 C 7.425781 11.238281 7.535156 11.515625 7.625 11.84375 C 7.683594 11.644531 7.8125 11.359375 7.96875 10.96875 L 9.5625 7.9375 L 12.09375 7.9375 L 9.0625 12.96875 L 12.1875 18.09375 L 9.5 18.09375 L 7.75 14.78125 C 7.683594 14.660156 7.601563 14.421875 7.53125 14.09375 L 7.5 14.09375 C 7.46875 14.25 7.402344 14.496094 7.28125 14.8125 L 5.53125 18.09375 L 2.8125 18.09375 L 6.03125 13.03125 Z M 20 10 L 24 10 L 24 12 L 20 12 Z M 20 14 L 24 14 L 24 16 L 20 16 Z M 20 18 L 24 18 L 24 20 L 20 20 Z" />
  </svg>
);

export const IconClip = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform -rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
  </svg>
);

export const IconArrowBack = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
  </svg>
);

export const IconSend = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 -mt-1.5 transform rotate-45" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
  </svg>
);

export const IconTag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);

export const IconAdmin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
  </svg>
);

export const IconAdminSolid = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
  </svg>
);

export const IconResume = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
  </svg>
);

export const IconPencil = ({ autosize }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={autosize ? '' : 'h-5 w-5'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

export const IconTime = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

export const IconLink = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

export const IconCopy = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

export const IconIdCard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 576 512">
    <path d="M528 32H48C21.5 32 0 53.5 0 80v16h576V80c0-26.5-21.5-48-48-48zM0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V128H0v304zm352-232c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zm0 64c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zm0 64c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zM176 192c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zM67.1 396.2C75.5 370.5 99.6 352 128 352h8.2c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h8.2c28.4 0 52.5 18.5 60.9 44.2 3.2 9.9-5.2 19.8-15.6 19.8H82.7c-10.4 0-18.8-10-15.6-19.8z" />
  </svg>
);

export const IconUserSale = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 448 512" fill="currentColor">
    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
  </svg>
);

export const IconKey = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

export const IconImage = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const IconUpload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

export const IconAlert = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

export const IconCheck = ({ autosize }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={autosize ? '' : 'w-4 h-4'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
  </svg>
);

export const IconInfo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
);

export const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
  </svg>
);

export const IconBug = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 512 512" fill="currentColor">
    <path d="M511.988 288.9c-.478 17.43-15.217 31.1-32.653 31.1H424v16c0 21.864-4.882 42.584-13.6 61.145l60.228 60.228c12.496 12.497 12.496 32.758 0 45.255-12.498 12.497-32.759 12.496-45.256 0l-54.736-54.736C345.886 467.965 314.351 480 280 480V236c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v244c-34.351 0-65.886-12.035-90.636-32.108l-54.736 54.736c-12.498 12.497-32.759 12.496-45.256 0-12.496-12.497-12.496-32.758 0-45.255l60.228-60.228C92.882 378.584 88 357.864 88 336v-16H32.666C15.23 320 .491 306.33.013 288.9-.484 270.816 14.028 256 32 256h56v-58.745l-46.628-46.628c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0L141.255 160h229.489l54.627-54.627c12.498-12.497 32.758-12.497 45.256 0 12.496 12.497 12.496 32.758 0 45.255L424 197.255V256h56c17.972 0 32.484 14.816 31.988 32.9zM257 0c-61.856 0-112 50.144-112 112h224C369 50.144 318.856 0 257 0z" />
  </svg>
);

export const IconDownload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
)

export const IconExtraService = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" className="w-6 text-gray-700" fill='currentColor' >
    <path stroke='currentColor' d="M400.5,66A334.6,334.6,0,0,1,530.68,708.74,334.6,334.6,0,0,1,270.32,92.26,332.45,332.45,0,0,1,400.5,66m0-61C182.07,5,5,182.07,5,400.5S182.07,796,400.5,796,796,618.93,796,400.5,618.93,5,400.5,5Z" />
    <path stroke='currentColor' d="M277,467H241a29.09,29.09,0,0,0-29,29V596a29.09,29.09,0,0,0,29,29h36a29.09,29.09,0,0,0,29-29V496a29.09,29.09,0,0,0-29-29Z" />
    <path stroke='currentColor' d="M416,410H380a29.09,29.09,0,0,0-29,29V599a29.09,29.09,0,0,0,29,29h36a29.09,29.09,0,0,0,29-29V439a29.09,29.09,0,0,0-29-29Z" />
    <path stroke='currentColor' d="M557,347H521a29.09,29.09,0,0,0-29,29V599a29.09,29.09,0,0,0,29,29h36a29.09,29.09,0,0,0,29-29V376a29.09,29.09,0,0,0-29-29Z" />
    <path fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='61px' d="M181.5,383.5s61-8,149-54c98.69-51.59,147-103,147-103" />
    <polygon points="555.5 164.5 384.5 192.5 494.5 327.5 555.5 164.5 555.5 164.5" />
  </svg>
)

export const IconPhone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

export const IconEmail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

export const IconProduct = ({ autosize }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className={autosize ? "" : "w-5"}>
    <path fill="currentColor" d="M576 216v16c0 13.255-10.745 24-24 24h-8l-26.113 182.788C514.509 462.435 494.257 480 470.37 480H105.63c-23.887 0-44.139-17.565-47.518-41.212L32 256h-8c-13.255 0-24-10.745-24-24v-16c0-13.255 10.745-24 24-24h67.341l106.78-146.821c10.395-14.292 30.407-17.453 44.701-7.058 14.293 10.395 17.453 30.408 7.058 44.701L170.477 192h235.046L326.12 82.821c-10.395-14.292-7.234-34.306 7.059-44.701 14.291-10.395 34.306-7.235 44.701 7.058L484.659 192H552c13.255 0 24 10.745 24 24zM312 392V280c0-13.255-10.745-24-24-24s-24 10.745-24 24v112c0 13.255 10.745 24 24 24s24-10.745 24-24zm112 0V280c0-13.255-10.745-24-24-24s-24 10.745-24 24v112c0 13.255 10.745 24 24 24s24-10.745 24-24zm-224 0V280c0-13.255-10.745-24-24-24s-24 10.745-24 24v112c0 13.255 10.745 24 24 24s24-10.745 24-24z">
    </path>
  </svg>
);

export const IconCategory = ({ autosize }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className={autosize ? "" : "w-5"}>
    <path fill="currentColor" d="M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a48 48 0 0 0 14.059 33.941l211.882 211.882c18.744 18.745 49.136 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM112 160c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm513.941 133.823L421.823 497.941c-18.745 18.745-49.137 18.745-67.882 0l-.36-.36L527.64 323.522c16.999-16.999 26.36-39.6 26.36-63.64s-9.362-46.641-26.36-63.64L331.397 0h48.721a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882z">
    </path>
  </svg>
);

export const IconNewCategory = ({ autosize }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor" className={autosize ? "" : "w-5"} >
    <path d="M492.49,291.89,287.38,84.74A46.23,46.23,0,0,0,254.52,71H56.93c-25.66,0-46.46,21-46.46,46.93V317.48a47.21,47.21,0,0,0,13.61,33.19l38,38.4c1.48-.11,3-.16,4.48-.16h33V354.65c0-36.6,29.5-66.37,65.76-66.37s65.76,29.77,65.76,66.37v34.26h33c36.27,0,65.77,29.77,65.77,66.37s-29.5,66.38-65.77,66.38h-33v34.25c0,1.22,0,2.44-.1,3.65a46.11,46.11,0,0,0,63.88-1.74l197.6-199.56A47.27,47.27,0,0,0,492.49,291.89Zm-373.6-42.45c-25.66,0-46.47-21-46.47-46.92s20.81-46.94,46.47-46.94,46.46,21,46.46,46.94S144.55,249.44,118.89,249.44ZM616.4,291.89,411.29,84.74A46.23,46.23,0,0,0,378.44,71H331.27l190,191.86a88.62,88.62,0,0,1,0,124.45L352.74,557.47l.35.35a46.15,46.15,0,0,0,65.72,0L616.4,358.26A47.29,47.29,0,0,0,616.4,291.89Z" />
    <path d="M296.9,455.28c0,18.44-14.67,33.38-32.77,33.38h-66v67.25c0,18.43-14.66,33.38-32.76,33.38s-32.76-14.95-32.76-33.38V488.66h-66c-18.1,0-32.76-14.94-32.76-33.38s14.66-33.37,32.76-33.37h66V354.65c0-18.43,14.67-33.37,32.76-33.37s32.76,14.94,32.76,33.37v67.26h66C282.23,421.91,296.9,436.84,296.9,455.28Z" />
  </svg>
)

export const IconNewClient = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
)

export const IconLogOut = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" className="" fill="currentColor">
    <path d="M643.5,203.3v-102A36.32,36.32,0,0,0,607.21,65H190.79a36.32,36.32,0,0,0-36.29,36.28V699.69A36.34,36.34,0,0,0,190.79,736H607.21a36.34,36.34,0,0,0,36.29-36.29V597.64l56-56V699.69A92.4,92.4,0,0,1,607.21,792H190.79A92.4,92.4,0,0,1,98.5,699.69V101.26A92.38,92.38,0,0,1,190.79,9H607.21a92.38,92.38,0,0,1,92.29,92.28V259.31Z" />
    <path d="M713.45,421.62l-70,69.95L535.06,600a29.26,29.26,0,0,1-20.93,8.83c-15.38,0-30.13-12-30.13-30V491.07H304.5a31.6,31.6,0,0,1-31.5-31.5v-116a31.59,31.59,0,0,1,31.5-31.5H484v-90c0-18,14.75-30,30.13-30a29.29,29.29,0,0,1,20.93,8.82L643.5,309.37l70,69.95A29.91,29.91,0,0,1,713.45,421.62Z" />
  </svg>
)

export const IconProductCode = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="currentColor" className="">
    <path d="M139,128.6v542.7c0,14.2-11.5,25.6-25.6,25.6H83.8c-14.2,0-25.6-11.5-25.6-25.6V128.6c0-14.2,11.5-25.6,25.6-25.6h29.5
	C127.5,103,139,114.5,139,128.6z" />
    <path d="M209.2,128.6v542.7c0,14.2-11.5,25.6-25.6,25.6s-25.6-11.5-25.6-25.6V128.6c0-14.2,11.5-25.6,25.6-25.6
	c7.1,0,13.5,2.9,18.1,7.5C206.3,115.2,209.2,121.6,209.2,128.6z" />
    <path d="M314.3,239.1c-9.1,21.6-13.7,44.4-13.7,68c0,23.6,4.6,46.5,13.7,68c8.8,20.8,21.4,39.5,37.4,55.5
	c6.3,6.3,13.1,12.1,20.2,17.4v223.3c0,14.2-11.5,25.6-25.6,25.6H279c-14.2,0-25.6-11.5-25.6-25.6V128.6c0-14.2,11.5-25.6,25.6-25.6
	h67.3c14.2,0,25.6,11.5,25.6,25.6v37.6c-7.1,5.2-13.9,11-20.2,17.4C335.7,199.6,323.1,218.3,314.3,239.1z" />
    <path d="M497.9,128.6v5.2c-7.4-1-15-1.4-22.6-1.4c-22.3,0-44,4.1-64.5,12.3v-16.1c0-14.2,11.5-25.6,25.6-25.6h35.8
	C486.4,103,497.9,114.5,497.9,128.6z" />
    <path d="M497.9,480.4v190.9c0,14.2-11.5,25.6-25.6,25.6h-35.8c-14.2,0-25.6-11.5-25.6-25.6V469.5c20.5,8.2,42.2,12.3,64.5,12.3
	C482.9,481.9,490.5,481.4,497.9,480.4z" />
    <path d="M580.7,128.6v39c-11.5-8.7-23.9-15.9-37.3-21.5c-4.6-1.9-9.3-3.7-14-5.2v-12.3c0-14.2,11.5-25.6,25.6-25.6
	c7.1,0,13.5,2.9,18.1,7.5C577.8,115.2,580.7,121.6,580.7,128.6z" />
    <path d="M580.7,493.3v178.1c0,14.2-11.5,25.6-25.6,25.6s-25.6-11.5-25.6-25.6v-198c1.7-0.6,3.5-1.1,5.2-1.8
	c10.9-3.9,21.2-8.9,31-14.8l7.3,7.3C572.9,474.3,575.6,484.4,580.7,493.3z" />
    <path d="M738.1,128.6V486l-63.9-63.9c-11.2-11.2-26-17.3-41.9-17.4l-7.3-7.3c5.9-9.8,10.9-20.2,14.8-31c6.8-19,10.3-38.9,10.3-59.2
	c0-23.6-4.6-46.5-13.7-68c-3.5-8.4-7.7-16.5-12.5-24.1v-86.3c0-14.2,11.5-25.6,25.6-25.6h63C726.6,103,738.1,114.5,738.1,128.6z" />
    <path d="M707.3,623c8.5,8.5,19.2,14.1,30.8,16.3v32.1c0,14.2-11.5,25.6-25.6,25.6h-63c-14.2,0-25.6-11.5-25.6-25.6V539.5L707.3,623z
	" />
    <g>
      <path d="M772.6,557.7l-34.5-34.5l-82.5-82.5c-6.5-6.5-14.9-9.7-23.4-9.7c-2.8,0-5.7,0.4-8.4,1.1c-0.3,0.1-0.7,0.2-1,0.3l-31.9-31.9
		c20.6-25.5,33-57.9,33-93.3c0-40.8-16.5-77.8-43.2-104.7c-14.4-14.5-31.9-26.1-51.3-33.7c-10-3.9-20.5-6.8-31.5-8.4
		c-7.4-1.1-14.9-1.7-22.6-1.7c-23.1,0-45,5.3-64.5,14.7c-14.4,7-27.5,16.2-38.8,27.2c-27.8,27-45.1,64.8-45.1,106.6
		s17.3,79.6,45.1,106.6c11.3,11,24.4,20.2,38.8,27.2c19.5,9.4,41.4,14.7,64.5,14.7c7.7,0,15.2-0.6,22.6-1.7
		c10.9-1.7,21.5-4.5,31.5-8.4c14.3-5.6,27.5-13.3,39.2-22.8l12,12l19.9,19.9c-3.3,11.2-0.6,23.9,8.3,32.8l117,117
		c3.6,3.6,7.7,6.1,12.2,7.7c3.6,1.3,7.4,1.9,11.2,1.9c8.5,0,16.9-3.2,23.4-9.7C785.5,591.5,785.5,570.6,772.6,557.7z M580.7,347.7
		c-5.6,14.5-14.2,27.8-25.6,39.2c-7.7,7.7-16.4,14.2-25.7,19.3c-9.8,5.4-20.4,9.3-31.5,11.5c-7.3,1.5-14.9,2.3-22.6,2.3
		c-23.4,0-45.7-7.1-64.5-20.3c-5.4-3.8-10.5-8-15.2-12.8c-10.1-10.1-18-21.7-23.6-34.4c-6.2-14.1-9.4-29.5-9.4-45.3
		c0-15.9,3.3-31.2,9.4-45.3c5.6-12.7,13.5-24.4,23.6-34.4c4.7-4.7,9.8-9,15.2-12.8c18.8-13.2,41.1-20.3,64.5-20.3
		c7.7,0,15.2,0.8,22.6,2.3c11.1,2.2,21.6,6.1,31.5,11.5c9.3,5.1,18,11.6,25.7,19.3c11.3,11.3,20,24.7,25.6,39.2
		c4.9,12.8,7.5,26.5,7.5,40.6C588.2,321.2,585.6,334.9,580.7,347.7z" />
    </g>
  </svg>
)

export const IconStock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" className="" fill="currentColor">
    <path d="M751.22,170.93l-.88-.42L406.26,8.44a12.38,12.38,0,0,0-10.57,0L51.63,170.5l-.91.43a12.45,12.45,0,0,0-7.11,11.25v440a12.45,12.45,0,0,0,7.12,11.22L383.07,790l11.83,5.56a12.38,12.38,0,0,0,10.55,0l14-6.58L751.22,632.7a12.46,12.46,0,0,0,7.11-11.22V182.18A12.44,12.44,0,0,0,751.22,170.93ZM376.74,373.24V733.35a0,0,0,0,1-.07,0l-284.56-134a.09.09,0,0,1,0-.05V239.21a.05.05,0,0,1,.07-.05l284.56,134A0,0,0,0,1,376.74,373.24Zm-53-277.37L401,59.53h0L690.11,195.7s0,.07,0,.09L613.22,232h0L323.77,96A0,0,0,0,1,323.77,95.87Zm102.06,277,90.35-42.55a0,0,0,0,1,.07,0V456.29c0,6.88,5.4,12.81,12.29,12.88a12.23,12.23,0,0,0,9.11-3.88l43.7-46.12s0,0,0,0l46.51,4.89a11.33,11.33,0,0,0,1.3.07,12.41,12.41,0,0,0,12.4-12.4V271.31s0,0,0,0l68.17-32.11a.05.05,0,0,1,.07.05V598.57a.05.05,0,0,1,0,0l-284,133.77s-.07,0-.07,0V373A.08.08,0,0,1,425.83,372.91Zm60.75-81.24L401,332h0L111.84,195.79s0-.08,0-.09l85.26-40.17h0l289.44,136A0,0,0,0,1,486.58,291.67Z" />
  </svg>
)

export const IconBilling = ({ autosize }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className={autosize ? "" : "w-4"} fill="currentColor">
    <g>
      <path d="M224,136V0H49.5C22.2,0,0,22.2,0,49.5v413C0,489.8,22.2,512,49.5,512h285c27.3,0,49.5-22.2,49.5-49.5V160H248
		C234.8,160,224,149.2,224,136z M40.8,75.8c0-8.1,6.6-14.6,14.6-14.6h109c8.1,0,14.6,6.6,14.6,14.6v8.1c0,8.1-6.6,14.6-14.6,14.6
		h-109c-8.1,0-14.6-6.6-14.6-14.6V75.8z M40.7,148V140c0-8.1,6.6-14.6,14.6-14.6h109c8.1,0,14.6,6.6,14.6,14.6v8.1
		c0,8.1-6.6,14.6-14.6,14.6h-109C47.2,162.7,40.7,156.1,40.7,148z M181.6,406c-11.5,8.4-27.2,12.8-45.3,12.8
		c-32.5,0-53.8-11.8-65.2-36c-2.4-5.1-0.5-11.2,4.2-13.9l13.3-7.5c2.3-1.3,4.9-1.6,7.3-0.9c2.6,0.7,4.7,2.5,6.1,4.9
		c6.2,11.2,18.8,17.7,34.7,17.7c8.7,0,28.9-1.9,28.9-19.2c0-6.6-3.1-15.7-29.7-18.8c-30.2-3.9-61.1-13.2-61.1-52.3
		c0-34.6,30.5-50.3,60.8-50.6c27,0,47.1,9.7,58.1,27.9c1.5,2.5,1.9,5.5,1.1,8.3c-0.7,2.7-2.5,5.1-4.9,6.4l-12.6,7.1
		c-4.1,2.3-9.2,1.3-12.3-2.4c-5.1-6.1-15.9-12.3-28.5-12.3c-16,0-25.6,6.2-25.6,16.5c0,8.4,8,12.8,28.5,15.4
		c14.2,1.9,30.3,5,42.6,13.3c13.4,9.1,19.9,22.7,19.9,41.5C201.9,381.8,194.9,396.3,181.6,406z M270.8,419.1
		c-5.1,0-9.8-1.7-13.4-4.9c-4.1-3.6-6.2-8.6-6.2-14.6c0-12.8,9.9-19.4,19.6-19.4c9.7,0,19.6,6.7,19.6,19.4S280.6,419.1,270.8,419.1z
		 M269.5,238h16.9c2.6,0,5,1.3,6.4,3.4s1.8,4.8,1,7.2l-65.3,180.7c-1.1,3.1-4.1,5.2-7.4,5.2h-16.7c-2.6,0-5-1.3-6.4-3.3
		c-1.5-2.1-1.8-4.8-1-7.2l65.1-180.7C263.2,240.1,266.2,238,269.5,238z"/>
      <path d="M377,105L279.1,7c-4.5-4.5-10.6-7-17-7H256v113.9c0,7.8,6.3,14.1,14.1,14.1H384v-6.1C384,115.6,381.5,109.5,377,105z" />
    </g>
  </svg>
)

export const IconGain = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="" fill="currentColor">
    <g>
      <path d="M569,332c-1.1-1.4-2.4-2.7-3.7-3.9h0c-11.8-10.7-30.2-10-42.6,0L430.3,402c-11.3,9.1-25.5,14-40,14H269.1
		c-3.4,0-6.7-1.6-8.8-4.3c-10-13.2-0.8-27.7,11.7-27.7h78.3c15.9,0,30.7-10.9,33.2-26.6c0.3-1.8,0.5-3.6,0.5-5.5
		c0-17.6-14.4-31.9-32-31.9H192c-27,0-53.1,9.3-74.1,26.3L71.4,384c0,0,0,0,0,0H26.6C11.9,384,0,395.9,0,410.6v74.9
		C0,500.1,11.9,512,26.6,512h346.2c14.5,0,28.6-4.9,40-14L564,377C577.8,366,580,345.8,569,332z"/>
      <path d="M223.1,255.3c25.4,0,47.3-6.2,63.4-17.9c18.5-13.5,28.3-33.8,28.3-58.8c0-26.4-9.1-45.4-27.8-58.1
		c-17.2-11.7-39.8-15.9-59.6-18.6c-28.7-3.7-39.8-9.8-39.8-21.5c0-14.4,13.4-23.1,35.8-23.1c17.7,0,32.8,8.6,39.9,17.2
		c4.3,5.2,11.4,6.6,17.2,3.4l17.7-9.9c3.4-1.9,5.9-5.2,6.9-9c1-3.9,0.5-8.2-1.6-11.6C288.1,21.9,260,8.4,222.2,8.4
		c-42.3,0.4-85,22.4-85,70.7c0,54.8,43.2,67.7,85.5,73.2c37.2,4.3,41.5,17.1,41.5,26.3c0,24.2-28.3,26.9-40.5,26.9
		c-22.2,0-39.9-9-48.5-24.7c-1.9-3.4-4.9-5.8-8.5-6.9c-3.5-1-7.1-0.5-10.2,1.2l-18.6,10.5c-6.6,3.7-9.2,12.2-5.9,19.4
		C147.8,238.8,177.6,255.3,223.1,255.3z"/>
      <path d="M309.4,272.6c2.1,2.9,5.4,4.7,9,4.7h23.4c4.6,0,8.8-2.9,10.4-7.3l91.3-252.8c1.2-3.4,0.7-7.1-1.3-10.1
		c-2.1-2.9-5.4-4.7-9-4.7h-23.7c-4.6,0-8.8,2.9-10.4,7.3l-91,252.8C306.8,265.9,307.3,269.7,309.4,272.6z"/>
      <path d="M383.9,228.6c0,8.3,3,15.4,8.7,20.4c5,4.4,11.6,6.8,18.7,6.8c13.6,0,27.4-9.3,27.4-27.2s-13.8-27.2-27.4-27.2
		S383.9,210.7,383.9,228.6z"/>
    </g>
  </svg>
)

export const IconHosting = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" className="w-5 h-5" fill="currentColor">
    <rect x="98.8" y="615.38" width="602.41" height="130.62" rx="12" transform="translate(800 1361.38) rotate(-180)" />
    <circle fill="#fff" cx="637.43" cy="680.69" r="22.28" />
    <circle fill="#fff" cx="551.37" cy="680.69" r="22.28" />
    <circle fill="#fff" cx="465.31" cy="680.69" r="22.28" />
    <circle fill="#fff" cx="162.57" cy="680.69" r="22.28" />
    <rect x="98.8" y="443.26" width="602.41" height="130.62" rx="12" transform="translate(800 1017.14) rotate(-180)" />
    <circle fill="#fff" cx="637.43" cy="508.57" r="22.28" />
    <circle fill="#fff" cx="551.37" cy="508.57" r="22.28" />
    <circle fill="#fff" cx="465.31" cy="508.57" r="22.28" />
    <circle fill="#fff" cx="162.57" cy="508.57" r="22.28" />
    <path d="M98.8,288.05v93.74a18.5,18.5,0,0,0,18.44,18.44H682.76a18.5,18.5,0,0,0,18.44-18.44V288.05L614.56,67s0,0,0,0A18.5,18.5,0,0,0,596.7,53.14H203.3A18.5,18.5,0,0,0,185.45,67Z" />
    <circle fill="#fff" cx="637.43" cy="334.92" r="22.28" />
    <circle fill="#fff" cx="551.37" cy="334.92" r="22.28" />
    <circle fill="#fff" cx="465.31" cy="334.92" r="22.28" />
    <circle fill="#fff" cx="162.57" cy="334.92" r="22.28" />
  </svg>
)

export const IconDomain = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 800 800" className="w-5" fill="currentColor" >
    <path d="M381,768.1c-14.9-1.9-30-3-44.8-5.7c-86.7-15.6-158.7-57.3-216.2-123.7c-31.2-36.1-54-77.1-69.2-122.3
	c-0.2-0.6-0.1-1.4-0.2-2.9c14.4,0,28.8,1,43-0.3c12.4-1.1,18.4,2.8,23,14.6c5.8,15,14.7,28.9,21.7,42.1c20.8,0,39.9,0,59.3,0
	c-4.6-19-9-37.2-13.5-56.1c20,0,38.9,0,57.9,0c4.6,16,9.5,32,13.7,48.1c1.6,6.1,4.2,8.1,10.7,8.1c88.9-0.2,177.8-0.2,266.6,0
	c6,0,8.9-1.4,10.4-7.5c4.2-16.2,9.1-32.1,13.9-48.6c18.8,0,37.8,0,58,0c-4.5,18.7-8.9,37-13.5,56c15.4,0,30.6-1,45.5,0.3
	c10.5,1,16-2.6,20.2-11.6c6.2-13.5,13-26.6,19.9-39.8c1.1-2.2,3.7-5.1,5.6-5.1c18.4-0.4,36.8-0.2,56.7-0.2c-3.8,10.3-7,20-10.9,29.2
	c-30.4,70.6-77.8,127-142.7,168.4c-46.9,29.9-98.1,48.2-153.6,54.3c-8.1,0.9-16.1,1.8-24.2,2.8C405.9,768.1,393.5,768.1,381,768.1z
	 M286.6,627.2c0,0.9-0.2,1.5,0,1.8c16.5,27.7,36.4,52.4,64.8,68.7c28.4,16.2,57.8,18.5,88,4.4c28.3-13.3,48.4-35.4,65.7-60.6
	c3-4.4,5.6-9.1,8.8-14.3C437.3,627.2,362,627.2,286.6,627.2z M557.4,667c0.4,0.5,0.8,1.1,1.2,1.6c17.5-13.1,35.1-26.2,52.6-39.3
	c-0.4-0.8-0.8-1.6-1.2-2.5c-9.4,0-18.9-0.2-28.3,0.2c-1.6,0.1-3.6,2-4.5,3.6C570.6,642.7,564,654.8,557.4,667z M189.4,626.8
	c-0.3,0.9-0.7,1.8-1,2.7c17.4,13,34.9,26,52.3,38.9c0.4-0.5,0.8-1.1,1.3-1.6c-6.8-12.5-13.5-25-20.4-37.4c-0.7-1.2-2.5-2.4-3.8-2.5
	C208.3,626.7,198.8,626.8,189.4,626.8z"/>
    <path d="M242.1,286.4c-18.9,0-38,0-58,0c4.5-18.9,8.9-37.1,13.5-56c-16.3,0-32.2,0.9-47.8-0.4c-8.8-0.7-12.9,2.4-16.3,9.4
	c-6.9,14.2-14.1,28.2-21.4,42.2c-1.1,2.1-3.7,4.9-5.7,4.9c-18.4,0.4-36.8,0.2-55.4,0.2C84,170.3,208.1,35,394.9,32.3
	c181.4-2.6,315.4,124.4,353.8,254.5c-18.8,0-37.5,0.2-56.1-0.2c-1.9,0-4.2-3.2-5.4-5.4c-8.2-15.4-16.2-30.9-24.1-46.4
	c-2-3.9-4.3-4.8-8.9-4.6c-14.6,0.7-29.2,0.3-43.8,0.3c-2.6,0-5.2,0-8.5,0c4.6,18.9,9,37.1,13.5,56c-19.9,0-39,0-58,0
	c-4.8-16.6-9.7-33-14.2-49.6c-1.4-5.2-3.9-6.5-9-6.5c-89.6,0.2-179.2,0.2-268.8,0c-5.6,0-8,1.8-9.4,7
	C251.7,253.6,246.8,269.8,242.1,286.4z M514.1,173.1c-17.6-29.6-37.9-54.8-67.1-71.2c-28.8-16.1-58.5-17.7-88.7-2.9
	c-20.9,10.2-37.6,25.4-51.8,43.5c-7.5,9.5-14,19.6-21.9,30.7C362,173.1,437.4,173.1,514.1,173.1z M612.2,173.4
	c-17.8-16.6-35.3-29.8-55.5-41.5c7.4,13.5,13.9,25.7,20.6,37.8c0.8,1.5,2.5,3.5,3.9,3.6C590.8,173.5,600.5,173.4,612.2,173.4z
	 M188.3,170.9c0.4,0.9,0.8,1.7,1.3,2.6c9,0,18.1,0.1,27.1-0.1c1.5,0,3.7-0.6,4.3-1.7c7.1-12.7,14-25.6,21-38.4
	c-0.5-0.5-0.9-1-1.4-1.5C223.1,144.8,205.7,157.9,188.3,170.9z"/>
    <path d="M606,412c9.2-21.2,18.2-41.1,26.4-61.2c3.2-7.9,7.9-10.8,16.3-10.7c25.4,0.5,20.7-1.8,30,19.9c7.1,16.4,14,33,21.5,50.7
	c1.3-2.8,2.1-4.5,2.8-6.2c7.3-18.7,14.6-37.4,21.6-56.3c2.1-5.5,5.6-8,11.3-8c7.7,0.1,15.3-0.3,23,0.2c7.7,0.4,10.2,4.6,7.1,11.7
	c-14.9,34-29.9,67.9-44.8,101.8c-2.1,4.7-5.3,7.1-10.5,7.1c-6-0.1-12-0.3-18,0.1c-7,0.4-11-2.4-13.7-8.9
	c-8.3-19.8-17.1-39.4-26.2-60.2c-1.4,3-2.4,5-3.4,7.1c-8.3,18-16.7,36-24.8,54.2c-2.3,5.2-5.7,8-11.5,7.8
	c-6.7-0.2-13.4-0.1-20.1-0.1c-4.8,0-8-2.2-9.9-6.8c-14-34.1-28.1-68.1-42-102.2c-2.9-7.1-0.3-11.2,7.4-11.6
	c8.1-0.4,16.3-0.1,24.4-0.1c5.9,0,8.8,3.4,10.7,8.7C590.8,369.7,598.2,390.2,606,412z"/>
    <path d="M353.4,412c9-20.6,17.9-39.4,25.4-58.7c3.8-9.8,9.2-13.5,19.8-13.2c22.5,0.6,18.9-0.5,27,18.2c7.4,17.1,14.5,34.3,22.1,52.5
	c1-2.2,1.8-3.7,2.4-5.2c7.4-19,14.8-37.9,21.9-56.9c2.2-5.8,5.8-8.4,11.8-8.3c7.4,0.1,14.9-0.2,22.3,0.1c8.1,0.4,10.6,4.6,7.3,12.1
	c-14.8,33.7-29.7,67.4-44.5,101.2c-2.2,5-5.5,7.6-11,7.4c-0.2,0-0.5,0-0.7,0c-32.2-0.5-24.2,4.2-36.6-23c-6.8-15-13.2-30.2-20.1-46
	c-7.6,16.4-14.7,32.2-22.1,47.9c-11.6,24.6-5.3,20.9-33,21.2c-11.4,0.1-11.9-0.4-16.3-11.1c-13.1-31.8-26.3-63.7-39.4-95.5
	c-4.2-10.2-1.9-13.9,9-14.1c6.9-0.1,13.9,0,20.8,0c5.9,0,9.6,2.4,11.6,8.4C338,369.3,345.5,389.8,353.4,412z"/>
    <path d="M101,411.8c9.4-21.6,18.4-41.7,26.8-62c2.9-7.1,7.4-9.7,14.8-9.6c26.6,0.4,21.5-2.2,31.5,21c7,16.1,13.7,32.4,21.1,49.9
	c4.7-11.9,8.8-22.6,12.9-33.2c3.9-10,8-20,11.6-30.1c1.8-5,5-7.4,10.1-7.4c7.9-0.1,15.8-0.3,23.7,0.1c7.7,0.4,10.3,4.6,7.3,11.6
	c-14.9,34.2-30.1,68.3-45.1,102.5c-2,4.5-5.3,6.5-10.1,6.5c-6.5,0-12.9-0.2-19.4,0.1c-6.2,0.2-9.6-2.7-12-8.2
	c-8.5-20-17.3-39.9-26.5-60.8c-1.1,2.3-1.9,3.8-2.7,5.3c-8.6,18.7-17.2,37.3-25.6,56.1c-2.4,5.3-5.9,7.7-11.6,7.6
	c-32.5-0.6-24.8,4.3-36.6-23.7c-11.7-27.8-23-55.7-34.5-83.6c-4-9.7-1.7-13.3,8.9-13.5c7.2-0.1,14.4,0,21.6,0
	c5.7,0,9.1,2.5,11.1,8.2c6.3,18.6,13,37,19.6,55.5C98.8,406.2,99.7,408.4,101,411.8z"/>
  </svg>

)

export const IconWhatsapp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 700" className="w-7">
    <path fill="#fff" d="M399.91,632.22c-60.47,11.39-119.45,2.64-175.5-24.15-7-3.33-16.77-4-24.37-2.23-39.79,9.4-79.29,20-118.9,30.19-4.77,1.22-9.58,2.29-17.93,4.27,2.87-11.82,4.78-20.56,7.13-29.18,9.79-36,20-71.78,29.25-107.88,1.49-5.86.2-13.71-2.62-19.19C5,305.6,115.35,93.76,314.6,66.85c145.09-19.59,285.17,80.49,314.06,224.38C660.81,451.34,560.58,602,399.91,632.22Z" />
    <path fill="#02b001" d="M351,64.4c131.43,0,251.16,95,277.62,226.83,32.15,160.11-68.08,310.72-228.75,341a278.55,278.55,0,0,1-51.67,4.88c-42.42,0-83.87-9.93-123.83-29a37.34,37.34,0,0,0-15.63-3.2,38.44,38.44,0,0,0-8.74,1c-39.79,9.4-79.29,20-118.9,30.19-4.77,1.22-9.58,2.29-17.93,4.27,2.87-11.82,4.78-20.56,7.13-29.18,9.79-36,20-71.78,29.25-107.88,1.49-5.86.2-13.71-2.62-19.19C5,305.6,115.35,93.76,314.6,66.85A271.93,271.93,0,0,1,351,64.4m0-35h0a308.68,308.68,0,0,0-41.11,2.76A333.65,333.65,0,0,0,231.3,52.68,320.48,320.48,0,0,0,37.68,424.05,331.91,331.91,0,0,0,64.8,498c-6.06,23.57-12.68,47.52-19.1,70.72-3,10.87-6.11,22.1-9.13,33.19-1.72,6.33-3.16,12.43-4.83,19.49-.79,3.35-1.61,6.82-2.54,10.63a35,35,0,0,0,42.09,42.32l7.34-1.73c4.3-1,7.69-1.8,11.19-2.69,10.76-2.77,21.65-5.6,32.17-8.33,28.21-7.34,57.38-14.92,86-21.69a5.48,5.48,0,0,1,.76,0,6.74,6.74,0,0,1,1.21.1c44.83,21.31,91.35,32.13,138.25,32.13a315.73,315.73,0,0,0,58.15-5.48C492.9,650.32,567,602.08,615.07,530.79A317.67,317.67,0,0,0,663.3,415.18,330.69,330.69,0,0,0,663,284.34a310.29,310.29,0,0,0-40.62-102.58,321,321,0,0,0-71.11-80.56C494.1,54.9,423,29.4,351.06,29.4Z" />
    <path fill="#02b001" d="M498.84,166.31c-87.64-73-215.2-70.7-302.91,2.4-86.77,72.31-110.67,197-55.34,296.54,9.33,16.81,11.92,31.35,4.69,48.45-1.93,4.57-2.94,9.55-4.19,14.39-3.7,14.3-7.31,28.62-11.78,46.15,26.38-6.74,49.64-12.18,72.57-18.78,11.21-3.22,20.48-2.58,31,3.36C286.17,589,343.37,598,402.69,583c95.51-24.11,157-85.37,178.17-181C601.6,308.39,572.49,227.68,498.84,166.31Zm-5.7,266.08c-2.55,32.07-30.45,55.12-75.33,55.5-33.59-3.4-70.66-18.86-103.84-43-41.73-30.35-75.55-68.24-98.58-114.66-16.14-32.53-15.53-64.61,7.52-94.87,10.65-14,24.23-18.94,40.54-15.86,4.8.9,10.48,5.85,12.65,10.42,8.16,17.22,16.55,34.62,21.68,52.85,2.11,7.49-1.66,18.8-6.53,25.7-16.15,22.82-16.81,22.35,0,45.47,21,28.95,47.51,50.95,80.67,65,10.93,4.64,19.19,3.87,25.87-6.29a24.9,24.9,0,0,1,1.71-2.13c22.28-26.73,22.29-26.76,53.41-12.15,9.87,4.63,19.59,9.6,29.5,14.13C491.15,416.51,493.87,423.19,493.14,432.39Z" />
  </svg>
)

export const IconScrollDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" className="w-6" stroke="currentColor" fill="none" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={40}>
    <path d="M401.41,392.4v-277c3.79-31-18.92-56.36-42.38-57.6-24.88-1.31-51.38,24.44-47.74,57.6v342c-.18,3.31-.51,7.77-1.14,13-.65,5.49-1,8.23-1.32,8.46-6.75,4.59-54.46-95.28-111.95-96.24-26.28-.44-53.79,19.8-60.22,42.94-7.22,26,14.88,46.11,51.65,97.05,71.3,98.76,57.48,119.21,108.62,163,15.77,13.51,52.27,44.24,107.54,55.2,4.1.81,7.42,1.35,9.75,1.72,16.75,2.64,80.32,10.71,145.86-26.83,11.16-6.39,59-35.11,88.74-93.91,17.9-35.47,25.64-64.63,25.64-119.6V369c4.46-34.35-20.08-61.38-42.89-62.29-23.75-1-51.4,26.16-47.23,62.29v26.83" />
    <path d="M492.43,395.85v-85c4.33-32.68-19.64-59-43.13-59.87-24.45-.91-51.19,25.62-47,59.87V389" />
    <path d="M583.44,395.85V340.71c4-32.49-19.23-58.58-42.14-59.86-24.3-1.35-51.74,25-48,59.86,0,121.09-.9-66-.9,55.14" />
    <line x1="179.66" y1="299.87" x2="179.66" y2="79.08" />
    <line x1="112.97" y1="228.58" x2="179.66" y2="299.87" />
    <line x1="246.1" y1="228.58" x2="179.4" y2="299.87" />
  </svg>
)

export const IconWhatsDoc = ({ black }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 902.29 703.6" className="h-8">
    <defs><style dangerouslySetInnerHTML={{ __html: `.cls-1{fill:#fff;}.cls-2{fill:${black ? '#9e9e9e' : '#02b001'};}.cls-3{fill:${black ? '#8c8c8c' : '#03ced5'};}.cls-4{fill:#d5d5d5;}.cls-5,.cls-7{fill:none;stroke-miterlimit:10;stroke-width:4px;}.cls-5{stroke:#fff;}.cls-6{fill:#f7f7f5;}.cls-7{stroke:#d5d5d5;}` }} />
    </defs>
    <path className="cls-1" d="M399.91,632.22c-60.47,11.39-119.45,2.64-175.5-24.15-7-3.33-16.77-4-24.37-2.23-39.79,9.4-79.29,20-118.9,30.19-4.77,1.22-9.58,2.29-17.93,4.27,2.87-11.82,4.78-20.56,7.13-29.18,9.79-36,20-71.78,29.25-107.88,1.49-5.86.2-13.71-2.62-19.19C5,305.6,115.35,93.76,314.6,66.85c145.09-19.59,285.17,80.49,314.06,224.38C660.81,451.34,560.58,602,399.91,632.22Z" />
    <path className="cls-2" d="M351,64.4c131.43,0,251.16,95,277.62,226.83,32.15,160.11-68.08,310.72-228.75,341a278.55,278.55,0,0,1-51.67,4.88c-42.42,0-83.87-9.93-123.83-29a37.34,37.34,0,0,0-15.63-3.2,38.44,38.44,0,0,0-8.74,1c-39.79,9.4-79.29,20-118.9,30.19-4.77,1.22-9.58,2.29-17.93,4.27,2.87-11.82,4.78-20.56,7.13-29.18,9.79-36,20-71.78,29.25-107.88,1.49-5.86.2-13.71-2.62-19.19C5,305.6,115.35,93.76,314.6,66.85A271.93,271.93,0,0,1,351,64.4m0-35h0a308.68,308.68,0,0,0-41.11,2.76A333.65,333.65,0,0,0,231.3,52.68,320.48,320.48,0,0,0,37.68,424.05,331.91,331.91,0,0,0,64.8,498c-6.06,23.57-12.68,47.52-19.1,70.72-3,10.87-6.11,22.1-9.13,33.19-1.72,6.33-3.16,12.43-4.83,19.49-.79,3.35-1.61,6.82-2.54,10.63a35,35,0,0,0,42.09,42.32l7.34-1.73c4.3-1,7.69-1.8,11.19-2.69,10.76-2.77,21.65-5.6,32.17-8.33,28.21-7.34,57.38-14.92,86-21.69a5.48,5.48,0,0,1,.76,0,6.74,6.74,0,0,1,1.21.1c44.83,21.31,91.35,32.13,138.25,32.13a315.73,315.73,0,0,0,58.15-5.48C492.9,650.32,567,602.08,615.07,530.79A317.67,317.67,0,0,0,663.3,415.18,330.69,330.69,0,0,0,663,284.34a310.29,310.29,0,0,0-40.62-102.58,321,321,0,0,0-71.11-80.56C494.1,54.9,423,29.4,351.06,29.4Z" />
    <path className="cls-2" d="M498.84,166.31c-87.64-73-215.2-70.7-302.91,2.4-86.77,72.31-110.67,197-55.34,296.54,9.33,16.81,11.92,31.35,4.69,48.45-1.93,4.57-2.94,9.55-4.19,14.39-3.7,14.3-7.31,28.62-11.78,46.15,26.38-6.74,49.64-12.18,72.57-18.78,11.21-3.22,20.48-2.58,31,3.36C286.17,589,343.37,598,402.69,583c95.51-24.11,157-85.37,178.17-181C601.6,308.39,572.49,227.68,498.84,166.31Zm-5.7,266.08c-2.55,32.07-30.45,55.12-75.33,55.5-33.59-3.4-70.66-18.86-103.84-43-41.73-30.35-75.55-68.24-98.58-114.66-16.14-32.53-15.53-64.61,7.52-94.87,10.65-14,24.23-18.94,40.54-15.86,4.8.9,10.48,5.85,12.65,10.42,8.16,17.22,16.55,34.62,21.68,52.85,2.11,7.49-1.66,18.8-6.53,25.7-16.15,22.82-16.81,22.35,0,45.47,21,28.95,47.51,50.95,80.67,65,10.93,4.64,19.19,3.87,25.87-6.29a24.9,24.9,0,0,1,1.71-2.13c22.28-26.73,22.29-26.76,53.41-12.15,9.87,4.63,19.59,9.6,29.5,14.13C491.15,416.51,493.87,423.19,493.14,432.39Z" />
    <circle className="cls-3" cx="663.27" cy="363.35" r="219.56" />
    <rect className="cls-4" x="625.09" y="228.34" width="152.74" height="220.92" />
    <line className="cls-5" x1="645.54" y1="263.8" x2="757.37" y2="263.8" />
    <line className="cls-5" x1="645.54" y1="301.98" x2="757.37" y2="301.98" />
    <line className="cls-5" x1="645.54" y1="340.16" x2="757.37" y2="340.16" />
    <line className="cls-5" x1="645.54" y1="378.35" x2="757.37" y2="378.35" />
    <line className="cls-5" x1="645.54" y1="416.53" x2="757.37" y2="416.53" />
    <polygon className="cls-6" points="701.45 318.35 701.45 498.36 548.72 498.36 548.72 277.43 663.27 277.43 701.45 318.35" />
    <line className="cls-7" x1="569.17" y1="312.89" x2={681} y2="312.89" />
    <line className="cls-7" x1="569.17" y1="351.07" x2={681} y2="351.07" />
    <line className="cls-7" x1="569.17" y1="389.26" x2={681} y2="389.26" />
    <line className="cls-7" x1="569.17" y1="427.44" x2={681} y2="427.44" />
    <line className="cls-7" x1="569.17" y1="465.63" x2={681} y2="465.63" />
    <polygon className="cls-4" points="706.59 323.8 657.82 323.8 657.82 271.98 706.59 323.8" />
    <polygon className="cls-1" points="701.45 318.35 663.27 318.35 663.27 277.43 701.45 318.35" />
  </svg>
)

export const IconCalendar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

export const IconGPS = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
)

export const IconObservation = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6">
    <path d="M4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H16L12,22L8,18H4A2,2 0 0,1 2,16V4A2,2 0 0,1 4,2M4,4V16H8.83L12,19.17L15.17,16H20V4H4M6,7H18V9H6V7M6,11H16V13H6V11Z" />
  </svg>

)

export const IconConfig = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5" fill="currentColor">
    <path d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" >
    </path>
  </svg>

)

export const IconLocal = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="" fill="currentColor">
    <path d="M320 384H128V224H64v256c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V224h-64v160zm314.6-241.8l-85.3-128c-6-8.9-16-14.2-26.7-14.2H117.4c-10.7 0-20.7 5.3-26.6 14.2l-85.3 128c-14.2 21.3 1 49.8 26.6 49.8H608c25.5 0 40.7-28.5 26.6-49.8zM512 496c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V224h-64v272z">
    </path>
  </svg>
)

export const IconPrint = ({ autosize }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="currentColor" className={autosize ? "" : "w-5"}>
    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit={10} strokeWidth="30px" x1={261} y1={539} x2={541} y2={539} />
    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit={10} strokeWidth="30px" x1={261} y1={603} x2={376} y2={603} />
    <path d="M144,81V195h50V131H603v64h50V81Z" />
    <path d="M671.13,247H128.7A119.87,119.87,0,0,0,8.83,366.87V501.13A119.87,119.87,0,0,0,128.7,621H144V748H653V621h18.13A119.87,119.87,0,0,0,791,501.13V366.87A119.87,119.87,0,0,0,671.13,247ZM603,698H194V452H603Zm64-298a38,38,0,1,1,38-38A38.06,38.06,0,0,1,667,400Z" />
  </svg>
)
export const IconRole = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 1024 1024" className="w-6 ml-0.5" >
    <path d="M750.231313 668.295071c-55.296189 0-100.285853 45.0045-100.285853 100.300689 0 55.30608 44.989664 100.310581 100.285853 100.310581 55.311026 0 100.300689-45.0045 100.300689-100.310581C850.532003 713.299572 805.542339 668.295071 750.231313 668.295071zM750.231313 817.220403c-26.809824 0-48.614752-21.814819-48.614752-48.624643 0-26.799933 21.804928-48.614752 48.614752-48.614752 26.814769 0 48.629588 21.814819 48.629588 48.614752C798.860901 795.405585 777.046083 817.220403 750.231313 817.220403zM1015.415634 716.192718c-3.763563-19.861327-16.508244-32.699973-32.873068-32.699973l-2.270007 0c-31.305328 0-56.789745-25.46958-56.789745-56.769963 0-8.219503 3.595414-18.318315 4.960386-21.483467 7.749676-17.45779 1.785343-38.88191-15.440006-50.810576l-66.398948-36.765215c-5.202718-2.245279-10.825808-3.392647-16.715957-3.392647-12.027576 0-23.911732 4.90104-31.785047 13.061196-8.273904 8.526127-30.242035 26.122392-45.375417 26.122392-15.271857 0-37.378463-17.937508-45.667204-26.59222-7.912879-8.362924-19.905837-13.357929-32.066943-13.357929-5.825857 0-11.364873 1.112749-16.340096 3.264063l-1.241333 0.509392-67.571043 37.111403-1.607304 1.038565c-15.707065 10.929664-21.706017 32.343894-14.005796 49.648371 0.514337 1.236387 5.029624 12.225398 5.029624 21.64667 0 31.300383-25.479471 56.769963-56.799636 56.769963l-2.645869 0c-15.966212 0-28.720784 12.838647-32.482369 32.719755-0.573684 3.05635-5.603308 30.518986-5.603308 52.719558 0 22.210463 5.029624 49.668154 5.603308 52.754177 3.760596 19.856381 16.505277 32.695028 32.878013 32.695028l2.245279 0c31.320165 0 56.804582 25.474525 56.804582 56.769963 0 8.219503-3.595414 18.318315-4.960386 21.488413-7.739785 17.433062-1.795234 38.8374 15.370768 50.80563l65.147724 36.300333c5.192827 2.255171 10.815917 3.42232 16.720903 3.42232 12.245181 0 24.25792-5.123589 32.106507-13.684335 8.021681-8.709113 30.805828-27.784097 46.369472-27.784097 15.726847 0 38.253825 19.114549 46.676096 28.352835 7.902988 8.709113 19.994857 13.90194 32.338948 13.90194 5.806075 0 11.335199-1.112749 18.056201-4.089969l65.869774-36.394299 1.57763-1.043511c15.687283-10.904937 21.671398-32.299384 13.981068-49.623644-0.514337-1.241333-5.029624-12.225398-5.029624-21.651616 0-31.295437 25.484417-56.769963 56.789745-56.769963l2.616196 0c15.998853 0 28.75837-12.838647 32.507097-32.645572 0.049455-0.276951 5.618144-29.445802 5.618144-52.803632C1021.013996 746.731486 1015.989318 719.26885 1015.415634 716.192718zM966.055093 803.625088c-53.486118 6.997953-94.237446 52.670102-94.237446 107.526137 0 12.665552 3.05635 24.693129 5.746729 32.833503l-47.531676 26.275704c-4.272955-4.18888-11.092868-10.464783-19.544812-16.730794-21.008694-15.588372-41.35963-23.521033-60.469234-23.521033-18.951346 0-39.139079 7.779349-60.019189 23.08088-8.328305 6.12259-15.07898 12.195725-19.421173 16.404388l-45.434763-25.420124c2.695324-8.155211 5.776402-20.256971 5.776402-32.922523 0-54.856035-40.741437-100.528185-94.2325-107.526137-1.369917-8.852534-3.28879-23.283647-3.28879-34.69303 0-11.458838 1.908982-25.850387 3.28879-34.678193 53.481172-7.002898 94.2325-52.684939 94.2325-107.531083 0-12.630933-3.05635-24.653564-5.741783-32.798884l49.059851-26.923571c4.258118 4.005895 11.087922 10.03452 19.480519 16.008744 20.598214 14.683336 40.45954 22.13628 59.010297 22.13628 18.367771 0 38.060949-7.309522 58.520687-21.720853 8.32336-5.84564 15.064144-11.691279 19.356881-15.677392l46.977775 26.10261c-2.690379 8.150266-5.761565 20.207515-5.761565 32.873068 0 54.856035 40.736491 100.528185 94.222609 107.531083 1.399591 9.010791 3.303627 23.372667 3.303627 34.688084C969.34784 780.33155 967.449738 794.648915 966.055093 803.625088zM70.034283 950.48318l0-56.799636c0-193.123708 148.930278-352.285338 338.673208-370.222846l-0.082096-0.039564c0 0 0.190898 0 0.494555 0.009891 11.631932-1.092966 23.399373-1.706215 35.313202-1.706215 1.793256 0 3.560796 0.098911 5.346139 0.118693 41.962988-3.254172 105.458898-13.113619 138.643535-42.734493l16.241185-12.657639c63.441509-49.541548 99.830862-123.556641 99.830862-203.053382C704.494871 120.948359 587.814522 5.064243 444.381717 5.064243S184.269552 120.948359 184.269552 263.396999c0 79.496741 36.391331 153.511835 99.83284 203.053382l16.236239 12.657639-19.131364 7.596364C112.198059 553.806589 2.990435 713.551795 2.990435 893.683544l0 90.028783c0 18.328206 15.026558 33.239038 33.515989 33.239038l489.766669 0c-15.944452-20.420174-29.534822-42.694929-40.520865-66.468185L70.034283 950.48318 70.034283 950.48318zM251.313399 263.396999c0-105.80014 86.606463-191.869517 193.068318-191.869517 106.459877 0 193.081176 86.069376 193.081176 191.869517 0 105.802119-86.621299 191.867538-193.081176 191.867538C337.919862 455.263548 251.313399 369.199118 251.313399 263.396999z" />
  </svg>
)

export const IconEyeOpen = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 2 20 20" fill="currentColor">
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
  </svg>
);

export const IconVoucher = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
  </svg>
);