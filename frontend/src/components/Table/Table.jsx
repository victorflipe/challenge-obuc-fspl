import PropTypes from "prop-types";
import "./Table.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Table({ data, onOpen, setNewStatus }) {
  const { headers, rows } = data;

  const groupedTasks = {};
  headers.forEach((header) => {
    groupedTasks[header.column] = rows.filter((task) => task.status === header.column);
  });

  const handleEditTask = (task) => {
    onOpen(task);
  };

  const handleOnDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }

    const taskTemp = { ...groupedTasks };

    const sourceColumn = taskTemp[source.droppableId];
    const destinationColumn = taskTemp[destination.droppableId];
    const [removed] = sourceColumn.splice(source.index, 1);

    destinationColumn.splice(destination.index, 0, removed);


    const taskMoved = removed
    taskMoved.status = destination.droppableId

    setNewStatus(taskMoved)

  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <table className="table">
        <thead className="table-header">
          <tr className="table-row">
            {headers.map((header, index) => (
              <th key={index} className="table-header-cell">
                {header.label}
                <hr className={`hr-${header.column}`} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          <tr className="table-row">
            {Object.entries(groupedTasks).map(([column, tasks], colIndex) => (
              <Droppable droppableId={column} key={colIndex}>
                {(provided) => (
                  <td
                    className="table-cell"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="div-column-tasks">
                      {tasks.map((task, taskIndex) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id.toString()}
                          index={taskIndex}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="card-task"
                              onClick={() => handleEditTask(task)}
                            >
                              <div className="card-task-info">
                                <p className="card-task-title">{task.title}</p>
                                <p className="card-task-description">{task.description}</p>
                              </div>

                              <hr className="hr-cards" />

                              <div className="card-tags">
                                {task.Tags.map((tag) => (
                                  <div className="card-tag-item" key={tag.id}>
                                    {tag.name}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </td>
                )}
              </Droppable>
            ))}
          </tr>
        </tbody>
      </table>
    </DragDropContext>
  );
}

Table.propTypes = {
  data: PropTypes.object,
  onOpen: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  // setNewTask: PropTypes.func.isRequired,
};
