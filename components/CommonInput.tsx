import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function CommonInput(props: Props) {
  return (
    <input
      {...props}
      style={{
        padding: '8px 12px',
        border: '1px solid #e5e8eb',
        borderRadius: 6,
        fontSize: '1rem',
        outline: 'none',
        margin: '0 4px',
        boxSizing: 'border-box',
        transition: 'border 0.2s',
        ...props.style,
      }}
      onFocus={e => (e.currentTarget.style.border = '1.5px solid #3182f6')}
      onBlur={e => (e.currentTarget.style.border = '1px solid #e5e8eb')}
    />
  );
} 