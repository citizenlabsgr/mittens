# Voter Engagement

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

## Setup

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
```

To run the backend/frontend development server:

```sh
$ make run
```
