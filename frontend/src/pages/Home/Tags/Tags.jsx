import { FaPlus } from "react-icons/fa";
import "./Tags.css";
import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { MdOutlineDeleteOutline } from "react-icons/md";
export default function Tags({ tags, setTags }) {
  const [newTag, setNewTag] = useState("");

  const handleDeleteRow = useCallback(
    async (id) => {
      if (!tags.rows.length) {
        return;
      }
      setTags((prev) => ({
        ...prev,
        rows: prev.rows.filter((tag) => tag.id !== id),
      }));
    },
    [tags.rows.length, setTags]
  );

  const handleTagSubmit = (event) => {
    event.preventDefault();
    if (!newTag) {
      return;
    }
    setTags((prev) => ({
      ...prev,
      rows: [...prev.rows, { id: prev.rows.length + 1, tag: newTag }],
    }));
  };

  const handleChange = (event) => {
    setNewTag(event.target.value);
  };

  const { headers, rows } = tags;

  return (
    <div className="tags-wrapper">
      <h1>Tags</h1>
      <div className="form-wrapper">
        <form onSubmit={(event) => handleTagSubmit(event)}>
          <input
            type="text"
            placeholder="Enter tag name"
            required
            onChange={handleChange}
          />
          <button type="submit">
            <FaPlus /> Add Tag
          </button>
        </form>
      </div>
      <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>
              {header.label}
            </th>
          ))}
          {rows.length !== 0 && <th ></th>}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={headers.length}></td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={row.id}>
              {headers.map((header, colIndex) => (
                <td key={colIndex} style={{border: "1px solid black"}}>
                  {row[header.column]}
                </td>
              ))}
              <td style={{width: "1rem", border: "1px solid black"}}>
                <button onClick={() => handleDeleteRow(row.id)}>
                  <MdOutlineDeleteOutline />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
    </div>
  );
}

Tags.propTypes = {
  tags: PropTypes.object.isRequired,
  setTags: PropTypes.func.isRequired,
};
