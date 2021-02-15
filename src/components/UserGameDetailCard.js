import React from 'react'
import { useHistory } from 'react-router-dom'
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    title: {
      color: theme.palette.secondary,
      
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    tile: {
        height: "150px",
        width: "200px",
        borderRadius: "30px",
        marginRight: "10px"
    },
    box: {
        borderRadius: "30px"
    }
  }));


function UserGameDetailCard({ userGame }) {
    const classes = useStyles()
    const game = userGame.game
    const history = useHistory()
    return (
        <Box className={classes.box}>
            <GridListTile key={game.id} className={classes.tile} onClick={() => history.push(`/user_games/${userGame.id}`)}>
                <img src={game.image} alt={game.name} style={{borderRadius: 10, width: "100%", objectFit: "cover", height: "100%"}}/>
                <GridListTileBar
                title={game.name}
                classes={{
                    root: classes.titleBar,
                    title: classes.title,
                }}
                />
            </GridListTile>
          </Box>
    )
}

export default UserGameDetailCard
