import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: theme.spacing(1),
            width: '22ch',
        }
    },
    btnSubmit: {
        cursor: 'pointer',
        border: '0',
        outline: 'none',
        padding: '10px',
        borderRadius: '8px',
        transition: '0.6s ease',
        '&:hover': {
            color: 'purple',
            transform: 'scale(1.1)'
        },
        '&:active': {

            transform: 'scale(0.9)'
        }

    }
}));

export default function BasicTextFields(props) {
    // Props
    const { searchCity } = props;
    const [search, setSearch] = React.useState('');

    const classes = useStyles();

    // On submit 함수
    let handleSubmit = (e) => {
        e.preventDefault();
        searchCity(search)
        setSearch('')
    }

    return (
        <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
                id="standard-basic"
                label="Search city"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div>
                <button className={classes.btnSubmit} > <span role='img' aria-label="search">🔍</span></button>
            </div>

        </form>

    );
}
