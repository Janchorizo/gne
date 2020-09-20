# gne
### Graphviz Network Explorer _(GNE)_, simple user interface for interacting with svg output files from Graphviz.

> Graphviz is capable of creating highly detailed network diagrams that can turn complicated to
> read, interpret and, thus, getting insight from.

This project aims at leveraging the capabilities of modern data visualition to facilitate the task
of network exploration with a few key questions in mind:
- __What different nodes are there for each type of address range?__
- __Is there a trend in communication between nodes of different address range?__
- __Which are the different nodes that connect to a specific one and, how are ports involved?__

For this, GNE takes a Graphviz svg output file as input along with the graph xpath specification
needed to identify between nodes and links.

## About this repository

This repository holds the code of the web application done for the exploration of network diagrams
done with Graphviz. This front-end applcation depends on a [conversion API](https://github.com/Janchorizo/gne-conversion-api)
for uploading the SVG file and retrieving the JSON-formated network structure.

## How to use it

The webapp uses React for the development and a series of dependencies, all specified in a `package.json` along with
the `yarn.lock`file in the root directory. The latest version of the app can be used [here](), or you can clone the repository
and work with the code.

For development, be sure to have Node installed, along with [NPM](https://www.npmjs.com/) and [Yarn](https://yarnpkg.com/).
1. Clone the repository and navigate to the root folder,
2. then install the dependencies by running `yarn install` and
3. either run the development server using `yarn dev` or built the app by running `yarn build`.
* The command `yarn lint` will execute the configured linter to check for syntax errors and code style (Google's one being used).
