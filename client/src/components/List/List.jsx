import React, {useState, useEffect, createRef} from 'react'
import {CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'
import PlaceDetails from '../PlaceDetails/PlaceDetails'
import useStyles from './styles';


function List({places, childClicked, isLoading}) {
    const classes = useStyles();
    const [type, setType] = useState('venues')
    const [rating, setRating] = useState('')

    const [elRefs, setElRefs] = useState([]);

 useEffect(() => {
    const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());

    setElRefs(refs)
 }, [places]);

    return (
        <div className={classes.container}>
           <Typography variant="h4">Venues, Hotels & Events in your area</Typography>
           {isLoading ? (
               <div className={classes.loading}>
                   <CircularProgress size="5rem" />
               </div>
           ): (
               <>
           <FormControl className={classes.formControl}>
               <InputLabel>Enter</InputLabel>
               <Select value={type} onChange={(e) => setType(e.target.value)}>
                   <MenuItem vlaue="venues">Venues</MenuItem>
                   <MenuItem vlaue="hotels">Hotels</MenuItem>
                   <MenuItem vlaue="events">Events</MenuItem>
               </Select>
           </FormControl>
           <FormControl className={classes.formControl}>
               <InputLabel>Rating</InputLabel>
               <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                   <MenuItem vlaue={0}>All</MenuItem>
                   <MenuItem vlaue={3}>Above 3.0</MenuItem>
                   <MenuItem vlaue={4}>Above 4.0</MenuItem>
                   <MenuItem vlaue={4.5}>Above 4.5</MenuItem>
               </Select>
           </FormControl>
           <Grid container spacing={3} className={classes.list}>
               {places?.map((place, i) => (
                   <Grid  item key={i} item xs={12}>
                       <PlaceDetails 
                       place={place} 
                       selected={Number(childClicked) === i}
                       refProp={elRefs[i]}
                       
                       />
                   </Grid>
               ))}
           </Grid>
           </>
           )}
        </div>
    )
}

export default List
