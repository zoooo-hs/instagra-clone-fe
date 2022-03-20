import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn, * as signIn from './component/auth/sign-in';
import SignUp from './component/auth/sign-up';
import GND from './component/gnd';
import PostForm from './component/post/post-form';
import PostList from './component/post/post-list';
import { RequireAuth } from './component/RequireAuth';

function App() {
  return (
    <div className="window-background">
      <div className="window">
        <GND />
        <div className='window-body'>
          <Routes>
            <Route path={signIn.path} element={<SignIn/>} />
            <Route path="sign-up" element={<SignUp/>} />
            <Route path="/post-form" element={
              <RequireAuth component={<PostForm />}/>
            } />
            <Route path="/" element={
              <RequireAuth component={<PostList />}/>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
