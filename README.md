fatbard
=======
A campaign and character management tool for the Pathfinder RPG

Getting Started
===============

Fatbard requires the following software packages to run...  
...for the web:
* [NodeJS](http://www.nodejs.org)
* [Grunt/Grunt-CLI](http://www.gruntjs.com)

...for the backend:  
* Ruby
* Rack
* Sinatra

Getting Started - Web
---------------------

Unless you have previously installed them, install [NodeJS](http://www.nodejs.org) and [Grunt/Grunt-CLI](http://www.gruntjs.com).  
It would be prudent to follow the instructions located at those pages, but it *might* be as simple as:  
`sudo apt-get install nodejs`  
`sudo npm install -g grunt grunt-cli`

>Some *nix environments do not install npm automatically with nodejs in certain situations.  
>Issue `npm -v` to verify your system has npm installed.


For most environments, you will need to run `npm install` in the root directory.

>If you are running in an environment which is referencing a shared Windows directory (for example, a *nix guest editing files in a Windows host), you will need to run `npm install --no-bin-links` instead.

After you have successfully installed all necessary node modules, issue `grunt setup` to prepare your working structure.  
In every future situation, you may simply run `grunt` to build, compile, and watch all the pertinent files.

Getting Started - Backend
-------------------------
