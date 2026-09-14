import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  db,
  doc,
  getDoc,
} from "../../services/firebase";
import Review from "../common/Review/Review";
import DoctorInfoCard from "./DoctorInfoCard/DoctorInfoCard";
import ReviewsTable from "./ReviewsTable/ReviewsTable";

import "./Overview.css";

const Overview = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const docRef = doc(db, "doctors", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDoctor({
            id: docSnap.id,
            ...docSnap.data(),
          });
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleAddReview = () => {
    setDialogMode("add");
    setSelectedReview(null);
    setDialogOpen(true);
  };

  const handleViewReview = (review) => {
    setDialogMode("view");
    setSelectedReview(review);
    setDialogOpen(true);
  };

  const handleReviewSaved = (newReview) => {
    setDoctor((prev) => ({
      ...prev,
      reviews: [
        ...(prev.reviews || []),
        newReview,
      ],
    }));

    setDialogOpen(false);
  };

  if (!doctor) {
    return (
      <p className="overview-loading">
        Loading...
      </p>
    );
  }

  return (
    <div className="overview-page">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ←
      </button>

      <DoctorInfoCard
        doctor={doctor}
        onAddReview={handleAddReview}
      />

      <h2>Reviews</h2>

      <ReviewsTable
        reviews={doctor.reviews}
        onView={handleViewReview}
      />

      <Review
        open={dialogOpen}
        mode={dialogMode}
        doctorId={id}
        review={selectedReview}
        onClose={() => setDialogOpen(false)}
        onSaved={handleReviewSaved}
      />
    </div>
  );
};

export default Overview;