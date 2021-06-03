import React from 'react';
import { Button, Spinner } from 'reactstrap';
// import './LoaderButton.css';

export default function LoaderButton({
  isLoading,
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner style={{ width: '3rem', height: '3rem' }} />}
      {props.children}
    </Button>
  );
}
