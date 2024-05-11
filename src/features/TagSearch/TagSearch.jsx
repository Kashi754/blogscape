import { useEffect, useRef, useState } from 'react';
import { axiosInstance } from '../../API/axiosBaseQuery';
import { Pill } from './Pill';
import SearchIcon from '@mui/icons-material/Search';
import { mirage } from 'ldrs';
import './TagSearch.css';
import { useNavigate } from 'react-router';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { sanitizeInput } from '../../utils/sanitizeInput';

mirage.register();

export function TagSearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryString = searchParams.get('q') || '';
  const regex = /#[^\s#]+/g;
  const hashTags = queryString.match(regex) || [];
  const tagObjects =
    hashTags.length > 0 ? hashTags.map((tag) => ({ name: tag })) : [];
  const remainingString = queryString.replace(regex, '').trim();
  const [searchTerm, setSearchTerm] = useState(remainingString);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTags, setSelectedTags] = useState(tagObjects);
  const [selectedTagsSet, setSelectedTagsSet] = useState(
    hashTags.length > 0 ? new Set(hashTags) : new Set()
  );
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    const fetchTags = async () => {
      setActiveSuggestion(0);
      const term = searchTerm.trim();

      if (term === '') {
        setSuggestions([]);
        return;
      }

      let data;

      if (term.length === 1 && term !== '#') {
        setLoadingSuggestions(true);
        try {
          const result = await axiosInstance.get(`/v1/tags?startsWith=${term}`);
          data = result.data;
        } catch (axiosError) {
          console.error(axiosError);
        }
      } else if (term.length === 2 && term.startsWith('#')) {
        setLoadingSuggestions(true);
        try {
          const result = await axiosInstance.get(
            `/v1/tags?startsWith=${term.slice(1)}`
          );
          data = result.data;
        } catch (axiosError) {
          console.error(axiosError);
        }
      } else {
        return;
      }

      setSuggestions(data.filter((tag) => !selectedTagsSet.has(tag.name)));
      setLoadingSuggestions(false);
    };

    fetchTags();
  }, [searchTerm, selectedTagsSet]);

  const handleSelectTag = (tag) => {
    setSelectedTags([...selectedTags, tag]);
    setSelectedTagsSet(new Set([...selectedTagsSet, tag.name]));
    setSearchTerm('');
    setSuggestions([]);
    inputRef.current.focus();
  };

  const handleRemoveTag = (tag) => {
    const updatedTags = selectedTags.filter(
      (selectedTag) => selectedTag.name !== tag.name
    );
    setSelectedTags(updatedTags);

    const updatedNames = new Set(selectedTagsSet);
    updatedNames.delete(tag.name);
    setSelectedTagsSet(updatedNames);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === 'Backspace' &&
      e.target.value === '' &&
      selectedTags.length > 0
    ) {
      const lastTag = selectedTags[selectedTags.length - 1];
      handleRemoveTag(lastTag);
      setSuggestions([]);
    } else if (e.key === 'ArrowDown' && suggestions?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === 'ArrowUp' && suggestions?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (
      (e.key === 'Enter' || e.key === 'Tab') &&
      activeSuggestion >= 0 &&
      activeSuggestion < suggestions.length
    ) {
      e.preventDefault();
      handleSelectTag(suggestions[activeSuggestion]);
      setActiveSuggestion(-1);
    } else if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let search;
    if (selectedTags.length > 0) {
      search = selectedTags.map((tag) => tag.name).join(' ');
    }
    if (searchTerm) {
      search = search + ' ' + searchTerm;
    }
    const sanitized = sanitizeInput(search, false);
    navigate({
      pathname: '/search',
      search: createSearchParams({ q: sanitized }).toString(),
    });
  };

  return (
    <div className='tag-search-container'>
      <div
        className='tag-search-input'
        onClick={() => inputRef.current.focus()}
      >
        {/* Pills */}
        {selectedTags.map((tag) => (
          <Pill
            key={tag.name}
            text={`${tag.name}`}
            onClick={() => handleRemoveTag(tag)}
          />
        ))}
        {/* input field with search suggestions */}
        <input
          ref={inputRef}
          type='search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search...'
          onKeyDown={handleKeyDown}
          tabIndex={1}
        />
        {/* Search Suggestions */}
        {searchTerm &&
          ((suggestions.length > 0 && !loadingSuggestions && (
            <ul className='suggestions-list'>
              {suggestions?.map((tag, index) => {
                return !selectedTagsSet.has(tag.name) ? (
                  <li
                    className={index === activeSuggestion ? 'active' : ''}
                    key={tag.name + index}
                    onClick={() => handleSelectTag(tag)}
                  >
                    <span>{tag.name}</span>
                  </li>
                ) : (
                  <></>
                );
              })}
            </ul>
          )) ||
            (loadingSuggestions && (
              <div className='suggestions-list suggestions-loader'>
                <l-mirage
                  size='150'
                  speed='2.5'
                  color='var(--accent-color)'
                />
              </div>
            )))}
      </div>
      <button
        type='button'
        id='search-btn'
        className='btn btn-primary'
        onClick={handleSearch}
      >
        <SearchIcon />
      </button>
    </div>
  );
}
