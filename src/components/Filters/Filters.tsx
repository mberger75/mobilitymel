import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { FilterChoices, FilterKeys } from '@/types';

interface FiltersProps {
  filters: FilterChoices;
  setFilters: Dispatch<SetStateAction<FilterChoices>>;
}

export function Filters({ filters, setFilters }: FiltersProps) {
  const updateFilter = (e: ChangeEvent) => {
    const target = e.currentTarget as HTMLInputElement;

    setFilters((prevState: FilterChoices) => ({
      ...prevState,
      [target.id]: !filters[target.id as FilterKeys],
    }));
  };

  return (
    <section className='choices'>
      <h1 className='title'>Filtres</h1>
      <section className='input-group-wrapper'>
        <div className='input-group'>
          <label htmlFor='citiz'>Voitures</label>
          <input
            type='checkbox'
            name='citiz'
            id='citiz'
            checked={filters.citiz}
            onChange={updateFilter}
          />
        </div>
        <div className='input-group'>
          <label htmlFor='vlille'>V'Lille</label>
          <input
            type='checkbox'
            name='vlille'
            id='vlille'
            checked={filters.vlille}
            onChange={updateFilter}
          />
        </div>
        <div className='input-group'>
          <label htmlFor='chargingPoint'>Bornes de recharge</label>
          <input
            type='checkbox'
            name='chargingPoint'
            id='chargingPoint'
            checked={filters.point}
            onChange={updateFilter}
          />
        </div>
      </section>
    </section>
  );
}
