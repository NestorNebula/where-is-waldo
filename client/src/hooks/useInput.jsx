import { useState } from 'react';

const useInput = (verification) => {
  const [value, setValue] = useState('');
  const [validation, setValidation] = useState({ isValid: true });

  const updateValue = (e) => {
    setValue(e.target.value);
    checkValue(e.target.value);
  };

  const checkValue = (v) => {
    const message = verification(v);
    setValidation(message ? { isValid: false, message } : { isValid: true });
  };

  return { value, updateValue, validation };
};

export { useInput };
