import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Word } from '../models/Word';

function SingleWord() {
  const { wordId } = useParams();
  const [word, setWord] = useState<Word>();

  useEffect(() => {
    fetch(`http://localhost:8080/words/${wordId}`)
      .then(res => res.json())
      .then(json => setWord(json));
  }, [wordId]);

  return (
    <div>
      <h2>{word?.type}</h2>
      <p>{word?.description}</p>
    </div>
  );
}

export default SingleWord;
