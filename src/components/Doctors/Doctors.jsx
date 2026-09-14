import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  db,
  collection,
  getDocs,
} from "../../services/firebase";

import SearchDoctors from "./Search/SearchDoctors";
import DoctorTable from "./DoctorTable/DoctorTable";
import Review from "../common/Review/Review";
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const [searchValues, setSearchValues] = useState({
    name: "",
    specialization: null,
    region: null,
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeDoctor, setActiveDoctor] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "doctors")
        );

        const doctorsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const searchResults = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesName =
        !searchValues.name ||
        doctor.name
          ?.toLowerCase()
          .includes(searchValues.name.toLowerCase());

      const matchesSpecialization =
        !searchValues.specialization ||
        doctor.specialization === searchValues.specialization;

      const matchesRegion =
        !searchValues.region ||
        doctor.region === searchValues.region;

      return (
        matchesName &&
        matchesSpecialization &&
        matchesRegion
      );
    });
  }, [doctors, searchValues]);

  const handleOverview = (doctor) => {
    navigate(`/doctor/${doctor.id}`);
  };

  const handleReview = (doctor) => {
    setActiveDoctor(doctor);
    setDialogOpen(true);
  };

  const handleReviewSaved = (newReview) => {
    setDoctors((prev) =>
      prev.map((doctor) =>
        doctor.id === activeDoctor.id
          ? {
              ...doctor,
              reviews: [
                ...(doctor.reviews || []),
                newReview,
              ],
            }
          : doctor
      )
    );

    setDialogOpen(false);
  };

  return (
    <div className="doctors-page">
      <h1>Doctors</h1>

      <p>
        Number of doctors: {searchResults.length}
      </p>

      <SearchDoctors
        doctors={doctors}
        onSearch={setSearchValues}
      />

      <DoctorTable
        doctors={searchResults}
        onOverview={handleOverview}
        onReview={handleReview}
      />

      <Review
        open={dialogOpen}
        mode="add"
        doctorId={activeDoctor?.id}
        review={null}
        onClose={() => setDialogOpen(false)}
        onSaved={handleReviewSaved}
      />
    </div>
  );
};

export default Doctors;