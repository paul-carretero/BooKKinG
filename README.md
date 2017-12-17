BooKKinG-UI
==============
Installation des dépendances
-----------------------------
> - `npm install jquery --save`
> - `npm install --save-dev @types/jquery`
> - `ng build`
> - `npm install --save bootstrap`
> - `npm install font-awesome --save`
> - `npm install ngx-cookie --save`
> - `npm install ngx-cookie-service --save`
> - `npm i ng2-tooltip-directive`

BooKKinG-Server
==============
Configuration Server
-----------------------------
> - Système : Raspberry Pi 3
> - 2 * Serveurs d'applications Java EE: WildFly 11
> - 2 * Bases de données MySql 5.5 (MASTER-MASTER replication)
> - LoadBalancer Nginx
> - Distribution : Docker 17.09

API Back-End
--------------------

> **Servlets Disponible:**

> - `http://bookking.ovh/BooKKinG-Server-web/Login` operation sur les connexion utilisateurs
> - `http://bookking.ovh/BooKKinG-Server-web/User` operation sur les comptes utilisateurs
> - `http://bookking.ovh/BooKKinG-Server-web/Book` requête sur un ou des livres proposé à la vente
> - `http://bookking.ovh/BooKKinG-Server-web/Cart` operation (et synchro) sur le contenu du panier utilisateur
> - `http://bookking.ovh/BooKKinG-Server-web/Command` operation et récupération des commandes utilisateur
> - `http://bookking.ovh/BooKKinG-Server-web/Init` récupère un package avec des informations d'initialisation

----------

## Json Request
Liste des Json acceptés par l'API en entrée (client -> server):

> **BookSearchJson:** <a id="BookSearchJson"></a>
> Précise des critère de recherche pour un ou des livres
> 
> - **Exemple:** `{"title":"","author":"","maxPrice":0,"minPrice":0,"type":"ANY","genre":"ANY","anySearch":"mots dans le désordre"}`
> - **Paramètres** :
> > - `title` titre ou partie du titre du/des livres recherchés
> > - `author` nom de l'auteur ou partie du nom de l'auteur des livres recherchés
> > - `maxPrice` prix maximum (inclu) des livres recherchés
> > - `minPrice` prix minimum (inclu) des livres recherchés
> > - `type` type du livre recherché, doit correspondre à un type existant ou vide ou ANY
> > - `genre` genre du livre recherché, doit correspondre à un genre existant ou vide ou ANY
> > - `anySearch` mots appartenant au résumé, au nom de l'auteur ou du titre d'un livre, l'ordre n'a pas d'importance. La règle de recherche est "au moins 1 présent", les mots de moins de 3 lettres sont ignorés. Les conditions précédente restent vérifiées.

-------
> **CartItemJson:**<a id="CartItemJson"></a>
> Précise un livre du panier et sa quantité
> 
> - **Exemple:** `{"idBook":1,"quantity":42}`
> - **Paramètres** :
> > - `idBook` id du livre du panier
> > - `quantity` quantité du livre ayant l'id spécifié dans le panier
> > - `isInStock` true si l'article est en stock, faux sinon.

-------
> **CommandGetJson:**<a id="CommandGetJson"></a>
> Précise des dates entre lesquelle recherche des commandes
> 
> - **Exemple:** `{"start":"2017-12-01","end":"2017-12-30"}`
> - **Paramètres** :
> > - `start` date (incluse) à partir de laquelle rechercher
> > - `end` date (incluse) à partir de laquelle arréter la recherche

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

-------
> **BookPostJson:**<a id="BookPostJson"></a>
> représentation des données pour l'ajout d'un livre
> 
> - **Exemple:** `{"genre":"GENRE1","type":"ANY","author":"JC Van Damme","price":20.0,"title":"JCVD","picture":"base64_encoded_picture","summary":"Réflexion sur la vie de JCVD","stock":42}`
> - **Paramètres** :
> > - `genre` genre du livre
> > - `type` type du livre
> > - `author` auteur du livre
> > - `price` prix du livre
> > - `title` titre du livre
> > - `picture` image de la couverture du livre encodé en base64
> > - `summary` résumé du livre

-------
> **CommandReqJson:** <a id="CommandReqJson"></a>
> Précise le panier utilisateur
> 
> - **Exemple:** `{"address":"adresse de livraison"}`
> - **Paramètres** :
> > - `address` une adresse de livraison, éventuellement vide ou null


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
> - **Exemple:** `{"genre":"GENRE1","type":"ANY","author":"JC Van Damme","price":20.0,"title":"JCVD","picture":"base64_encoded_picture","summary":"Réflexion sur la vie de JCVD","idBook":1,"stock":42,"pagesAvailable":5,"resultsAvailable":42,"success":true,"message":""}`
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
> - **Exemple:** `{"books":[{"genre":"GENRE1","type":"ANY","author":"JC Van Damme","price":20.0,"title":"JCVD","picture":"base64_encoded_picture","summary":"Réflexion sur la vie de JCVD","idBook":1,"stock":42,"success":true,"message":""}],"pagesAvailable":5,"resultsAvailable":42,"success":true,"message":""}`
> - **Paramètres** :
> > - `books` un tableau contenant des [BookJson](#BookJson)
> > - `pagesAvailable` Nombre de page disponible pour cette recherche
> > - `resultsAvailable` Nombre de livre totaux correspondant à la recherche
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
> > - `books` tableau de [BookJson](#BookJson)
> > - `items` tableau de [CartItemJson](#CartItemJson)
> > - `shippingCost` cout de livraison
> > - `shippingAddress` addresse de livraison
> > - `invoiceAddress` nom + addresse de facturation
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

-------
> **InitResponseJson:**<a id="InitResponseJson"></a>
> Réponse représentant des données statiques pour l'initialisation de l'application
> 
> - **Exemple:** `{"mostBuyBook":{"genre":"POLICIER","type":"ROMAN","author":"Gail Carriger","price":7.0,"title":"Etiquette et espionnage","picture":"base64 png picture","summary":"summary","idBook":2,"stock":2,"success":true,"message":"","serveurUrl":"127.0.0.1"},"randomBook":{"genre":"POLICIER","type":"MANGA","author":"Tsukasa Hojo","price":8.5,"title":"City Hunter, tome 12","picture":"base64 png picture","summary":"summary","idBook":7,"stock":2,"success":true,"message":"","serveurUrl":"127.0.0.1"},"newestBook":{"genre":"INFORMATIQUE","type":"MANUEL","author":"Richard Lassaigne, Michel de Rougemont","price":21.9,"title":"Logique et fondements de l\u0027informatique","picture":"base64 png picture","summary":"summary","idBook":9,"stock":2,"success":true,"message":"","serveurUrl":"127.0.0.1"},"min":6,"max":23,"success":true,"message":"","serveurUrl":"127.0.0.1"}`
> - **Paramètres** :
> > - `mostBuyBook` livre le plus acheté
> > - `randomBook` livre aléatoire
> > - `newestBook` dernier livre ajouté
> > - `min` prix minimum des livres
> > - `max` prix maximum des livres
> > - `success` true
> > - `message` unused

---------

## Detail Servlets

#### /Init

> **GET:**
> Information sur l’authentification de l'utilisateur
> 
> - **paramètre** : -
> - **retourne** : [InitResponseJson](#InitResponseJson)

---------

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
> **PUT:**
> Connexion d'un utilisateur
> 
> - **paramètre** : [UserJson](#UserJson) (seulement email et mot de passe requis)
> - **retourne** : [GenericResponseJson](#GenericResponseJson)

---------
> **POST:**
> réinitialise le mot de passe de l'utilisateur associé à un email. Envoi un email à cet utilisateur pour l'informer de son nouveau mot de passe.
> 
> - **paramètre** : [UserJson](#UserJson) (seulement email requis)
> - **retourne** : [GenericResponseJson](#GenericResponseJson)

---------
#### /User
> **GET:**
> Permet de récupérer les données d'un utilisateur connecté
> 
> - **paramètre** : -
> - **retourne** : [UserJsonResponse](#UserJsonResponse)

---------
> **POST:**
> Créer un nouvel utilisateur, le connecte et lui envoie un email de bienvenu avec un rappel de ses informations (sauf mot de passe).
> 
> - **paramètre** : [UserJson](#UserJson)
> - **retourne** : [GenericResponseJson](#GenericResponseJson)

---------
> **PUT:**
> Met à jour les informations d'un utilisateur connecté
> 
> - **paramètre** : [UserJson](#UserJson) (tous les champs sont requis)
> - **retourne** : [GenericResponseJson](#GenericResponseJson)

---------

#### /Book
> **GET:**
> Permet de récupérer les données d'un livre par son id
> 
> - **paramètre** : url : `<HOST>/BooKKinG-Server-web/Book/<idBook>/`
> - **retourne** : [BookJson](#BookJson) correspondant à l'id du livre spécifiée

---------
> **PUT:**
> Recherche une liste de livre correspondant au type spécifié (si spécifié), aux genres spécifiés (si spécifiés) dans la fourchette de prix spécifiée (si spécifiée) et ayant un titre correspondant au titre spécifié (si spécifié) ou à l'auteur spécifié (si spécifié).
> 
> - **paramètre** : [BookSearchJson](#BookSearchJson)
> - **retourne** : [BookListJson](#BookListJson)

---------
> **POST:**
> En tant qu'administrateur connecté, permet d'ajouter un livre
> 
> - **paramètre** : [BookPostJson](#BookPostJson)
> - **retourne** : [GenericResponseJson](#GenericResponseJson)

---------
#### /Cart

> **GET:**
> Permet de récupérer le panier d'un utilisateur connecté
> 
> - **paramètre** : -
> - **retourne** : [CartJsonResponse](#CartJsonResponse)

---------
> **POST:**
> Initialise le panier d'un utilisateur nouvellement connecté avec son panier local.
> 
> - **paramètre** : [CartJson](#CartJson)
> - **retourne** : [GenericResponseJson](#GenericResponseJson)

---------
> **PUT:**
> Ajoute, met à jour ou supprime un article du panier d'un utilisateur connecté (si quantité <= 0 alors suppression)
> 
> - **paramètre** : [CartItemJson](#CartItemJson)
> - **retourne** : [GenericResponseJson](#GenericResponseJson)

---------

#### /Command

> **GET:**
> Permet de récupérer la liste des commandes d'un utilisateur connecté
> 
> - **paramètre** : -
> - **retourne** : [CommandListJson](#CommandListJson)

---------

> **GET:**
> Permet de récupérer les données d'une commande d'un utilisateur connecté
> 
> - **paramètre** : url : `<HOST>/BooKKinG-Server-web/Command/<idCmd>/`
> - **retourne** : [CommandJson](#CommandJson)

---------

> **POST:**
> Créer une nouvelle commande avec le contenu du panier d'un utilisateur connecté. Envoie un mail de confirmation à l'utilisateur connecté.
> 
> - **paramètre** : [CommandReqJson](#CommandReqJson)
> - **retourne** : [GenericResponseJson](#GenericResponseJson)

---------

> **PUT:**
> En tant qu'administrateur, permet de récupérer la liste des commandes entre les dates spécifiés
> 
> - **paramètre** : [CommandGetJson](#CommandGetJson)
> - **retourne** : [CommandListJson](#CommandListJson)

---------
