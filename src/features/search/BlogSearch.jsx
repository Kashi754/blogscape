import { Button, Form, InputGroup } from 'react-bootstrap';
import './BlogSearch.css';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useRef, useState } from 'react';
import { sanitizeInput } from '../../utils/sanitizeInput';
import { useNavigate } from 'react-router';
import { createSearchParams, useSearchParams } from 'react-router-dom';

export function BlogSearch() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const navigate = useNavigate();
  const searchRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    const sanitized = sanitizeInput(search, false);
    navigate({
      pathname: '/search',
      search: createSearchParams({ q: sanitized }).toString(),
    });
  };

  const formStyle = {
    width: 'max(25vw, 200px)',
  };

  return (
    <Form
      className='search-form'
      onSubmit={handleSearch}
      style={formStyle}
    >
      <InputGroup
        size='lg'
        className='search-input-group'
      >
        <Form.Control
          type='search'
          className='search-input'
          aria-label='search input'
          aria-describedby='search-button'
          value={search}
          placeholder='Search...'
          onChange={(e) => setSearch(e.target.value)}
          ref={searchRef}
        />
        <button
          className='clear-button'
          variant='secondary'
          type='button'
          id='clear-button'
          onClick={() => {
            setSearch('');
            searchRef.current.focus();
          }}
        >
          <ClearIcon />
        </button>
        <Button
          variant='primary'
          type='submit'
          id='search-button'
        >
          <SearchIcon />
        </Button>
      </InputGroup>
    </Form>
  );
}
