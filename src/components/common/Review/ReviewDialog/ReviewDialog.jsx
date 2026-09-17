import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import Rating from "@mui/material/Rating";

import "./ReviewDialog.css";
import "../../Dialog/Dialog.css";
import Dialog from "../../Dialog/Dialog";

const ReviewDialog = ({
  open,
  mode,
  review,
  saving,
  onClose,
  onSave,
}) => {
  const [stars, setStars] = useState(0);
  const [notes, setNotes] = useState("");

  const readOnly = useMemo(
    () => mode === "view",
    [mode]
  );

  useEffect(() => {
    if (open) {
      setStars(review?.stars || 0);
      setNotes(review?.notes || "");
    }
  }, [open, review]);

  const handleSave = useCallback(() => {
    onSave({
      stars,
      notes,
      date: new Date().toISOString(),
    });
  }, [onSave, stars, notes]);

  return (
    <Dialog
      open={open}
      title={readOnly ? "View Review" : "Review"}
      onClose={onClose}
      onSave={handleSave}
      saving={saving}
      showSave={!readOnly}
    >
      <div className="review-dialog-content">
        <Rating
          value={stars}
          onChange={(event, newValue) =>
            setStars(newValue)
          }
          readOnly={readOnly}
          size="large"
        />

        <textarea
          className="review-notes"
          placeholder={
            readOnly
              ? ""
              : "Your notes (optional)"
          }
          value={notes}
          onChange={(event) =>
            setNotes(event.target.value)
          }
          readOnly={readOnly}
        />
      </div>
    </Dialog>
  );
};

export default ReviewDialog;

