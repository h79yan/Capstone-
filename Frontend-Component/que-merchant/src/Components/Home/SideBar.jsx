// general import statements 
import React from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HistoryIcon from '@mui/icons-material/History';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import DoNotDisturbOnTotalSilenceIcon from '@mui/icons-material/DoNotDisturbOnTotalSilence';
import LogoutIcon from '@mui/icons-material/Logout';
import UploadIcon from '@mui/icons-material/Upload';

export const SideBar = [
    {
        title: "Order",
        icon: <ReceiptLongIcon/>, 
        link: "/order",
    }, 
    {
        title: "History", 
        icon: <HistoryIcon/>, 
        link: "/history",
    }, 
    {
        title: "Dish", 
        icon: <RestaurantMenuIcon/>, 
        link: "/dish",
    }, 
    {
        title: "Mode", 
        icon: <DoNotDisturbOnTotalSilenceIcon/>,
        link: "/busy",
    },
    {
        title: "Upload", 
        icon: <UploadIcon/>, 
        link: "/upload"
    },
    {
        title: "Logout",
        icon: <LogoutIcon/>,
        link: "/logout",
    }
];
