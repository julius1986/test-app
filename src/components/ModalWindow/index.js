import React, {useState} from "react";
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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: "100%",
      },
    },
  }));

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
  const newUser = cloneObj(props.user);
  const [errorMessages, setErrorMessages] = useState({
    nameError:false,
    emailError:false,
    websiteError:false,
    companyNameError:false
  });
  function validForm(){
    for (const key in errorMessages) {
      if(errorMessages[key]){
        return false;
      }
    }
    return true;
  }
  
  const[userFields, setUserFields] = useState(newUser)

  function nameHandler(e){
    const name = e.target.value;
    if (name==="") {
      setErrorMessages({...errorMessages, nameError:true})
    } else {
      setErrorMessages({...errorMessages, nameError:false})
    }
    setUserFields({...userFields, name});
  }

  function emailHandler(e){
    const email = e.target.value;
    if (email==="") {
      setErrorMessages({...errorMessages, emailError:true})
    } else {
      setErrorMessages({...errorMessages, emailError:false})
    }
    setUserFields({...userFields, email});
  }

  function websiteHandler(e){
    const website = e.target.value;
    if (website==="") {
      setErrorMessages({...errorMessages, websiteError:true})
    } else {
      setErrorMessages({...errorMessages, websiteError:false})
    }
    setUserFields({...userFields, website});
  }

  function companyHandler(e){
    const companyName = e.target.value;
    if (companyName==="") {
      setErrorMessages({...errorMessages, companyNameError:true})
    } else {
      setErrorMessages({...errorMessages, companyNameError:false})
    }
    setUserFields({...userFields, company:{name:companyName}});
  }

  const { open, handleClose } = props;
  const dispatch = useDispatch();
  
  function createNewUser() {
    userFields.id = randomId();
    dispatch(addUser(userFields));
    handleClose();
  }
  function deleteCurrentUser() {
      dispatch(deleteUserById(userFields.id));
      handleClose();
  }
  function updateCurrentUser() {
    const valid = validForm();
    if(!valid){return false;}
    dispatch(updateUser(userFields));
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
          value={userFields.company.name}
          onChange={companyHandler}
          fullWidth
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Cancel
        </Button>
        <Button onClick={createNewUser} variant="contained" color="primary">
          Create
        </Button>
        <Button onClick={updateCurrentUser} variant="contained" color="primary">
          Update
        </Button>
        <Button onClick={deleteCurrentUser} variant="contained" color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}