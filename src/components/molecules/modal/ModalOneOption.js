import React from 'react';
import PropTypes from 'prop-types';

const ModalOneOption = ({
  titleModal, bodyModal, onClickFirstOption, titleFirstOption,
  colorFirstButton,
}) => (
  <>
    <div className="flex items-center justify-center w-full h-full z-50 fixed">
      <div className="flex p-4 pt-6 mt-2 flex-col justify-center absolute z-20 bg-white rounded-md
      w-11/12 sm:w-4/6 md:w-1/2 lg:w-2/5 max-h-screen overflow-y-auto"
      >

        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="text-xl font-semibold flex flex-col justify-center items-center">
            {titleModal}
          </h2>
          <h1 className="flex flex-col justify-center items-center">
            {bodyModal}
          </h1>
        </div>
        <div className="flex justify-center items-center mt-3">
          <button
            type="button"
            onClick={() => onClickFirstOption()}
            className={`py-1 px-3 bg-${colorFirstButton} opacity-90 hover:opacity-100 text-white rounded-md`}
          >
            {titleFirstOption}
          </button>
        </div>
      </div>
      {/* THIS DIV IS FOR BLACK BACKGROUND */}
      <div
        className="w-full h-full z-10 bg-gray-600 opacity-60"
      />
    </div>

  </>
);

ModalOneOption.propTypes = {
  titleModal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  bodyModal: PropTypes.string,
  onClickFirstOption: PropTypes.func.isRequired,
  titleFirstOption: PropTypes.string.isRequired,
  colorFirstButton: PropTypes.string,
};

ModalOneOption.defaultProps = {
  titleModal: '',
  bodyModal: '',
  colorFirstButton: 'green-500',
};

export default ModalOneOption;
