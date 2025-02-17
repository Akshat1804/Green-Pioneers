import React, { useState } from "react";
import Card from "../Ui/Card2"; // ✅ Ensure default export
import Button from "../Ui/Button3"; // ✅ Ensure default export
import Progress from "../Ui/Progress2"; // ✅ Ensure default export
import { Users, Code, Plus } from "lucide-react";
import LeftBar from "../components/LeftBar";
import NavBar from "../components/NavBar";

const ProjectCollab = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Eco Calculator",
      description: "A gamified app to calculate the carbon footprint of daily activities.",
      techStack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      status: 60,
      contributors: 5,
    },
    {
      id: 2,
      name: "AI Travel Planner",
      description: "An AI-powered travel assistant that integrates Chrome APIs.",
      techStack: ["Python", "OpenAI API", "Firebase"],
      status: 80,
      contributors: 8,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    techStack: "",
    selectedProjectId: null,
  });

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    techStack: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);

  const handleApply = (projectId) => {
    setFormData({ ...formData, selectedProjectId: projectId });
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Application submitted! ✅ Name: ${formData.name}, Tech Stack: ${formData.techStack}`);
    setFormData({ name: "", contact: "", techStack: "", selectedProjectId: null });
    setShowForm(false);
  };

  const handleNewProjectSubmit = (e) => {
    e.preventDefault();
    const newProjectData = {
      id: projects.length + 1,
      name: newProject.name,
      description: newProject.description,
      techStack: newProject.techStack.split(","),
      status: 0,
      contributors: 1,
    };
    setProjects([...projects, newProjectData]);
    setNewProject({ name: "", description: "", techStack: "" });
    setShowNewProjectForm(false);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-xl">
      <NavBar />
      <LeftBar />
      <h2 className="text-2xl ml-[320px] font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Users className="text-blue-500 mt-10" /> Collaborative Projects
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {/* Project List */}
        <div className="p-4 ml-[300px] bg-gray-50 w-[1000px] rounded-lg shadow-md">
          {projects.map((project) => (
            <Card key={project.id} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Code className="text-green-600" /> {project.name}
              </h3>
              <p className="text-gray-700 mt-1">{project.description}</p>

              <div className="mt-2">
                <span className="text-gray-600 font-semibold">Tech Stack:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="px-2 py-1 text-sm bg-blue-200 text-blue-800 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <span className="text-gray-600 font-semibold">Project Status:</span>
                <Progress value={project.status} className="mt-1" />
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-700 flex items-center gap-2">
                  <Users className="text-gray-600" /> {project.contributors} Contributors
                </span>
                <Button
                  onClick={() => handleApply(project.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Apply Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Apply Form */}
        {showForm && (
          <div className="p-4 absolute top-34 left-56 bg-gray-300 ml-[300px] w-[530px] rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Apply for the Project</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4 w-[500px]">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 border-b-2 outline-none border-black  bg-transparent  rounded-xl"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Contact Information"
                className="w-full p-2 border-b-2 outline-none border-black  bg-transparent rounded-xl"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Your Tech Stack (comma separated)"
                className="w-full p-2 border-b-2 outline-none border-black  bg-transparent rounded-xl"
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                required
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Submit Application
              </Button>
            </form>
          </div>
        )}

        {/* Add New Project Button */}
        <div  className="flex justify-center mt-6">
          <Button
            onClick={() => setShowNewProjectForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} /> Add New Project
          </Button>
        </div>

        {/* New Project Form */}
        {showNewProjectForm && (
          <div className="p-4 absolute top-34 left-56 bg-gray-300 ml-[300px] w-[600px] rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Add a New Project</h3>
            <form onSubmit={handleNewProjectSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Project Name"
                className="w-full p-2 border-b-2 outline-none text-white border-black  bg-transparent  rounded-xl"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                required
              />
              <textarea
                placeholder="Project Description"
                className="w-full p-2 border-b-2 outline-none border-black  bg-transparent  rounded-xl"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Tech Stack (comma separated)"
                className="w-full p-2 border-b-2 outline-none border-black  bg-transparent  rounded-xl"
                value={newProject.techStack}
                onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                required
              />
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                Create Project
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCollab;
