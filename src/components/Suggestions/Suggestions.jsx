import { Link } from 'react-router-dom';

export function Suggestions({ blogsError, postsError }) {
  let suggestions = [];

  let hasBlogSuggestions =
    blogsError.data &&
    blogsError.data instanceof Array &&
    blogsError.data.length > 0;
  let hasPostSuggestions =
    postsError.data &&
    postsError.data instanceof Array &&
    postsError.data.length > 0;

  if (!hasBlogSuggestions && !hasPostSuggestions) {
    return (
      <h3 className='search-error-suggestion-header'>
        No results found. Please try again.
      </h3>
    );
  }

  if (hasBlogSuggestions) {
    suggestions.push(...blogsError.data);
  }

  if (hasPostSuggestions) {
    suggestions.push(...postsError.data);
  }

  if (hasBlogSuggestions && hasPostSuggestions) {
    const scoreMap = {};

    suggestions.forEach((suggestion) => {
      const { word, similarity } = suggestion;
      if (scoreMap[word]) {
        scoreMap[word] += similarity;
      } else {
        scoreMap[word] = similarity;
      }
    });

    suggestions = Object.keys(scoreMap).map((word) => ({
      word,
      similarity: scoreMap[word],
    }));

    suggestions.sort((a, b) => b.similarity - a.similarity);
  }

  return (
    <>
      <h3 className='search-error-suggestion-header'>
        No results found. Did you mean:
      </h3>
      <ul className='search-error-suggestions'>
        {suggestions.map((suggestion) => (
          <li
            key={'blog_suggestion_' + suggestion.word}
            className='search-error-suggestion'
          >
            <Link
              className='suggestion-link'
              to={`/search?q=${suggestion.word}`}
            >
              {suggestion.word}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
