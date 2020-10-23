
# Sora student module

API to serve information for students.


## How to run dev environment using docker-compose

1 - First you'll have to clone the repo and make sure docker-compose is installed and then go to the project directory

2 - Create a .env file on the project root and configure the env vars

3 - Run `docker-compose up --build -d sora` in the project root

**Important:**
Application will look for a .env file based on NODE_ENV

NODE_ENV=test uses **.env.test** (`npm run test`)

NODE_ENV=dev uses **.env.dev** (`npm run dev`)

other NODE_ENV variations uses **.env** (`npm start`)

**Important 2:**
- Before running tests, you need to execute at least once:`npm run create-test-db`
- After that you can just run `npm test` in your container


### Public routes

```
GET /status
```

```
POST `/login`

body:
{
    "email": "your@mail.com",
    "password": "123",
}

returns jwt token
```

### Private routes
Using header `Authorization: Bearer <token>`

```
GET `/skills/GetByStudent`

returns student skill data (skill id, skill level, skill name)
```

```
GET `/questions/whoToAsk?skillId=`

returns list of students of faculty members who can help you with questions
```
