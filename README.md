# Wandrly – The Home Rental Platform 🌍

## 🏠 1. What Is This Project?
Wandrly is a web application where people can list their homes, rooms, or unique spaces for others to rent out for vacations or short stays. It solves the problem of finding interesting places to stay while traveling by directly connecting property hosts with guests. This app is built for travelers looking for accommodation and property owners looking to earn money by renting out their spaces. 

**Real-life analogy:** Think of this project like a digital bulletin board at a community center. Property owners pin flyers of their homes on the board (create listings), and travelers look at the board to find a place to stay (browse listings), leave comments (reviews), and the center's security makes sure only registered people can pin things on the board (authentication).

## 🧱 2. What Tools Were Used to Build This? (Tech Stack)
- **Node.js** — This is the engine that runs our entire project outside of a web browser. (Chosen because it's fast and uses JavaScript, which is easy to work with).
- **Express.js** — This is a tool that helps our Node.js engine listen to user requests (like clicking a link) and send back the right web page. (Chosen because it makes building web servers very simple).
- **MongoDB & Mongoose** — These are our digital filing cabinets that permanently store all user data, listings, and reviews. (Chosen because it gracefully handles large amounts of flexible text data).
- **EJS (Embedded JavaScript)** — This is a tool used to build the visual screens of the website by mixing regular HTML with dynamic data (like showing a specific user's name). (Chosen for its simplicity in creating dynamic web pages).
- **Cloudinary** — This is a dedicated online storage box specifically for keeping all the images users upload. (Chosen so our main server doesn't get slowed down holding heavy pictures).
- **Passport.js** — This is like the bouncer at a club; it handles user logins, checks passwords, and keeps track of who is allowed inside the app. (Chosen because it's highly secure and handles the complex math of hiding passwords).
- **Joi** — This is a strict inspector that checks every form submitted to make sure the user didn't leave any required fields blank before saving it. (Chosen to prevent broken or empty data from entering our database).

## 📁 3. Project Folder Structure (What's Inside?)
Here is a look at the folders that make up this project:
- **`app.js`** — This is the main brain of the app. Think of it like the manager of a restaurant who coordinates all the different workers.
- **`models/` (Folder)** — This folder contains the blueprints for how data is shaped before going into the database. Like a mold for making a specific shape of ice.
  - `listing.js` — The mold for a property listing (needs a title, price, location, etc.).
  - `review.js` — The mold for a user review (needs a rating and text comment).
  - `user.js` — The mold for a user account (needs an email and password).
- **`controllers/` (Folder)** — These are the workers who actually do the heavy lifting when a user asks for something. 
  - `listings.js` — Handles creating, editing, and deleting property listings.
  - `review.js` — Handles adding and removing reviews on properties.
  - `users.js` — Handles the process of signing up and logging in users.
- **`routes/` (Folder)** — This is like the switchboard operator. It looks at the website URL the user visited and connects them to the correct controller worker.
  - `listing.js`, `review.js`, `user.js` — Each file directs traffic for their specific category.
- **`views/` (Folder)** — This holds all the visual screens the user actually sees on their screen (written in EJS). Like the menus handed to customers in a restaurant.
- **`public/` (Folder)** — Holds static files that just make things look pretty, like CSS (colors and spacing) and client-side JavaScript (browser animations).
- **`middleware.js`** — This contains checkpoint guards. Before a user can do an action (like delete a post), these guards check if they have permission to do so.
- **`cloudConfig.js`** — Contains the secret keys to connect to Cloudinary (our image storage). Like a VIP pass to access a private vault.
- **`schema.js`** — Contains the rules for our data inspector (Joi) to make sure forms are filled out correctly.
- **`package.json`** — This is a list of all the exterior tools (libraries) we downloaded to help build the project. Like a shopping list of ingredients.
- **`.env`** — A hidden, secret file that holds all our private passwords. Never shared publicly!

## 🔄 4. How Does The Whole Thing Work? (Workflow)
Let's imagine you want to look at a property on the app. Here is the story of how the whole project works together to show it to you:
1. **The Request:** You click on a beautiful beach house listing on the screen. Your browser sends a message (a request) to `app.js` (the manager).
2. **The Routing:** The manager (`app.js`) sees you want a listing, so it routes your request to the `routes/listing.js` file (the switchboard operator).
3. **The Controller:** The switchboard operator connects you to the specific worker inside `controllers/listings.js` whose job is to "show a single listing".
4. **The Database:** That worker goes down to the `models/listing.js` blueprint, opens the MongoDB digital filing cabinet, and searches for the specific beach house you clicked. 
5. **The View:** The worker takes the beach house data, brings it to the `views/listings/show.ejs` file, and uses it to paint the web page with the correct title, image, and price.
6. **The Response:** Finally, the fully painted web page is sent all the way back to your computer screen for you to see!

## 🔍 5. Code Explained (Every File, Every Function)

### `app.js` (The Server Manager)
- **Purpose:** This file starts the server, connects to the database, and sets up all the basic rules for the project.
- **main()**: Connects the app to the MongoDB database using our secret `dbUrl`. Like plugging the app's cord into the power socket.
- **app.use() sections**: These lines tell the app to use various tools (`passport` for logins, `flash` for pop-up messages, `session` to remember if a user is logged in). 
- **app.listen()**: Turns the server on and tells it to keep its ears open on port `8080` for any incoming visitors.

### `middleware.js` (The Checkpoint Guards)
- **Purpose:** These functions run *in the middle* of a user's request. They stop requests that shouldn't be allowed.
- **isLoggedIn()**: Acts like a bouncer. When a user tries to create a listing, it asks "Are you logged in?" If yes, they proceed. If no, they are kicked back to the login page.
- **isOwner()**: Checks if the logged-in user actually owns the property they are trying to edit or delete. If you try to edit someone else's house, it stops you.
- **isReviewAuthor()**: Same as above, but ensures you can only delete reviews that *you* wrote.
- **saveRedirectUrl()**: Remembers exactly what webpage you were trying to visit before you were forced to log in, so it can send you back there afterwards.
- **validateSchema() / validateReview()**: Inspects the data coming from a filled-out form to ensure required fields aren't missing.

### `models/listing.js`, `review.js`, `user.js` (The Blueprints)
- **Purpose:** They define exactly what a piece of data should look like.
- **Listing Schema**: Says every listing MUST have a title (text) and price (number). It also creates a relationship to the User Schema to record who the "owner" is.
- **Review Schema**: Says every review gets a comment (text) and a rating (number from 1 to 5).
- **findOneAndDelete() (in listing.js)**: A clean-up crew function. If a property is deleted, this function automatically deletes all the reviews tied to it so they don't float around forever.

### `controllers/listings.js` (The Listing Workers)
- **index()**: Gathers *all* listings from the database and sends them to the homepage screen to be displayed.
- **renderNewForm()**: Just hands the user a blank webpage form to fill out.
- **createForm()**: Takes the information typed into the "New Listing" form, asks for map coordinates using `geocode()`, uploads the picture, and saves the whole new property into the database.
- **showListing()**: Finds one specific property by its unique ID number and prepares the detailed view screen.
- **editListing()**: Prepares a form that already has the house's old details filled in for editing.
- **updateListing()**: Takes newly edited info from a form and overwrites the old data in the database.
- **deleteListing()**: Throws the property (and its image on Cloudinary) into the trash.

### `controllers/users.js` (The Login Workers)
- **renderSignup() / rederLogin()**: Displays the blank login or signup forms.
- **signUp()**: Takes a new email and password, creates a brand new user in the database, automatically logs them in, and says "Welcome!".
- **login()**: Simply redirects a user back to the screen they were trying to visit after they successfully scan their ID (log in).
- **logout()**: Tears up the user's temporary VIP pass so they are no longer logged in.

### `controllers/review.js` (The Review Workers)
- **createReview()**: Takes text typed in the review box, attaches the current user's ID to it, and glues it to the bottom of the property listing in the database.
- **destroyReview()**: Plucks a specific review out of the database and throws it away.

## ⚙️ 6. How to Install and Run This Project
Follow these steps to run the Wandrly app on your own computer!

1. **Download the code**: Have all the project files in a folder on your computer.
2. **Install the interior tools**: Open your computer's terminal (command prompt), go into the project folder, and type:
   `npm install`
   *(This command downloads all the helper tools the project needs to run. Think of it like installing apps on your phone from the app store.)*
3. **Set up the secrets**: Create a new file named exactly `.env` in the main folder. Inside it, put these secret keys (you would get these numbers by making accounts on MongoDB and Cloudinary):
   - `ATLASDB_URL` — This is the secret web link to access your MongoDB database. Like a hidden door.
   - `CLOUD_NAME` — Your Cloudinary storage box name.
   - `CLOUD_API_KEY` — Your Cloudinary username.
   - `CLOUD_API_SECRET` — Your Cloudinary password.
   - `SESSION_SECRET` — A random secret word the app uses to securely lock user sessions (like `mysecretcode123`).
4. **Turn the server on**: In your terminal, type:
   `node app.js` (or `npx nodemon app.js` to keep it running)
   *(This starts the manager working. It should say "server is listning on 8080")*
5. **View the website**: Open your web browser (like Chrome) and go to the URL: `http://localhost:8080/listings`

## 🚶 7. Step-by-Step User Journeys

**👤 User Journey 1: Signing Up**
- **Step 1** — User fills in their username, email, and password on the screen.
- **Step 2** — They click the "Sign Up" button.
- **Step 3** — The request travels to the `signUp()` worker in `users.js`. 
- **Step 4** — The app checks if the username is already taken. If not, the password gets scrambled (encrypted) for safety, and the profile is saved in the database.
- **Step 5** — The user is instantly logged in, sees a green "Welcome" flash message, and is taken to the homepage.

**👤 User Journey 2: Creating a New Listing**
- **Step 1** — A logged-in user fills out a form with their house title, price, location, and uploads a picture of the house.
- **Step 2** — They click submit. 
- **Step 3** — Through `routes/listing.js`, the picture is grabbed and immediately sent to Cloudinary via `cloudConfig.js` for safe keeping. Cloudinary returns a link to the picture.
- **Step 4** — The `createForm()` worker in `listings.js` looks up the exact map coordinates of the typed location on a map using an external map API.
- **Step 5** — All data (text, image link, coordinates, and the user's ID) is bundled together and locked into the MongoDB filing cabinet.

**👤 User Journey 3: Leaving a Review**
- **Step 1** — A user looking at a specific house types a comment and selects a 5-star rating.
- **Step 2** — The `isLoggedIn()` guard in `middleware.js` makes sure the user is actually signed into an account.
- **Step 3** — The `validateReview()` guard makes sure the comment isn't totally blank.
- **Step 4** — The `createReview()` worker creates the review, stamps it with the user's ID, and links it directly to that house.

## 🗄️ 8. Database (How Data Is Stored)
Think of our MongoDB database like a giant filing cabinet. Inside, we have three main drawers (Collections):

- **`users` Drawer** — Stores every person who signed up.
  - `_id`: A unique number (like a fingerprint) for each user.
  - `username` & `email`: The user's typed info.
  - `hash` & `salt`: The scrambled, unreadable version of their password.
- **`listings` Drawer** — Stores all the properties for rent.
  - `title`, `price`, `location`: Text and numbers about the house.
  - `image`: The link to where the picture is held in Cloudinary.
  - `geometry`: The exact Longitude/Latitude math coordinates for the map.
  - `owner`: The unique `_id` fingerprint of the User who created it.
  - `reviews`: A list of unique fingerprints belonging to the reviews left on this house.
- **`reviews` Drawer** — Stores the comments.
  - `comment` & `rating`: What the user thought of the place.
  - `author`: The unique `_id` fingerprint of the User who wrote it.

## 🔌 9. API Endpoints
An API (Application Programming Interface) is a way for two apps to talk to each other. An endpoint is a specific service window you can ask for things from.
- **`GET /listings`** — *"Show me everything."* You use this to load the homepage. You get back the whole list of houses.
- **`GET /listings/new`** — *"Give me a blank form."* Used when you want to create a property. You get back a blank webpage form.
- **`POST /listings`** — *"Save my new house."* Used when submitting the filled-out form. You send all the text and images. You get a redirect to the homepage.
- **`GET /listings/:id`** — *"Show me this specific house."* (The `:id` is the house's unique fingerprint). Used to view the detailed page. 
- **`PUT /listings/:id`** — *"Update my old house data."* Used when you edit a listing.
- **`DELETE /listings/:id`** — *"Destroy this house."* Used to delete a listing.
- **`POST /listings/:id/reviews`** — *"Submit my comment."* Used to attach a review to a house.
- **`POST /login`** — *"Let me in."* You send an email and password. You get back an active session (a VIP pass).

## ❗ 10. Common Problems & How to Fix Them
- **Error:** `"connection successful"` never prints / app crashes immediately.
  - **Why:** The app cannot talk to the database. Usually because the `.env` file is missing or the `ATLASDB_URL` string is wrong.
  - **Fix:** Check your `.env` file and make sure your database URL is exactly correct.
- **Error:** `"page not found"` screen.
  - **Why:** You typed an endpoint URL in the browser that doesn't exist (like `/listtts` instead of `/listings`).
  - **Fix:** Double-check the website address bar for typos.
- **Error:** `"You must be logged in to create new listing!!"`.
  - **Why:** You tried to do an owner-only action without showing your VIP pass (logging in).
  - **Fix:** Go to the `/login` page, sign in, and try again.
- **Error:** Images aren't uploading / broken image link.
  - **Why:** Cloudinary rejected the image. Likely your Cloudinary secret keys in the `.env` file are incorrect.
  - **Fix:** Copy and paste the keys straight from your Cloudinary dashboard into your `.env` file.

## 💡 11. Key Concepts Used in This Project
- **Client-Server Architecture** — This means there is a front "client" (your web browser screen) and a back "server" (our Node.js code). Like a customer sitting at a table (client) ordering from the kitchen (server).
- **Authentication** — This is how the app knows exactly who you are. Like showing your physical ID card to enter a building. We use Passport.js for this.
- **Middleware** — Code that intercepts a request mid-flight. Like a toll booth on a highway you must pass through before reaching the city. 
- **MVC (Models-Views-Controllers)** — An organizational pattern. We keep database molds in `models`, logic/workers in `controllers`, and visual screens in `views`. This keeps our messy code organized into neat, separate rooms.
- **Relational Data** — Instead of duplicating data, we link it. By storing a user's `_id` fingerprint inside a house listing, the database knows who the owner is without having to write out their name and email all over again.

## 📝 12. Summary (The Big Picture)
Wandrly is a full-stack web application designed for people to rent and review unique accommodations. It works by having a powerful "backend" server (built with Node.js and Express) that listens for user actions, talks to a secure database (MongoDB) to save or retrieve information, and then pushes beautiful, dynamic web pages (built with EJS) back to the user's screen. With security guards to handle logins and dedicated filing systems to keep properties and reviews organized, the platform operates seamlessly—much like a well-managed digital hotel!
