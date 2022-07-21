import PropTypes from 'prop-types';
import { IconSelect } from '../../../assets/icons/icons';

const FormSelectInput = ({
  register, watch, errors, inputName, title, icon, placeholder, onChange, options, children,
}) => (
  <div className="w-full mt-2">
    <p className="font-semibold pl-2.5 text-gray-800">
      {title}
    </p>
    <label htmlFor={inputName} className="flex flex-col ">
      <div className={`flex relative border border-gray-300 rounded-xl ${errors?.[inputName] ? 'ring-red-500' : 'ring-gray-300'}`}>
        <div className="w-9 flex items-center justify-center p-1 bg-gray-200 text-gray-700 font-semibold rounded-l-xl border-r border-gray-300 ">
          {icon}
        </div>
        <select
          className={`appearance-none bg-white pl-3 py-1.5 text-sm rounded-r-xl w-full ring-1 ring-gray-300 focus:outline-none ${watch(inputName) === 'select' || watch(inputName) === undefined ? 'text-gray-400' : 'text-gray-800'}`}
          {...register(
            inputName,
            options,
          )}
        >
          {placeholder && <option value="select" className="text-gray-400">{placeholder}</option>}
          {children}
        </select>
        <span className="absolute right-0 top-1.5 h-5 w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center rounded-full bg-white">
          <IconSelect />
        </span>
      </div>
      <span className="ml-3 text-xs text-red-500">{errors?.[inputName]?.message}</span>
    </label>
  </div>
);

FormSelectInput.propTypes = {
  register: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
  inputName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.shape(),
  children: PropTypes.node.isRequired,
};

FormSelectInput.defaultProps = {
  options: {},
  onChange: null,
  placeholder: null,
};

export default FormSelectInput;
