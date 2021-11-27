import React from 'react';
import { TableHeadProps } from '@material-ui/core';

export default interface SortableTableHeadProps extends TableHeadProps{
  selected:boolean;
  desc:boolean;
  accessor:string|boolean|number;
  label:string;
}