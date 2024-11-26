import { FaPlus } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import "./Board.css";
import Modal from "../../../components/Modal/Modal";
import { useCallback, useEffect, useState } from "react";
import InputText from "../../../components/InputText/InputText";
import OptionSelect from "../../../components/OptionSelect/OptionSelect";
import Table from "../../../components/Table/Table";
import PropTypes from "prop-types";
import { api } from "../../../services/api";
import makeAnimated from 'react-select/animated';
import Select from 'react-select'

export default function Board({ tasks, setTasks, status }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const clearNewTask = {
    title: "",
    description: "",
    status: "",
    assignedTo: "",
    tags: []
  };
  const [newTask, setNewTask] = useState(clearNewTask);

  useEffect(() => {
    console.log("newTask atualizado:", newTask);
  }, [newTask]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const responseTags = await api.get("/tags");
        setTags(responseTags.data)
      } catch (error) {
        console.error(error)
      }
    };
    fetchTags()
    console.log(tags)
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const responseTasks = await api.get("/tasks");
        setTasks(responseTasks.data)
      } catch (error) {
        console.error(error)
      }
    };
    fetchTasks()
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleOpenModal = (task = null) => {
    task ? setNewTask(task) : setNewTask(clearNewTask)
    setIsModalOpen((prev) => !prev);
  };

  const handleDeleteTask = useCallback(
    async () => {
      if (!newTask) {
        return;
      }
      try {
        await api.delete(`/tasks/${newTask.id}`);
        setTasks((prev) => prev.filter((task) => task.id !== newTask.id));
      } catch (error) {
        console.error(error);
      }
      handleCloseModal()
    },
    [newTask, setTasks]
  );

  const handleCreateTask = async () => {
    try {
      const responseTask = await api.post("/tasks", {
        title: newTask.title,
        assignedTo: newTask.assignedTo,
        description: newTask.description,
        status: newTask.status,
        tags: newTask.tags
      });

      await api.post(`/tasks/${responseTask.data.id}/tags`, {
        tags: newTask.tags,
      });

      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdateStatus = async (task) => {
    try {
      await api.patch(`/tasks/${task.id}`, {
        status: task.status,
      });

      const response = await api.get("/tasks");
      setTasks(response.data);

    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateTask = async () => {
    try {
      await api.patch(`/tasks/${newTask.id}`, {
        title: newTask.title,
        assignedTo: newTask.assignedTo,
        description: newTask.description,
        status: newTask.status,
      });

      // Atualize as tags associadas à tarefa
      await api.put(`/tasks/${newTask.id}/tags`, {
        tags: newTask.tags,
      });

      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = () => {
    newTask.id != null ? handleUpdateTask() : handleCreateTask();
    setNewTask(clearNewTask)
  };

  const handleFilterTags = async (tagsSelected) => {
    const response = await api.get("/tasks"); // Recarrega todas as tarefas
    // setTasks(response.data);

    const selectedTags = tagsSelected.map((tag) => tag.value)

    if (tagsSelected.length) {
      const tasksFiltered = response.data.filter((task) =>
        task.Tags.some((tag) => selectedTags.includes(tag.id))
      );

      setTasks(tasksFiltered)

      console.log('Tasks filtered: ', tasksFiltered)
    } else {
      try {
        const response = await api.get("/tasks"); // Recarrega todas as tarefas
        setTasks(response.data);
      } catch (error) {
        console.error("Erro ao resetar tasks:", error);
      }
    }
  }

  return (
    <div id="board-wrapper">
      <div className="div-header-boards">
        <Button onClick={handleOpenModal}>
          <FaPlus />
          Add Task
        </Button>

        <Select
          closeMenuOnSelect={true}
          components={makeAnimated()}
          options={tags.map((tag) => {
            return { value: tag.id, label: tag.name }
          })}
          isMulti
          placeholder={"Select Tags"}
          onChange={(tag) => {
            handleFilterTags(tag)
          }}
        />


      </div>
      <Table data={tasks} onDelete={handleDeleteTask} onOpen={handleOpenModal} onUpdate={handleUpdateTask} setNewStatus={handleUpdateStatus} />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDeleteTask}
        title={newTask.id ? `Update task` : `Add new task`}
        handleSubmit={handleSubmit}
        setNewTask={setNewTask}
        updateTask={newTask.id != null}
      >
        <InputText
          label="Title"
          placeholder={"Insert task title"}
          required={true}
          value={newTask.title}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <InputText
          required={true}
          label="Description"
          placeholder={"Insert task description"}
          textarea
          value={newTask.description}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, description: e.target.value }))
          }
        />

        <div className="input_wrapper">
          <label>Tags</label>
          <Select
            closeMenuOnSelect={true}
            isMulti
            placeholder={"Select Tags"}
            options={
              tags.map((tag) => ({ id: tag.id, value: tag.id, label: tag.name }))
            }
            onChange={(values) =>
              setNewTask((prev) => ({
                ...prev,
                tags: values.map(tag => tag.value)
              })
              )}
            defaultValue={
              newTask.id ? 
              newTask.Tags.map((tag) =>
                ({ label: tag.name, value: tag.id })
              ) : ""
            } />

        </div>
      </Modal>
    </div>
  );
}

Board.propTypes = {
  status: PropTypes.array.isRequired,
  tasks: PropTypes.object.isRequired,
  setTasks: PropTypes.func.isRequired,
};
