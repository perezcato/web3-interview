import React from 'react';

interface Props {
  label: string
  onClick?: () => void
}


const Button = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className="text-sm font-bold text-gray-100 border border-gray-700 rounded-md shadow-md px-3 py-1 bg-gray-700 hover:bg-gray-800 hover:border-gray-800">
      {props.label}
    </button>
  );
};

export default Button;