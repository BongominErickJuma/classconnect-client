import React, { useState, useEffect } from "react";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import SubmissionHeader from "./SubmissionHeader";
import AddSubmission from "./AddSubmission";
import SubmissionTable from "./SubmissionTable";
import GradingSubmission from "./GradingSubmission";
import { useParams } from "react-router-dom";
import { submissionService } from "../../../../Services/api";

const Submissions = ({ submissions: initialSubmissions }) => {
  const [submissions, setSubmissions] = useState(initialSubmissions || []);
  const [filterStatus, setFilterStatus] = useState("All Statuses");
  const [gradingSubmission, setGradingSubmission] = useState(null);
  const [newScore, setNewScore] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSubmission, setNewSubmission] = useState({
    submitted_file: "",
    status: "Submitted",
  });
  const [isPending, setIsPending] = useState(false);

  const { id } = useParams();
  const { user } = useCurrentUser();

  const [showAddButton, setShowAddButton] = useState(user?.role === "student" && initialSubmissions.length === 0);

  const getFileIcon = (filename) => {
    const extension = filename.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return "📄 PDF";
      case "zip":
        return "🗄️ ZIP";
      case "docx":
        return "📝 DOCX";
      case "sql":
        return "🗃️ SQL";
      default:
        return "📁 File";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-100 text-blue-800";
      case "Graded":
        return "bg-green-100 text-green-800";
      case "Late":
        return "bg-yellow-100 text-yellow-800";
      case "Missing":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredSubmissions =
    filterStatus === "All Statuses" ? submissions : submissions.filter((s) => s.status === filterStatus);

  const handleGrade = (id) => {
    const updated = submissions.map((sub) =>
      sub.submission_id === id ? { ...sub, score: Number(newScore), status: "Graded" } : sub
    );
    setSubmissions(updated);
    setGradingSubmission(null);
    setNewScore("");
  };

  const handleDelete = (id) => {
    setSubmissions(submissions.filter((s) => s.submission_id !== id));
  };

  const handleAddSubmission = async () => {
    setIsPending(true);
    const newSub = {
      ...newSubmission,
      student_id: user.user_id,
    };

    try {
      const res = await submissionService.createSubmissions(id, newSub);
      if (res) {
        const resSub = res.data;
        setSubmissions([resSub, ...submissions]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
      setNewSubmission({ submitted_file: "", status: "Submitted" });
      setShowAddForm(false);
      setShowAddButton(false);
    }
  };

  return (
    <div>
      <SubmissionHeader
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        setShowAddForm={setShowAddForm}
        showAddForm={showAddForm}
        showAddButton={showAddButton}
      />

      {showAddForm && (
        <AddSubmission
          newSubmission={newSubmission}
          setNewSubmission={setNewSubmission}
          handleAddSubmission={handleAddSubmission}
          isPending={isPending}
        />
      )}

      <SubmissionTable
        filteredSubmissions={filteredSubmissions}
        getFileIcon={getFileIcon}
        getStatusBadge={getStatusBadge}
        formatDate={formatDate}
        handleDelete={handleDelete}
        setGradingSubmission={setGradingSubmission}
      />

      {/* Grade Modal */}
      {gradingSubmission && (
        <GradingSubmission
          gradingSubmission={gradingSubmission}
          setNewScore={setNewScore}
          newScore={newScore}
          setGradingSubmission={setGradingSubmission}
          handleGrade={handleGrade}
        />
      )}
    </div>
  );
};

export default Submissions;
