import React, { useState, useEffect } from "react";
import { database } from "../Dashboard/firebaseConfig";
import { ref, onValue, update, remove } from "firebase/database";

const Issues = ({ isOpen }) => {
    const [issuesData, setIssuesData] = useState([]);

    useEffect(() => {
        const dbRef = ref(database, 'Issues');
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            const formattedData = [];

            if (data) {
                Object.keys(data).forEach(category => {
                    Object.keys(data[category]).forEach(issueKey => {
                        formattedData.push({
                            ...data[category][issueKey],
                            category, 
                            id: issueKey
                        });
                    });
                });
            }
            setIssuesData(formattedData);
        });
    }, []);

    const handleStatusChange = (category, issueId, currentStatus) => {
        // Prevent modification if already resolved
        if (currentStatus) return;

        const issueRef = ref(database, `Issues/${category}/${issueId}`);
        update(issueRef, {
            status: true 
        })
            .then(() => {
                console.log("Issue marked as resolved successfully.");
                setTimeout(() => {
                    remove(issueRef)
                        .then(() => {
                            console.log("Issue deleted successfully.");
                        })
                        .catch((error) => {
                            console.error("Error deleting issue:", error);
                        });
                }, 2000 * 1000); 
            })
            .catch((error) => {
                console.error("Error updating status:", error);
            });
    };

    return (
        <div className="container-dashboard flex h-screen">
            <div className={`Content flex-1 p-10 transition-all duration-300 ${isOpen ? 'ml-56' : 'ml-0'} bg-blue-20 relative`}>
                <h1 className="text-center font-bold text-lg mb-4">Issues List</h1>
                <div className="issuesDB bg-transparent w-full text-gray-500 mt-10 mr-5 outline-none">
                    <table className="table-auto border-collapse w-full text-left shadow-2xl rounded-3xl overflow-hidden">
                        <thead className="bg-white text-black">
                            <tr>
                                <th className="border-b border-gray-400 px-4 py-2">Category</th>
                                <th className="border-b border-gray-400 px-4 py-2">Type of Issue</th>
                                <th className="border-b border-gray-400 px-4 py-2">Name</th>
                                <th className="border-b border-gray-400 px-4 py-2">Roll Number</th>
                                <th className="border-b border-gray-400 px-4 py-2">Status</th>
                                <th className="border-b border-gray-400 px-4 py-2">Mark as Resolved</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {issuesData.length > 0 ? (
                                issuesData.map((issue, index) => (
                                    <tr key={index}>
                                        <td className="border-t border-gray-200 px-4 py-2">{issue.category}</td>
                                        <td
                                            className={`border-t border-gray-200 px-4 py-2 ${
                                                issue.status ? "line-through text-gray-500" : ""
                                            }`}
                                        >
                                            {issue.issue || issue.type}
                                        </td>
                                        <td
                                            className={`border-t border-gray-200 px-4 py-2 ${
                                                issue.status ? "line-through text-gray-500" : ""
                                            }`}
                                        >
                                            {issue.name}
                                        </td>
                                        <td
                                            className={`border-t border-gray-200 px-4 py-2 ${
                                                issue.status ? "line-through text-gray-500" : ""
                                            }`}
                                        >
                                            {issue.rollNo}
                                        </td>
                                        <td className="border-t border-gray-200 px-4 py-2">
                                            {issue.status ? 'Resolved' : 'Unresolved'}
                                        </td>
                                        <td className="border-t border-gray-200 px-4 py-2 text-center">
                                            <input
                                                type="checkbox"
                                                checked={issue.status}
                                                disabled={issue.status}
                                                onChange={() =>
                                                    handleStatusChange(issue.category, issue.id, issue.status)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="border-t border-gray-200 px-4 py-2 text-center">No issues found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Issues;
