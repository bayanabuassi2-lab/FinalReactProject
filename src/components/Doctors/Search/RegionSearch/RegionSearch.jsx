import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import "./RegionSearch.css";

const RegionSearch = ({ regions, value, onChange }) => {
  return (
    <Autocomplete
      className="region-search"
      options={regions}
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search by Region"
          placeholder="Choose region"
        />
      )}
    />
  );
}

export default RegionSearch;