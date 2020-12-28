import './App.css';
import Auth from './pages/Auth';
import Chat from './pages/Chat';

import {useLocalStorage} from './hooks';
const App = () => {
const [userData] = useLocalStorage('token');
  return (
    <div>
      {userData?.token ? <Chat/> : <Auth/>}
    </div>
  )
}

export default App;
