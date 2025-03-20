import "./Sponsors.css";
import Banner from "../../components/banner/Banner.jsx";
import Sponsor from "../../components/sponsor/Sponsor.jsx";
import { sponsorsData } from "../../services/sponsorsData";

function Sponsors() {
  return (
    <>
      <Banner title="Patrocinadores" />
      <div className="sponsors-container">
        {sponsorsData.map((sponsor) => (
          <Sponsor
            key={sponsor.id}
            sponsorId={sponsor.id}
            sponsorDescription={sponsor.description}
            sponsorImage={sponsor.image}
          />
        ))}
      </div>
    </>
  );
}

export default Sponsors;
