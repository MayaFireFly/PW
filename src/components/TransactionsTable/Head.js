import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { 
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  empty: {
    width: '2em',
    minWidth: 20
  },
  cell: {
    minWidth: 70
  }
}));

const Head = ({ headCells, order, orderBy, onRequestSort }) => {
  const classes = useStyles();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  
  return <TableHead>
    <TableRow>
      <TableCell><div className = { classes.empty }></div></TableCell>

      {headCells.map(headCell => (
        <TableCell
          key = { headCell.id }
          align = { headCell.numeric ? 'right' : 'left' }
          padding = { headCell.disablePadding ? 'none' : 'default' }
          sortDirection = { orderBy === headCell.id ? order : false }
        >
          <TableSortLabel
            active = { orderBy === headCell.id }
            direction = { orderBy === headCell.id ? order : 'asc' }
            onClick = { createSortHandler(headCell.id) }
            className = { classes.cell }
          >
            { headCell.label }
            { orderBy === headCell.id ? (
              <span className = { classes.visuallyHidden }>
                { order === 'desc' ? 'sorted descending' : 'sorted ascending' }
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
      ))}
    </TableRow>
  </TableHead>;
};
  
Head.propTypes = {
  headCells: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired, 
    numeric: PropTypes.bool.isRequired, 
    disablePadding: PropTypes.bool.isRequired, 
    label: PropTypes.string.isRequired
  })).isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
};

export default Head;