import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import Login from "./pages/Login"
import MainLayout from "./layouts/MainLayout"
import Dashboard from "./pages/Dashboard"
import EducationalInstituts from "./pages/EducationalInstituts"
import Subjects from "./pages/Subjects"
import Level from "./pages/Level"
import Questions from "./pages/Questions"
import Collections from "./pages/Collections"
import Profile from "./pages/Profile"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />} >
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />} >
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile/>} />
            <Route path="educational-institution" element={<EducationalInstituts/>} />
            <Route path="subjects" element={<Subjects/>} />

            {/* Dynamic routes */}
            <Route path="subjects/:subjectId/collection" element={<Collections/>} />
            <Route path="subjects/:subjectId/collection/:collectionId/level" element={<Level />} />
            <Route path="subjects/:subjectId/collection/:collectionId/level/:levelId/questions" element={<Questions />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}
