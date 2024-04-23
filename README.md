# Meet Countinkly Your Simple Open Source Link Tracker Solution

![Countinkly snapshot](/public/example.png "Countinkly")

## Stack

- **NextJs**
- **ShadCn**
- **LuciaAuth**
- **Prisma**
- **PostgreSQL**
- **Recharts**

## Motivation

As a relatively new frontend developer, every time I complete a project, I share it on my social media to generate interactions with other devs and perhaps future work opportunities. With that said, one day I wanted to know the impact my social media posts were having. Despite the existence of already very good services, I challenged myself to create my own and make it open source to learn alongside others, and thus Countinkly was born.

## Features

- View through intuitive graphics how many clicks you obtain on each link you decide to track with Countinkly.

> 📝 If you're going to track a link, Countinkly provides you with the opportunity to use your own metadata, ensuring that your brand visibility is maintained while sharing using Countinkly.

- Additionally, a section (Discover) has been created to display the links that Countinkly tracks, where users can comment, like, and help link owners by sharing sites they find interesting through Countinkly.

## Roadmap

- [ ] Email Confirmation
- [ ] Password Recovery
- [ ] Tags on discover
- [ ] Users can add their own source

## Known Issues

- It seems that when using transitions with server actions, if an action fails, the transitions are not marked as completed.
- If you mark 'Use your own metadata' in the new link form, and then for any reason you change your mind and unmark this options react-hook-form still tracking those fields and validating, I am currently searching at the docs how to stop tracking those fields based on user choice.
- The function that handles the origin of the request is not working at this moment. (Currently working)
  
## Contributing

Feel free to make suggestions. If you'd like to contribute to Countinkly, open an issue and wait for the task to be assigned to you. We look forward to your help!

> Hey!!! If you've made it this far, consider leaving us a star! ⭐😊