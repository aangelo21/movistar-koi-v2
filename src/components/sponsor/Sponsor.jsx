import "./Sponsor.css";

function Sponsor({ sponsorDescription, sponsorImage }) {
  return (
    <div className="sponsor">
      <img
        src={sponsorImage}
        alt="sponsor"
        className="sponsor-image"
      />
      <p className="sponsor-description">{sponsorDescription}</p>
    </div>
  );
}

export default Sponsor;