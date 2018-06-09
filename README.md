# Weather-to-wear

A little web app made in React. Service that recommends clothing based on the current weather.

Made in my spare time in less than a week.

## How to run locally
You will require registering and getting unique API keys with the [Darksky API](https://darksky.net/dev/) and [Google Geolocation API](https://developers.google.com/maps/documentation/geocoding/intro)..

1. Open your terminal
2. Clone this repo by running `git clone https://github.com/helenzhou6/Weather-to-wear.git`
3. Open the file in your text editor, add a file called `.env` and add the following:
```
export API_KEY=[Add API Key for Dark Sky here]
export API_GOOGLE=[Add API Key for Google geolocation here]
```
4. Open your terminal and change directories to the `Weather-to-wear` folder.
5. Run `npm run install:all` to install the required modules.
6. Run `npm run start`, and wait until the `Built in ...s` message appears. (NB: Should this fail, run `npm run start:server` and then open another terminal window and run `npm run start:client`
7. View the site at `http://localhost:1234`

## Tech Stack

| Front end         | Other                    |
| ----------------- | ------------------------ |
| React.js          | Babel                    |
| JSX               | Parcel                   |
| Javascript (ES6)  | styled-components        |
| CSS3              | [Google Geolocation API](https://developers.google.com/maps/documentation/geocoding/intro)   |
| HTML5             | [Darksky API](https://darksky.net/dev/)                      |

## Preview

| Form view                                     | Results view      
| --------------------------------------------- | --------------
| ![Form view](https://i.imgur.com/EvYA9m8.png) | ![Results view](https://i.imgur.com/sIeKdfa.png)    

## User stories
- [x] As a user I can input a location.
- [x] I can use my current location instead.
- [x] Upon enter or pressing on the arrow icon, I can view the current summary of today's weather based on the location.
- [x] I can view the clothing recommendation based on the weather.

## If I had more time... 🕒
- [ ] I would test the code thoroughly (integration tests using `jest` and use the Travis CLI.)
- [ ] I would refactor the code (especially the repeated CSS code)
- [ ] I would add more CSS styling (issue #5) - including a background photo based on weather.