import { useDispatch, useSelector } from 'react-redux';

import { getFilter } from 'redux/selectors';

import { FilterInput, FilterFormGroup } from './FilterContacts.styled';
import { setFilter } from 'redux/slices/filterSlice';

export const FilterContacts = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleFilterValueInput = ({ target: { value } }) => {
    value = value.toLowerCase();

    dispatch(setFilter(value));
  };

  return (
    <FilterFormGroup>
      Search:
      <FilterInput
        type="text"
        name="filter"
        onChange={handleFilterValueInput}
        value={filter}
      />
    </FilterFormGroup>
  );
};
