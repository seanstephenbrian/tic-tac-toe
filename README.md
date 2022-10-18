# tic-tac-toe

this tic-tac-toe game was my second project for the odin project's javascript course.

live version: https://seanstephenbrian.github.io/tic-tac-toe/

the idea behind the assignment was to create a fully functional tic-tac-toe game in 
javascript with no global code. blocks of related javascript are held in isolated modules -- Gameboard, Gameplay, PageEffects -- each inside an anonymous function assigned to the module
variable. the modules contain various functions for starting, running, and ending the game,
and dynamically updating the page as the user interacts with it (more on that below).

i enjoyed working through the logic of the game and solving specific problems -- for example,
how to ensure that the losing player always gets the first turn in the next game if the 
'play again' button is clicked. detailed comments in the javascript outline what is
happening throughout the script: they veer on over-explanation, but at a certain point i needed
to go through and explain to myself what exactly was happening in order to troubleshoot.

once the logic was mostly in place, i focused on creating a complex and unexpected
visual aesthetic for this simple game. building off the brutalist/minimalist design i had
previously used in the calculator project, i used flashing X/O background graphics, multiple layers of backdrop filters, pop-up windows, and hover effects (including a JS function that rotates each
tic-tac-toe square a random number of degrees between -180 and 180 degrees when you mouse over)
to create what i hope is an original vision of tic-tac-toe.

the design is pared down and simplified for mobile displays/narrow screen widths -- even though it
is simpler, i still think it looks quite interesting!

in the end, this was a really rewarding and engaging project. i enjoyed both the more logical
/ mathematical side of it and, of course, the design work.