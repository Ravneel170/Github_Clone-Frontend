import { useNavigate, useRoutes } from 'react-router-dom';

import { useEffect } from 'react';

import Dashboard from './components/dashboard/dashboard';

import Profile from './components/user/profile';

import Login from './components/auth/login';

import Signup from './components/auth/signup';

import { useAuth } from './authContext';

const ProjectRoutes = () => {

  const { user, setUser } = useAuth();

  const navigate = useNavigate();


  useEffect(() => {

    const userId = localStorage.getItem('userId');

    if (userId && !user) {

      setUser(userId)
    }

    if (!userId && !['/auth', '/signup'].includes(window.location.pathname)) {

      navigate('/auth');
    }

    if (userId && window.location.pathname == '/auth') {

      navigate('/');
    }

  }, [user, navigate, setUser]);


  let element = useRoutes([

    { path: '/', element: <Dashboard /> },

    { path: '/auth', element: <Login /> },

    { path: '/signup', element: <Signup /> },

    { path: '/profile', element: <Profile /> }
  ]);

  return element;
}

export default ProjectRoutes;