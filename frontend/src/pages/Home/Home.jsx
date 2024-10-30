import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import Board from "./Board/Board";
import Tags from "./Tags/Tags";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("board");
  const [tasks, setTasks] = useState([]);
  const [tasksTableData, setTasksTableData] = useState({
    headers: [
      { label: "Responsible", column: "assignedTo" },
      { label: "Description", column: "description" },
      { label: "Status", column: "status" },
    ],
    rows: [],
  });

  const mockTags = {
    headers: [{ label: "Tag", column: "tag" }],
    rows: [
      { id: 1, tag: "Design" },
      { id: 2, tag: "Frontend" },
      { id: 3, tag: "Backend" },
    ],
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    setTasksTableData({
      headers: [
        { label: "Responsible", column: "assignedTo" },
        { label: "Description", column: "description" },
        { label: "Status", column: "status" },
      ],
      rows: tasks,
    });
  }, [tasks, setTasks]);

  const [tags, setTags] = useState(mockTags);

  const statusOptions = [{ id: 1, value: "pending", label: "Pending" }];

  const tabs = {
    board: (
      <Board
        status={statusOptions}
        tasks={tasksTableData}
        setTasks={setTasks}
      />
    ),
    tags: <Tags tags={tags} setTags={setTags} />,
  };
  
  return (
    <div id="home-wrapper">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {tabs[currentTab]}
    </div>
  );
}
