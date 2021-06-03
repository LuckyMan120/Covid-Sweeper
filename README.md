# Covid-Sweeper: A minesweeper clone with serverless AWS backend

  ## * * *  Check out the [Live Application](https://covid-sweeper.com/)  * * *
 
- ## Tools and Architecture: 
    This project was chosen to give practice with AWS Lambda and surrounding ecosystem.
 
  ##### Backend: 
    - The application and database are deployed as separate services, with the API repo found [here](https://github.com/T-mclennan/minesweeper-serverless-api).
    - CloudFormation template is generated and deployed using [Serverless](https://www.serverless.com/framework/docs/) framework.
    - Static assets are hosted in S3 bucket, served by CloudFront with an AWS Lambda trigger. 
    - DynamoDB is used for storage, accessed via API Gateway, and protected by Cognito.
    - CloudWatch is used for Lambda and API access logs. 
    
  ##### Frontend:
    - The game has customizable parameters and layout, 3 kinds of mouse input. (right, left, and double click)
    - The Landing, Settings, Game, and Standings pages were built with React and CSS.
    - AWS Amplify is used to connect with backend resources.
    - Jest & React-Testing-Library for unit testing. 
    - useContext hook and Context API share theme and settings between components.
    - Routing is done with the ReactRouter and history API.
      
- ## Authentication:
    There is currently have no formal authentication mechanism, players are only prompted for a name when they achieve a high score. 
    I do however use Cognito + Gateway to protect the API routes, with Cognito's identity pool creating guest access credentials. 
    In a future release I'd like to save the user settings into the browser's local storage, so the preferences would persist between visits. 
 

- ## Landing: 
    Featured in the middle of the page are game options players can use to generate a new game. They can choose between standard difficulty combinations,
    or build a game with custom parameters. Below this form are icons linking to the scoreboard, settings page, and github. Animations are added to 
    change color and size of icons on hover, as well as adding descriptive tooltip. 
    
    ![2020-07-15 14 55 27](https://user-images.githubusercontent.com/43154475/87602562-1196ee00-c6ac-11ea-931b-3f2c1297fc90.gif)
    

    
- ## Scoreboard: 
    Displays a table listing of the current high scores. 
    Amplify is used to query the DynamoDB table, and we use a scan operation with a limit to get the top 10. 
    Countup library is used to add scroll effect, with the animation time set in relation to the score value. (higher score counts longer)
  
  <img width="1280" alt="scoreboard" src="https://user-images.githubusercontent.com/43154475/87493057-d12e6600-c600-11ea-8f76-436975e4d519.png">

             
- ## Settings:
  This page offers toggle options for sound effects, animation, and color scheme.
  These preferences are stored in global state using Context API, so they can be easily accessed by any UI components that need them. 

  ![2020-07-15 15 19 04](https://user-images.githubusercontent.com/43154475/87606118-10b38b80-c6af-11ea-9daa-f509177a2ec5.gif)
             
- ## Gameplay:
  - The game is featured in the center viewport, with the Status Bar, Clock, and Navigation Buttons at the top of the screen.
  - The object of the game is to flag all the mines, and uncover all the extraneous space. 
  - Left click: uncovers a square. If it's a mine the player loses. If it's not a mine, it uncovers empty space.
  - Right click: drops / picks up a flag. Flagged mines allow the player to proceed with the game, but if there is no mine it can be a problem.
  - Double click: double clicking on a numeric square is a shortcut for clicking all the surrounding squares. Can speed things up if done carefully. 
  - Score generation formula primarily uses mine count, mine density, elapsed time (ms). Small additional modifiers are added if player 
    finishes in faster than expected time given the conditions. 
  - Due to the competitive nature of scoring, I added a 3 second countdown to give the player a buffer before the game starts. 
    This hopefully will makes it less stressful having a millisecond clock ticking down on the screen. 
  - Sound effects are added to countdown numbers, losing 'boom' sound, and winning 'fanfare'. 
  - Jiggling animation is added when a player loses. Confetti animation is added when a player wins. 
  - If the player recieves a top score, he is prompted for a username in a highscore modal, then routed to the scoreboard page. 
  
  
  
  <img width="1280" alt="game-blue" src="https://user-images.githubusercontent.com/43154475/87493022-bf4cc300-c600-11ea-8b8d-903ccf056d41.png">

