import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import Head from './Head';
import Toolbar from './Toolbar';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 300,
  },
  chkbox: {
    minWidth: 70
  },
  cell: {
    minWidth: 20
  },
  green: {
    color: theme.palette.success.main
  },
  red: {
    color: theme.palette.error.main
  }
}));

const TransactionsTable = ({ transactions, selectTransaction }) => {
  const classes = useStyles();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [selected, setSelected] = useState({});
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const headCells = [];
  Object.keys(transactions[0]).map(key => {
    if (key !== 'id') {
      headCells.push({
        id: key,
        numeric: typeof transactions[0][key] === 'number',
        disablePadding: headCells.length === 0,
        label: key.toUpperCase()
      });
    }     
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, row) => {
    if (selectedExists()) {
      setSelected({});
    } else {
      setSelected(row);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = ({date, amount, username}) => 
    selected.username === username &&
    selected.amount === amount &&
    selected.date === date;
  const selectedExists = () => Object.entries(selected).length > 0;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, transactions.length - page * rowsPerPage);

  const handleSelectTransaction = () => {
    if (selectedExists()) {
      selectTransaction(selected);
    }
  };

  return (
    <div className = { classes.root }>
      <Paper className = { classes.paper }>
        <Toolbar selectedExists = { selectedExists() } selectTransaction = { handleSelectTransaction }/>
        <TableContainer>
          <Table
            className = { classes.table }
            size = {dense ? 'small' : 'medium'}
          >
            <Head
              headCells = { headCells }
              order = { order }
              orderBy = { orderBy }
              onRequestSort = { handleRequestSort }
            />
            <TableBody>
              {stableSort(transactions, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick = {(event) => handleClick(event, row)}
                      role = 'checkbox'                      
                      aria-checked = { isItemSelected }
                      tabIndex = {-1}
                      key = { row.date }
                      selected = { isItemSelected }
                    >
                      <TableCell padding = 'checkbox'>
                        <Checkbox
                          checked = { isItemSelected }
                          inputProps = {{ 'aria-labelledby': labelId }}
                          className = { classes.chkbox }
                        />
                      </TableCell>
                      <TableCell component = 'th' id = { labelId } scope = 'row' padding = 'none' className = { classes.cell }>
                        { row.date }
                      </TableCell>
                      <TableCell align = 'left' className = { classes.cell }>{row.username}</TableCell>
                      <TableCell align = 'right' className = {row.amount > 0 ? classes.green : classes.red} style = {{minWidth:70}}>
                        {row.amount}
                      </TableCell>
                      <TableCell align = 'right' className = { classes.cell }>{row.balance}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style = {{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan = { 6 } />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions = {[5, 10, 25]}
          component = 'div'
          count = { transactions.length }
          rowsPerPage = { rowsPerPage }
          page = { page }
          onChangePage = { handleChangePage }
          onChangeRowsPerPage = { handleChangeRowsPerPage }
        />
      </Paper>
      <FormControlLabel
        control = {<Switch checked = { dense } onChange = { handleChangeDense } />}
        label = 'Dense padding'
      />
    </div>
  );
};

TransactionsTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired, 
    date: PropTypes.string.isRequired, 
    username: PropTypes.string.isRequired, 
    amount: PropTypes.number.isRequired, 
    balance: PropTypes.number.isRequired
  })).isRequired,
  selectTransaction: PropTypes.func.isRequired
};

export default TransactionsTable;