# innolert-api

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.5.0.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`
- [pm2](https://github.com/Unitech/pm2) - Process manager - use in only in unix systems

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

- `pm2 start runScript.sh`
- `pm2 save`
- `pm2 startup` - if it fails `sudo su -c "env PATH=$PATH:/home/ubuntu/.nvm/versions/node/v4.4.1/bin pm2 startup linux -u ubuntu --hp /home/ubuntu"
` 

## Testing

Running `npm test` will run the unit tests with karma.
"# Innolert" 
"# InnolertSupportAPI" 
