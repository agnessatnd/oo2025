import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Athlete } from "../models/Athlete";

function SingleAthlete() {

    const { athleteId } = useParams();
    const [athlete, setAthlete] = useState<Athlete>();

    useEffect(() => {
        fetch('http://localhost:8080/athletes/' + athleteId)
            .then(res => res.json())
            .then(json => setAthlete(json));
    }, [athleteId]);
    

  return (
    <div>
        <h3>Sportlane</h3>
            <div>
            <p>Nimi: {athlete?.name}</p>
            <p>Riik: {athlete?.country}</p>
            <p>Vanus: {athlete?.age}</p>
            <p>Punktid kokku: {athlete?.totalPoints}</p>
            </div>
    </div>
  )
}

export default SingleAthlete;
