import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const Component = () => (
  <div>
    <GooglePlacesAutocomplete apiKey="process.env.REACT_APP_GOOGLEPLACES_API_KEY" />
  </div>
);

export default Component;
