import Home from "./../Sections/DashboardHome/Home";
import Assignments from "./../Sections/Assignments/Assignments";
import Submissions from "./../Sections/Submissions/Submissions";
import Courses from "./../Sections/Courses/Courses";
import Students from "./../Sections/Students/Students";
import Resources from "./../Sections/Resources/Resources";
import ProfilePage from "../Sections/Profile/ProfilePage";

const ContentArea = ({ activeItem, user }) => {
  const contentMap = {
    Dashboard: { component: <Home user={user} /> },
    Courses: { component: <Courses /> },
    Assignments: { component: <Assignments /> },
    Submissions: { component: <Submissions /> },
    Students: { component: <Students /> },
    Resources: { component: <Resources /> },
    Settings: { component: <ProfilePage user={user} /> },
  };

  const content = contentMap[activeItem] || contentMap.Dashboard;

  return <> {content.component}</>;
};

export default ContentArea;
