import React from 'react'
import Quotations from '@components/quotations';

export default function categoriesList(
    {
        project,
        isSelected,
        isOpen,
        onSelect,
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

        if (diffDays <= 0) return "bg-red-400";        // 🔴 hoy o vencido
        if (diffDays <= 2) return "bg-yellow-400";     // 🟡 1-2 días
        return "bg-green-300";                         // 🟢 más de 2 días
    };

    const pendingCount = project?.quotations?.filter(q => !q.isReceived)?.length || 0;

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
                            <div className={`w-3 h-3 rounded-full ${getProjectStatusColor(project.expirationDate)}`} />
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    {project.name}
                                </h3>
                                <div className='flex'>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {`${project.requestDate
                                            ? new Date(project.requestDate).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })
                                            : ""} - ${project.expirationDate
                                                ? new Date(project.expirationDate).toLocaleDateString("en-US", {
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
                                <span className={`badge ${getProjectStatusColor(project.expirationDate)} text-primary-800 dark:text-primary-300`}>
                                    Pending: {project?.quotations?.filter(q => !q.isReceived)?.length || 0}
                                </span>
                                <span className={`badge ${getProjectStatusColor(project.expirationDate)} text-primary-800 dark:text-primary-300`}>
                                    inTime
                                </span>
                            </div>

                        </div>
                    </div>
                </div>

                {/* 🔥 ACCORDION CONTENT */}
                {
                    isOpen && (
                        <div className={`mt-8 bg-white  rounded-xl shadow-lg overflow-hidden ${isOpen ? "max-h-[500px] mt-4" : "max-h-0"}`}>
                            <div className='flex justify-between items-center'>
                                <div className="px-6 py-4 border-b border-gray-200  ">
                                    <h2 className="text-xl font-bold text-gray-900 ">Qoutations</h2>
                                </div>
                            </div>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] mt-4" : "max-h-0"}`}>
                                {
                                    project.quotations.map((q) => {
                                        return <Quotations
                                            key={q._id}
                                            sub={q}
                                            selectedCategory={project}
                                        />
                                    })
                                }

                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}
