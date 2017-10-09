# Voter Engagment Frontend

## Setup

You'll need yarn (> 2.24) and node (> 7)  already installed.

To install dependencies, run yarn:

```
$ yarn
```

## Development

Components are self-contained; specs, sub-components, etc, all live inside the directory for a component.

To run a dev server,

```
$ yarn start
```

A browser window should open with the app happily running on it.

Visual Studio Code is free, and does a good job of editing Typescript.

## Testing

`$ yarn test` will run unit tests once in a browser.

`$ yarn test -- --watch` (note the extra dashes) will watch for file changes and re-run the tests in PhantomJS. Note that phantomjs does not allow for sourcemapping; so if your tests have errors, it can be useful to connect a browser to the karma server, or else run the one-shot tests (as above) to get an actual file and line number.


## Deployment

Make sure you've got aws-cli installed and set up. Then:

`$ yarn run deploy`

## Generators

```
$ yarn run generate -- component

$ yarn run generate -- service
```

These commands will ask a few questions then build a scaffold for you to build from.
