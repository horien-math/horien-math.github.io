// Fonction KEYGEN (Inchangée)
function genererMotDePasse(username) {
    let user = username.toLowerCase().trim();
    let codes = [];
    
    for (let i = 0; i < user.length; i++) {
        codes.push(user.charCodeAt(i));
    }
    
    codes.reverse();
    let motDePasseComplet = codes.join("");
    return motDePasseComplet.substring(0, 4);
}

// Fonction de vérification de connexion
function verifierConnexion() {
    let usernameInput = document.getElementById("username").value.trim();
    let passwordInput = document.getElementById("password").value.trim();
    
    if (usernameInput === "") {
        alert("Veuillez entrer un nom d'utilisateur.");
        return;
    }

    // --- NOUVEAU : Vérification Administrateur ---
    if (usernameInput.toLowerCase() === "horien" && passwordInput === "0951") {
        sessionStorage.setItem("estConnecte", "oui");
        sessionStorage.setItem("estAdmin", "oui"); // On marque qu'il est admin
        window.location.href = "admin.html"; // On l'envoie sur la page secrète
        return; // On arrête la fonction ici
    }
    
    // --- Logique Étudiant standard ---
    let motDePasseAttendu = genererMotDePasse(usernameInput);
    
    if (passwordInput === motDePasseAttendu) {
        sessionStorage.setItem("estConnecte", "oui");
        sessionStorage.setItem("estAdmin", "non"); // Sécurité
        sessionStorage.setItem("nomUtilisateur", usernameInput);
        window.location.href = "cours.html";
    } else {
        alert("Mot de passe incorrect.");
    }
}

// Fonction pour protéger la page des cours (Étudiants)
function verifierAccesCours() {
    if (sessionStorage.getItem("estConnecte") !== "oui") {
        window.location.href = "index.html";
        return;
    }
    
    let username = sessionStorage.getItem("nomUtilisateur");
    if (username) {
        let nomFormate = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
        document.getElementById("message-bienvenue").innerText = "Bonjour " + nomFormate;
    }
}

// --- NOUVEAU : Fonction pour protéger la page Admin ---
function verifierAccesAdmin() {
    // Si la personne n'est pas connectée OU n'est pas Admin, on la renvoie à l'accueil
    if (sessionStorage.getItem("estConnecte") !== "oui" || sessionStorage.getItem("estAdmin") !== "oui") {
        window.location.href = "index.html";
    }
}

// --- NOUVEAU : Fonction pour afficher le mot de passe dans l'espace Admin ---
function afficherMotDePasseAdmin() {
    let inputEleve = document.getElementById("input-eleve").value.trim();
    let affichageResultat = document.getElementById("resultat-mdp");

    if(inputEleve === "") {
        affichageResultat.innerHTML = "<span style='color: #e74c3c;'>Veuillez entrer un nom.</span>";
        return;
    }

    // On utilise la même fonction de Keygen
    let mdp = genererMotDePasse(inputEleve);
    
    // On affiche le résultat joliment
    affichageResultat.innerHTML = "Mot de passe pour <b>" + inputEleve + "</b> : <br><br><span style='font-size: 32px; font-weight: bold; color: #2c3e50; background: #ecf0f1; padding: 10px 20px; border-radius: 8px;'>" + mdp + "</span>";
}
