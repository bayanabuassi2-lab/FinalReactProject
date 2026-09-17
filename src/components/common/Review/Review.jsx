import { useRef, useState } from "react";

import {
  db,
  doc,
  updateDoc,
  arrayUnion,
} from "../../../services/firebase";

import ReviewDialog from "./ReviewDialog/ReviewDialog";

const Review = ({
  open,
  mode,
  doctorId,
  review,
  onClose,
  onSaved,
}) => {
  const [saving, setSaving] = useState(false);

  const savingRef = useRef(false);

  const handleSave = async (newReview) => {
    if (savingRef.current || !doctorId) {
      return;
    }

    savingRef.current = true;
    setSaving(true);

    try {
      const docRef = doc(db, "doctors", doctorId);

      await updateDoc(docRef, {
        reviews: arrayUnion(newReview),
      });

      onSaved(newReview);
    } catch (error) {
      console.error("Error saving review:", error);
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  };

  return (
    <ReviewDialog
      open={open}
      mode={mode}
      review={review}
      saving={saving}
      onClose={onClose}
      onSave={handleSave}
    />
  );
};

export default Review;