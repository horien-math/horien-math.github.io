// Fonction KEYGEN : Calcule le mot de passe à partir du pseudo
function genererMotDePasse(username) {
    // Tout mettre en minuscules pour éviter les erreurs de majuscules
    let user = username.toLowerCase().trim();
    let codes = [];
    
    // 1. Convertir chaque lettre en chiffre (code ASCII)
    for (let i = 0; i < user.length; i++) {
        codes.push(user.charCodeAt(i));
    }
    
    // 2. Permutation : on inverse l'ordre des chiffres
    codes.reverse();
    
    // 3. On colle tous les chiffres ensemble pour faire le mot de passe
    return codes.join("");
}

// Fonction de vérification lors du clic sur "Se connecter"
function verifierConnexion() {
    let usernameInput = document.getElementById("username").value;
    let passwordInput = document.getElementById("password").value;
    
    // On génère le mot de passe attendu pour cet utilisateur
    let motDePasseAttendu = genererMotDePasse(usernameInput);
    
    if (usernameInput === "") {
        alert("Veuillez entrer un nom d'utilisateur.");
        return;
    }
    
    // On compare ce que l'étudiant a tapé avec le Keygen
    if (passwordInput === motDePasseAttendu) {
        // Succès ! On enregistre la session et on redirige
        sessionStorage.setItem("estConnecte", "oui");
        window.location.href = "cours.html";
    } else {
        // Échec
        alert("Mot de passe incorrect.");
    }
}

// Fonction pour protéger la page des cours
function verifierAccesCours() {
    // Si l'étudiant n'est pas passé par la connexion, on le renvoie à l'accueil
    if (sessionStorage.getItem("estConnecte") !== "oui") {
        window.location.href = "index.html";
    }
}
