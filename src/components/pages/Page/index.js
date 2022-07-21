import React, { useState, cloneElement, useEffect } from 'react';
import PropTypes from 'prop-types';
import withTokenValidate from '../../HOC/withTokenValidate';
import Footer from '../../organims/Footer';
import Header from '../../organims/Header';
import Menu from '../../organims/Menu';

const Page = ({
  children, ...props
}) => {
  const [openMenu, setOpenMenu] = useState(true);
  return (
    <div className="flex flex-col">
      <Header {...props} />
      <div className="flex box-border">
        <div className={`${openMenu ? 'lg:w-1/5' : ''}`}>
          <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} />
        </div>
        <div className={`${openMenu ? 'lg:w-4/5 w-full' : 'w-full'}`}>
          {cloneElement(children, { ...props })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  // countNotification: PropTypes.number,
  // mutateNotification: PropTypes.func.isRequired,
  // setIsNotification: PropTypes.func.isRequired,
};
Page.defaultProps = {
  // countNotification: 0,
};

export default withTokenValidate(Page);
