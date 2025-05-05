import { useEffect,  useRef,  useState } from "react";
import { Athlete } from "../models/Athlete";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";

function ManageAthletes(){
    const [athletes, setAthletes] = useState<Athlete[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/athletes')
            .then(res => res.json())
            .then(json => setAthletes(json))
    }, []);

    const handleDelete = (id: number) => {
        fetch(`http://localhost:8080/athletes/${id}`, {
          method: "DELETE",
        }).then(() => 
          setAthletes(athletes.filter(athlete => athlete.id !== id)));
        ;
      };

      const nameRef = useRef<HTMLInputElement>(null);
      const countryRef = useRef<HTMLInputElement>(null);
      const ageRef = useRef<HTMLInputElement>(null);

      const addAthlete = () => {
        const newAthlete = {
            name: nameRef.current?.value,
            country: countryRef.current?.value,
            age: Number(ageRef.current?.value)
        }

        fetch('http://localhost:8080/athletes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAthlete)
        })
        .then(res => res.json())
        .then(json => {
            if (json.message === undefined && json.timestamp === undefined && json.status === undefined){
                setAthletes(json);
                toast.success("Sportlane lisatud!");   
            }
            else {
                toast.error(json.message);
            }
        })
    }

    return(
        <div>
            <h3>Halda sportlaseid</h3>
            <label>Nimi</label> <br />
            <input ref={nameRef} type="text" /> <br />
            <label>Riik</label> <br />
            <input ref={countryRef} type="text" /> <br />
            <label>Vanus</label> <br />
            <input ref={ageRef} type="number" /> <br />
            <button onClick={() => addAthlete()}>Lisa sportlane</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nimi</th>
                        <th>Riik</th>
                        <th>Vanus</th>
                        <th>Kogupunktid</th>
                        <th>Kustuta</th>
                        <th>Muuda</th>
                    </tr>
                </thead>
                <tbody>
                    {athletes.map(athlete => (
                        <tr key={athlete.id}>
                            <td>{athlete.id}</td>
                            <td>{athlete.name}</td>
                            <td>{athlete.country}</td>
                            <td>{athlete.age}</td>
                            <td>{athlete.totalPoints}</td>
                            <td>
                                <button onClick={() => handleDelete(athlete.id)}>Kustuta</button>
                            </td>
                            <td>
                                <Link to={"/manage/edit-athlete/" + athlete.id}>
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

export default ManageAthletes;