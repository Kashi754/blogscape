import { Button, Form, InputGroup } from 'react-bootstrap';
import './BlogSearch.css';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { sanitizeInput } from '../../utils/sanitizeInput';
import { useNavigate } from 'react-router';
import { createSearchParams } from 'react-router-dom';

export function BlogSearch() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const sanitized = sanitizeInput(search);
    console.log(sanitized);
    navigate({
      pathname: '/search',
      search: createSearchParams({ q: search }).toString(),
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
      <InputGroup size='lg'>
        <Form.Control
          aria-label='search input'
          aria-describedby='search-button'
          value={search}
          placeholder='Search...'
          onChange={(e) => setSearch(e.target.value)}
        />
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
