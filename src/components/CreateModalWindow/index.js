import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addUser} from "../../redux/reducers/usersreducer/actions"
import {randomId} from "./../../utils/utils";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const initialUserFields={
  name:"",
  email:"",
  website:"",
  company:"",
}

const initialErrorMessages = {
  nameError:false,
  emailError:false,
  websiteError:false,
  companyNameError:false
}

export default function FormDialog(props) {
  const dispatch = useDispatch();
  const { open, handleClose } = props;
  const [errorMessages, setErrorMessages] = useState({...initialErrorMessages});
  
  const[userFields, setUserFields] = useState({...initialUserFields})


  function nameHandler(e){
    const name = e.target.value;
    setUserFields({...userFields, name});
  }
  function emailHandler(e){
    const email = e.target.value;
    setUserFields({...userFields, email});
  }
  function websiteHandler(e){
    const website = e.target.value;
    setUserFields({...userFields, website});
  }
  function companyHandler(e){
    const companyName = e.target.value;
    setUserFields({...userFields, company:{name:companyName}});
  }


  const validForm = () => {
    const errors = {};
    if(userFields.name===""){
      errors.nameError=true;
    }
    if(userFields.email===""){
      errors.emailError=true;
    }
    if(userFields.website===""){
      errors.websiteError=true;
    }
    if(userFields.company===""){
      errors.companyNameError=true;
    }


    setErrorMessages({...initialErrorMessages, ...errors});
    for (const key in errors) {
      if(errors[key]){
        return false;
      }
    }
    return true;
  }

  const cancelClick = () => {
    setErrorMessages({...initialErrorMessages});
    setUserFields({...initialUserFields});
    handleClose()
  }
  
  const createCurrentUser = () => {
    const valid = validForm();
    if(!valid){return false;}
    const id = randomId();
    const newUser = {...userFields, id};
    dispatch(addUser(newUser));
    setUserFields(initialUserFields);
    handleClose();
  }

  return (
    userFields&&<Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">CRUD</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Here you can create, update or delete user.
        </DialogContentText>
        
        <TextField
          error={errorMessages.nameError}
          margin="dense"
          name="name"
          label="Name"
          type="text"
          value={userFields.name}
          onChange={nameHandler}
          fullWidth
        />

        <TextField
          error={errorMessages.emailError}
          margin="dense"
          name="email"
          label="Email Address"
          type="email"
          value={userFields.email}
          onChange={emailHandler}
          fullWidth
        />
        <TextField
          error={errorMessages.websiteError}
          margin="dense"
          name="website"
          label="Website"
          type="text"
          value={userFields.website}
          onChange={websiteHandler}
          fullWidth
        />
        <TextField
          error={errorMessages.companyNameError}
          margin="dense"
          name="companyName"
          label="Company"
          type="text"
          value={userFields.companyName}
          onChange={companyHandler}
          fullWidth
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={cancelClick} variant="contained">
          Cancel
        </Button>
        <Button onClick={createCurrentUser} variant="contained" color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}