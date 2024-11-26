import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import Board from "./Board/Board";
import Tags from "./Tags/Tags";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("board");
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [tasksTableData, setTasksTableData] = useState({
    headers: [
      { label: "To do", column: "pending" },
      { label: "In Progress", column: "inProgress" },
      { label: "Done", column: "completed" },
    ],
    rows: [],
  });

  const [tagsTableData, setTagsTableData] = useState({
    headers: [{ label: "Tag Name", column: "tag" }],
    rows: [],
  });
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
        { label: "To do", column: "pending" },
        { label: "In Progress", column: "inProgress" },
        { label: "Done", column: "completed" },
      ],
      rows: tasks,
    });
  }, [tasks, setTasks]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get("/tags");
        setTags(response.data);
      } catch (error) {
        console.error(error)
      }
    };
    fetchTags();
  }, [])

  useEffect(() => {
    setTagsTableData({
      headers: [{ label: "Tag Name", column: "tag" }],
      rows: tags,
    });
  }, [tags, setTags]);

  const statusOptions = [
    { id: 1, value: "pending", label: "Pending" },
    { id: 2, value: "inProgress", label: "In Progress" },
    { id: 3, value: "completed", label: "Done" }
  ];

  const tabs = {
    board: (
      <Board
        status={statusOptions}
        tasks={tasksTableData}
        setTasks={setTasks}
      />
    ),
    tags: <Tags tags={tagsTableData} setTags={setTags} />,
  };

  return (
    <div id="home-wrapper">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {tabs[currentTab]}
    </div>
  );
}
