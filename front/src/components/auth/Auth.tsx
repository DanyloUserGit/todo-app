import { Route, Routes } from "react-router-dom";
import AuthLogin from "./AuthLogin";
import AuthReg from "./AuthReg";

export default function Auth(){
    return(
        <>
            <Routes>
                <Route path="/login" element={<AuthLogin />}/>
                <Route path="/reg" element={<AuthReg />}/>
            </Routes>
        </>
    );
}