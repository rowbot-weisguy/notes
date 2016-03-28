# Skyrocket Notes

A simple note-taking app built with SASS and Javascript using `localStorage`.

## Installation

- Clone this repository
- Run `npm install`
- Run `gulp` to serve the site automatically at `localhost:3000`
- Create, edit, delete and browse notes! Your notes will be remembered from session to session.

## Process

I thought it might be helpful for reviewers to explain my approach at a high level.

First off, this app was built as part of a hiring exercise (Hi, @Spittal!), and
it was suggested that it should take no more than 1-3 hours to build [this](https://gist.github.com/Spittal/6b960612460753fd81c7).

I took roughly 11 hours. Let me explain.

I wanted to showcase my biggest strength: strong design supported by a scalable
CSS architecture. SCSS is my tool of choice, so I had to get a basic build pipeline
in place to support that. That was the first and largest rabbit hole I went down.

I decided arbitrarily that I would try `gulp` instead of `grunt` as a task runner,
so I did a bunch of research of others' `gulpfiles`, and ended up cobbling one
together for myself. Unfortunately, I had to adjust it manually several times as
I was working as I discovered my particular needs for the project.

So from the outset, I struggled with a lack of planning or clear vision on how I
was going to execute this project at the code-level. Fortunately, I had a strong
vision for the UI.

I got into my happy place when I was writing SCSS for everything, and I think it
ended up looking pretty good. I didn't bother making it responsive yet because it
wasn't a requirement and I think my code reviewer will be looking at this at their
desk.

I started writing JavaScript last, though. I was a bit worried about how I would
approach it. When I was asked to do this project, I realized that I had never
built a full app on my own in JavaScript. I have always just extended the
functionality for existing larger apps, often with jQuery. When there's a pattern
in place for how to extend a codebase, it's really easy to work with!

This wasn't like that, though, so I had to think basic. I remembered liking the
[Module Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)
that Addy Osmani wrote about in his open source book, so I chose to employ that.
I had already decided to use localStorage so that I could keep all my code
entirely client-side and not worry about having a server application, but this
started to have weird implications regarding data handling vs UI handling.

I was used to thinking about all the data and storage handling as being a
function of 'back-end' code, while UI handling was a function of 'front-end' code.
What if both are on the front end? My answer to that question was to write 2
separate modules. `Notes`, and `NotesUI`. One for handling data and saving / loading
from localStorage, and one for handling the view / events / DOM manipulations.

At the end of the day, this feels to me likes it's more complicated than it needed
to be. Still, I'm pretty happy with it! It feels pretty slick.

Thanks to @Spittal and @fishfillet for the nudges.