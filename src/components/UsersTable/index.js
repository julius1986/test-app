import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import {  fetchUsers } from "./../../redux/reducers/usersreducer/actions";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ModalWindow from "./../ModalWindow";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function UserTable(props) {
  
  useEffect(() => {
    props.fetchUsers();
  }, [])

  const rows = props.users;
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  function clickHandler(user) {
    setCurrentUser(user);
    handleClickOpen();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentUser({});
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Website</StyledTableCell>
              <StyledTableCell align="right">Company</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                onClick={clickHandler.bind(this, row)}
                key={row.id}
              >
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.website}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.company.name}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {(open&&<ModalWindow user={currentUser} open={open} handleClose={handleClose} />)}
    </Fragment>
  );
}

function stateToProps(state) {
  const { users } = state;
  return {
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers());
    }
  };
}

export default connect(stateToProps, mapDispatchToProps)(UserTable);
