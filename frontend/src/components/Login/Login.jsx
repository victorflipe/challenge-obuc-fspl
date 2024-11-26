import Button from "../Button/Button";
import { useContext } from "react";
import InputText from "../InputText/InputText";
// import { useAuth0 } from "@auth0/auth0-react";
import AppContext from "../../context/AppContext";
import './Login.css'

export default function Login() {

    const { user, setUser } = useContext(AppContext);

    const handleRedirectLogin = () => {
        console.log("Redirect login...")

        setUser((prev) => ({ ...prev, authenticated: true }))
    };

    const handleChangeuser = (e) => {
        e.preventDefault()
        setUser({ name: e.target.value })
    }



    return (
        <div className="div-login">
            <h1>Login</h1>
            <input className="input-wrapper" type="text" onChange={handleChangeuser} placeholder="Insira seu nome para criar tarefas"/>
            <Button onClick={handleRedirectLogin}>Login</Button>
        </div>

    );
}
