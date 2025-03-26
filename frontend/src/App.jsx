import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './routes/HomePage';
import PostList from './routes/AllPostsPage.jsx';
import Login from './routes/Login';
import Register from './routes/Register';
import Post from './routes/SinglePostPage.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import RequireLogged from './components/RequireLoged.jsx' ;
import Admin from './routes/Adminpage.jsx';
import Editor from './routes/EditorPage.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import AddPost from './routes/AddPost.jsx';
import Logout from './routes/Logout.jsx';
import AuthorPage from './routes/AuthorPage.jsx';

const Roles = {
  User: 2000,
  Editor: 3000,
  Admin: 4000,
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'posts', element:<PostList/>,},
      { path: 'posts/:slug', element: <Post /> },
      {path: 'author/:authorId', element: <AuthorPage />},
      {
        path: 'admin',
        element: <RequireAuth allowedRoles={[Roles.Admin]} />,
        children: [{ index: true, element: <Admin /> }],
      },
      {
        path: 'addpost',
        element: <RequireLogged />,
        children: [{ index: true, element: <AddPost /> }],
      },
      {
        path : 'notallowed',
        element: <notAllowed/>
      },
      {
        path: '/logout',
        element: <Logout /> 
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
]);

const App = () => {
  return (
      <RouterProvider router={router} />
  );
};

export default App;
