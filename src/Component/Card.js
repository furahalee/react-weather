import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Card.css';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: '#ffffff',
        width: '60px',
        height: '60px'
    },
}));

export default function RecipeReviewCard(props) {
    let { weather, temp, city, country, wind } = props;
    // 스테이트
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [time, setTime] = React.useState('')

    //*** 함수

    // HandleExpand
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    //*** 첫번째 글자 대문자로
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    //*** 최신 시간
    let currentDateAndTime = () => {
        let newDate = new Date();
        //console.log(newDate)
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let hour = newDate.getHours();
        let min = newDate.getMinutes();
        let sec = newDate.getSeconds();
        //
        let currentTandD = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec;
        // Set Time
        setTime(currentTandD)
        setTimeout(() => { currentDateAndTime() }, 1000)
        // Return
        return currentTandD;
    }
    //*** F를 CESIOUS로 변환하기 */
    function gCelsius(fahrenheit) {
        var fTemp = fahrenheit;
        var fToCel = (parseInt(fTemp) - 273);
        return fToCel;
    }
    // let gCelsius = (fTemp) => {
    //     let c = (parseInt(fTemp) - 32) * 5 / 9;
    //     let cFinale = c.toString()
    //     let res = cFinale.slice(0, 2);

    //     return parseInt(res);
    // }

    //************ USEEFFECT */
    React.useEffect(() => {
        // Set time
        currentDateAndTime();

    }, []);

    //*** RETURN */
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="" />
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        {/* <MoreVertIcon /> */}
                    </IconButton>
                }
                title={`🏳️‍🌈 ${city} ${country}`}
                subheader={time}
            />
            <div className='grid-temp'>
                <div><strong><small> <span role='img' aria-label="temp"> 🌡️ </span>:</small> </strong> {gCelsius(temp.temp)} <small> °C </small></div>
                <div><strong><small><span role='img' aria-label="hum"> 🥵 </span> </small></strong> {temp.humidity} <small> % </small></div>
                <div><strong><small> <span role='img' aria-label="wind"> 🌬️ </span> </small></strong> {wind} <small>  speed </small></div>
            </div>
            <CardMedia
                className={classes.media}
                image="/images/weather.svg"
                title="Sunny"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {capitalizeFirstLetter(`${weather.main}`)}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {/* <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Info:</Typography>
                    <Typography paragraph>
                        {capitalizeFirstLetter(`${weather.description}`)}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
