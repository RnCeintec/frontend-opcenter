import React from 'react';
import PropTypes from 'prop-types';
import { IconClose, IconSpiner } from '../../../assets/icons/icons';

const ModalTwoOptions = ({
  titleModal, bodyModal, onClickFirstOption, titleFirstOption, onClickSecondOption,
  titleSecondOption, colorFirstButton, isLoadSecondOption, isLoadingModal, closeButton,
}) => (
  <>
    <div className="flex items-center justify-center w-full h-full z-50 fixed">
      <div className="flex p-4 py-6 mt-2 flex-col justify-center absolute z-20 bg-white rounded-xl
      w-11/12 sm:w-4/6 md:w-1/2 lg:w-2/5 max-h-screen overflow-y-auto"
      >
        {closeButton
          && (
            <button type="button" onClick={() => onClickFirstOption()} className="absolute top-2 right-3">
              <IconClose />
            </button>
          )}
        {isLoadingModal
          ? <div className="flex justify-center p-10"><IconSpiner dark medium /></div>
          : (
            <>
              <div className="flex flex-col justify-center items-center text-center">
                <h2 className="text-xl font-semibold flex flex-col justify-center items-center">
                  {titleModal}
                </h2>
                <h1 className="flex flex-col justify-center items-center">
                  {bodyModal}
                </h1>
              </div>
              <div className="flex space-x-10 justify-center items-center mt-3">
                <button
                  type="button"
                  onClick={() => onClickFirstOption()}
                  className={`py-1 px-3 bg-${colorFirstButton} opacity-90 hover:opacity-100 text-white rounded-md`}
                >
                  {titleFirstOption}
                </button>
                <button
                  type="button"
                  onClick={() => onClickSecondOption()}
                  className={`flex items-center py-1 px-3 bg-primary opacity-90 hover:opacity-100 text-white rounded-md ${isLoadSecondOption ? 'cursor-not-allowed' : ''}`}
                  disabled={isLoadSecondOption}
                >
                  {isLoadSecondOption && <IconSpiner />}
                  {titleSecondOption}
                </button>
              </div>
            </>
          )}
      </div>

      {/* THIS DIV IS FOR BLACK BACKGROUND */}
      <div
        className="w-full h-full z-10 bg-gray-600 opacity-60"
      />
    </div>

  </>
);

ModalTwoOptions.propTypes = {
  titleModal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  bodyModal: PropTypes.string,
  onClickFirstOption: PropTypes.func.isRequired,
  titleFirstOption: PropTypes.string.isRequired,
  onClickSecondOption: PropTypes.func.isRequired,
  titleSecondOption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  colorFirstButton: PropTypes.string,
  isLoadSecondOption: PropTypes.bool,
  isLoadingModal: PropTypes.bool,
  closeButton: PropTypes.bool,
};

ModalTwoOptions.defaultProps = {
  titleModal: '',
  bodyModal: '',
  colorFirstButton: 'green-500',
  isLoadSecondOption: false,
  isLoadingModal: false,
  closeButton: false,
};

export default ModalTwoOptions;
