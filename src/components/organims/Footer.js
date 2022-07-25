import React from 'react';
import { appVersion } from '../../config';

const Footer = () => (
  <footer className="flex w-full p-2 text-gray-300 text-xs sm:text-sm lg:text-base bg-gray-800">
    <div className="flex flex-col sm:flex-row justify-center items-center text-center w-full">
      <div className="flex flex-wrap items-center justify-center">
        <p>
          Copyright © 2020-2022
        </p>
        <a href="http://ceintec-rn.net.pe" className="mx-1 font-semibold text-blue-400">CEINTEC.RN</a>
      </div>
      <p>
        All rights reserved.
      </p>
      <p className="mx-1">
        {`v${appVersion}`}
      </p>
    </div>
  </footer>
);

export default Footer;
