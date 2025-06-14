import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function CommonButton({ children, style, ...props }: Props) {
  return (
    <button
      {...props}
      style={{
        padding: '12px 20px',
        background: props.disabled ? '#b0b8c1' : '#3182f6',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        fontSize: '1rem',
        fontWeight: 500,
        margin: '0 4px',
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
        transition: 'background 0.15s',
        ...style,
      }}
      onMouseOver={e => {
        if (!props.disabled) (e.currentTarget as HTMLButtonElement).style.background = '#2563eb';
      }}
      onMouseOut={e => {
        if (!props.disabled) (e.currentTarget as HTMLButtonElement).style.background = '#3182f6';
      }}
    >
      {children}
    </button>
  );
} 