import PropTypes from 'prop-types';

const FormTextInput = ({
  register, errors, inputName, title, icon, placeholder, options, type, disabled, uppercase, watch,
}) => (
  <label htmlFor={inputName} className="w-full mt-2">
    <p className="font-semibold pl-2.5 text-gray-800">
      {title}
    </p>
    <div className="flex flex-col w-full ">
      <div className="flex justify-center w-full rounded-xl border border-gray-300 focus-within:border-blue-400">
        <div className="w-9 flex justify-center items-center p-1 bg-gray-200 text-gray-700 font-semibold rounded-l-xl border-r border-gray-300 ">
          {icon}
        </div>
        <input
          {...!disabled && { placeholder }}
          {...(type === 'password' && {
            autoComplete: 'new-password',
            type: 'password',
          })}
          {...(type === 'number' && {
            inputMode: 'numeric',
            pattern: '[0-9]*',
            type: 'number',
          })}
          {...(type === 'money' && {
            inputMode: 'decimal',
            pattern: '[0-9.]*',
            step: 0.01,
            type: 'number',
          })}
          {...(type === 'text' && {
            type: 'text',
          })}
          id={inputName}
          disabled={disabled}
          className={`py-1 px-2 rounded-r-xl w-full sm:w-full focus:outline-none bg-white ${disabled ? 'cursor-not-allowed' : ''} ${uppercase ? watch !== '' ? 'uppercase' : '' : ''}`}
          {...register(
            inputName,
            options,
          )}
        />
      </div>
      <span className={`text-red-500 text-xs sm:text-sm ml-1 ${errors?.[inputName] ? '-mb-1' : ''}`}>
        {errors?.[inputName]?.message}
      </span>
    </div>
  </label>
);

FormTextInput.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
  inputName: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  icon: PropTypes.node.isRequired,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.shape(),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  uppercase: PropTypes.bool,
  watch: PropTypes.func,
};

FormTextInput.defaultProps = {
  type: 'text',
  options: {},
  disabled: false,
  uppercase: false,
  watch: null,
};

export default FormTextInput;
