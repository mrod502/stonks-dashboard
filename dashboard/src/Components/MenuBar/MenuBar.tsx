import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


export interface MenuBarProps {
    children?: React.ReactNode;
}

const MenuBar:React.FC<MenuBarProps> = ({children}:MenuBarProps) => {

    return (
        <AppBar>
            <Toolbar>
                {children}
            </Toolbar>
        </AppBar>
    )
}

export default MenuBar;