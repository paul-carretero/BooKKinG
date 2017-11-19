
BooKKinG-Server
==============
Configuration Server
-----------------------------
> - Serveur d'applications Java EE: WildFly 11
> - Base de donnée MySQL 5.7

API Back-End
--------------------

> **Servlets Disponible:**

> - `HOST/BooKKinG-Server-web/Login` operation sur les connexion utilisateurs
> - `HOST/BooKKinG-Server-web/User` operation sur les comptes utilisateurs
> - `HOST/BooKKinG-Server-web/Book` requête sur un ou des livres proposé à la vente
> - `HOST/BooKKinG-Server-web/Cart` operation (et synchro) sur le contenu du panier utilisateur
> - `HOST/BooKKinG-Server-web/Command` operation et récupération des commandes utilisateur

----------

#### <i class="icon-forward"></i> Json Request
Liste des Json acceptés par l'API en entrée (client $\rightarrow$ server):

> **BookSearchJson:** <a id="BookSearchJson"></a>
> Précise des critère de recherche pour un ou des livres
> 
> - **Exemple:** `{"title":"","author":"","maxPrice":0,"minPrice":0,"type":"DEFAULT","genres":["GENRE1","GENRE2"]}`
> - **Paramètres** :
> >`title` titre ou partie du titre du/des livres recherchés
> >`author` nom de l'auteur ou partie du nom de l'auteur des livres recherchés
> >`maxPrice` prix maximum (inclu) des livres recherchés
> >`minPrice` prix minimum (inclu) des livres recherchés
> >`type` type du livre recherché, doit correspondre à un type existant ou vide
> >`genres` tableau des genres acceptés pour la recherche des livre, ou vide

-------
> **CartItemJson:**<a id="CartItemJson"></a>
> Précise un livre du panier et sa quantité
> 
> - **Exemple:** `{"idBook":1,"quantity":42}`
> - **Paramètres** :
> >`idBook` id du livre du panier
> >`quantity` quantité du livre ayant l'id spécifié dans le panier

-------
> **CartJson:** <a id="CartJson"></a>
> Précise le panier utilisateur
> 
> - **Exemple:** `{"items":[{"idBook":1,"quantity":42}]}`
> - **Paramètres** :
> >`items` tableau de [CartItemJson](#CartItemJson)


-------
> **UserJson:** <a id="UserJson"></a>
> Précise les informations d'un utilisateur
> 
> - **Exemple:** `{"name":"Paul Carretero","email":"paul@carretero.ovh","password":"123456","address":"47 rue marius charles 38420 Domene"}`
> - **Paramètres** :
> >`name` nom (ou prénom et nom) de l'utilisateur
> >`email` email de l'utilisateur, sert également d'identifiant
> >`password` mot de passe de l'utilisateur
> >`address` address de l'utilisateur

----------


#### <i class="icon-forward"></i> Json Response

Liste des Json retourné par l'API en sortie (server $\rightarrow$ client):

-------
> **GenericResponseJson:**<a id="GenericResponseJson"></a>
> Réponse générique de l'API représentant l'échec ou la réussite d'une requête
> 
> - **Exemple:** `{"success":true,"message":""}`
> - **Paramètres** :
> >`success` true si la requête client à réussi, false sinon
> >`message` permet de préciser la raison d'un échec, peut être vide

-------
> **UserJsonResponse:**<a id="UserJsonResponse"></a>
> Réponse représentant les données d'un utilisateur
> 
> - **Exemple:** `{"name":"Paul Carretero","email":"paul@carretero.ovh","address":"47 rue marius charles 38420 Domene","success":true,"message":""}`
> - **Paramètres** :
> >`name` nom (ou prénom et nom) de l'utilisateur
> >`email` email de l'utilisateur, sert également d'identifiant
> >`address` address de l'utilisateur
> >`success` true
> >`message` unused
