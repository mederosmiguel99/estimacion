'use client'
import React, { useEffect, useState } from 'react'
// import "@styles/theme.css"
import '@styles/categories.css';

import StatsCard from '@components/statsCard';
import ProjectsList from '@/components/projectList';
import AddEditProject from '@components/addEditProject';
import QuotationsList from '@components/qoutationList';
import axios from 'axios';

export default function page() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [openProjectId, setOpenProjectId] = useState(null);

  const [formState, setFormState] = useState({
    mode: "project",   // project | quotation
    action: "add",     // add | edit
    targetId: null,
  });

  // 🔥 GET PROJECTS
  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await axios.get('/api/projects');
        setProjects(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProjects();
  }, []);

  // 🔹 SELECT
  const handleSelect = (id) => {
    setSelectedProjectId(id);
  };

  // 🔽 TOGGLE ACCORDION
  const toggleProject = (id) => {
    setOpenProjectId(prev => prev === id ? null : id);
    setSelectedProjectId(id);
  };

  const selectedProject = projects.find(
    (p) => p._id === selectedProjectId
  );

  // 🟢 ADD PROJECT
  const handleAddProject = () => {
    setFormState({
      mode: "project",
      action: "add",
      targetId: null,
    });
  };

  // ✏️ EDIT PROJECT
  const handleEditProject = (id) => {
    setFormState({
      mode: "project",
      action: "edit",
      targetId: id,
    });
  };

  // ➕ ADD QUOTATION
  const handleAddQuotation = () => {
    setFormState({
      mode: "quotation",
      action: "add",
      targetId: selectedProjectId,
    });
  };

  // ✏️ EDIT QUOTATION
  const handleEditQuotation = (id) => {
    console.log(id);
    setFormState({
      mode: "quotation",
      action: "edit",
      targetId: id,
    });
  };

  // 🔄 SWITCH
  const handleSwitchProjectQuotation = (mode) => {
    setFormState({
      mode: mode === "project" ? "quotation" : "project",
      action: "add",
      targetId: null,
    });
  };

  // 💾 SAVE PROJECT
  const handleSaveProject = async (data) => {
    try {
      const res = await axios.post('/api/projects', data);

      setProjects((prev) => {
        const updated = [...prev, res.data];

        return updated.sort(
          (a, b) => new Date(a.expirationDate) - new Date(b.expirationDate)
        );
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 💾 SAVE QUOTATION
  const handleSaveQuotation = async (data) => {

    try {
      const res = await axios.post(
        `/api/projects/${data.projectId}/quotations`,
        data
      );

      setProjects((prev) =>

        prev.map((p) =>
          p._id === data.projectId
            ? { ...p, quotations: [...p.quotations, res.data.quotation] }
            : p
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ✏️ UPDATE
  const handleUpdate = async (mode, data) => {
    //Update Proyect//
    try {
      if (mode === "project") {
        await axios.put(`/api/projects/${data.id}`, data);

        if (data.isCompleted) {
          /////Delete of the list ///
          setProjects((prev) =>
            prev.filter((p) => p._id !== data.id)
          );
        } else {
          setProjects((prev) => {
            const updated = prev.map((p) =>
              p._id === data.id ? { ...p, ...data } : p
            );

            return updated.sort(
              (a, b) => new Date(a.expirationDate) - new Date(b.expirationDate)
            );
          });
        }

      } else {
        ////Update Qoutation
        await axios.put(
          `/api/projects/${data.projectId}/quotations/${data.id}`,
          data
        );

        setProjects((prev) =>
          prev.map((p) =>
            p._id === data.projectId
              ? {
                ...p,
                quotations: p.quotations.map((q) =>
                  q._id === data.id ? { ...q, ...data } : q
                ),
              }
              : p
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ❌ DELETE (SOFT DELETE)
  const handleDelete = async (mode, data) => {
    try {
      if (mode === "project") {
        await axios.delete(`/api/projects/${data._id}`);

        setProjects((prev) =>
          prev.filter((p) => p._id !== data._id)
        );
      } else {
        await axios.delete(
          `/api/projects/${selectedProjectId}/quotations/${data._id}`
        );

        setProjects((prev) =>
          prev.map((p) =>
            p._id === selectedProjectId
              ? {
                ...p,
                quotations: p.quotations.filter(
                  (q) => q._id !== data._id
                ),
              }
              : p
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <app-header></app-header>

      <main className="ml-0 md:ml-64 pt-16 px-4 md:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 ">Project Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage and organize your projects and qoutations
              efficiently</p>
          </div>
          {/* Stats Cards */}
          <StatsCard />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Categories List */}
            <div className="lg:col-span-2">
              <div className="bg-white  rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200  flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900 ">Projects</h2>
                  <button id="addCategoryBtn" className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    onClick={handleAddProject}>
                    <i className="fa-regular fa-plus" ></i>
                    <span>Add Project</span>
                  </button>
                </div>
                <div className="p-4" id="categoriesList">
                  {/* Categories will be loaded here */}
                  {projects.map((project) => (
                    <ProjectsList
                      key={project._id}
                      project={project}
                      isSelected={openProjectId === project._id}
                      isOpen={openProjectId === project._id}
                      onAddQuotation={handleAddQuotation}
                      onSelect={toggleProject}
                      onEdit={handleEditProject}
                      onDelete={handleDelete}
                      onEditQuotation={handleEditQuotation}
                      onDeleteQuotation={handleDelete}
                    />
                  ))}
                </div>
              </div>
              {/* Qoutations Section */}
              {/* <div className="mt-8 bg-white  rounded-xl shadow-lg overflow-hidden">
                <div className='flex justify-between items-center'>
                  <div className="px-6 py-4 border-b border-gray-200  ">
                    <h2 className="text-xl font-bold text-gray-900 ">Qoutations</h2>
                  </div>
                  <div className='px-6 py-4'>
                    <button id="addCategoryBtn" className="bg-fuchsia-700 hover:bg-fuchsia-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                      onClick={handleAddQuotation}>
                      <i className="fa-regular fa-plus" ></i>
                      <span>Add Qoutation</span>
                    </button>
                  </div>
                </div>

                <div className="p-4" id="subcategoriesList">
                  <QuotationsList
                    project={selectedProject}
                    onEdit={handleEditQuotation}
                    onDelete={handleDelete}
                  />
                </div>
              </div> */}
            </div>
            {/* Add/Edit Panel */}
            <AddEditProject
              categories={projects}
              selectedCategory={selectedProject}
              subcategories={selectedProject?.quotations}
              formState={formState}
              onSaveCategory={handleSaveProject}
              onSaveSubcategory={handleSaveQuotation}
              onUpdateCategoryAndSubcategory={handleUpdate}
              onSwitchCategorySubcategory={handleSwitchProjectQuotation}
            />
          </div>
        </div>
      </main>

    </>
  )
}
