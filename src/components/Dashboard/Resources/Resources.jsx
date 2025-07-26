import React, { useState } from "react";
import AddModel from "./AddModel";
import EditModel from "./EditModel";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import { useParams } from "react-router-dom";
import useCurrentUser from "../../Hooks/useCurrentUser";

const Resources = ({ resources: initialResources, isCourseInstructor, isEnrolled }) => {
  const [resources, setResources] = useState(initialResources);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentResource, setCurrentResource] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const [isAddingRes, setIsAddingRes] = useState(false);
  const [isEdittingRes, setIsEdittingRes] = useState(false);

  const { id } = useParams();
  const { user } = useCurrentUser();
  const [formData, setFormData] = useState({
    title: "",
    type: "document",
    file_url: "",
    file: null, // store actual file
    link: "",
    uploaded_at: new Date().toISOString().split("T")[0],
  });

  const getIconForType = (type) => {
    switch (type) {
      case "pdf":
        return "📄";
      case "video":
        return "🎬";
      case "document":
        return "📝";
      case "link":
        return "🔗";
      default:
        return "📁";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDeleteClick = (resource) => {
    setResourceToDelete(resource);
    setShowDeleteModal(true);
  };

  const handleAddClick = () => {
    setFormData({
      title: "",
      type: "document",
      file_url: "",
      link: "",
      uploaded_at: new Date().toISOString().split("T")[0],
    });
    setShowAddModal(true);
  };

  const handleEditClick = (resource) => {
    setCurrentResource(resource);
    setFormData({
      title: resource.title,
      type: resource.type,
      file_url: resource.file_url,
      link: resource.link || "",
      uploaded_at: resource.uploaded_at.split("T")[0],
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const formDataUpload = new FormData();
    formDataUpload.append("title", formData.title);
    formDataUpload.append("type", formData.type);
    formDataUpload.append("uploaded_at", new Date(formData.uploaded_at).toISOString());

    if (formData.link) {
      formDataUpload.append("link", formData.link);
    }

    if (formData.file instanceof File) {
      formDataUpload.append("file_url", formData.file); // match backend
    }
    setIsAddingRes(true);
    try {
      const res = await resourcesService.createResourse(id, formDataUpload);

      setResources([...resources, res.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsAddingRes(false);
      setShowAddModal(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formDataUpload = new FormData();
    formDataUpload.append("title", formData.title);
    formDataUpload.append("type", formData.type);
    formDataUpload.append("uploaded_at", new Date(formData.uploaded_at).toISOString());

    if (formData.link) {
      formDataUpload.append("link", formData.link);
    }

    if (formData.file instanceof File) {
      formDataUpload.append("file_url", formData.file); // only send if file was selected
    }

    const res = await resourcesService.updateResource(currentResource.resource_id, formDataUpload);

    const updatedResources = resources.map((resource) =>
      resource.resource_id === currentResource.resource_id ? res.data : resource
    );
    setResources(updatedResources);
    setShowEditModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await resourcesService.deleteResource(resourceToDelete.resource_id);
      setResources(resources.filter((r) => r.resource_id !== resourceToDelete.resource_id));
      setShowDeleteModal(false);
      setResourceToDelete(null);
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  return (
    <div className="my-3">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Resources</h1>
        {isCourseInstructor && (
          <button
            onClick={handleAddClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add Resource
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource.resource_id} className="border rounded-lg">
            <div className="p-2">
              <div className="flex items-start mb-3">
                <span className="text-2xl mr-3">{getIconForType(resource.type)}</span>
                <div>
                  <h3 className="text-lg font-semibold line-clamp-2">{resource.title}</h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {resource.type} • {formatDate(resource.uploaded_at)}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                {user.role === "student" && isEnrolled && (
                  <>
                    {resource.link && (
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                      >
                        {resource.type === "link" ? "Visit Link" : "Download"}
                      </a>
                    )}

                    {resource.file_url && (
                      <a
                        // href={getFileUrl(resource.file_url)}
                        href={resource.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                      >
                        Open
                      </a>
                    )}
                  </>
                )}

                {isCourseInstructor && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(resource)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(resource)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddModel
          handleAddSubmit={handleAddSubmit}
          handleInputChange={handleInputChange}
          formData={formData}
          setShowAddModal={setShowAddModal}
          isAddingRes={isAddingRes}
        />
      )}

      {showEditModal && (
        <EditModel
          handleEditSubmit={handleEditSubmit}
          handleInputChange={handleInputChange}
          formData={formData}
          setShowEditModal={setShowEditModal}
        />
      )}

      {showDeleteModal && (
        <ConfirmDeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setResourceToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default Resources;
