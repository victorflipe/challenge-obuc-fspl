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

        setUser((prev) => ({...prev, authenticated: true }))
    };

    const handleChangeuser = (e) => {
        e.preventDefault()
        setUser({name: e.target.value})
    }



    return (
        <div className="div-login">
            <input type="text" onChange={handleChangeuser} />
            {/* <input type="password" /> */}
            {/* <InputText id={"input-text"} label={"Usuário"} placeholder={"Insira o seu usuário"} value={"df"}/>
                <InputText id={"input-text"} password label={"Senha"} placeholder={"Insira a sua senha"} /> */}
            <Button onClick={handleRedirectLogin}>Login</Button>
        </div>

    );
}
