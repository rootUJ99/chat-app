import {useLocalStorage} from '../../hooks';
import {useState} from 'react';
import './styles.css';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Login = () => {
  const [mode, setMode] = useState('LOGIN');
  const [token, setToken] = useLocalStorage('token', '');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [authForm, setAuthForm] = useState({
    username: '',
    password: '',
  });
  const switchMode = () => mode==='LOGIN' ? 'REGISTER' : 'LOGIN';
  const clearMessages = () => {
    setSuccessMessage('');
    setErrorMessage('');
  }
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
      if (!raw.ok && raw.status === 400) throw await raw.json();
      const data = await raw.json();
      setToken(data);
      setErrorMessage('');
      window.location.reload();
    } catch(err) {
      setErrorMessage(err?.error);
    }
  }
  
  const handleSubmitRegister = async() => {
    try {
      const raw = await fetch('/api/user/create', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(authForm), 
      });
      if (!raw.ok && raw.status === 400) throw await raw.json();
      const data = await raw.json();
      setErrorMessage('');
      setSuccessMessage(data?.message);
    } catch(err) {
      setErrorMessage(err?.error);
      console.log(err)
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
        { errorMessage && <div className="error-message">{errorMessage}</div>}
        { successMessage &&<div className="success-message">{successMessage}</div>}
        <Button type="submit">{mode}</Button><br/>
        <div className="or-divider">--or--</div>
        <Button type="button" onClick={()=> {
          clearMessages();
          setMode(switchMode());
        }
        }>{switchMode()}</Button>
        </div>
      </form>
    </div>
  );
}

export default Login; 
