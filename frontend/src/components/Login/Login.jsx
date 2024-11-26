import Button from "../Button/Button";
import { useContext } from "react";
import InputText from "../InputText/InputText";
// import { useAuth0 } from "@auth0/auth0-react";
import AppContext from "../../context/AppContext";
import Swal from 'sweetalert2'
import './Login.css'

export default function Login() {

    const { user, setUser } = useContext(AppContext);

    const handleRedirectLogin = () => {
        setUser((prev) => ({ ...prev, authenticated: true }))
        Swal.fire({
            title: "Seja bem vindo e bons testes..",
            width: 600,
            padding: "3em",
            color: "#716add",
            background: "#fff",
            backdrop: `
              rgb(139, 176, 207, 0.4)`
          });
    };

    const handleChangeuser = (e) => {
        e.preventDefault()
        setUser({ name: e.target.value })
    }



    return (
        <div className="div-login">
            <h1>Login</h1>
            <input className="input-wrapper" type="text" onChange={handleChangeuser} placeholder="Insira seu nome para criar tarefas" />
            <Button onClick={handleRedirectLogin}>Login</Button>
        </div>

    );
}
