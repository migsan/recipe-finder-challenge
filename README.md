# Recipe Finder Challenge

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy

Check the [deployed version on Heroku](https://recipe-finder-challenge.herokuapp.com/)

The deploy is automatically made by when pushing to the `main` branch using Github actions.
You can check the workflow file in `.github/workflows/main.yml`

## Stack

This project is created using:

- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Emotion.sh](https://emotion.sh/docs/introduction)
- [Axios](https://axios-http.com/)
- [Font Awesome](https://fontawesome.com/)
- [Lodash](https://lodash.com/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Commitizen](https://github.com/commitizen/cz-cli)

## Architecture

### React Context API

The state of the application is shared across multiple context providers using the reducer pattern so well know in Redux. Each Context handles one of the key parts of the project as follows:

1. Random Results
2. Search
3. Modals
4. Favorites

### Components

The components are split in two categories: Commons and Regular components.
The dinsctintion between the two is that commons components act as building blocks while more complex compoents that affect the state or rendering of the applications defined separatelly.

Pages are created using Next.js routing so that the are all stored in the `src/pages` folder. The Recipe Detail Page was created using Next.js Dynamic Routes so that it will hold and use the id set in the path. This is the only place where the page is generated using `getServerSideProps`.

### Styling

Emotion is the framework used to process the styles of the application allowing for styled components that can receive and use props.

There is a global theme defined under `src/styles/theme.ts`. This theme is shared across the application using Emotion's Theme Provider, thus allowing for quick prototyping and easy global updates.

### Testing

Unfortunately there are no tests for this project but thankfully the use of Typescript will contribute on reducing the amount of bugs and issues.

Initially planned on using Jest but the time was very short and I opted for completing the Favorites and caring for the accessibility.

### Accessibility

The site is marked as 100% in accessibility using Google Lighthouse metrics for its use of aria-labels, descriptive buttons, images and supported keyboard navigation.
The app is also using semantic html to accurately describe the contents of its elements.

### Performance

Some things were made to improve the performance of the site:

- Next.js Image component for lazy loading and responsive SrcSet
- Both main images are marked as priority
- Only Font Awesome icons that are used are being imported
- Favorites are stored in the Local Storage facilitating their access
- The providers are set in a way they wrap the elements needing them, avoiding unnecessary additional calls

Some other additional improvements as storing the recipes of the day, to avoid calling the API on each page load could help.

I also wanted to include React-Query but I abandoned the idea given the time constrain.

## Execution

I want to give a little insight on the excecution process of the code challenge.

The first thing I did was read the requirements and start planning the development of the app. After this I drew and annotated some ideas around frameworks and building blocks that I would later use, such as: Components, Pages, Actions and Providers. The process of revision and planning took less than 1 hour.

After this I started setting up the dependencies, configurations, and little starting details that served as the foundation of the project. This took about 1 hour too.

Lastly I dived into the real development of the app making as few unexpected decisions along the way as possible to try to use as much time as I could into the logic, the state of the app, the API requests and later the components and styling. This process took me a little more than 4 hours until the creation of the `feature/4-hour-cap` branch that serves as a timestamp of the work made in that span.

After that I did some more work and polishing that I couldn't achieve in the initial 4 hours including favorites, styles and cleanup of some code parts. For this I dedicated about 2 to 3 more hours.
