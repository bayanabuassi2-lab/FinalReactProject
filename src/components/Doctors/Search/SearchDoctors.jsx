import { useMemo, useState } from "react";

import NameSearch from "./NameSearch/NameSearch";
import SpecializationSearch from "./SpecializationSearch/SpecializationSearch";
import RegionSearch from "./RegionSearch/RegionSearch";

import SearchIcon from "@mui/icons-material/Search";

import "./SearchDoctors.css";

const SearchDoctors = ({ doctors, onSearch }) => {
  const [name, setName] = useState("");

  const [specialization, setSpecialization] =
    useState(null);

  const [region, setRegion] = useState(null);

  const doctorData = useMemo(() => {
    return {
      names: [
        ...new Set(
          doctors
            .map((doctor) => doctor.name)
            .filter(Boolean)
        ),
      ],

      specializations: [
        ...new Set(
          doctors
            .map((doctor) => doctor.specialization)
            .filter(Boolean)
        ),
      ],

      regions: [
        ...new Set(
          doctors
            .map((doctor) => doctor.region)
            .filter(Boolean)
        ),
      ],
    };
  }, [doctors]);

  const handleSearch = () => {
    onSearch({
      name,
      specialization,
      region,
    });
  };

  return (
    <div className="search-section">

      <NameSearch
        names={doctorData.names}
        value={name}
        onChange={setName}
      />

      <SpecializationSearch
        specializations={doctorData.specializations}
        value={specialization}
        onChange={setSpecialization}
      />

      <RegionSearch
        regions={doctorData.regions}
        value={region}
        onChange={setRegion}
      />

      <button
        className="search-button"
        onClick={handleSearch}
      >
        <SearchIcon />
        Search
      </button>

    </div>
  );
}

export default SearchDoctors;