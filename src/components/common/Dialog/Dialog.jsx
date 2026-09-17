import { useMemo } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import "./Dialog.css";

const CustomDialog = ({
  open,
  title,
  children,
  actions,
  onClose,
  onSave,
  saving = false,
  showSave = true,
}) => {
  const defaultActions = useMemo(
    () => (
      <>
        <Button
          onClick={onClose}
          disabled={saving}
        >
          Close
        </Button>

        {showSave && (
          <Button
            onClick={onSave}
            disabled={saving}
            variant="contained"
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        )}
      </>
    ),
    [onClose, onSave, saving, showSave]
  );

  return (
    <Dialog
      className="custom-dialog"
      open={open}
      onClose={saving ? undefined : onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle className="custom-dialog-title">
        {title}
      </DialogTitle>

      <DialogContent className="custom-dialog-content">
        {children}
      </DialogContent>

      <DialogActions className="custom-dialog-actions">
        {actions || defaultActions}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;

