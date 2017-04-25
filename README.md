##### Not for production use just yet

# Development Workflow

- Run `npm install`
- Start ohmage at localhost:8080
#### Developing with navbar:
- Start an http server for [@mobilizingcs/navbar](https://github.com/mobilizingcs/navbar) at localhost:8081
 - Run `npm run dev_navbar`
#### Developing without navbar:
   - Run `npm start`

# How to build for production
- Clean up the dist folder: `npm run clean`
#### For use without navbar:
 - Run `npm run dist`

#### For use with navbar:
 - Run `npm run dist_navbar`