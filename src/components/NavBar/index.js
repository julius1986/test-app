import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  createButton:{
    backgroundColor: '#4caf50',
    borderColor: '#0063cc',
    '&:hover': {
        backgroundColor: '#388e3c',
      },
  },    
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const {openCreateWindow} = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Search
          </Typography> 
          <Button
            onClick={openCreateWindow}
            className={classes.createButton}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
          >
            Create
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
