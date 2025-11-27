# Dev Instructions
For generating and deploying the site.

## Initial Setup
Install Node and 11ty

```
brew install node
npm install @11ty/eleventy --save-dev
```

## Core Workflow
All of these commands are run from within the eleventy folder.
```
pwd
/ ... /matthews_web/eleventy
```

Clean (regeneration is additive, so cruft accumulates sometimes if files are renamed, moved, etc)

```
rm -rf ../docs
```

Regenerate and serve locally (with auto-reload on save)

```
npx @11ty/eleventy --serve
```

Open in browser:

```
open http://localhost:8080/
```

All in one command:

```
rm -rf ../docs && npx @11ty/eleventy --serve & open http://localhost:8080/
```

## Other Notes

### Deploys
The site automatically deploys on each push to master.

* [See recent deploys](https://github.com/wmatthew/matthews_web/deployments/github-pages)
* [Check for github outages](https://www.githubstatus.com/)

### Dependencies
* [Remove unused dependences | https://dev.to/sifatfaysal/find-unused-npm-packages-in-packagejson-4641]