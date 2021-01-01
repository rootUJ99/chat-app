import {useLocalStorage} from '../../hooks';
import {useState} from 'react';
import './styles.css';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Login = () => {
  const [mode, setMode] = useState('LOGIN');
  const [token, setToken] = useLocalStorage('token', '');
  const [authForm, setAuthForm] = useState({
    username: '',
    password: '',
  });
  const switchMode = () => mode==='LOGIN' ? 'REGISTER' : 'LOGIN';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(mode=== 'LOGIN') handleSubmitLogin();
    if(mode=== 'REGISTER') handleSubmitRegister();
  }

  const handleSubmitLogin = async() => {
    try {
      const raw = await fetch('/api/user/token', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(authForm), 
      });
      const data = await raw.json();
      setToken(data);
      console.log(data);
      window.location.reload();
    } catch(error) {
      console.log(error)
    }
  }
  
  const handleSubmitRegister = async() => {
    try {
      const raw = await fetch('/api/user/create', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(authForm), 
      });
      const data = await raw.json();
      console.log(data);
    } catch(error) {
      console.log(error)
    }
  }
  
  const handleChange = (e) => {
    setAuthForm({
      ...authForm,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <div className="auth-form">
        <Input name="username" placeholder="username" value={authForm.username} onChange={handleChange}/>
        <Input type="password" name="password" placeholder="password" value={authForm.password} onChange={handleChange}/>
        <Button type="submit">{mode}</Button><br/>
        <div className="or-divider">--or--</div>
        <Button type="button" onClick={()=> setMode(switchMode())}>{switchMode()}</Button>
        </div>
      </form>
    </div>
  );
}

export default Login; 
