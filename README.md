
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

##Json Request
Liste des Json acceptés par l'API en entrée (client -> server):

> **BookSearchJson:** <a id="BookSearchJson"></a>
> Précise des critère de recherche pour un ou des livres
> 
> - **Exemple:** `{"title":"","author":"","maxPrice":0,"minPrice":0,"type":"DEFAULT","genres":["GENRE1","GENRE2"]}`
> - **Paramètres** :
> > - `title` titre ou partie du titre du/des livres recherchés
> > - `author` nom de l'auteur ou partie du nom de l'auteur des livres recherchés
> > - `maxPrice` prix maximum (inclu) des livres recherchés
> > - `minPrice` prix minimum (inclu) des livres recherchés
> > - `type` type du livre recherché, doit correspondre à un type existant ou vide
> > - `genres` tableau des genres acceptés pour la recherche des livre, ou vide

-------
> **CartItemJson:**<a id="CartItemJson"></a>
> Précise un livre du panier et sa quantité
> 
> - **Exemple:** `{"idBook":1,"quantity":42}`
> - **Paramètres** :
> > - `idBook` id du livre du panier
> > - `quantity` quantité du livre ayant l'id spécifié dans le panier

-------
> **CartJson:** <a id="CartJson"></a>
> Précise le panier utilisateur
> 
> - **Exemple:** `{"items":[{"idBook":1,"quantity":42}]}`
> - **Paramètres** :
> > - `items` tableau de [CartItemJson](#CartItemJson)


-------
> **UserJson:** <a id="UserJson"></a>
> Précise les informations d'un utilisateur
> 
> - **Exemple:** `{"name":"Paul Carretero","email":"paul@carretero.ovh","password":"123456","address":"47 rue marius charles 38420 Domene"}`
> - **Paramètres** :
> > - `name` nom (ou prénom et nom) de l'utilisateur
> > - `email` email de l'utilisateur, sert également d'identifiant
> > - `password` mot de passe de l'utilisateur
> > - `address` address de l'utilisateur

----------


## Json Response

Liste des Json retourné par l'API en sortie (server -> client):

-------
> **GenericResponseJson:**<a id="GenericResponseJson"></a>
> Réponse générique de l'API représentant l'échec ou la réussite d'une requête
> 
> - **Exemple:** `{"success":true,"message":""}`
> - **Paramètres** :
> > - `success` true si la requête client à réussi, false sinon
> > - `message` permet de préciser la raison d'un échec, peut être vide

-------
> **UserJsonResponse:**<a id="UserJsonResponse"></a>
> Réponse représentant les données d'un utilisateur
> 
> - **Exemple:** `{"name":"Paul Carretero","email":"paul@carretero.ovh","address":"47 rue marius charles 38420 Domene","success":true,"message":""}`
> - **Paramètres** :
> > - `name` nom (ou prénom et nom) de l'utilisateur
> > - `email` email de l'utilisateur, sert également d'identifiant
> > - `address` address de l'utilisateur
> > - `success` true
> > - `message` unused

-------
> **BookJson:**<a id="BookJson"></a>
> Réponse représentant les données d'un livre
> 
> - **Exemple:** `{"genre":"GENRE1","type":"ANY","author":"JC Van Damme","price":20.0,"title":"JCVD","picture":"base64_encoded_picture","summary":"Réflexion sur la vie de JCVD","idBook":1,"stock":42,"success":true,"message":""}`
> - **Paramètres** :
> > - `genre` genre du livre
> > - `type` type du livre
> > - `author` auteur du livre
> > - `price` prix du livre
> > - `title` titre du livre
> > - `picture` image de la couverture du livre encodé en base64
> > - `summary` résumé du livre
> > - `idBook` id du livre
> > - `success` true
> > - `message` unused

-------
> **BookListJson:**<a id="BookListJson"></a>
> Réponse représentant les données d'une liste livre (éventuellement issue d'une recherche)
> 
> - **Exemple:** `{"books":[{"genre":"GENRE1","type":"ANY","author":"JC Van Damme","price":20.0,"title":"JCVD","picture":"base64_encoded_picture","summary":"Réflexion sur la vie de JCVD","idBook":1,"stock":42,"success":true,"message":""}],"success":true,"message":""}`
> - **Paramètres** :
> > - `books` un tableau contenant des [BookJson](#BookJson)
> > - `success` true
> > - `message` unused

-------
> **CartJsonResponse:**<a id="CartJsonResponse"></a>
> Réponse représentant les livres dans le panier d'un utilisateur connecté
> 
> - **Exemple:** `{"quantities":{"1":42},"books":{"1":{"genre":"GENRE1","type":"ANY","author":"JC Van Damme","price":20.0,"title":"JCVD","picture":"base64_encoded_picture","summary":"Réflexion sur la vie de JCVD","idBook":1,"stock":42,"success":true,"message":""}},"success":true,"message":""}`
> - **Paramètres** :
> > - `quantities` un tableau associatif associant l'id d'un livre à sa quantité
> > - `books` un tableau associatif associant l'id d'un livre à son [BookJson](#BookJson)
> > - `success` true
> > - `message` unused

-------
> **CommandJson:**<a id="CommandJson"></a>
> Réponse représentant une commande d'un utilisateur
> 
> - **Exemple:** `{"date":"2017-11-19","idCmd":12,"books":{"1":{"genre":"GENRE1","type":"ANY","author":"JC Van Damme","price":20.0,"title":"JCVD","picture":"base64_encoded_picture","summary":"Réflexion sur la vie de JCVD","idBook":1,"stock":42,"success":true,"message":""}},"prices":{"1":20.0},"quantities":{"1":42},"success":true,"message":""}`
> - **Paramètres** :
> > - `date` date de la commande
> > - `idCmd` id de la commande
> > - `books` tableau associatif associant l'id d'un livre de la commande à son [BookJson](#BookJson)
> > - `prices` tableau associatif associant l'id d'un livre à son prix unitaire lors de l'achat
> > - `quantities` tableau associatif associant l'id d'un livre de la commande à sa quantité
> > - `success` true
> > - `message` unused


-------
> **CommandListJson:**<a id="CommandListJson"></a>
> Réponse représentant la liste des commandes d'un utilisateur
> 
> - **Exemple:** `{"commands":[{"date":"2017-11-19","idCmd":12,"books":{"1":{"genre":"GENRE1","type":"ANY","author":"JC Van Damme","price":20.0,"title":"JCVD","picture":"base64_encoded_picture","summary":"R�flexion sur la vie de JCVD","idBook":1,"stock":42,"success":true,"message":""}},"prices":{"1":20.0},"quantities":{"1":42},"success":true,"message":""}],"success":true,"message":""}`
> - **Paramètres** :
> > - `commands` tableau de [CommandJson](#CommandJson)
> > - `success` true
> > - `message` unused

## Detail Servlets
#### /Login
> **GET:**
> Information sur l’authentification de l'utilisateur
> 
> - **paramètre** : -
> - **retourne** : [GenericResponseJson](#GenericResponseJson)

---------
> **DELETE:**
> Déconnexion d'un utilisateur
> 
> - **paramètre** : -
> - **retourne** : [GenericResponseJson](#GenericResponseJson)

---------
> **POST:**
> Connexion d'un utilisateur
> 
> - **paramètre** : [UserJson](#UserJson) (seulement email et mot de passe requis)
> - **retourne** : [GenericResponseJson](#GenericResponseJson)

---------
> **PUT:**
> réinitialise le mot de passe de l'utilisateur associé à un email. Envoi un email à cet utilisateur pour l'informer de son nouveau mot de passe.
> 
> - **paramètre** : [UserJson](#UserJson) (seulement email requis)
> - **retourne** : [GenericResponseJson](#GenericResponseJson)
#### /User

#### /Login

#### /Book

#### /Cart

#### /Command
