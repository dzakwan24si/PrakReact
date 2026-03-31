import { createRoot } from "react-dom/client";
import "./tailwind.css";
import TailwindCSS from "./TailwindCSS";    
import UserForm from "./UserForm";
import InputField from "./components/InputField";
import HitungGajiForm from "./HitungGajiForm";


createRoot(document.getElementById("root"))
    .render(
        <div>
            <HitungGajiForm/>
        </div>
    )