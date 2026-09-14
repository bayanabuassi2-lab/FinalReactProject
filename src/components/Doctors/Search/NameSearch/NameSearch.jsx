import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import "./NameSearch.css";

const NameSearch = ({ names, value, onChange }) => {
  const [open, setOpen] = useState(false);

  const filteredNames = value
    ? names.filter((name) =>
        name.toLowerCase().includes(value.toLowerCase())
      )
    : [];

  return (
    <Autocomplete
      className="name-search"
      freeSolo
      options={filteredNames}
      value={value}
      open={open && value.length > 0}
      onOpen={() => {
        if (value.length > 0) {
          setOpen(true);
        }
      }}
      onClose={() => setOpen(false)}
      onInputChange={(event, newValue) => {
        onChange(newValue);

        if (newValue.length > 0) {
          setOpen(true);
        } else {
          setOpen(false);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search by Name"
          placeholder="Type doctor name"
        />
      )}
    />
  );
}

export default NameSearch;

