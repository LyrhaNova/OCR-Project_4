# OCR-Project_4

## A PROPOS

Dans le cadre de la formation OpenClassRooms en Développement web, le ``PROJET 4`` nous fait travailler l'optimisation, le débogage et le référencement d'un site déjà présent. Principalement, le ``SEO`` et l'accessibilité sont priviligiés dans ce projet.

## TABLE DES MATIERES

- 🪧 [À propos](#a-propos)
- 📄 [Scénario](#scenario)
- ⬆️ [Objectifs pédagogiques](#objectifs-pedagogiques)
- 🚀 [Installation](#installation)
- 📚 [Résumé des implémentations](#résumé-des-implémentations-majeurs-réalisées)
- 📈 [Score Lighthouse](#score-lighthouse)
- 📖 [Rapport d'intervention](#rapport-dintervention)
- 🏗️ [Construit avec](#construit-avec)
- 🖼 [Galerie d'images](#galerie-dimages)

## SCENARIO

Nous sommes développeur freelance et nous avons décidé de proposer nos services d'optimisation ``SEO`` à de nouveaux clients, ici, Nina Carducci, photographe. Suite à une discussion téléphonique et un récapitulatif par mail, plusieurs missions nous sont confiées :

- Faire une optimisation globale du site, tant sur les performances que sur le ``SEO`` ;
- Mettre en place le référencement local en utilisant Schema.org ;
- Ajouter les metas pour les réseaux sociaux ;
- Faire les modifications liées à l'accessibilité du site ;
- Produire un rapport d'optimisation présentant toutes les actions et leur impact.

De plus, la cliente nous fait part de problématique liées à son code qui nécessiteront du débogage :

- La navigation dans la modale de la galerie ne fonctionne pas ;
- Les filtres actifs n'affichent pas leur couleur.

## OBJECTIFS PEDAGOGIQUES

- 💡 Optimiser les performances d'un site web
- 💡 Débugger un site web grâce aux Chrome DevTools
- 💡 Rédiger un cahier de recette pour tester un site

## INSTALLATION

Installation du projet en local via ``GIT`` et ``GITHUB`` :

[Télécharger et installer Git](https://git-scm.com/)

[Configurer et vérifier vos paramètres](https://git-scm.com/book/fr/v2/D%C3%A9marrage-rapide-Param%C3%A9trage-%C3%A0-la-premi%C3%A8re-utilisation-de-Git)

Accédez ensuite au dépôt distant, cliquez sur "Code" puis copiez la section ``SSH``.

```terminal
git@github.com:LyrhaNova/OCR-Project_4.git
```

Sur ``GIT BASH``, tapez la commande suivante :

```terminal
git clone git@github.com:LyrhaNova/OCR-Project_4.git
```

Mettez à jour votre dépôt local et assurez-vous d'être dans le bon dépôt, puis utilisez la commande suivante :

```terminal
git pull origin main
```

Vous devriez maintenant avoir accès au projet (corrigé) dans votre dépôt local.

## RÉSUMÉ DES IMPLÉMENTATIONS MAJEURS RÉALISÉES

### HTML -

- Optimisation des images du site (format, taille, compression)
- Optimisation et ajout sémantique HTML
- Ajout des metas (réseaux sociaux, description)
- Ajout du référencement local (script JSON-LD)
- Ajout d'ARIA
- Ajustements pour l'accessibilité

### CSS -

- Réorganisation du CSS
- Optimisation et factorisation du CSS
- Ajustement des focus, contraste et taille de police
- Ajustement du formulaire (responsive)

### JS -

- Réorganisation du JS
- Optimisation et factorisation du JS
- Correction des problématiques JS (filtres & galerie)
- Ajout d'event "keydown" pour la navigation au clavier de la galerie & ARIA
  
## SCORE LIGHTHOUSE

Score avant optimisation :\
![Score_before](https://raw.githubusercontent.com/LyrhaNova/OCR-Project_4/main/assets/docs/lighthouse_before.png)

Score après optimisation :\
![Score_after](https://raw.githubusercontent.com/LyrhaNova/OCR-Project_4/main/assets/docs/lighthouse_after.png)

_Selon le cadre d'utilisation de l'outil, les résultats seront proches sans toutefois correspondre exactement, notamment sur les performances._

## RAPPORT D'INTERVENTION

[Lien vers le rapport complet](https://github.com/LyrhaNova/OCR-Project_4/blob/main/assets/docs/Rapport_Complet_072024.pdf)

## CONSTRUIT AVEC

### Langages

- ``HTML5``
- ``CSS3``
- ``Javascript``

### Outils

| TOOLS                  | DESCRIPTION                                    |
|------------------------|------------------------------------------------|
| ``VISUAL STUDIO CODE`` | _IDE_                                          |
| ``GIT``                | _Logiciel de gestion de versions_              |
| ``Wave``               | _Extension Google d'évaluation d'accessibilité_|
| ``HeadingsMap``        | _Extension navigateur d'évaluation de structuration du DOM_ |
| ``Google Rich Snippet``| _Outil de Google pour obtenir des résultats enrichis_ |
| ``Lighthouse``         | _Outil de mesure sur la qualité des pages Web_ |

## Galerie d'images

![Capture 1](https://i.imgur.com/3QMWJQo.png)

![Capture 2](https://i.imgur.com/INc6xVm.png)

![Capture 3](https://i.imgur.com/V2A3WL1.png)
