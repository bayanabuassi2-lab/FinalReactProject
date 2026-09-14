import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import "./Dialog.css";

const CustomDialog = ({
  open,
  title,
  children,
  actions,
  onClose,
  saving = false,
}) => {
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
        {actions}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;