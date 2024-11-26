import { FaPlus } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import "./Board.css";
import Modal from "../../../components/Modal/Modal";
import { useCallback, useEffect, useState, useContext } from "react";
import InputText from "../../../components/InputText/InputText";
import OptionSelect from "../../../components/OptionSelect/OptionSelect";
import Table from "../../../components/Table/Table";
import PropTypes from "prop-types";
import { api } from "../../../services/api";
import makeAnimated from 'react-select/animated';
import Select from 'react-select'
import AppContext from "../../../context/AppContext";
import Swal from "sweetalert2";


export default function Board({ tasks, setTasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const { user } = useContext(AppContext)
  const clearNewTask = {
    title: "",
    description: "",
    status: "",
    assignedTo: "",
    Tags: []
  };
  const [newTask, setNewTask] = useState(clearNewTask);

  
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const responseTags = await api.get(`/tags-user/${user.name}`);
        setTags(responseTags.data)

        const responseTasks = await api.get(`/tasks-user/${user.name}`);
        setTasks(responseTasks.data)

      } catch (error) {
        console.error(error)
      }
    };

    fetchTags()
  }, [user]);

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

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: "Deletar Tarefa?",
        text: "Essa alteração será permanente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await api.delete(`/tasks/${newTask.id}`);
            setTasks((prev) => prev.filter((task) => task.id !== newTask.id));
          } catch (error) {
            console.error(error);
          }
          handleCloseModal()
          swalWithBootstrapButtons.fire({
            title: "Tarefa removida!",
            text: "Tarefa removida com sucesso.",
            icon: "success"
          });

        } else if (
          result.dismiss === Swal.DismissReason.cancel
        );
      });


    },
    [newTask, setTasks]
  );

  const handleCreateTask = async () => {
    try {
      const responseTask = await api.post("/tasks", {
        title: newTask.title,
        assignedTo: user.name,
        description: newTask.description,
        status: newTask.status,
        tags: newTask.Tags
      });

      await api.post(`/tasks/${responseTask.data.id}/tags`, {
        tags: newTask.Tags,
      });

      const response = await api.get(`/tasks-user/${user.name}`);
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

      const response = await api.get(`/tasks-user/${user.name}`);
      setTasks(response.data);

    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateTask = async () => {
    try {
      await api.patch(`/tasks/${newTask.id}`, {
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
      });

      // Atualize as tags associadas à tarefa
      await api.put(`/tasks/${newTask.id}/tags`, {
        tags: newTask.Tags,
      });

      const response = await api.get(`/tasks-user/${user.name}`);
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async () => {
    newTask.id != null ? handleUpdateTask() : handleCreateTask();
    const response = await api.get(`/tasks-user/${user.name}`);
    setTasks(response.data);
  };

  const handleFilterTags = async (tagsSelected) => {
    const response = await api.get(`/tasks-user/${user.name}`); 

    const selectedTags = tagsSelected.map((tag) => tag.value)

    if (tagsSelected.length) {
      const tasksFiltered = response.data.filter((task) =>
        task.Tags.some((tag) => selectedTags.includes(tag.id))
      );

      setTasks(tasksFiltered)

    } else {
      try {
        const response = await api.get(`/tasks-user/${user.name}`);
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

        <div className="input-wrapper">
          <label>Tags</label>
          <Select
            closeMenuOnSelect={true}
            isMulti
            placeholder={"Select Tags"}
            options={
              tags.filter((tag) => tag.assignedTo == user.name)
                .map((tag) => ({ id: tag.id, value: tag.id, label: tag.name }))

            }
            onChange={(values) =>
              setNewTask((prev) => ({
                ...prev,
                Tags: values.map(tag => tag.value)
              })
              )}
            defaultValue={
              newTask.id ?
                newTask.Tags.map((tag) =>
                  ({ label: tag.name, value: tag.id })
                ) : ""
            }
          />

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
