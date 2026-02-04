import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
  
export default function NavBar() {
  const navigate = useNavigate();
  const isLoggedIn = false;
  const email = "user@example.com";

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/articles">Articles</Link></li>
        <li>
          {isLoggedIn && (
            <li>
              Logged in as: {email}
            </li>
          )}
        </li>
        <li>
          {isLoggedIn 
          ? <button onClick= {() => signOut(getAuth())}>Log Out</button>
          : <button onClick={() => navigate("/login")}>Log In</button>
          }
        </li>
      </ul>
    </nav>
  );
}