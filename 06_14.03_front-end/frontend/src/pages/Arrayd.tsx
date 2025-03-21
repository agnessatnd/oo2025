function Arrayd() {
    const sonad = ["Elas", "metsas", "mutionu"];
    const autod = [
        {"mark": "BMW", "mudel": "i5", "year": 2015},
        {"mark": "Audi", "mudel": "TT", "year": 2016},
        {"mark": "Mercedes", "mudel": "S", "year": 2014},
        {"mark": "VW", "mudel": "Golf", "year": 2012}
    ];
  return (
    <div>
        {sonad.map(sona =>
        <div key={sona}>
            {sona}
        </div>)}
        <br></br>

        {autod.map(auto =>
        <div key={auto.mark+auto.mudel}>
            {auto.mark} - {auto.mudel} ({auto.year})
        </div>)} 
    </div>
  )
}

export default Arrayd
