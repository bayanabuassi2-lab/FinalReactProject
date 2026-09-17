import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import "./SpecializationSearch.css";

const SpecializationSearch = ({ specializations, value, onChange }) => {
  return (
    <Autocomplete
      className="specialization-search"
      options={specializations}
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search by Specialization"
          placeholder="Choose specialization"
        />
      )}
    />
  );
}

export default SpecializationSearch;