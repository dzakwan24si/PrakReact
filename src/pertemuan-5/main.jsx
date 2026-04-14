import { createRoot } from "react-dom/client";
import "./assets/tailwind.css";


createRoot(document.getElementById("root"))
    .render(
        <div>
            <div className=" flex flex-col ">
                <span className="font-poppins-extrabold font-[1000] text-[48px]">Sedap<b className="text-green-500">.</b></span>
                <span className="text-gray-400 font-semibold font-barlow">Modern Admin Dashboard</span>
            </div>
        </div>
    )