'use client'
import React, { useEffect, useState } from 'react'
// import "@styles/theme.css"
import '@styles/categories.css';

import StatsCard from '@components/statsCard';
import ProjectsComponent from "@components/projectsComponent";
import axios from 'axios';
import Link from 'next/link';

export default function page() {
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const [openProjectId, setOpenProjectId] = useState(null);

    // 🔥 GET PROJECTS
    useEffect(() => {
        const getProjects = async () => {
            try {
                const res = await axios.get('/api/projects/saved');
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

    return (
        <>
            <main className="ml-0 md:ml-64 pt-16 px-4 md:px-6 pb-8">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 ">Project Finished</h1>
                        <button
                            onClick={() => window.location.href = "/"}
                            title="Go to Home"
                            className="p-2 bg-gray-100 hover:bg-cyan-500 text-gray-700 hover:text-white rounded-lg transition-all duration-200 shadow-sm"
                        >
                            <i className="fa-solid fa-house"></i>
                        </button>
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
                                </div>
                                <div className="p-4" id="categoriesList">
                                    {/* Categories will be loaded here */}
                                    {projects.map((project) => (
                                        <ProjectsComponent
                                            key={project._id}
                                            project={project}
                                            isSelected={openProjectId === project._id}
                                            isOpen={openProjectId === project._id}
                                            onSelect={toggleProject}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
