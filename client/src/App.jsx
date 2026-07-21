import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home.jsx";
import Nav from "./components/Nav.jsx";

const App = () => <BrowserRouter><div className="app-shell"><Nav /><Routes><Route path="/" element={<Home />} /></Routes><footer id="footer"><strong>Evolv AI</strong><span>© 2024 Evolv AI. Precision intelligence for premium performance.</span><div><a href="#footer">Privacy Policy</a><a href="#footer">Terms of Service</a><a href="#footer">Contact Support</a><a href="#footer">Twitter</a><a href="#footer">LinkedIn</a></div></footer></div></BrowserRouter>;

export default App;
