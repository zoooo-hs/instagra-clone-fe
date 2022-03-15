import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './component/auth/sign-in';
import SignUp from './component/auth/sign-up';
import GND from './component/gnd';
import PostList from './component/post/post-list';
import { RequireAuth } from './component/RequireAuth';

function App() {
  return (
    <div className="App">
      <GND />
      <Routes>
        <Route path="sign-in" element={<SignIn/>} />
        <Route path="sign-up" element={<SignUp/>} />
        <Route path="/" element={
          <RequireAuth component={<PostList />}/>
        } />
      </Routes>
    </div>
  );
}

export default App;
