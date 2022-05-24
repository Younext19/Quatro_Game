import React from "react";
import { images, data } from "../../constants";
import "./Rules.css";

const AwardCard = ({ award: { imgUrl, title, subtitle } }) => (
  <div className="app__laurels_awards-card">
    <img src={imgUrl} alt="award" />
    <div className="app__laurels_awards-card_content">
      <p className="p__cormorant" style={{ color: "#DCCA87" }}>
        {title}
      </p>
      <p className="p__cormorant">{subtitle}</p>
    </div>
  </div>
);

const Rules = () => (
  <div className="app__bg app__wrapper section__padding" id="awards">
    <div className="app__wrapper_info">
      <h1 className="headtext__cormorant">Règles</h1>
      <div className="app__laurels_awards">
        {data.awards.map((award) => (
          <AwardCard award={award} key={award.title} />
        ))}
      </div>
    </div>
  </div>
);

export default Rules;
