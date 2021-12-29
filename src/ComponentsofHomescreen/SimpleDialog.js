import axios from "axios";

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import ListItemButton from '@mui/material/ListItemButton';
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <div>
            <h1>Hallo Walid</h1>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Set backup account</DialogTitle>
                <List sx={{ pt: 0 }}>


                    <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Add account" />
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}


export default SimpleDialog;