export function Pill({ text, onClick }) {
  return (
    <span
      className='tag-pill'
      data-test='tag-pill'
    >
      {text}
      <span
        className='tag-pill-remove'
        onClick={onClick}
        aria-roledescription='Remove tag'
        data-test='tag-pill-remove'
      >
        ×
      </span>
    </span>
  );
}
