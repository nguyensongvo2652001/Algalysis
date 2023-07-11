## NAME

Algalysis

## DESCRIPTION

A fullstack, machine-learning project that analyzes certain algorithmic questions and provide you useful information about it (like complexity, difficulty, what techniques should you use and related problems)

## Screenshots

Below are some screenshots that I took from this project (you can check them in the Screenshots folder)
![](/Screenshots/Screenshot_1.jpg)
![](/Screenshots/Screenshot_2.jpg)
![](/Screenshots/Screenshot_3.jpg)
![](/Screenshots/Screenshot_4.jpg)
![](/Screenshots/Screenshot_5.jpg)
![](/Screenshots/Screenshot_6.jpg)

## TECHNOLOGIES USED:

1. NodeJS (For backend but does not provided API related to the models)
2. Flask (To serve my my trained models)
3. MongoDB (For database)
4. React, HTML, CSS (For frontend)
5. Tensorflow (for training Machine Learning models)

## MAIN FUNCTIONALITIES AND FEATURES:

1. Authentication (Login, Signup)
2. Create / delete /update a problem
3. Create / update / delete task
4. **Analyzes the problem using machine learning models. These models will try to predict the complexity of the problem, the techniques that can be used to solve it, the difficulty of it (compared to other problems on Leetcode), and related problems on LeetCode (I use cosine similarity from Tensorflow to compare the user's input with the problems on Leetcode to choose the most similar problems)**

## PROJECT STRUCTURE

### Data

data.csv is the dataset that I use to train my models. I collect these data myself so the quality of it might not be that great.

### Training Models

**Algalysis.ipynb**: This is the code I use to train my models. You can upload it on Google colab (together with data.csv in Data folder) to run it.

**<retracted>\_model.h5**: These are the models I already trained and saved for later use
**<retracted>\_type_mapping.json**: So for string labels (like Dynamic programming), we need to convert them into a number for the models to understand, here I save the type mapping info to make sure that the convert process is always consistent
**Evaluate result.txt**: This is the evaluate result of 3 models

### Node JS Backend

**server.js**: This is where you config environment variables, start cron jobs, connecting to database and start the server <br>
**app.js**: This is where you define all the routes <br>
**models/**: As the name suggest this is the folder to store and the models <br>
**routes/**: This is the folder to store all the routes <br>
**controllers/**: This folder will maintain all the controllers that are responsible for the "last" task and send the response back to clients. For tasks like validation or authorization, we will put it in middlewares <br>
**middlewares/**: Basically for tasks that are not "directly" related to the main task (for example we need to validate that the user trying to view a problem is indeed the creator of that problem), we will put it in middlewares. <br>
**utils/**: To store useful functions that are not directly related to server, for example: handling error <br>

### frontend

**assets/**: These are some images that will be used either for testing or for visualization purpose. <br>
**components/**: Store all the components that will be used in this project <br>
**contexts/**: Store all the contexts and context providers that will used in this project <br>
**hooks/**: Custom hook for repetitive tasks like useSendRequest for sending request, useHandleError for error handling <br>
**pages/**: Basically pages will be the final component that will be served by React. <br>
**utils/**: Repetitive tasks like capitalizing the first letter of a string <br>
