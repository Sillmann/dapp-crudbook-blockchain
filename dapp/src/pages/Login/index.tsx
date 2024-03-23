import './styles.css';
import { doLogin } from '../Services/Web3Service';

export default function Login() {

  function onBtnLogin() {
    // alert("login");
    doLogin()
      .then(result => alert(result))
      .catch(err => {
        console.error(err);
      })
  }

  return (

    <div className="container">
      
      <div className="label">
        Login Metamask
      </div>
      
      <div className="btnLogin" onClick={onBtnLogin}>
        Login  
      </div>

    </div>

  )
}