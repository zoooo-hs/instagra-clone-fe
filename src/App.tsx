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
    <div className="App">
      <GND />
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
  );
}

export default App;
