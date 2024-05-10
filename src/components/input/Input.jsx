import React from 'react'
import PropTypes from 'prop-types'

import './Input.scss'

const Input = (props) => {
  const { id, name, type, value, classname, labelText, placeholder, handleChange, style } = props;
  return (
    <>
      <div className='form-row'>
        {labelText && (
          <label htmlFor={name} className='form-label'>{labelText}</label>
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`form-input ${classname}`}
          autoComplete='off'
          style={style}
        />
      </div>
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
};

export default Input;