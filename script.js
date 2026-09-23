// Fonction KEYGEN
function genererMotDePasse(username) {
    let user = username.toLowerCase().trim();
    let codes = [];
    
    // 1. Convertir chaque lettre en chiffre (code ASCII)
    for (let i = 0; i < user.length; i++) {
        codes.push(user.charCodeAt(i));
    }
    
    // 2. Permutation : on inverse l'ordre
    codes.reverse();
    
    // 3. On colle tous les chiffres ensemble
    let motDePasseComplet = codes.join("");
    
    // Modification 2 : On ne garde que les 4 premiers caractères
    return motDePasseComplet.substring(0, 4);
}

function verifierConnexion() {
    // On ajoute .trim() pour enlever les espaces tapés par erreur
    let usernameInput = document.getElementById("username").value.trim();
    let passwordInput = document.getElementById("password").value.trim();
    
    let motDePasseAttendu = genererMotDePasse(usernameInput);
    
    if (usernameInput === "") {
        alert("Veuillez entrer un nom d'utilisateur.");
        return;
    }
    
    if (passwordInput === motDePasseAttendu) {
        // Succès ! On enregistre la session ET le nom d'utilisateur
        sessionStorage.setItem("estConnecte", "oui");
        sessionStorage.setItem("nomUtilisateur", usernameInput);
        window.location.href = "cours.html";
    } else {
        alert("Mot de passe incorrect.");
    }
}

// Fonction pour protéger la page des cours et afficher le message personnalisé
function verifierAccesCours() {
    if (sessionStorage.getItem("estConnecte") !== "oui") {
        window.location.href = "index.html";
        return; // On stoppe l'exécution si non connecté
    }
    
    // Modification 4 : Récupérer le nom et mettre la première lettre en majuscule
    let username = sessionStorage.getItem("nomUtilisateur");
    if (username) {
        // Met la première lettre en majuscule et le reste en minuscule
        let nomFormate = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
        
        // On injecte ce texte dans la balise qui a l'ID 'message-bienvenue'
        document.getElementById("message-bienvenue").innerText = "Bonjour " + nomFormate;
    }
}
