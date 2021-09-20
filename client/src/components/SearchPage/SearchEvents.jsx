import React, { useState, useEffect} from 'react'
import {Autocomplete} from '@react-google-maps/api'
import { getPlacesData } from '../../api'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core'
import {CssBaseline, Grid} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import List from '../List/List'
import Map from '../Map/Map'

import useStyles from './styles'


function SearchEvents() {
    const classes = useStyles();
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [childClicked, setChildClicked] = useState(null);

    const style ={
        background: '#9c27b0'
    };

    const [coords, setCoords] = useState({});
    const [bounds, setBounds] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('hotels')
    const [rating, setRating] = useState('')
    const [autocomplete, setAutocomplete] = useState(null)
    const onLoad = (autoC) => setAutocomplete(autoC)
    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();

        setCoords({lat, lng})

    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
          setCoords({ lat: latitude, lng: longitude });
        });
      }, []);


      useEffect(() =>{
          const filteredPlaces = places.filter((place) => place.rating > rating)
          setFilteredPlaces(filteredPlaces)
      }, [rating])


    useEffect(() => {
        if(bounds.sw && bounds.ne){
        setIsLoading(true)
        getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
            setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
            setFilteredPlaces([])
            setIsLoading(false)
        })
    }
    }, [type, coords, bounds]);
    return (
        <>
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h5" className={classes.title}>
                        Muse Finder
                    </Typography>
                    <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Find Your Destination
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase placeholder="Find Location..." classes={{root: classes.inputRoot, input: classes.inputInput}}/>
                        </div>
                    </Autocomplete>
                    </Box>
                </Toolbar>
            </AppBar>
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List places={filteredPlaces.length ? filteredPlaces : places}
                    childClicked={childClicked}
                    isLoading={isLoading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                    setCoords={setCoords}
                    setBounds={setBounds}
                    coords={coords}
                    places={filteredPlaces.length ? filteredPlaces : places}
                    setChildClicked={setChildClicked}/>
                </Grid>
            </Grid>
        </>
    )
}

export default SearchEvents
