import "./Competitions.css";
import Banner from "../../components/banner/Banner.jsx";
import Competition from "../../components/competition/Competition.jsx";
import { competitionsData } from "../../services/competitionsData";

function Competitions() {
  return (
    <>
      <Banner title="Competiciones" />
      <div className="competitions-container">
        {competitionsData.map((competition, index) => (
          <Competition
            key={index}
            competitionDescription={competition.description}
            competitionImage={competition.image}
          />
        ))}
      </div>
    </>
  );
}

export default Competitions;
