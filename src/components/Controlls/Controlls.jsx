import { TextButton } from 'components/TextButton';
import { FilterContacts } from 'components/FilterContacts';
import { PhonebookControlls } from './Controlls.styled';

export const Controlls = ({ toggleModal }) => {
  return (
    <PhonebookControlls>
      <FilterContacts />
      <TextButton type="button" onClick={toggleModal} text="Add contact" />
    </PhonebookControlls>
  );
};
