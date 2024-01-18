# Bouquet
260 project winter 2024
 (docs/notes.md)
## Specification Deliverable
A general idea of what this project will hopefully look like
### Elevator Pitch
Are you struggling to decide what you want your wedding bouquet to look like, but you don’t want to go to a florist yet? Need floral inspiration for some other reason? The Bouquet app is here to help you visualize your arrangements. Find your flowers and greens and add them to the stickerboard. Move stickers around the board until you find just what you are looking for! Save an arrangement on your account to remember what plants you used. Connect with friends and chat about your ideas.
### Design
![first draft](img.png)
### Key Features
+ Secure login over HTTPS
+ Friends list
+ Chatbox
+ Display of flower choices
+ Stickerboard
+ Ability to stick flowers to board
+ Ability to save arrangements
+ List of saved arrangements
### Technologies
+ HTML - Uses correct HTML structure for application. Two HTML pages. One for login and one for arranging.
+ CSS - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
+ JavaScript - Provides login, choice display, chatbox display, stickerboard display.
+ Service - Backend service with endpoints for:
+ + login
+ + retrieving choices
+ + displaying flowers
+ + recalling saved arrangements
+ DB/Login - Store users and friends in database. Register and login users. Credentials securely stored in database.
+ WebSocket - Live chat with users on friends list
+ React - Application ported to use the React web framework.
 