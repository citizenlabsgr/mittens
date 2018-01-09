# Voter Engagement

[![CircleCI](https://circleci.com/gh/citizenlabsgr/voter-engagement.svg?style=svg)](https://circleci.com/gh/citizenlabsgr/voter-engagement)

**Slack channel:** #project-voter_engage

**Project Description:**

A social tool for encouraging eligible citizens in the Grand Rapids area to vote in local elections.

**Project Guide:**

The project is split into a backend API and a web frontend.

**Maintainers (people with write access):**

* Jace Browning
* Sam Bleckley

### Skills

Skills you may learn or already posses relevant to this project:
* Django
* API design
* React
* Typescript
* MobX
* HTML
* CSS

### Getting Started

* We welcome contributions from first timers
* Join the slack channel and tell us about what you can do, and what you'd like to learn to do, and we'll find a first task that's right for you.
* Core maintainers and project guides are responsible for reviewing and merging all pull requests. In order to prevent frustrations with your first PR we recommend you reach out to our core maintainers who can help you through your first PR.
* Need to practice working with github in a group setting? Checkout [github-playground](https://github.com/citizenlabsgr/open-lab)
* Updates to documentation or README are greatly appreciated and make for a great first PR. They do not need to be discussed in advance and will be merged as soon as possible.

## Setup for Windows 10

This section will get you up and running for testing the voter engagement app.  We assume you have created an account on GitHub and also Slack for collaboration purposes but have nothing else installed.

### Basic Development and Collaboration Tools

#### Git for Windows

https://git-scm.com/download/win

This will install Git Bash, a command line tool.  The default settings during the installation process will likely work out fine.  You may also, at your discretion, install GitHub Desktop (https://desktop.github.com/), which will make the process of acquiring the app repository a bit easier for beginners.  In addition, GitHub Desktop will conveniently add your GitHub information to the .gitconfig file automatically when run for the first time.

#### Node.js

https://nodejs.org/en/

#### Heroku CLI

https://devcenter.heroku.com/articles/heroku-cli

It is important that the SET PATH options are checked during the installation process (this should be the default).

#### PostgreSQL

https://www.postgresql.org/download/

The installation process will require a super-user password to be created.  Keep this information in a safe place; it will be used later.  When installation is complete, PGAdmin4 should also be available; this application is used to access and manipulate SQL databases on the local machine.

#### Postman

https://www.getpostman.com/

#### Python

https://www.python.org/downloads/release/python-363/

This project specifically uses Python v3.6.3.  Using any other version will result in issues with scripting.  Beginners are highly advised to download and install v3.6.3 per the link above.  IMPORTANT:  During the installation, be sure to check the box next to the "Add Python 3.6 to PATH" option.

### Download the GitHub Repository

For beginners, this is most easily accomplished by visiting the app repo page (https://github.com/citizenlabsgr/voter-engagement), clicking the green "Clone or Download" button, and selecting "Open in Desktop".  This will allow GitHub for Desktop to launch.  Recommended local work folder is as follows (and will be used throughout the duration of these instructions):

[System Drive] > Users > [Your Windows Profile Name] > citizen-labs

Click "Clone" to download the repo and initialize in Git.  Close GitHub for Desktop when complete.

### Prep for Local Development

#### Add Environment Paths to System Settings

We'll need to ensure that our command line tool (Git Bash) will be able to access our development tools.  Go to:

Control Panel > System and Security > System > Advanced System Settings > Environment Variables

Under User Variables, double-click on PATH.  You should see path entries for Python, NPM, and Heroku.  Double-click on the next blank line and add our PostgreSQL tools:

```sh
C:\Program Files\PostgreSQL\10\bin
```

If Python and Heroku are unavailable, these will need to be added.  You will need three separate entries:

```sh
C:\Users\your-windows-user-name\AppData\Local\Programs\Python\Python36-32\
```

```sh
C:\Users\your-windows-user-name\AppData\Local\Programs\Python\Python36-32\Scripts
```

```sh
C:\Program Files\Heroku\bin
```

Click OK when complete.

#### Install pipenv

Launch Git Bash.  Access the Voter Engagement repo per the recommended settings above:

```sh
$ cd citizen-labs/voter-engagement
```

Install pipenv:

```sh
$ pip install pipenv
```

If pip is an unknown command, close all Git Bash windows and try again.  If the issue persists, there is likely an issue with the paths in the user environmental variables (see above).

#### Install Make

https://sourceforge.net/projects/ezwinports/files/

The easiest method of "installing" Make for Windows is to resort to a bit of dangerous hackery.

1) Close any current instance of Git Bash.

2) Download the make-4.1-2-without-guile-w32-bin.zip file from the SourceForge link above and extract the contents to an empty temporary folder.

3) Go to the [System Drive] > Program Files x86 > Git > mingw32 folder.  Create a new folder called "backup" and copy (not move) all other folders into the backup directory.

4) Now copy those same folders into the temporary folder containing the extracted contents of the Make ZIP file, overwriting all existing folders / files.

5) Replace the contents of the mingw32 folder with that of the temporary folder.  Be sure to leave the backup folder intact.

Check to see if the above operation was successful:

Launch Git Bash.  Access the voter engagement folder:

```sh
$ cd citizen-labs/voter-engagement
```

Then...

```sh
$ make doctor
```

This will test for all expected dependencies and their versions.  Make, Python, and Node should match.  Pipenv and PostgreSQL will be found but with different versions (this is okay).  Check for Yarn and Heroku manually:

```sh
$ yarn --version
```

```sh
$ heroku --version
```

Both should return a version number.  If not, it is possible that an error occurred in the file copying process; if so, restoring the mingw32 folder backup would be recommended.

#### Final Tweaks

Launch Git Bash and go to the app web client directory:

```sh
$ cd citizen-labs/voter-engagement/web_client
```

Create a build folder:

```sh
$ mkdir build
```

Then...

```sh
$ cd ..
```

```sh
$ make install
```

#### Create a Development Database

In the root voter engagement app folder, open the procfile.dev file for editing.  The first line will show:

```sh
py: PYTHONUNBUFFERED=true python manage.py runserver
```

Change to simply...

```sh
py: python manage.py runserver
```

We'll need to add the PYTHONBUFFERED=true variable to the Git Bash environment for it to be used properly.

```sh
$ export PYTHONUNBUFFERED=true
```

Then type

```sh
$ env
```

The above variable should now be shown at the top of the environmental variable list.  This variable will be available only during the current session, however.  To add it "permanently", insert the export command into the .bash_profile file located in your Windows user folder (C:\Users\your-windows-profile-name\).  Open the file with a text editor and update with these lines:

```sh
# Added for the Citizen Labs Voter Engagement app
export PYTHONUNBUFFERED=true
```

You'll also need to update the default database settings for the project.  Open the following file in a text editor:

citizens-labs > voter-engagement > api > config > settings > local.py

You will see a section with database settings:

```sh
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'voterengagement_dev',
    },
```

Update to:

```sh
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'voterengagement_dev',
        'HOST': 'localhost',
        'PORT': 5432,
        'PASSWORD': '[Your chosen PostgreSQL password]',
        'USER': 'postgres',
    },
```

Now open pgAdmin4.  Expand the Servers section after loading and select PostgreSQL 10.  Enter the PostgreSQL password created upon installation and check "Save Password".  Then expand the PostgreSQL section, right-click on Databases, and choose Create > Database.  Name the database "voterengagement_dev" (without the quotes) and add a comment if desired.  Click "Save" when complete.

Open Git Bash, go to the root of the voter-engagement repo, and enter the following command:

```sh
$ make data
```

This should seed the development database with sample data.

### Run the Application

We should be ready to test our application locally!  Open Git Bash, go to the root of the voter-engagement repo, and enter the following command:

```sh
$ make run
```

This will launch two separate windows - one for Python and one for Node.  Once the server is up and running, load a web browser and go the following location:

http://localhost:8000/

The voter engagement application should now be visible in the web browser.

## Setup for Mac

### Requirements

To run the application locally, you will need the following:

* make
* Python, pipenv
* Node, Yarn
* PostgreSQL

To confirm these system dependencies are configured correctly:

```sh
$ make doctor
```

### Installation

To install backend/frontent project dependencies:

```sh
$ make install
```

## Development

Create a development database and seed it with data:

```sh
$ createdb voterengagement_dev
$ make data

# OR

$ make reset
```

To run the backend/frontend development server:

```sh
$ make run
```
