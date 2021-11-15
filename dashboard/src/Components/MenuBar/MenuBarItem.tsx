import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as Styles from '../../Styles';

export interface MenuBarItemProps {
    title:string;
    link?:string;
    imgSrc?:string;
    selected?:boolean;

}


export const MenuBarItem:React.FC<MenuBarItemProps> = ({title,selected}:MenuBarItemProps) =>{


    return (
        <div style={Styles.MenuBarItem}>
            <Typography>{title}</Typography>
        </div>
    )
}   