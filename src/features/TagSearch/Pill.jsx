export function Pill({ text, onClick }) {
  return (
    <span className='tag-pill'>
      {text}
      <span
        className='tag-pill-remove'
        onClick={onClick}
      >
        ×
      </span>
    </span>
  );
}
