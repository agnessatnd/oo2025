import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Word } from '../models/Word';
import { Manager } from '../models/Manager';

function SingleManager() {
  const { ManagerId } = useParams();
  const [words, setWords] = useState<Word[]>([]);
  const [manager, setManager] = useState<Manager>();

  useEffect(() => {
    if (!ManagerId) return;

    fetch(`http://localhost:8080/manager/${ManagerId}`)
      .then(res => res.json())
      .then(json => setManager(json));

    fetch(`http://localhost:8080/words-manager?managerId=${ManagerId}`)
      .then(res => res.json())
      .then(json => setWords(json.content || json)); 
  }, [ManagerId]);

  return (
    <div>
      <h2>Sõnad haldajalt: {manager?.name}</h2>
      {words.map(word => (
        <div key={word.id}>
          <strong>{word.type}</strong> – {word.description}
        </div>
      ))}
    </div>
  );
}

export default SingleManager;
