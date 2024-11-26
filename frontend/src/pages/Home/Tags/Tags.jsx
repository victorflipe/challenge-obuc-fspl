import { FaEdit, FaPlus } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import InputText from "../../../components/InputText/InputText";
import "./Tags.css";
import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { MdModeEditOutline, MdOutlineDeleteOutline, MdClose } from "react-icons/md";
import { api } from "../../../services/api";

export default function Tags({ tags, setTags }) {
  const clearNewTag = {
    name: ""
  };
  const [newTag, setNewTag] = useState(clearNewTag);

  const handleEditRow = (tag) => {
    setNewTag(tag);
  };

  const handleCreateTag = async () => {
    try {
      await api.post("/tags", {
        name: newTag.name,
      });
      const response = await api.get("/tags");
      setTags(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdateTag = async () => {
    try {
      await api.patch(`/tags/${newTag.id}`, {
        name: newTag.name,
      });
      const response = await api.get("/tags");
      setTags(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleTagSubmit = async (e) => {
    e.preventDefault();

    const tagFiltered = tags.rows.find((tag) => tag.name === newTag.name) || null

    if (!tagFiltered && !newTag.id) {
      handleCreateTag()
      setNewTag(clearNewTag);
    } else {
      if (!tagFiltered && newTag.id || newTag.id == tagFiltered.id) {
        handleUpdateTag()
        setNewTag(clearNewTag);
      } else {
        alert("Tag já cadastrada")
      }

    }

  };

  const handleDeleteTag = useCallback(
    async (id) => {
      if (id == null) {
        return;
      }
      try {
        await api.delete(`/tags/${id}`);
        setTags((prev) => prev.filter((tag) => tag.id !== id));
      } catch (error) {
        console.error(error);
      }
    },
    [newTag, setTags]
  );

  const { headers, rows } = tags;

  return (
    <div className="tags-wrapper">
      <h1>Tags</h1>
      <div className="form-wrapper">
        <form onSubmit={(event) => handleTagSubmit(event)}>
          <InputText
            placeholder="Insert a tag name"
            required={true}
            value={newTag.name}
            onChange={(e) => {
              console.log(e.target.value);
              setNewTag((prev) => ({ ...prev, name: e.target.value }))
            }}
          />
          {
            newTag.id &&
            (<><Button secondaryStyle onClick={() => { setNewTag(clearNewTag) }}>
              <MdClose />
              Cancel
            </Button></>)
          }

          <Button typeSubmit={true}>
            {
              newTag.id ? (<><FaEdit />
                Update Task</>) : (<><FaPlus />
                  Add Task</>)
            }

          </Button>
        </form>
      </div>
      <div className="div-container-tags">
        <table>
          <thead className="table-header">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="table-header-cell" colSpan={"3"}>
                  {header.label}
                </th>
              ))}
              {/* {rows.length !== 0 && <th ></th>} */}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={headers.length}>Nenhuma TAG cadastrada</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  {headers.map((header, colIndex) => (
                    <td key={colIndex} >
                      {row.name}
                    </td>
                  ))}
                  <td className="td-options">
                    {
                      row.id != newTag.id ?
                        <><button onClick={() => handleEditRow(row)}>
                          <MdModeEditOutline />
                        </button>
                          <button onClick={() => handleDeleteTag(row.id)}>
                            <MdOutlineDeleteOutline />
                          </button> </> : <p className="p-edition">(in edition)</p>
                    }
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}

Tags.propTypes = {
  tags: PropTypes.object.isRequired,
  setTags: PropTypes.func.isRequired,
};
