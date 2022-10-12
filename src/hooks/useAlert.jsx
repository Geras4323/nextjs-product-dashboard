import React from 'react';

function useAlert(options) {
  const defaultOptions = {
    active: false,
    message: '',
    type: '',
    autoClose: true,
  };

  const [alert, setAlert] = React.useState({
    ...defaultOptions,
    ...options
  })

  function toggleAlert() {
    setAlert(!alert.active)
  }

  return {
    alert,
    setAlert,
    toggleAlert,
  }
}

export { useAlert }