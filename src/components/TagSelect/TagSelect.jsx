import CreatableSelect from 'react-select/creatable';
import { sanitizeInput } from '../../utils/sanitizeInput';

const styles = {
  clearIndicator: (provided) => ({
    ...provided,
    color: 'red',
    cursor: 'pointer',
    ':hover': {
      color: 'var(--accent-color)',
    },
  }),
  container: (provided) => ({
    ...provided,
    border: 'var(--border-style)',
    borderRadius: '3px',
    ':has(.select__menu)': {
      border: '1px solid var(--accent-color)',
    },
    flexGrow: '1',
  }),
  control: (provided) => ({
    ...provided,
    width: '100%',
    zIndex: '0',
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
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'var(--secondary-color)',
    borderRadius: '3px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'var(--accent-color)',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'red',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'var(--accent-color)',
    },
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
};

export function TagSelect({ tagsData, form, setForm, addTag }) {
  const { tags, isLoading, isError } = tagsData;

  const options = tags.map((tag) => ({
    value: tag.id,
    label: tag.title,
  }));

  const handleCreate = async (inputValue) => {
    // TODO: Implement with RTK Query
    const sanitized = sanitizeInput(inputValue);
    const newOption = await addTag(sanitized);
    setForm((prev) => ({
      ...prev,
      tags: [...prev.tags, newOption],
    }));
  };

  const handleChange = (newValue) => {
    setForm((prev) => ({
      ...prev,
      tags: newValue.map((tag) => {
        return { id: tag.value, name: tag.label };
      }),
    }));
  };

  return (
    <>
      <CreatableSelect
        id='tags'
        isClearable
        isMulti
        onChange={handleChange}
        onCreateOption={handleCreate}
        value={form.tags.map((tag) => ({
          value: tag.id,
          label: tag.name,
        }))}
        isDisabled={isLoading}
        isLoading={isLoading}
        name='categories'
        options={options}
        styles={styles}
        className='basic-multi-select'
        classNamePrefix='select'
        placeholder='Select or add tags...'
      />
    </>
  );
}
