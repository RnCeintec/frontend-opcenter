/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  IconAdmin, IconClose, IconComputer, IconDashboard, IconBilling,
  IconMenu, IconSales, IconTickets, IconUsers, IconProduct, IconCategory, IconLocal, IconUserCircle,
  IconIdCard,
} from '../../assets/icons/icons';
import Context from '../context/context';
import { menus } from '../../config';
import ButtonIcon from '../atoms/buttons/buttonIcon';

const Icons = (value) => {
  switch (value) {
    case 'iconDashboard': return <IconDashboard />;
    case 'iconSales': return <IconSales />;
    case 'iconProducts': return <IconProduct />;
    case 'iconCategories': return <IconCategory />;
    case 'iconBilling': return <IconBilling />;
    case 'iconClients': return <IconUsers />;
    case 'IconTickets': return <IconTickets />;
    case 'IconIdCard': return <IconIdCard />;
    case 'iconUsers': return <IconUserCircle borderWhite />;
    case 'iconMontura': return <IconCategory />;

    default: return <IconComputer />;
  }
};

export const MenuItem = ({
  name,
  action,
  icon,
  children,
  isActive,
}) => (
  <>
    <li className="flex w-full ">
      <button
        type="button"
        className={`flex items-center py-2.5 px-4 mb-1 rounded w-full lg:whitespace-nowrap text-base sm:text-xs md:text-sm lg:text-base cursor-pointer focus:outline-none ${isActive ? 'bg-primary' : 'hover:bg-gray-600'}`}
        onClick={action}
      >
        {Icons(icon)}
        <p className="ml-1 text-left">{name === 'Administradores' ? 'Admin' : name}</p>
        <p className="md:hidden lg:flex text-left">{name === 'Administradores' ? 'istradore' : ''}</p>
        <p>{name === 'Administradores' ? 's' : ''}</p>
      </button>
      {children}
    </li>
  </>
);

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node,
  isActive: PropTypes.bool,
};

MenuItem.defaultProps = {
  isActive: false,
  children: null,
};

const Menu = ({ openMenu, setOpenMenu }) => {
  const [openMenuMovil, setOpenMenuMovil] = useState(false);

  const { state: { page, localData }, dispatch } = useContext(Context);

  return (
    <>
      {!openMenuMovil
        ? (
          <button type="button" onClick={() => setOpenMenuMovil(!openMenuMovil)} className="group flex lg:hidden fixed lg:absolute top-1.5 left-3.5 bg-gray-800 text-white rounded-full p-1.5 z-40">
            <span className="group-hover:text-blue-400 text-white"><IconMenu /></span>
          </button>
        )
        : (
          <button type="button" onClick={() => setOpenMenuMovil(!openMenuMovil)} className="group flex lg:hidden fixed lg:absolute top-3 left-5 text-white z-40">
            <span className="group-hover:text-blue-400 text-white"><IconClose /></span>
          </button>
        )}
      {!openMenu
        ? (
          <button type="button" onClick={() => setOpenMenu(!openMenu)} className="group hidden lg:flex absolute top-3 left-5 text-white">
            <span className="group-hover:text-blue-400 text-white"><IconMenu /></span>
          </button>
        )
        : (
          <button type="button" onClick={() => setOpenMenu(!openMenu)} className="group hidden lg:flex absolute top-3 left-5 text-white">
            <span className="group-hover:text-blue-400 text-white"><IconClose /></span>
          </button>
        )}

      {openMenu
        && (
          <div className="min-h-screen h-11/12 hidden lg:flex flex-col bg-gray-700 text-gray-200 sticky top-0">
            <div className="py-2 pl-4 pr-8 flex items-center space-x-2 border-b border-gray-500 select-none">
              <div className="flex items-center w-10 h-10 p-2 rounded-full bg-gray-200 text-gray-700">
                <IconLocal />
              </div>
              <div className="flex flex-col">
              {`${localData.rz_social}`}
                {' '}
                <br />
                {`"${localData.businessName}"`}
              </div>
            </div>
            <nav className="py-2 px-2">
              <ul>
                {menus.map(({
                  name, payload, icon, role,
                }) => (
                  <>
                    {role === 'admin'
                      ? localStorage.role === 'admin'
                        ? (
                          <MenuItem
                            key={payload}
                            isActive={page === payload}
                            name={name}
                            icon={icon}
                            action={() => dispatch({ type: 'SET_PAGE', payload })}
                          />
                          
                        )
                        : ''
                      : (
                        <MenuItem
                          key={payload}
                          isActive={page === payload}
                          name={name}
                          icon={icon}
                          action={() => dispatch({ type: 'SET_PAGE', payload })}
                        />
                      )}
                  </>
                ))}
              </ul>
            </nav>
          </div>
        )}

      {openMenuMovil
        && (
          <>
            <div className="min-h-screen h-full lg:hidden flex-col bg-gray-700 text-gray-200 fixed z-30 -mt-12">
              <div className="h-12 flex items-center space-x-2 bg-gray-800">
                {' '}
              </div>
              <div className="py-2 pl-4 pr-8 flex items-center space-x-2 border-b border-gray-500">
                <div className="flex items-center w-10 h-10 p-2 rounded-full bg-gray-200 text-gray-700">
                  <IconLocal />
                </div>
                <div>
                {`${localData.rz_social}`}
                  {' '}
                  <br />
                  {`"${localData.businessName}"`}
                </div>
              </div>
              <nav className="py-2 px-2">
                <ul>
                  {menus.map(({
                    name, payload, icon, role,
                  }) => (
                    <>
                      {role === 'admin'
                        ? localStorage.role === 'admin'
                          ? (
                            <MenuItem
                              key={payload}
                              isActive={page === payload}
                              name={name}
                              icon={icon}
                              action={() => dispatch({ type: 'SET_PAGE', payload })}
                            />
                          )
                          : ''
                        : (
                          <MenuItem
                            key={payload}
                            isActive={page === payload}
                            name={name}
                            icon={icon}
                            action={() => dispatch({ type: 'SET_PAGE', payload })}
                          />
                        )}
                    </>
                  ))}
                </ul>
              </nav>
            </div>
            <button
              type="button"
              onClick={() => setOpenMenuMovil(false)}
              className="fixed lg:hidden top-15 w-full h-full bg-gray-600 opacity-60 cursor-default z-20 -mt-12"
            >
              {' '}
            </button>
          </>
        )}

    </>
  );
};

Menu.propTypes = {
  openMenu: PropTypes.bool.isRequired,
  setOpenMenu: PropTypes.func.isRequired,
};

export default Menu;
