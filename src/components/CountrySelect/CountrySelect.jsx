import { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';

const theme = (theme) => ({
  ...theme,
  color: {
    ...theme.colors,
    primary: 'var(--accent-color)',
  },
});

const styles = {
  container: (provided) => ({
    ...provided,
    border: '1px solid #bdbdbd',
    borderRadius: '3px',
    ':has(.select__menu)': {
      border: '2px solid var(--accent-color)',
    },
  }),
  control: (provided) => ({
    ...provided,
    width: '100%',
    borderRadius: '3px',
    border: 'none',
    borderColor: 'none',
    boxShadow: 'none',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'var(--primary-color)',
    fontWeight: 'bold',
    cursor: 'pointer',
    ':hover': {
      color: 'var(--accent-color)',
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: 'var(--accent-color)',
  }),
  input: (provided) => ({
    ...provided,
    color: 'var(--secondary-color)',
  }),
  loadingIndicator: (provided) => ({
    ...provided,
    color: 'var(--purple-placeholder)',
  }),
  loadingMessage: (provided) => ({
    ...provided,
    color: 'var(--purple-placeholder)',
  }),
  menuList: (provided) => ({
    ...provided,
    border: '1px solid var(--accent-color)',
    borderRadius: '3px',
    boxShadow: 'var(--shadow)',
    padding: '1vw',
    maxHeight: '225px',
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    color: 'var(--purple)',
  }),
  option: (provided, { isDisabled, isFocused }) => ({
    ...provided,
    backgroundColor: isDisabled
      ? undefined
      : isFocused
      ? 'var(--accent-color)'
      : undefined,
    color: isDisabled
      ? 'var(--primary-color-alt)'
      : isFocused
      ? 'var(--secondary-color)'
      : 'var(--primary-color)',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    borderRadius: '3px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'rgba(0, 55, 58, 0.75)',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--secondary-color)',
  }),
};

export function CountrySelect({ defaultCountry, formId, onChange }) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [defaultValue, setDefaultValue] = useState(null);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const loadOptions = async () => {
    const res = await fetch(
      'https://valid.layercode.workers.dev/list/countries?format=select&flags=true'
    );

    const data = await res.json();
    !defaultValue &&
      setDefaultValue(
        data.countries.find(
          (c) => c.value === defaultCountry || c.value === data.userCountryCode
        )
      );

    return data.countries;
  };

  const handleCountryChange = (country) => {
    setSelectedValue(country);
    onChange({
      target: {
        name: 'location',
        value: country.label.split(' ')[1],
      },
    });
    onChange({
      target: {
        name: 'locationCode',
        value: country.value,
      },
    });
  };

  const filterOption = (country, input) => {
    if (input) {
      return (
        country.label.toLowerCase().includes(input.toLowerCase()) ||
        country.value === input
      );
    }
    return true;
  };

  return (
    <AsyncSelect
      form={formId}
      name='country'
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      filterOption={filterOption}
      placeholder='Select a country'
      blurInputOnSelect
      closeMenuOnSelect
      aria-label='Select a country'
      value={selectedValue}
      onChange={handleCountryChange}
      styles={styles}
      theme={theme}
      className='async-select'
      classNamePrefix='select'
    />
  );
}
