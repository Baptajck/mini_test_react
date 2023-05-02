# Création d'une application web en React de gestion d'une liste de tâches

Le projet a été généré avec create-react-app.

## Lancement du back

Le back a été mocké avec `json-server`. Il se lance à l'aide de la commande suivante :

```sh
npm run server
```

Le fichier json de la base de données se trouve dans `src\data\db.json`. Il est possible de l'afficher en passant par `http://localhost:4000/db`.

Les ressources sont accessibles sur `http://localhost:4000/tasks`et `http://localhost:4000/users`.

## Lancement du front

Le front peut être lancé via la commande suivante :

```sh
npm start
```

L'application a été conçue en mobile-first.

## Points d'attention

- La connexion peut être réalisée avec l'utilisateur `superman` et le mot de passe `batmanetrobin`. Il est également possible d'ajouter un couple utilisateur/mot de passe dans le fichier `src\data\db.json`.

> **_Remarque :_** lors d'une modification du fichier `src\data\db.json`, il est nécessaire de recharger la page. Le rechargement n'est pas automatique.

- Comme c'est un back mocké, il n'y a pas de gestion de token, ni de gestion des accès (la route `/tasks` est accessible sans connexion). Pour une connexion à une réelle API, cela devrait être géré afin d'assurer la sécurité.

- J'ai mis en place un `.env.development` qui n'a pas été ajouté dans le `.gitignore` par souci de practicité dans le cadre de cet exercice.
