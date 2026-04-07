import { createRoot } from "react-dom/client";
import "./tailwind.css";
import TailwindCSS from "./TailwindCSS";    
import FrameworkList from "./FrameworkList";
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";

createRoot(document.getElementById("root"))
    .render(
        <div>
            <FrameworkListSearchFilter/>
        </div>
    )