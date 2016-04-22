# Notes

A simple note-taking app built using `localStorage`.

You can find it live at http://rowanweismiller.com/notes/

I use it for taking throwaway notes that I only need for a day or two and
can forget about after. You know what I mean. Stuff like passwords or notes from
a meeting that I need to quickly action afterward.

_Update: I also built this using React as a further learning exercise. You can
check out the code in the `react` branch if you're curious how that works._

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

### Starting Out

I wanted to showcase my biggest strength: strong design supported by a scalable
CSS architecture. SCSS is my tool of choice, so I had to get a basic build pipeline
in place to support that. That was the first and largest rabbit hole I went down.

I decided arbitrarily that I would try `gulp` instead of `grunt` as a task runner,
so I did a bunch of research of others' `gulpfile`s, and ended up cobbling one
together for myself. Unfortunately, I had to adjust it manually several times as
I was working as I discovered my particular needs for the project.

So from the outset, I struggled with a lack of planning or clear vision on how I
was going to execute this project at the code and build level. Fortunately, I
had a strong vision for the UI.

I got into my happy place when I was writing SCSS for everything, and I think it
ended up looking pretty good.

### The Hard (But Good) Part

I started writing JavaScript after I styled the components. I was a bit worried
about how I would approach it, to be honest. When I was asked to do this project,
I realized that I had never built a full app on my own in JavaScript from scratch.
I had always just extended the functionality for existing larger apps, often
with jQuery.

This wasn't like that, though, so I had to think basic. I wanted to keep my code
simple, but modular enough to separate _some_ concerns. I used the [Module Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)
that Addy Osmani wrote about in his open source book, to achieve that.
I had already decided to use localStorage so that I could keep all my code
entirely client-side and not worry about having a server application, but this
started to have weird implications regarding data handling vs UI handling.

### So The Designer Accidentally Applied MVC

I was used to thinking about all the data and storage handling as being a
function of 'back-end' code, while UI handling was a function of 'front-end' code.
What if both are on the front end? My answer to that question was to write 2
separate modules. `Notes`, and `NotesUI`. One for handling data and saving / loading
from localStorage, and one for handling the view / events / DOM manipulations.

After talking to a friend about it, it turns out I was just replicating MVC.
This makes sense in hindsight. I didn't have a lot of application development
experience, but it is still the pattern I was most familiar with it, albeit
latently.

### Takeaway

Not that this app is overly complex, but doing it taught me that it's easy to
overengineer something when you want to demonstrate its ability to scale. That's
good if you're building something that will actually scale in a team, but for a
small (3 hour) project, is that necessary? ¯\_(ツ)_/¯

All that said, I'm pretty happy with it. I think its pretty slick 🏎

Thanks to @Spittal and @fishfillet for the nudges.