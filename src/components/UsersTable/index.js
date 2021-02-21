import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./../../redux/reducers/usersreducer/actions";
import DeleteModalWindow from "./../DeleteModalWindow";
import EditModalWindow from "./../EditModalWindow";
import CreateModalWindow from "./../CreateModalWindow";
import NavBar from "./../NavBar";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

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

export default function UserTable(props) {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const rows = users;

  const [isDelete, setIsDelete] = useState(false);
  const [deleteUserId, setdeleteUserId] = useState(null);

  const [isEdit, setIsEdit] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [isCreate, setIsCreate] = useState(false);

  const [inputSearchValue, setInputSearchValue] = useState("");

  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const editClickHandler = (user) => {
    setEditUser(user);
    setIsEdit(true);
  };
  const cancelEdit = () => {
    setEditUser(null);
    setIsEdit(false);
  };

  const deleteClickHandler = (id) => {
    setdeleteUserId(id);
    setIsDelete(true);
  };
  const cancelDelete = () => {
    setdeleteUserId(null);
    setIsDelete(false);
  };

  const createClickHandler = () => {
    setIsCreate(true);
  };
  const cancelCreate = () => {
    setIsCreate(false);
  };

  const inputSearchChange = (e) => {
    setInputSearchValue(e.target.value);
  };

  const filterUsers = (users, value) => {
    return users.filter((user) => {
      if (
        String(user.name).includes(value) ||
        String(user.email).includes(value) ||
        String(user.website).includes(value) ||
        String(user.company.name).includes(value)
      ) {
        return true;
      } else {
        return false;
      }
    });
  };

  return (
    <Container maxWidth="xl">
      <NavBar
        openCreateWindow={createClickHandler}
        inputChange={inputSearchChange}
      />
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
            {filterUsers(rows, inputSearchValue).map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.website}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.company.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    onClick={editClickHandler.bind(this, row)}
                    variant="contained"
                    color="primary"
                  >
                    Update
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    onClick={deleteClickHandler.bind(this, row.id)}
                    variant="contained"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteModalWindow
        userId={deleteUserId}
        open={isDelete}
        handleClose={cancelDelete}
      />
      <EditModalWindow
        editUser={editUser}
        open={isEdit}
        handleClose={cancelEdit}
      />
      <CreateModalWindow open={isCreate} handleClose={cancelCreate} />
    </Container>
  );
}

// const stateToProps = (state) => {
//   const { users } = state;
//   return {
//     users,
//   };
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchUsers: () => {
//       dispatch(fetchUsers());
//     }
//   };
// }

// export default connect(stateToProps, mapDispatchToProps)(UserTable);
