# Clipboard Health Exercise

This is an exercise project for Clibpboard Health.

## Get Started

### Running the server

There are multiple options for running the server

#### Running with docker

`docker-compose up`
This should install the modules, build the app, and start the server on port `4000`.

#### Running with npm

`npm install` to install the module

`npm start` to start the local server on port `4000`.


### Run the test suits

`npm test` will run the test suits for unit test and integration test.


### Setup an account and create authorization token.

To create an account, make a post request to `/account/register`

example payload  ```{
 name: "Test Account",
 username: "test",
 password: "testpassword"
}```

To login, make a post request to `/account/login`

expample payload ```{
username: "test",
password: "testpassword"
}```


Copy the `token` created from the login response and use that as an authorization token for subquent request to the endpoints.

e.g `Authorization: Bearer ${token}`


### Available endpoints

 - POST `/account/register` - To create an account

 - POST `/account/login` - To login to an account

 - POST `/staff` - To add a new record to the dataset

 - DELETE `/staff/:id` - To delete a record from the dataset

 - GET `/staff` - To get all the dataset record

 - GET `/staff/ss` - To get simple statistic (SS) for salary over the entire dataset

 - GET `/staff/ss/departments` - To get simple statistic (SS) for salary of each department over the entire dataset 

 - GET `/staff/ss/contractors` - To get simple statistic (SS) for salary over the dataset which satisfy `on_contract: true`

 - GET `/staff/ss/subdepartments` - To get simple statistic (SS) for salary of each department and sub departments over the entire dataset 
