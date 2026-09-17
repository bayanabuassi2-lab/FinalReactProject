import Button from "@mui/material/Button";

import AverageRating from "./AverageRating/AverageRating";

import "./DoctorInfoCard.css";

const DoctorInfoCard = ({ doctor, onAddReview }) => {
  return (
    <div className="overview-header">
      <div className="overview-info">
        <h1>{doctor.name}</h1>

        <p>
          <span className="info-label">Specialization</span>
          {doctor.specialization}
        </p>

        <p>
          <span className="info-label">Region</span>
          {doctor.region}
        </p>
      </div>

      <div className="overview-rating">
        <AverageRating reviews={doctor.reviews} />

        <Button variant="contained" onClick={onAddReview}>
          Review
        </Button>
      </div>
    </div>
  );
}

export default DoctorInfoCard;