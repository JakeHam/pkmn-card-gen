# Pokemon Card Generator
A quick little pokemon card generator. Click `Load a Pokemon` to see a randomly generated pokemon card.

## Enhancement Ideas
I don't if I'll ever get around to these, but here's some improvements I'd make if I do.
#### Design
- Make it look more like an actual Pokemon card.
- Set fixed widths and height. Some images are larger than others.
- Make the moveset into a table with a left-align for the move name, and a right-align for its power.
#### Performance
- Bundle all requests so that they happen in sync. It's especially jarring if you load too many cards too quickly.
- Cache requests. This could be a good learning exercise for learning `LocalStorage`.
    - I could even make this into a database, but then I'd have to figure out a server as well, and that's probably overkill for the scope of this project.
#### Architecture
- Parse out `utils.js` into several different files. There's not many lines, but it's already headache-inducing.
