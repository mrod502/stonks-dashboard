import React from 'react';
import Typography from '@material-ui/core/Typography';

export interface MenuBarItemProps {
    title:string;
    link?:string;
    imgSrc?:string;
    italic?:boolean;

}

const mbiStyle = {
    marginRight: '10px',
    paddingRight: '10px',
    borderRight: "solid",
    borderWidth: 1,
}

export const MenuBarItem:React.FC<MenuBarItemProps> = ({title, italic}:MenuBarItemProps) =>{


    return (
        <div style={mbiStyle}>
            <Typography>{title}</Typography>
        </div>
    )
}   