import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SecondLayout from './layouts/SecondLayout';
import Courses from './components/Teacher/Courses';
import Login from './components/Common/Login';
import LoginForm from './components/Common/LoginForm';
import RegisterForm from './components/Common/RegisterForm';
import CoursePoints from './components/Teacher/CoursePoints';
import ForgetPassForm from './components/Common/ForgetPassForm';
import DefaultLayout from './layouts/DefaultLayout';
import HeaderTeacher from './layouts/Teacher/HeaderTeacher';
import Page404 from './views/Page404';
import ChatRoom from './components/Common/ChatRoom';
import Classes from './components/Teacher/Classes';
import { createContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

const UserContext = createContext()

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
  }, [])

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <HeaderTeacher />
        <Container>
          <Routes>
            <Route path='/' element={<LoginForm />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/forget-pass' element={<ForgetPassForm />} />
            <Route path='/chat' element={<ChatRoom />} />
            <Route path='/teacher' element={<SecondLayout />} />
            <Route path='/teacher/:teacherId/courses' element={<Courses />} />
            <Route path='/courses/:courseId' element={<CoursePoints />} />
            {/* <Route path='/teacher/:teacherId/courses/:courseId' element={<CoursePoints />} /> */}
            <Route path='*' element={<Page404 />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>

    </UserContext.Provider>
  );
}

export default App;
