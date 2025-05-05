import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Athlete } from "../models/Athlete";
import { toast } from "react-toastify";

function EditAthlete() {

    const {athleteId} = useParams();
    const [athlete, setAthlete] = useState<Athlete>();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/athletes/' + athleteId)
            .then(res => res.json())
            .then(json => setAthlete(json));
    }
    , [athleteId]);

    const nameRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const pointsRef = useRef<HTMLInputElement>(null);

    const EditAthlete = () => {
        const updatedAthlete = {
            id: athleteId,
            name: nameRef.current?.value,
            country: countryRef.current?.value,
            age: Number(ageRef.current?.value),
            totalPoints: Number(pointsRef.current?.value)
        }
        fetch("http://localhost:8080/athletes", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedAthlete),
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.message && json.timestamp && json.status) {
                    toast.error(json.message);
                }
                else {
                    navigate("/manage/athletes");
                    toast.success("Sportlane muudetud!");
                }
            })
    }

    return (
      <div>
        <h3>Sportlase andmete muutmine</h3>
        <label>Nimi</label> <br />
        <input ref={nameRef} defaultValue={athlete?.name} type="text" /> <br />
        <label>Riik</label> <br />
        <input ref={countryRef} defaultValue={athlete?.country} type="text" /> <br />
        <label>Vanus</label> <br />
        <input ref={ageRef} defaultValue={athlete?.age} type="number" /> <br />
        <label>Punktid kokku</label> <br />
        <input ref={pointsRef} defaultValue={athlete?.totalPoints} type="number" /> <br /> <br />
        <button onClick={() => EditAthlete()}>Salvesta</button>
      </div>
    );
  }
  
  export default EditAthlete;