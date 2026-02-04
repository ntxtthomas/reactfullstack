import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function CreateAccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function createAccount(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
    <h1>Create Account</h1>
    {error && <p className="error">{error}</p>}
    <form onSubmit={createAccount}>
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
      <label>
        Confirm Password:
        <input 
          placeholder="Confirm your password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          type="password" 
          name="confirmPassword" />
      </label>
      <button type="submit">Create Account</button>
        <Link to="/login">Already have an account? Login</Link>
    </form>
    </>
  );
}