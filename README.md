# timeCoordinatorApp
An app that helps people across different time zones easily figure out when they are both available. This is a student project from FreeCodeCamp.

# How to Contribute
1. Fork this repo into your personal account.

###to set up the development environment:
Pull down the git file to your local environment (git pull <remote> <branch>)

run npm install in the project folder to get all the latest dependencies. (the node_modules folder is ignored by git.)

create an .env file and populate with various keys. As we add login services, this list will change. You will need to create your own developer app keys for each service, add to your local .env file, and run with those. They will NOT get uploaded to github (since .env files are listed in the .gitignore file). 

You'll also need to be running a mongo server on your machine to run the app.

###Adding contributions

2. Make your contributions locally, and then push your changes to your personal repo, not the group repo.

3. Then, make a pull request with your changes, from your personal repo to the group repo. 

This method avoids the possibility that two poeple might push conflicting changes to the repo without knowing. Making pull requests also lets everyone review new code, see what changed, and lets everyone know when to update their personal copies.

4. As the group repo gets updated, you can set up another remote on your computer to pull in new information. For example, you can have "origin" refer to your personal repo, and "upstream" refer to the FCC group repo. 

# Current Needs
Lots of TODOs are listed in the comments, be sure to check them out.

If someone wanted to design a project page in github pages for the app, that would be cool.

Currently (March 9) the app is in need of finishing up the basic routing for APIs, as well as figuring out an appropriate
way to model the data.
