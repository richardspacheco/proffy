import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  name: string
  options: Array<{
    value: string
    label: string
  }>
}

const Select: React.FC<SelectProps> = (props) => {
  return (
    <div className="select-block">
      <label htmlFor={props.name}>{props.label}</label>
      <select id={props.name} value="" {...props}>
        <option value="" hidden disabled>
          Selecione uma opção
        </option>
        {props.options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
