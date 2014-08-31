Fatbard
=======
A campaign and character management tool for the Pathfinder RPG

Getting Started
===============

Fatbard requires the following software packages to run...  
...for the web:
* [NodeJS](http://www.nodejs.org)
* [Grunt/Grunt-CLI](http://www.gruntjs.com)

...for the backend:  
* [Ruby](https://www.ruby-lang.org/en/)
* [Rack](http://rack.github.io/)
* [Sinatra](http://www.sinatrarb.com/)

Getting Started - Web
---------------------

1.  Unless you have previously installed them, install [NodeJS](http://www.nodejs.org) and [Grunt/Grunt-CLI](http://www.gruntjs.com).  
    * It would be prudent to follow the instructions located at those pages, but it *might* be as simple as:  
        `sudo apt-get install nodejs`  
        `sudo npm install -g grunt grunt-cli`

    >Some *nix environments do not install npm automatically with nodejs in certain situations.  
    >Issue `npm -v` to verify your system has npm installed.


2.  For most environments, you will need to run `npm install` in the root directory.
    >If you are running in an environment which is referencing a shared Windows directory (for example, a *nix guest editing files in a Windows host), you will need to run `npm install --no-bin-links` instead.

3.  
    a. After you have successfully installed all necessary node modules, issue `grunt setup` to prepare your working structure.  
    b. In every future situation, you may simply run `grunt` to build, compile, and watch all the pertinent files.

Getting Started - Backend
-------------------------

-  Install Ruby 2.1.1.
    * This can easily be done with [RVM](http://rvm.io/rvm/install) using the following commands:
    `sudo apt-get install ruby-rvm`

    >This install process may vary based on your Operating System

    `rvm install 2.1.1`  
    `rvm use 2.1`

    * Now check your Ruby version with `ruby -v`

-  Install the [Bundler](http://bundler.io/) gem using `gem install bundler`

    * Navigate to the project root and install run `bundle install` to install the required Gems

-  Install [MongoDB](http://docs.mongodb.org/manual/installation/) and run the following commands:

    `mkdir -p /data/db` to make the /data/db directory

    * Make sure to set the permissions of the /data/db directory so that your user has read and write permisssions.

    * Now run `mongod`

-  Start the Rack server

    * Navigate to the project root and run the following command: `bundle exec rackup -p 4567`
