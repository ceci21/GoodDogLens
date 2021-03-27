import React, { useState } from 'react';
import { Field, Control, Label, Input } from 'react-bulma-components/lib/components/form';

const Filter = ({ updateQuery }) => {
  const [query, setQuery] = useState('');

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setQuery(() => {
      updateQuery(value);
      return value;
    });
  };

  return (
    <div className="filter">
      <div className="filter-inner">
        <Field>
          <Label>Filter results by breed name</Label>
          <Control>
            <Input
              onChange={onChangeHandler}
              type="text"
              placeholder="E.g. 'Dalmation'"
              value={query}
            />
          </Control>
        </Field>
      </div>
    </div>
  );
};

export default Filter;
