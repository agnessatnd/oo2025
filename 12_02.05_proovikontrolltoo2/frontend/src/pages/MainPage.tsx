import { useCallback, useEffect, useState, useRef } from 'react'
import { Manager } from '../models/Manager'
import { Word } from '../models/Word'
import { Link } from 'react-router-dom';


function MainPage() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [wordsByPage, setWordsByPage] = useState(1);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("id,asc");
  const [activeManager, setActiveManager] = useState(-1);

  const wordsByPageRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/manager")
      .then(res => res.json())
      .then(json => setManagers(json));
  }, []);

  const showByManager = useCallback((managerId: number, currentPage: number) => {
    setActiveManager(managerId);
    setPage(currentPage);
    fetch(`http://localhost:8080/words-manager?managerId=${managerId}&size=${wordsByPage}&page=${currentPage}&sort=${sort}`)
      .then(res => res.json())
      .then(json => {
        setWords(json.content);
        setTotalWords(json.totalElements);
        setTotalPages(json.totalPages);
      });
  }, [wordsByPage, sort]);

  useEffect(() => {
    showByManager(activeManager, 0);
  }, [showByManager, activeManager, wordsByPage, sort]);
  

  function updatePage(newPage: number) {
    showByManager(activeManager, newPage);
  }

  return (
    <div>
      <h2>Sorteeri</h2>
      <button onClick={() => setSort("id,asc")}>Vanemad enne</button>
      <button onClick={() => setSort("id,desc")}>Uuemad enne</button>
      <button onClick={() => setSort("type,asc")}>A-Z</button>
      <button onClick={() => setSort("type,desc")}>Z-A</button>

      <h3>Sõnade arv lehel</h3>
      <select ref={wordsByPageRef} onChange={() => setWordsByPage(Number(wordsByPageRef.current?.value))}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>

      <h2>Haldajad</h2>
      <button onClick={() => showByManager(-1, 0)}>Kõik haldajad</button>
      {managers.map(manager =>
        <button key={manager.id} onClick={() => showByManager(manager.id, 0)}>
          {manager.name}
        </button>
      )}

      <h3>Kokku sõnu: {totalWords}</h3>
      {words.map(word =>
        <div key={word.id}>
          <strong>{word.type}</strong>
          <Link to={'/word/' + word.id}>
            <button>Vaata tähendust</button>
          </Link>
          <br />
          Haldaja: 
          <Link to={'/manager/' + word.manager?.id}>
            <button>{word.manager?.name}</button>
          </Link>
        </div>
      )}

      <button disabled={page === 0} onClick={() => updatePage(page - 1)}>Eelmine</button>
      <span> Leht {page + 1} </span>
      <button disabled={page + 1 >= totalPages} onClick={() => updatePage(page + 1)}>Järgmine</button>
    </div>
  )
}

export default MainPage;
