import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { editContact } from 'redux/slices/contactsSlice';

import {
  Table,
  TableRow,
  TableTitleCell,
  TableHeader,
} from './ContactList.styled';
import { FormModal } from 'components/App/App.styled';
import { ContactForm } from 'components/ContactForm';
import { ContactItem } from 'components/ContactItem';

export const ContactList = ({ contacts }) => {
  const [isEditModalShown, setIsEditModalShown] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    closeModal();
  }, [contacts]);

  const openModal = id => {
    setIsEditModalShown(true);
    setEditItemId(id);
  };

  const closeModal = () => {
    setIsEditModalShown(false);
  };

  const handleEditContact = data => {
    dispatch(editContact(data));
  };

  const findContactByName = nameValue => {
    return contacts.find(contact => {
      return nameValue === contact.name && contact.id !== editItemId;
    });
  };

  const findContactByNumber = numberValue => {
    return contacts.find(contact => {
      return numberValue === contact.number && contact.id !== editItemId;
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <th>Names</th>
            <th>Phone Number</th>
            <TableTitleCell>Edit</TableTitleCell>
            <TableTitleCell>Delete</TableTitleCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {contacts.map(({ name, number, id }) => (
            <TableRow key={id}>
              <ContactItem
                id={id}
                name={name}
                number={number}
                openModal={openModal}
              />
            </TableRow>
          ))}
        </tbody>
      </Table>
      {isEditModalShown && (
        <FormModal onClose={closeModal}>
          <ContactForm
            handleContactChange={handleEditContact}
            findContactByName={findContactByName}
            findContactByNumber={findContactByNumber}
            initialValues={contacts.find(({ id }) => id === editItemId)}
          />
        </FormModal>
      )}
    </>
  );
};
