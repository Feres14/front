import React, { useEffect } from "react";

function Home() {
    useEffect(() => {
        console.log("Composant Home monté !");
    }, []);

    return (
        <div>
            <h1>Bienvenue sur la page Home</h1>
            <p>Ceci est la page d'accueil après connexion.</p>
        </div>
    );
}

export default Home;
