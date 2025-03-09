import "./Sponsors.css";
import Sponsor from "../../components/sponsor/Sponsor.jsx";
import { sponsorsData } from "../../services/sponsorsData";

function Sponsors() {
  return (
    <div className="sponsors-container">
      {sponsorsData.map((sponsor, index) => (
        <Sponsor
          key={index}
          sponsorDescription={sponsor.description}
          sponsorImage={sponsor.image}
        />
      ))}
    </div>
  );
}

export default Sponsors;