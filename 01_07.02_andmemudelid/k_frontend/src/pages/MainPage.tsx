import { useCallback, useEffect,  useRef,  useState } from "react";
import { Result } from "../models/Result";
import { Link } from 'react-router-dom';

function MainPage(){
    const [results, setResults] = useState<Result[]>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [resultByPage, setResultByPage] = useState(1);
    const [page, setPage] = useState(0);
    const [sort, setSort] = useState("id,asc");
    const [activeResult, setActiveResult] = useState(-1);
    const [countries, setCountries] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/results")
          .then(res => res.json())
          .then((json: Result[]) => {
            const uniqueCountries = [...new Set(json.map(r => r.athlete.country))];
            setCountries(uniqueCountries);
          });
      }, []);
      

      const showByResult = useCallback((athleteId: number, currentPage: number) => {
        setActiveResult(athleteId);
        setPage(currentPage);
      
        let url = "http://localhost:8080/athlete-results?";
        if (selectedCountry) {
          url += `country=${selectedCountry}&`;
        } else if (athleteId !== -1) {
          url += `athleteId=${athleteId}&`;
        }
      
        url += `size=${resultByPage}&page=${currentPage}&sort=${sort}`;
      
        fetch(url)
          .then(res => res.json())
          .then(json => {
            setResults(json.content);
            setTotalResults(json.totalElements);
            setTotalPages(json.totalPages);
          });
      }, [resultByPage, sort, selectedCountry]);
      

      useEffect(() => {
        showByResult(activeResult, 0);
      }, [showByResult, activeResult, resultByPage]);
    
      function updatePage(newPage: number) {
        showByResult(activeResult, newPage);
      }

      const athletesByPageRef = useRef<HTMLSelectElement>(null);

    return(
        <div>
            <button onClick={() => setSort("id,asc")}>Sorteeri vanemad enne</button>
            <button onClick={() => setSort("id,desc")}>Sorteeri uuemad enne</button>
            <button onClick={() => setSort("athlete.name,asc")}>Sorteeri sportlase nime A-Z</button>
            <button onClick={() => setSort("athlete.name,desc")}>Sorteeri sportlase nime Z-A</button>


            <select ref={athletesByPageRef}
            onChange={() => setResultByPage(Number(athletesByPageRef.current?.value))}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <select onChange={(e) => setSelectedCountry(e.target.value || null)}>
                <option value="">Kõik riigid</option>
                {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>
            <br />
            <br />
            <div>Tulemusi kokku: {totalResults}</div>
            <div>
                {results.map((result => 
                    <div key={result.id}>
                        <p>Sportlane: {result.athlete.name}</p>
                        <p>Riik: {result.athlete.country}</p>
                        <p>Vanus: {result.athlete.age}</p>
                        <p>Võistlusala: {result.event}</p>
                        <p>Sooritus: {result.performance}</p>
                        <p>Punktid: {result.points}</p>
                        <p>Sportlase punktid kokku: {result.athlete.totalPoints}</p>
                        <Link to={"/result/" + result.id}>
                            <button>Vt tulemust</button>
                        </Link> <br /> <br />
                        {result.athlete && result.athlete.id && (
                            <Link to={"/athlete/" + result.athlete.id}>
                                <button>Vt sportlast</button>
                            </Link>
                        )}

                    </div>))}
                    <button disabled={page === 0} onClick={() => updatePage(page - 1)}>Eelmine</button>
                    <span>{page + 1}</span>
                    <button disabled={page === totalPages} onClick={() => updatePage(page + 1)}>Järgmine</button>  
            </div>
        </div>

        
    )
}

export default MainPage;