import "./Sponsor.css";

function Sponsor({ sponsorDescription, sponsorImage, sponsorId }) {
  return (
    <div className="sponsor" id={`sponsor-${sponsorId}`}>
      <img src={sponsorImage} alt={sponsorDescription} />
      <p>{sponsorDescription}</p>
    </div>
  );
}

export default Sponsor;