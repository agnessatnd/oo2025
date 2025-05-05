import { useEffect,  useState } from "react";
import { Result } from "../models/Result";
import { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Athlete } from "../models/Athlete";
import { Link } from "react-router-dom";

function ManageResults(){
    const [results, setResults] = useState<Result[]>([]);
    const [athletes, setAthletes] = useState<Athlete[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/results')
            .then(res => res.json())
            .then(json => setResults(json))
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/athletes')
            .then(res => res.json())
            .then(json => setAthletes(json))
    }, []);

    const handleDelete = (id: number) => {
        fetch(`http://localhost:8080/results/${id}`, {
          method: "DELETE",
        }).then(() => 
          setResults(results.filter(result => result.id !== id)));
        ;
      };

      const eventRef = useRef<HTMLSelectElement>(null);
      const performanceRef = useRef<HTMLInputElement>(null);
      const athleteRef = useRef<HTMLSelectElement>(null);

        const addResult = () => {
            const newResult = {
                event: eventRef.current?.value,
                performance: Number(performanceRef.current?.value),
                athleteId: Number(athleteRef.current?.value)
            }
    
            fetch('http://localhost:8080/results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newResult)
            })
            .then(res => res.json())
            .then(json => {
                if (json.message === undefined && json.timestamp === undefined && json.status === undefined){
                    setResults(json);
                    toast.success("Tulemus lisatud!");   
                }
                else {
                    toast.error(json.message);
                }
            })
        }

    return(
        <div>
            <h3>Halda tulemusi</h3>
            <label>Ala</label> <br />
            <select ref={eventRef}>
                <option value="100m jooks">100m jooks</option>
                <option value="kaugushüpe">Kaugushüpe</option>
                <option value="kuulitõuge">Kuulitõuge</option>
                <option value="kõrgushüpe">Kõrgushüpe</option>
                <option value="400m jooks">400m jooks</option>
                <option value="110m tõkkejooks">110m tõkkejooks</option>
                <option value="kettaheide">Kettaheide</option>
                <option value="teivashüpe">Teivashüpe</option>
                <option value="odavise">Odavise</option>
                <option value="1500m jooks">1500m jooks</option>
            </select> <br />
            <label>Tulemus</label> <br />
            <input ref={performanceRef} type="number" /> <br />
            <label>Sportlane</label> <br />
            <select ref={athleteRef}>
                {athletes.map(athlete =>
                    <option key={athlete.id} value={athlete.id}>{athlete.name}</option>
                )}
            </select> <br /><br />
            <button onClick={() => addResult()}>Lisa tulemus</button> <br />

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ala</th>
                        <th>Tulemus</th>
                        <th>Punktid</th>
                        <th>Sportlane</th>
                        <th>Kustuta</th>
                        <th>Muuda</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map(result => (
                        <tr key={result.id}>
                            <td>{result.id}</td>
                            <td>{result.event}</td>
                            <td>{result.performance}</td>
                            <td>{result.points}</td>
                            <td>{result.athlete?.name}</td>
                            <td>
                                <button onClick={() => handleDelete(result.id)}>Kustuta</button>
                            </td>
                            <td>
                                <Link to={"/manage/edit-result/" + result.id}>
                                    <button>Muuda</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    )
}

export default ManageResults;