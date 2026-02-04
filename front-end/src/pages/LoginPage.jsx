import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function logIn() {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
    <h1>Login</h1>
    {error && <p>{error}</p>}
    <form>
      <label>
        Email:
        <input 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          type="email" 
          name="email" />
      </label>
      <label>
        Password:
        <input 
          placeholder="Enter your password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          type="password" 
          name="password" />
      </label>
      <button 
        onClick={logIn} 
        type="submit">Login</button>
        <Link to="/create-account">Don't have an account? Register</Link>
    </form>
    </>
  );
}