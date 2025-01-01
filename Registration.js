import React, { useState } from 'react';
import Form from '../components/Forms';
import Input from '../components/Input';
import Button from '../components/Button';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

function Registration() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
        setLoading(true)

    if (firstName.length < 2 || lastName.length < 2) {
        setError("Le nom et prénom doivent contenir au moins 2 caractères");
        setLoading(false);
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setError("L'adresse e-mail n'est pas valide");
        setLoading(false);

        return;
    }
    
    if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
         setLoading(false);

        return;
    }

    if (password.length < 8) {
        setError("Le mot de passe doit contenir au moins 8 caractères.");
         setLoading(false);

        return;
    }
    
    try {
        console.log("Data envoyée à l'API", {firstName, lastName, email, password});
      const response =  await registerUser({firstName, lastName, email, password});
        console.log("Réponse de l'API :", response)
         if(response.message) {
           console.log("Message de l'API : ", response.message)
       }
      navigate('/login');
    } catch (err) {
         console.log("Erreur de l'API :", err);
         if (err.message) {
           setError(err.message);
       } else {
            setError('Erreur lors de l\'inscription')
       }
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className="registration-page">
        <h2>Registration</h2>
        <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage message={error} />}
            <Input
                label="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                 required
            />
             <Input
                label="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
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
             <Input
                label="Confirm PW"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                 required
            />
            <Button type="submit" disabled={loading} >{loading ? 'Loading...': 'Register'}</Button>
        </Form>
    </div>
    
  );
}

export default Registration;