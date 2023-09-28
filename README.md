# Audio Player (Dashboard)
This project has a custom audio player with wavesurfer that is connected to a [Audio Websocket](https://github.com/Majd-Yahia/meteoweather-socket) you can view the [Audio Figma Design](https://www.figma.com/file/Looltp8AmnED9Lx55PDDf1/Player?type=design&node-id=0-1&mode=design)
# Table of Contents
- Prerequisites
- Installation
- Featers
- Resources
- Contact
- License

# Prerequisites
- [Node v18+](https://nodejs.org/en/download)
- [Nuxt 3](https://nuxt.com/docs)

# Installation
- Clone the git repo
```
git clone https://github.com/Majd-Yahia/meteoweather-player.git
```
- Go into the directory
```
cd meteoweather-player
```
- Donwload node packages
```
npm install
```
- Start the audio player
```
npm run dev
```
## Important Note
Please make sure the [Websocket](https://github.com/Majd-Yahia/meteoweather-socket) is started and running on **Port:3000**

# Featers:
- Responsive Design using [Tailwind](https://tailwindui.com/)
- Custom SASS for the audio player
- Socket notifications
- Socket notification do not trigger a new fetch data but **keeps** tracking of the records to always display correct data
- Composition API's

# Resources
- [Nuxt Guide](https://nuxt.com/docs/getting-started/introduction)
- [Socket IO](https://socket.io/get-started/chat/)
- [Typescript Guide](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html)
- [Figmaboard Audio](https://www.figma.com/file/Looltp8AmnED9Lx55PDDf1/Player?type=design&node-id=0-1&mode=design&t=3VVEjo7Y5OS8RDCk-0)
- [Wavesurf](https://wavesurfer-js.org)
- [Tailwind Components](https://tailwindui.com/components)
- [MDI Icons](https://pictogrammers.com/library/mdi/)
- [Vue Watcher/WatchEffect](https://vuejs.org/guide/essentials/watchers.html#deep-watchers)
- [Simple Slider example](https://codepen.io/nlfonseca/pen/MwbovQ)

# Contact
You can reach me out by my email [Email](mailto:majd.m4a4@gmail.com) or by [LinkedIn](https://www.linkedin.com/in/majd-yahia/) 
# License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
