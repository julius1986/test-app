import React from "react";
import {useDispatch} from "react-redux";
import {addUser, deleteUserById, updateUser} from "./../../redux/reducers/usersreducer/actions"
import {cloneObj, randomId} from "./../../utils/utils"
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// const newUser = {
//     "id": 33,
//     "name": "Nicholas Runolfsdottir V",
//     "username": "Maxime_Nienow",
//     "email": "Sherwood@rosamond.me",
//     "address": {
//       "street": "Ellsworth Summit",
//       "suite": "Suite 729",
//       "city": "Aliyaview",
//       "zipcode": "45169",
//       "geo": {
//         "lat": "-14.3990",
//         "lng": "-120.7677"
//       }
//     },
//     "phone": "586.493.6943 x140",
//     "website": "jacynthe.com",
//     "company": {
//       "name": "Abernathy Group",
//       "catchPhrase": "Implemented secondary concept",
//       "bs": "e-enable extensible e-tailers"
//     }
//   }

export default function FormDialog(props) {
  const { open, handleClose } = props;
  const newUser = cloneObj(props.user);
  const dispatch = useDispatch();
  function createNewUser() {
    newUser.id = randomId();
    dispatch(addUser(newUser));
    handleClose();
  }
  function deleteCurrentUser() {
      dispatch(deleteUserById(newUser.id));
      handleClose();
  }
  function updateCurrentUser() {
        dispatch(updateUser(newUser));
        handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={createNewUser} color="primary">
          Create
        </Button>
        <Button onClick={updateCurrentUser} color="primary">
          Update
        </Button>
        <Button onClick={deleteCurrentUser} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
