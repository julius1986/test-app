import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import {  fetchUsers } from "./../../redux/reducers/usersreducer/actions";
import DeleteModalWindow from "./../DeleteModalWindow";
import EditModalWindow from "./../EditModalWindow";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';


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
  
  const rows = props.users;

  const [isDelete, setIsDelete] = React.useState(false);
  const [deleteUserId, setdeleteUserId] = React.useState(null);

  const [isEdit, setIsEdit] = React.useState(false);
  const [editUser, setEditUser] = React.useState(null);

  const classes = useStyles();
  
  useEffect(() => {
    props.fetchUsers();
  }, [])

  const editClickHandler = (user) => {
    setEditUser(user);
    setIsEdit(true);
  }
  const cancelEdit = () => {
    setEditUser(null);
    setIsEdit(false);
  }

  const deleteClickHandler = (id) => {
    setdeleteUserId(id);
    setIsDelete(true);
  }
  const cancelDelete = () => {
    setdeleteUserId(null);
    setIsDelete(false);
  }


  return (
    <Container maxWidth="xl">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Website</StyledTableCell>
              <StyledTableCell align="right">Company</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
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
                <StyledTableCell align="right">
                  <Button onClick={editClickHandler.bind(this, row)} variant="contained" color="primary">
                    Update
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={deleteClickHandler.bind(this, row.id)}  variant="contained" color="secondary">
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteModalWindow userId={deleteUserId} open={isDelete} handleClose={cancelDelete} />
      <EditModalWindow editUser={editUser} open={isEdit} handleClose={cancelEdit} />

    </Container>
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
