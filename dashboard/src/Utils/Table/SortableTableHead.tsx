import { TableHead } from '@material-ui/core';
import React from 'react';
import SortableTableHeadProps from './SortableTableHeadProps';

export default ({selected, desc, label, accessor, onClick}:SortableTableHeadProps) =>{


  return (
    <TableHead ><span>{label}</span></TableHead>
  )
}