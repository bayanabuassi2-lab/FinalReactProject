import { useEffect, useState } from "react";

import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

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

  const readOnly = mode === "view";

  useEffect(() => {
    if (open) {
      setStars(review?.stars || 0);
      setNotes(review?.notes || "");
    }
  }, [open, review]);

  const handleSave = () => {
    onSave({
      stars,
      notes,
      date: new Date().toISOString(),
    });
  };

  const actions = () => {
    return (
      <>
        {!readOnly && (
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!stars || saving}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        )}

        <Button
          onClick={onClose}
          disabled={saving}
        >
          Close
        </Button>
      </>
    );
  };

  return (
    <Dialog
      open={open}
      title={readOnly ? "View Review" : "Review"}
      onClose={onClose}
      saving={saving}
      actions={actions()}
    >
      <div className="review-dialog-content">
        <Rating
          value={stars}
          onChange={(event, newValue) => setStars(newValue)}
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
          onChange={(event) => setNotes(event.target.value)}
          readOnly={readOnly}
        />
      </div>
    </Dialog>
  );
};

export default ReviewDialog;