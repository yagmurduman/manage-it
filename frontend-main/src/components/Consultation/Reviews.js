import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


//props are the review that we have added below !!!
export default function Reviews() {

     {/*  for rating*/ }
     const [value, setValue] = React.useState(2);

    return (
        <>

            {/* side-by-side with div List Component*/}
            <div className="flex">
                <List sx={{ width: '100%', maxWidth: 2000, bgcolor: 'background.paper', m: 2, b: 2 }}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Review Title 3"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary">
                                        Reviewer 1
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                        /><div>
                            <Box sx={{ '& > legend': { ml: 3 }, }}>
                                <Typography component="legend">Rating</Typography>
                                <Rating name="read-only" value={value} readOnly />
                            </Box>
                        </div>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Review Title 2"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Reviewer 2
                                    </Typography>
                                    {" — Wish I could come, but I'm out of town this…"}
                                </React.Fragment>
                            }
                        />
                        <div>
                            <Box sx={{ '& > legend': { ml: 3 }, }}>
                                <Typography component="legend">Rating</Typography>
                                <Rating name="read-only" value={value} readOnly />
                            </Box>
                        </div>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Review Title 3"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Reviewer 3
                                    </Typography>
                                    {' — Do you have Paris recommendations? Have you ever…'}
                                </React.Fragment>
                            }
                        />
                        <div>
                            <Box sx={{ '& > legend': { ml: 3 }, }}>
                                <Typography component="legend">Rating</Typography>
                                <Rating name="read-only" value={value} readOnly />
                            </Box>
                        </div>
                    </ListItem>
                </List>
            </div>
        </>
    );
}