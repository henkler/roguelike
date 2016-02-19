# Roguelike

This project is a simple javascript recreation of a standard roguelike game.

## Features

### React

This user interface is written 100% in React.

### ES2015

The latest Javascript syntax (including modules) are used.  Entities are defined as classes, and inheritance is used for player, enemy, and boss objects.

### AI

Uses EasyStar JS for pathfinding.  Enemies will chase you around within their defined range.  If you are low on health, run away to escape!

### Responsive UI

Flexboxes are used to make sure the content looks good no matter the screen size.  The map adjusts on window resize events.

## Building

Builds as a single page app through webpack.

Run `npm run build` to build the minified production code in the /dist folder

Run `npm start` to run the local dev server running on http://localhost:8080

Run `npm run lint` to run code linting
