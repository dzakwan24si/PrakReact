import { createRoot } from "react-dom/client";
import "./custom.css";
import HelloWorld from "./HelloWorld";
import Container from "./Container";


createRoot(document.getElementById("root"))
    .render(
        <div className="card">
            <Container>
                <HelloWorld/>
            </Container>
            
        </div>
    )