import axios from "axios";

// Create axios instance with base config
const api = axios.create({
  // baseURL: "http://localhost:3000/api/v1/ecl",
  baseURL: "https://classconnect-server-fxpq.onrender.com/api/v1/ecl",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log(error);
    // Standard error handling
    if (error.response) {
      const message = error.response.data?.message || "An error occurred";
      return Promise.reject(new Error(message));
    } else if (error.request) {
      return Promise.reject(new Error("Network error - no response from server"));
    } else {
      return Promise.reject(new Error("Request setup error"));
    }
  }
);

export function getImageUrl(relativePath) {
  if (!relativePath) return ""; // fallback

  // relativePath = relativePath.startsWith("https") ? relativePath : `${`http://localhost:3000`}${relativePath}`;
  relativePath = relativePath.startsWith("https")
    ? relativePath
    : `${`https://classconnect-server-fxpq.onrender.com`}${relativePath}`;

  return relativePath;
}

export function getFileUrl(relativePath) {
  if (!relativePath) return "";
  // If it's already a full Cloudinary URL
  if (relativePath.startsWith("https://res.cloudinary.com")) {
    return relativePath.replace("/upload/", "/upload/fl_attachment:false/");
  }

  // Fallback for local or server-based files
  return `${"http://localhost:3000"}${relativePath}`;
}

// Auth Service
export const authService = {
  login: async (credentials) => {
    const login = await api.post("/users/login", credentials);
    return login;
  },
  signup: async (userData) => {
    return api.post("/users/signup", userData);
  },
  logout: async () => {
    // Server should clear the ecl_Jwt cookie
    return api.get("/users/logout");
  },
  verifyEmail: async (token) => {
    await api.patch(`/users/verify-email/${token}`);
  },
  forgotPassword: async (email) => {
    const res = await api.post(`/users/forgotPassword`, { email });
    return res;
  },
  resetPassword: async (password, token) => {
    await api.patch(`/users/resetPassword/${token}`, { password });
  },
};

// User Service

export const userService = {
  getMe: async () => {
    const res = await api.get("/users/me");
    return res;
  },
  updateMe: async (formData) => {
    return await api.patch("/users/updateMe", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updatePassword: async (data) => {
    return await api.patch("/users/updatePassword", data);
  },
  deleteMe: async () => {
    return await api.delete("/users/deleteMe");
  },
  getUser: async (id) => {
    return await api.get(`/users/${id}`);
  },
  updateUserRole: async (id, data) => {
    return await api.patch(`/users/${id}`, data);
  },

  deleteUser: async (id) => {
    return await api.delete(`/users/${id}`);
  },

  getAllUsers: async () => {
    return await api.get(`/users`);
  },

  getInstructors: async () => {
    const instructors = await api.get(`/users?role=instructor`);
    const admins = await api.get(`/users?role=admin`);

    const res = [...instructors.data, ...admins.data];
    return res;
  },
};

// Course Servics

export const courseService = {
  getAllCourses: async () => {
    return await api.get("/courses");
  },

  getInstructorCourses: async (instructor_id) => {
    return await api.get(`/courses?instructor_id=${instructor_id}`);
  },

  getCourse: async (id) => {
    return await api.get(`/courses/${id}`);
  },

  getEnrolledCourses: async (ids) => {
    return await api.get(`courses/enrolled-courses/${ids}`);
  },

  updateCourse: async (id, data) => {
    return await api.patch(`/courses/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

// Assignment Servics

export const assignmentService = {
  getAllAssignments: async (params) => {
    return await api.get(`/courses/assignments?${params}`);
  },

  getAssignment: async (id) => {
    return await api.get(`/courses/assignments/${id}`);
  },

  // /api/v1/ecl/courses/f4f9bc93-015c-4535-b750-99a906e16d08/assignments
  createAssignments: async (id, data) => {
    return await api.post(`/courses/${id}/assignments`, data);
  },

  UpdateAssignments: async (id, data) => {
    return await api.patch(`/courses/assignments/${id}`, data);
  },

  deleteAssignment: async (id) => {
    await api.delete(`/courses/assignments/delete-permanently/${id}`);
  },
};

// Submissions services

export const submissionService = {
  getAllSubmissions: async (params) => {
    return await api.get(`/courses/assignments/submissions?${params}`);
  },

  getSubmission: async (id) => {
    return await api.get(`/courses/assignments/submissions/${id}`);
  },

  getMySubmissions: async (id, user_id) => {
    return await api.get(`/courses/assignments/submissions?student_id=${user_id}&assignment_id=${id}`);
  },

  createSubmissions: async (id, file) => {
    return await api.post(`/courses/assignments/${id}/submissions`, file);
  },
};

// Resource services

export const resourcesService = {
  getAllresources: async (params) => {
    return await api.get(`/courses/resources?${params}`);
  },

  getResource: async (id) => {
    return await api.get(`/courses/resources/${id}`);
  },

  createResourse: async (id, formData) => {
    return await api.post(`/courses/${id}/resources`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateResource: async (id, formData) => {
    return await api.patch(`/courses/resources/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteResource: async (id) => {
    await api.delete(`/courses/resources/delete-permanently/${id}`);
  },
};

// Reviews Service

export const reviewService = {
  getReview: async (params) => {
    return await api.get(`/courses/ratings/course-ratings/${params}`);
  },
  createReview: async (course_id, reviewData) => {
    return await api.post(`/courses/${course_id}/ratings`, reviewData);
  },

  updeteReview: async (reviewData, review_id) => {
    return await api.patch(`/courses/ratings/${review_id}`, reviewData);
  },

  deleteReview: async (review_id) => {
    return await api.delete(`/courses/ratings/${review_id}`);
  },
};

export const enrollmentService = {
  getEnrollments: async (student_id) => {
    return await api.get(`courses/enrollments?student_id=${student_id}`);
  },

  getCourseTotalEntollments: async (id) => {
    return await api.get(`courses/enrollments?course_id=${id}`);
  },

  createEnrollment: async (course_id, student_id) => {
    return await api.post(`/courses/${course_id}/enrollments`, { student_id });
  },

  deleteMyEnrollment: async (id) => {
    // id is enrollment id
    await api.delete(`/courses/enrollments/delete-permanently/${id}`);
  },
};

export const gradeServie = {
  getALlGrades: async () => {
    await axios.get("");
  },
};

// dashboard statistics

export const statisticsService = {
  getStudentRecentGrades: async () => {
    return await api.get("/stats/student-recent-grades");
  },
  getInstructorRecentReviews: async () => {
    return await api.get("/stats/instructor-recent-reviews");
  },
  getStudentRecentActivities: async () => {
    return await api.get("/stats/student-recent-activities");
  },
  getInstructorRecentActivities: async () => {
    return await api.get("/stats/instructor-recent-activities");
  },
  getStudentUpcomingDeadlines: async () => {
    return await api.get("/stats/student-upcoming-deadlines");
  },
  getInstructorUpcomingDeadlines: async () => {
    return await api.get("/stats/instructor-upcoming-deadlines");
  },
  getStudentDashboardMetrics: async () => {
    return await api.get("/stats/student-dashboard-metrics");
  },
  getInstructorDashboardMetrics: async () => {
    return await api.get("/stats/instructor-dashboard-metrics");
  },
};

export const notificationService = {
  getAllNotifications: async (user_id) => {
    return await api.get(`/notifications?user_id=${user_id}&read=false`);
  },
  openNotification: async (id) => {
    return await api.patch(`/notifications/${id}`);
  },
};
