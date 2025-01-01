import React, { useState } from "react";
import Form from "../components/Forms";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import ErrorMessage from "../components/ErrorMessage";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userData = await loginUser({ email, password });
            localStorage.setItem("token", userData.token); // Stocke le token dans le localStorage
            navigate("/home"); // Redirige vers la page "Home"
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}
                <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </Button>
            </Form>
            <p>
                Vous n'avez pas de compte ? <Link to="/register">Créer un compte</Link>
            </p>
        </div>
    );
}

export default Login;