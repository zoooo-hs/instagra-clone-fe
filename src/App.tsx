import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './component/auth/sign-in';
import SignUp from './component/auth/sign-up';
import GND from './component/gnd';
import PostList from './component/post/post-list';
import posts from './mock/posts';

function App() {
  return (
    <div className="App">
      <GND />
      <Routes>
        <Route path="sign-in" element={<SignIn/>} />
        <Route path="sign-up" element={<SignUp/>} />
        <Route path="/" element={<PostList posts={posts}/>} />
      </Routes>
    </div>
  );
}

export default App;
