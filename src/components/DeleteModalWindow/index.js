import React from "react";
import { useDispatch } from "react-redux";
import { deleteUserById } from "../../redux/reducers/usersreducer/actions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog(props) {
  const { open, handleClose } = props;
  const { userId } = props;
  const dispatch = useDispatch();
  function deleteUser() {
    dispatch(deleteUserById(userId));
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">CRUD</DialogTitle>
      <DialogContent>
        <DialogContentText>Do you want delete user?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          No
        </Button>
        <Button onClick={deleteUser} variant="contained" color="secondary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
