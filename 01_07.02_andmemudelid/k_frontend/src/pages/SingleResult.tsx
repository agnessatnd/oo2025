import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Result } from "../models/Result";

function SingleResult() {
    const {resultId} = useParams();
    const [result, setResult] = useState<Result>();

    useEffect(() => {
        fetch('http://localhost:8080/results/' + resultId)
            .then(res => res.json())
            .then(json => setResult(json))
    }, [resultId]);
  return (
    <div>
      <h3>Tulemus</h3>
        <div>
          <p>Sportlane: {result?.athlete?.name}</p>
          <p>Ala: {result?.event}</p>
          <p>Sooritus: {result?.performance}</p>
          <p>Punktid: {result?.points}</p>
        </div>
    </div>
    
  );
}

export default SingleResult;