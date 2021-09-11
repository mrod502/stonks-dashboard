import React from 'react';
import Typography from '@material-ui/core/Typography';

export interface MenuBarItemProps {
    title:string;
    link?:string;
    imgSrc?:string;

}

export const MenuBarItem:React.FC<MenuBarItemProps> = ({title}:MenuBarItemProps) =>{


    return (
        <div>
            <Typography>{title}</Typography>
        </div>
    )
}