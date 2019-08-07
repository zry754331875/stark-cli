### STARK-Cli

A tool to quickly build a koa+ejs+gulp web development environment

### How to use

```
npm install stark-cli -g
stark init ProductName
cd ProductName
yarn start:dev
```

### Feature

- Support server hot overload, client hot overload
- Support module, babel syntax conversion
- Based gulp flow control build, production environment uses pm2 startup service
- Customizable configuration, including gulpfile.js, ecosystem.config.js, .babelrc, etc.
