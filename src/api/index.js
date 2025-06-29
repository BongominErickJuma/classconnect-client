import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// Users
export const fetchCurrentUser = () => API.get("/users/me");
export const updateProfilePhoto = (photo) => API.patch("/users/photo", photo);

// Courses
export const fetchUserCourses = (role) => API.get(`/courses?role=${role}`);
export const fetchCourseDetails = (courseId) => API.get(`/courses/${courseId}`);

// Assignments
export const fetchUpcomingAssignments = () => API.get("/assignments/upcoming");
export const fetchCourseAssignments = (courseId) => API.get(`/assignments?courseId=${courseId}`);

// Submissions
export const fetchStudentSubmissions = () => API.get("/submissions");
export const submitAssignment = (data) => API.post("/submissions", data);

// Notifications
export const fetchNotifications = () => API.get("/notifications");
export const markNotificationAsRead = (id) => API.patch(`/notifications/${id}/read`);

// Add interceptors for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
