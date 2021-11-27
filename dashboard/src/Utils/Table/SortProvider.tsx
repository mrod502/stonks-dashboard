import { TableHead } from '@material-ui/core';
import React from 'react';
import SortableTableHead from './SortableTableHead';
import SortProviderProps from './SortProviderProps';


// assume all data in table is sortable bc whatever
const SortProvider = ({data, columns}:SortProviderProps)=>{



  return (<TableHead>{columns.map(col =>{
    return <SortableTableHead {...col}/>


  })}</TableHead>
)
}

