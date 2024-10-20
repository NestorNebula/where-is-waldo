import { useState, useEffect, useRef } from 'react';

const useDialog = () => {
  const [rules, setRules] = useState(false);
  const ref = useRef();
  useEffect(() => {
    if (rules) ref.current.showModal();
    else ref.current.close();
  }, [rules]);

  return { ref, setRules };
};

export { useDialog };
