import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getContacts, getFilter } from 'redux/selectors';
import { addContact } from 'redux/slices/contactsSlice';

import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Controlls } from 'components/Controlls';
import { Message } from 'components/Message';
import { Container, Title, FormModal } from './App.styled';

export const App = () => {
  const [isModalShown, setIsModalShown] = useState(false);

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const getFilteredContacts = () =>
    contacts.filter(({ name }) => name.toLowerCase().includes(filter));

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

  const contactsToShow = getFilteredContacts();

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
        {contactsToShow.length ? (
          <ContactList contacts={contactsToShow} />
        ) : (
          <Message text="There are no contacts here" />
        )}
      </div>
    </Container>
  );
};
