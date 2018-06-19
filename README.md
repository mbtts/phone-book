# phone-book

![Travis](https://img.shields.io/travis/mbtts/phone-book.svg?style=for-the-badge)
![Coveralls github](https://img.shields.io/coveralls/github/mbtts/phone-book.svg?style=for-the-badge)

**NB:** I ran out of time to finish. So still a work in progress.

## Demo

View a demo on [firebase](https://phone-book-d6ed9.firebaseapp.com/).

## Instructions

### To run (port `1234`):

```
yarn start
```

### To override port number:

```
yarn start -- --port=<number>
```

### To test:

```
yarn test
```

Watch and coverage available (see scripts in `package.json` for details).

## TODO

Lots.

- [x] Fix issue with router and enzyme
- [x] Finish remaining tests
- [ ] Styling
- [ ] i18n
- [ ] look for more elegant solution for svg loading (jest) - try babel inline svg plugin.
- [ ] add back button
- [x] add clear search button
- [x] add map
- [ ] Component to encapsulate loading/error states
- [ ] rety on error
- [ ] 404 screen
- [ ] Master/detail view on wider screens (router media queries)
- [ ] context api for state
- [ ] Flow
- [x] CI
