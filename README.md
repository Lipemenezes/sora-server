
# Sora student module

API to serve information for students.


## How to run dev environment using docker-compose

1 - First you'll have to clone the repo and make sure docker-compose is installed and then go to the project directory

2 - Open docker-compose.yml and replace `<path_to_the_project_root>` with your actual project root - e.g `/home/user/Desktop/sora-server`.

3 - Go to the desired .env file on the project root and configure the env vars

**Important:**
Application will look for .env file based on NODE_ENV

NODE_ENV=test uses **.env.test** (`npm run test`)

NODE_ENV=dev uses **.env.dev** (`npm run dev`)

other NODE_ENV variations uses **.env** (`npm start`)


4 - Run `docker-compose up --build -d sora` in the project root

5 - Run `docker-compose exec sora sh` and after that the script you want inside the container (e.g `npm run dev`)

**Important 2:**
- Before running tests, you need to execute at least once:`npm run create-test-db`
- After that you can just run `npm test` in your container
