# CS442-Cooking-Recipe-Database-Project
This is our semester project for Database Systems (CS 44200).

---

## 1. Prerequisites

Install these first:
- **JDK 21**
- **Node.js 20+**
- **PostgreSQL**

## 2. Clone the repository

Clone the repository onto your machine 
- ```git clone https://github.com/diegolara93/CS442-Cooking-Recipe-Database-Project.git ```

## 3. Set Up the Database

1. **Start PostgreSQL** on your machine.

## 4. Setup backend
1. Create a .env file in the root folder of the backend, backend/recipeDB
2. In this .env file set the following env variables: ```DB_URL``` to your database URL, ```DB_USERNAME``` to your database username, and ```DB_PASSWORD``` to your database password.
3. - Run through IntelliJ by going to RecipeApplication.java and running the main function
   - OR if you have docker on your machine run ```docker build -t recipe-db .``` and then ```docker run --rm -p 8080:8080 --env-file {PATH_TO_YOUR_ENV_FILE} recipe-db```

## 5. Setup frontend
1. Go into the frontend folder and run ```npm install``` then run ```npm run dev```

## 6. Run
1. Navigate to http://localhost:3000/ and then it should be running.


