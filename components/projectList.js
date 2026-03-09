import React from 'react'
import QoutationList from '@components/qoutationList';

export default function categoriesList(
    {
        project,
        isSelected,
        isOpen,
        onSelect,
        onAddQuotation,
        onEdit,
        onDelete,
        onEditQuotation,
        onDeleteQuotation,
    }
) {

    const getProjectStatusColor = (expirationDate) => {
        if (!expirationDate) return "bg-gray-400";

        const today = new Date();
        const exp = new Date(expirationDate);

        // quitar horas para comparar bien
        today.setHours(0, 0, 0, 0);
        exp.setHours(0, 0, 0, 0);

        const diffTime = exp - today;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        const quotationPending = project?.quotations?.filter(q => !q.isReceived)?.length || 0

        if (diffDays <= 0 && quotationPending != 0 && project.quotations.length > 0)
            return {
                warning: "bg-red-400",
                textWarning: 'OutTime'
            };        // 🔴 hoy o vencido
        if (diffDays <= 2 && quotationPending != 0 && project.quotations.length > 0) return {
            warning: "bg-yellow-400",
            textWarning: 'Delayed'
        };     // 🟡 1-2 días
        return {
            warning: "bg-green-300",
            textWarning: 'InTime'
        }                         // 🟢 más de 2 días
    };

    const pendingCount = project?.quotations?.filter(q => !q.isReceived)?.length || 0;
    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toISOString().split("T")[0];
    };

    return (
        <>
            <div>
                <div
                    onClick={() => onSelect(project._id)}
                    className={`rounded-lg p-4 mb-3 border hover:border-blue-300 transition cursor-pointer  
        ${isSelected
                            ? "border-blue-500 bg-blue-100 "
                            : "hover:border-primary-300  border-gray-200 bg-gray-50"}
      `}
                >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${getProjectStatusColor(project.expirationDate).warning}`} />
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    {project.name}
                                </h3>
                                <div className='flex'>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {`${project.requestDate
                                            ? new Date(project.requestDate).toLocaleDateString("en-US", {
                                                timeZone: "UTC",
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })
                                            : ""} - ${project.expirationDate
                                                ? new Date(project.expirationDate).toLocaleDateString("en-US", {
                                                    timeZone: "UTC",
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })
                                                : "-"}`}</p>
                                </div>

                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <div>
                                <span className={`badge ${getProjectStatusColor(project.expirationDate).warning} text-primary-800 dark:text-primary-300`}>
                                    {formatDate(project.alertDate)}
                                </span>
                                <span className={`badge ${getProjectStatusColor(project.expirationDate).warning} text-primary-800 dark:text-primary-300`}>
                                    Pending: {project?.quotations?.filter(q => !q.isReceived)?.length || 0}
                                </span>
                                <span className={`badge ${getProjectStatusColor(project.expirationDate).warning} text-primary-800 dark:text-primary-300`}>
                                    {getProjectStatusColor(project.expirationDate).textWarning}
                                </span>
                            </div>


                            <div className="flex space-x-1">
                                <button className="p-2 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-blue-100 dark:hover:bg-white-600 rounded-md transition"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(project._id);
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2 w-4 h-4">
                                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                                        </path>
                                    </svg>
                                </button>

                                <button className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-white-600 rounded-md transition"
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        const confirmDelete = window.confirm("Are you sure you want to delete this project?");

                                        if (!confirmDelete) return;

                                        onDelete('project', project);
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 w-4 h-4">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                        </path>
                                        <line x1={10} y1={11} x2={10} y2={17} />
                                        <line x1={14} y1={11} x2={14} y2={17} />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div >

                {/* 🔥 ACCORDION CONTENT */}
                {
                    isOpen && (
                        <div className={`mt-8 rounded-xl shadow-lg overflow-hidden ${isOpen ? "max-h-[500px] mt-4" : "max-h-0"}`} style={{ backgroundColor: 'pink', marginBottom: '3%' }}>
                            <div className='flex justify-between items-center'>
                                <div className="px-6 py-4 border-b border-gray-200  ">
                                    <h2 className="text-xl font-bold text-gray-900 ">Quotations</h2>
                                </div>
                                <div className='px-6 py-4'>
                                    <button id="addCategoryBtn" className="bg-fuchsia-700 hover:bg-fuchsia-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                                        onClick={onAddQuotation}>
                                        <i className="fa-regular fa-plus" ></i>
                                        <span>Add Quotation</span>
                                    </button>
                                </div>
                            </div>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] mt-4" : "max-h-0"
                                    }`}
                            >
                                <QoutationList
                                    project={project}
                                    selectedCategory={project}
                                    onEdit={onEditQuotation}
                                    onDelete={onDeleteQuotation}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}
