import { useEffect } from 'react';

export default function useAutosizeTextArea(textAreaRef, value) {
  const resizeTextArea = () => {
    // Reset height to get the correct scrollHeight
    textAreaRef.current.style.height = 'auto';
    const scrollHeight = textAreaRef.current.scrollHeight;
    // We need to set the height directly outside of the render method
    textAreaRef.current.style.height = scrollHeight + 'px';
  };

  useEffect(resizeTextArea, [value]);
}
