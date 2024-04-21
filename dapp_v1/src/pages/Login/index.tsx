import './styles.css';
import { doLogin } from '../Services/Web3Service';
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();
  
  function onBtnLogin() {
    // alert("login");
    doLogin()
      .then(result => navigate("/add") )
      // .then(result => alert(result) )
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