import React, { useState } from "react";
import AddModel from "./AddModel";
import EditModel from "./EditModel";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import { useParams } from "react-router-dom";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { Card, Button, Badge } from "../../ui";
import { resourcesService } from "../../../Services/api";

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
      title: resource.title || "",
      type: resource.type || "document",
      file_url: resource.file_url || "",
      link: resource.link || "",
      uploaded_at: resource.uploaded_at ? resource.uploaded_at.split("T")[0] : new Date().toISOString().split("T")[0],
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
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
              Course Resources
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              {resources.length} resource{resources.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>

        {isCourseInstructor && (
          <Button
            onClick={handleAddClick}
            variant="primary"
            size="md"
            className="shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Resource
          </Button>
        )}
      </div>

      {/* Resources Grid */}
      {resources.length === 0 ? (
        <Card className="text-center" padding="lg">
          <div className="py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-[var(--color-surface)] rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              No Resources Available
            </h3>
            <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
              {isCourseInstructor 
                ? "Start by adding your first course resource to help students learn." 
                : "The instructor hasn't added any resources yet. Check back later!"}
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <Card 
              key={resource.resource_id}
              className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              padding="lg"
            >
              {/* Resource Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-[var(--color-surface)] rounded-lg group-hover:scale-110 transition-transform duration-200">
                  <span className="text-2xl">{getIconForType(resource.type)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
                    {resource.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" size="sm">
                      {resource.type}
                    </Badge>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {formatDate(resource.uploaded_at)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Resource Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                {/* Student Actions */}
                {user.role === "student" && isEnrolled && (
                  <div className="flex gap-2 flex-1">
                    {resource.link && (
                      <Button
                        as="a"
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="primary"
                        size="sm"
                        className="flex-1"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {resource.type === "link" ? "Visit" : "Download"}
                      </Button>
                    )}

                    {resource.file_url && (
                      <Button
                        as="a"
                        href={resource.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="primary"
                        size="sm"
                        className="flex-1"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Open
                      </Button>
                    )}
                  </div>
                )}

                {/* Instructor Actions */}
                {isCourseInstructor && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEditClick(resource)}
                      variant="secondary"
                      size="sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(resource)}
                      variant="danger"
                      size="sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </Button>
                  </div>
                )}

                {/* Not enrolled message */}
                {user.role === "student" && !isEnrolled && (
                  <div className="flex-1 text-center">
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Enroll to access resources
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

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
