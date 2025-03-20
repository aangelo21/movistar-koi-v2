import { useEffect } from "react";
import "./Sponsors.css";
import Banner from "../../components/banner/Banner.jsx";
import Sponsor from "../../components/sponsor/Sponsor.jsx";
import { sponsorsData } from "../../services/sponsorsData";

function Sponsors() {
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <>
      <Banner title="Patrocinadores" />
      <div className="sponsors-container">
        {sponsorsData.map((sponsor, index) => (
          <div id={sponsor.id} key={index}>
            <Sponsor
              sponsorDescription={sponsor.description}
              sponsorImage={sponsor.image}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Sponsors;
