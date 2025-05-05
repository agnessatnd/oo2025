import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Result } from "../models/Result";
import { Athlete } from "../models/Athlete";

function EditResult() {
    const { resultId } = useParams();
    const [result, setResult] = useState<Result>();
    const [athletes, setAthletes] = useState<Athlete[]>([]);
    const [selectedEvent, setSelectedEvent] = useState("");
    const [selectedAthleteId, setSelectedAthleteId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/athletes')
            .then(res => res.json())
            .then(json => setAthletes(json));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/results/' + resultId)
            .then(res => res.json())
            .then(json => {
                setResult(json);
                setSelectedEvent(json.event);
                setSelectedAthleteId(json.athlete?.id);
            });
    }, [resultId]);
    

    const eventRef = useRef<HTMLSelectElement>(null);
    const performanceRef = useRef<HTMLInputElement>(null);
    const pointsRef = useRef<HTMLInputElement>(null);
    const athleteRef = useRef<HTMLSelectElement>(null); 

    const EditResult = () => {
        const updatedResult = {
            id: resultId,
            event: eventRef.current?.value,
            performance: performanceRef.current?.value,
            points: Number(pointsRef.current?.value),
            athlete: {"id": Number(athleteRef.current?.value) }
        };

        fetch("http://localhost:8080/results", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedResult),
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.message && json.timestamp && json.status) {
                    toast.error(json.message);
                } else {
                    navigate("/manage/results");
                    toast.success("Tulemus muudetud!");
                }
            })
            .catch(() => toast.error("Midagi läks valesti salvestamisel."));
    };

    return (
        <div>
            <h3>Tulemuse muutmine</h3>

            <label>Võistlusala</label> <br />
            <select ref={eventRef} value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
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
            <input ref={performanceRef} defaultValue={result?.performance} type="text" /> <br />
            <label>Punktid</label> <br />
            <input ref={pointsRef} defaultValue={result?.points} type="number" /> <br />
            <label>Sportlane</label> <br />
            <select ref={athleteRef} value={selectedAthleteId} onChange={(e) => setSelectedAthleteId(e.target.value)}>
                {athletes.map((athlete) => (
                    <option key={athlete.id} value={athlete.id}>
                        {athlete.name}
                    </option>
                ))}
            </select> <br /><br />

            <button onClick={() => EditResult()}>Salvesta</button>
        </div>
    );
}

export default EditResult;
