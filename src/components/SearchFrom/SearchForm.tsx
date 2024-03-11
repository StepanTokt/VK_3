import { useRef, useState } from "react";
import "./styles.css";

interface Props {
  onChangeValue: (value: string) => void;
}

export function SearchForm(props: Props) {
  const [value, setValue] = useState('')
  const previousValueRef = useRef('');
  const [timeoutId, setTimeoutId] = useState(null);

  const noDigits = event => {
    const latinLetters = /^[A-Za-z]+$/;
    if (!latinLetters.test(event.key))
        event.preventDefault();
}


  const handleClick = () => {
    if (value !== previousValueRef.current) {
      props.onChangeValue(value);
      previousValueRef.current = value;
    }
  }

  const handleBlur = () => {
    if (timeoutId) clearTimeout(timeoutId)
    
    const id = setTimeout(() => {
      if (value !== previousValueRef.current) {
        props.onChangeValue(value);
        previousValueRef.current = value;
      }
    }, 3000) 

    setTimeoutId(id)
  }

 

  return (
    <div className="searchForm">
      <form>
        <input type="text" 
        value={value} 
        placeholder="Input name" 
        onChange={(e) => setValue(e.target.value)} 
        onKeyDown={(e) => noDigits(e)} 
        onBlur={handleBlur}/>
      </form>
      <button onClick={handleClick}>Click to find</button>
    </div>
  );
}
