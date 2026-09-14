import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";

import Table from "../../common/Table/Table";
import "./DoctorTable.css";
const DoctorTable = ({
  doctors,
  onOverview,
  onReview,
}) => {
  const columns = [
    {
      id: "name",
      label: "Name",
    },
    {
      id: "specialization",
      label: "Specialization",
    },
    {
      id: "region",
      label: "Region",
    },
    {
      id: "actions",
      label: "Actions",
      render: (doctor) => (
        <div className="actions">
          <button
            className="action-button"
            title="Overview"
            onClick={() => onOverview(doctor)}
          >
            <VisibilityIcon />
          </button>

          <button
            className="action-button"
            title="Review"
            onClick={() => onReview(doctor)}
          >
            <StarIcon />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rows={doctors}
      emptyMessage="No doctors found"
      className="doctors-table"
    />
  );
};

export default DoctorTable;