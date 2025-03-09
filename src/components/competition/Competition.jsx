import "./Competition.css";

function Competition({ competitionDescription, competitionImage }) {
  return (
    <div className="competition">
      <img
        src={competitionImage}
        alt="competition"
        className="competition-image"
      />
      <p className="competition-description">{competitionDescription}</p>
    </div>
  );
}

export default Competition;
