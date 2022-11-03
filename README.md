# tic-tac-toe

a simple tic-tac-toe browser game with a not-so-simple interface

live version: https://seanstephenbrian.github.io/tic-tac-toe/

the idea behind the assignment was to create a fully functional tic-tac-toe game in 
javascript with no global code. blocks of related javascript are held in isolated 'modules'
(Gameboard, Gameplay, PageEffects...) each inside an anonymous function assigned to the module's
variable. the modules contain various functions for starting, running, and ending the game,
and for dynamically updating the page as the user interacts with it.

i enjoyed working through the logic of the game and solving specific problems -- for example,
how to ensure that the losing player always gets the first turn in the next game if the 
'play again' button is clicked.

once the logic was mostly in place, i focused on creating a complex and unexpected
visual aesthetic for this simple game. building off the  design i played with in my calculator project,
i used flashing X/O background graphics, multiple layers of backdrop filters, pop-up windows, 
and hover effects (including a JS function that rotates each tic-tac-toe square a random number
of degrees between -180 and 180 degrees when you mouse over) to create what i hope is a unique vision
for a little browser tic-tac-toe game.

the design is pared down for mobile displays/narrow screen widths, but hopefully still interesting!

i thought this was a really fun and engaging project.. i hope you like it too :)

some screenshots of the desktop version:

![Screenshot 1](https://raw.githubusercontent.com/seanstephenbrian/tic-tac-toe/main/img/screenshots/screenshot-1.png)

![Screenshot 2](https://raw.githubusercontent.com/seanstephenbrian/tic-tac-toe/main/img/screenshots/screenshot-2.png)

![Screenshot 3](https://raw.githubusercontent.com/seanstephenbrian/tic-tac-toe/main/img/screenshots/screenshot-3.png)

![Screenshot 4](https://raw.githubusercontent.com/seanstephenbrian/tic-tac-toe/main/img/screenshots/screenshot-4.png)

![Screenshot 5](https://raw.githubusercontent.com/seanstephenbrian/tic-tac-toe/main/img/screenshots/screenshot-5.png)

![Screenshot 6](https://raw.githubusercontent.com/seanstephenbrian/tic-tac-toe/main/img/screenshots/screenshot-6.png)

mobile version:

<img src="https://raw.githubusercontent.com/seanstephenbrian/tic-tac-toe/main/img/screenshots/mobile-1.png" alt="Mobile screenshot 1" width="400"/>

<img src="https://raw.githubusercontent.com/seanstephenbrian/tic-tac-toe/main/img/screenshots/mobile-2.png" alt="Mobile screenshot 2" width="400"/>

<img src="https://raw.githubusercontent.com/seanstephenbrian/tic-tac-toe/main/img/screenshots/mobile-3.png" alt="Mobile screenshot 3" width="400"/>

<img src="https://raw.githubusercontent.com/seanstephenbrian/tic-tac-toe/main/img/screenshots/mobile-4.png" alt="Mobile screenshot 4" width="400"/>