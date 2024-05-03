### OlympicGamesStarter ###

Ce projet a été généré par Angular CLI (version 14.1.3).

Dans le cadre de ce projet éducatif, il sera expliqué d'abord comment récupérer puis charger l'application développée sans 
sans qu'elle ait été "buildée" au préalable, puis une seconde partie vous expliquera comment accéder à l'application 
déjà buildée au préalable.

I) APPLICATION NON-BUILDEE

## PRE-REQUIS
Avant de charger cette application, il est nécessaire d'avoir installé npm (version LTS de préférence) au préalable.
Pour cela: tappez "npm install" dans l'invite de commandes (cmd), après l'avoir lancé en mode administrateur (clic 
droit sur l'invite de commandes puis "Exécuter en tant qu'administrateur").

## RECUPERATION DE L'APPLICATION
Pour récupérer l'application, il faudra vous trouver sur GitHub, dans le repository suivant: 
"https://github.com/Keijur0/Developpez-le-front-end-en-utilisant-Angular"

1- Sur le côté droit de la partie centrale, cliquez sur "Code"
2- Dans la fenêtre qui s'ouvrira, cliquez sur HTTPS afin de trouver le lien qui vous permettra de cloner 
l'application en local.
3- Copiez le lien dans votre presse-papiers (il y a un bouton prévu à cet effet, à côté du lien).
4- Ouvrez de nouveau votre invite de commandes (cmd) en mode administrateur, puis tappez "git clone <lien https>" en 
collant le lien que vous venez de copier à la place de <lien https>.
5- Le dossier de l'application se trouvera là où votre invite de commandes indique que vous vous trouvez au moment 
où vous avez exécuté la commande de l'étape 4.

## CHARGEMENT DE L'APPLICATION
1- Dans l'invite de commandes, placez-vous dans le répertoire de l'application en exécutant la commande suivante:
"cd Developpez-le-front-end-en-utilisant-Angular" puis tappez sur "Entrée".
2- Une fois dans le répertoire de l'application, exécutez la commande suivante: "ng serve".
3- Lorsque la compilation sera terminée, il vous sera indiqué le lien http à partir duquel vous pourrez accéder à
l'application. 
4- Normalement ce lien sera: http://localhost:4200, à moins que ce port soit déjà utilisé pour une
autre application, dans ce cas, il vous sera demandé si vous souhaitez utiliser un autre port, choisissez Yes/Oui.
5- Démarrez votre navigateur web et accédez au lien qui vous sera indiqué dans votre invite de commandes.


II) APPLICATION BUILDEE

## PRE-REQUIS
L'application vous aura été envoyée au préalable sous format .zip, par mail ou bien avec l'aide d'un autre moyen
(application de partage par exemple).

## Extraction de l'archive
1- Faites un clic droit sur l'archive, puis cliquez sur "Extraire".
2- Choisissez l'emplacement où vous souhaitez que l'application se trouve, puis cliquez sur "Extraire".
3- Une fois le dossier extrait (son nom doit être "olympic-games-starter"), entrez dans le dossier.
4- Ouvrez le fichier "index.html" à l'aide de votre navigateur pour entrer dans l'application.
