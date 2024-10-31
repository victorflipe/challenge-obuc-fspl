import PropTypes from "prop-types";
import "./Table.css";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function Table({ data, handleDeleteRow }) {
  const { headers, rows } = data;
  
  return (
    <table className="table">
      <thead className="table-header">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="table-header-cell">
              {header.label}
            </th>
          ))}
          {rows.length !== 0 && <th className="table-header-cell"></th>}
        </tr>
      </thead>
      <tbody className="table-body">
        {rows.length === 0 ? (
          <tr className="table-row">
            <td colSpan={headers.length} className="table-cell"></td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={row.id} className="table-row">
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="table-cell">
                  {row[header.column]}
                </td>
              ))}
              <td>
                <button onClick={() => handleDeleteRow(row.id)}>
                  <MdOutlineDeleteOutline />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  data: PropTypes.object,
  handleDeleteRow: PropTypes.func.isRequired,
};
