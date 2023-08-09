import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/slices/contactsSlice';

import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Controlls } from 'components/Controlls';
import { Container, Title, FormModal } from './App.styled';

export const App = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const findContactByName = nameValue =>
    contacts.find(({ name }) => name === nameValue);

  const findContactByNumber = numberValue =>
    contacts.find(({ number }) => numberValue === number);

  const handleAddContact = data => {
    dispatch(addContact(data));
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalShown(state => !state);
  };

  return (
    <Container>
      <Title>Phonebook</Title>
      <div>
        <Controlls toggleModal={toggleModal} />

        {isModalShown && (
          <FormModal onClose={toggleModal}>
            <ContactForm
              handleContactChange={handleAddContact}
              findContactByName={findContactByName}
              findContactByNumber={findContactByNumber}
            />
          </FormModal>
        )}

        <ContactList />
      </div>
    </Container>
  );
};
