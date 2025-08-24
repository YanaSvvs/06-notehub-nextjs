'use client';
import css from './error.module.css';
import { useEffect } from 'react'; 

type ErrorProps = {
  error: Error & { digest?: string }; 
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  
  useEffect(() => {
    
    console.error(error);
  }, [error]);

  return (
    
    <div className={css.container}>
      <p className={css.text}>
        Could not fetch the list of notes. {error.message}
      </p>
      <button className={css.reset} onClick={reset}>
        reset
      </button>
    </div>
  );
};

export default Error;