import { useState } from 'react';
import { asyncFetch } from '../helpers/fetch';

const useSendForm = ({ user, username, API_URL }) => {
  const [formSent, setFormSent] = useState(false);
  const sendForm = async (e) => {
    e.preventDefault();
    const updatedUser = await asyncFetch({
      url: `${API_URL}/users/${user.id}`,
      options: { method: 'put', body: { username } },
    });
    if (updatedUser) setFormSent(true);
  };
  return { formSent, sendForm };
};

export { useSendForm };
