import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardMedia, CardContent, Typography, Divider, Chip} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    section2: {
        margin: theme.spacing(1),
    },
    card: {
        width: "70%",
        height: "100%"
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: "100%"
    },
    content: {
        // flex: '1 0 auto',
        width: "100%",
        paddingLeft: "0px"
    },
    root: {
        display: 'flex',
        borderRadius: 10,
    },
    cover: {
        width: 150,
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    box: {
        height: "100%",
        width: "100%"
    },
    userShow: {
        marginTop: 10,
    },
    border: {
        borderRadius: 10,
        marginTop: theme.spacing(2)
    },
    chip: {
        margin: theme.spacing(0.5),
    },
  }));


function SentComments({ review, handleEdit, deleteReview }) {
    const classes = useStyles();
    
    return (
        <>
        <Box key={review.id}>
        <ListItem >
            {/* <ListItemAvatar>
            <Avatar src={review.reviewer.avatar} />
            </ListItemAvatar> */}
            <ListItemText>
                <Card className={classes.root} >
                    <CardMedia
                        className={classes.cover}
                    >
                        <Box display="flex" alignItems="center" justifyContent="center" className={classes.box}>
                            <Avatar src={review.reviewee.avatar} className={classes.large}/>
                        </Box>     
                    </CardMedia>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography className={classes.section2} variant={"h6"}>
                                {review.reviewee.username}
                            </Typography>
                            <Rating className={classes.section2} name="read-only" precision={0.5} value={review.rating} size="small" readOnly />
                            <Divider variant="middle"/>
                            <Typography paragraph className={classes.section2}>{review.contents}</Typography>
                            <Typography variant={"subtitle2"} className={classes.section2} color="textSecondary">{review.game}</Typography>
                            {review.tags.map(tag => <Chip color="secondary" clickable size="small"label={tag.name} className={classes.chip}/>)}
                        </CardContent>
                    </div>
                    
                </Card>
            </ListItemText>
            {/* <ListItemSecondaryAction> */}
                <IconButton edge="end" onClick={() => handleEdit(review)}>
                    <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => deleteReview(review)}>
                    <DeleteIcon />
                </IconButton>
            {/* </ListItemSecondaryAction> */}
        </ListItem>
        </Box>
        </>
    )
}

export default SentComments
