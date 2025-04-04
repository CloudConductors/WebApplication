# Cloud Conductors

## Scrum Master

- Jakob Olsen

## Product Owner

- NSA

## Developers

- Nick Petruccelli
- Christopher Cuartas
- Troy Brown
- Devin Thompson
- Bryonna Gray
- Jakob Olsen

## Application setup 

### Flask

1. Open a terminal VS Code. (**Use Git Bash**)
2. Check if python installed
   ```
   python --version
   ```
   - if error visit https://pythongeeks.org/python-3-installation-and-setup-guide/
3. Navigate to Flask Folder
   ```
   cd flask-backend
   ```
4. Create the virtual environment:
   ```
   python -m venv venv
   ```
5. Activate the virtual environment:
   ```
   source venv/Scripts/activate
   ```
   - You should now see (venv) above your current line in the terminal
6. Install all required dependencies:
   ```
   pip install -r requirements.txt
   ```
7. Configure AWS
   1. In the same terimal type:
         ```
            aws configure
         ```
      - For Windows (if `aws` doesn't work):
         ```
         aws.cmd configure
         ```
      - Alternatively, use:
         ```
         python -m awscli configure
         ```
   2. For Access key Id type in:
      ```
      AWS_ACCESS_KEY
      ```
      and press enter
      
   3. For Secret Access Key type in:
      ```
      AWS_SECRET_KEY
      ```
      and press enter

   4. For Region Name type in:
      ```
      us-east-1
      ```
      and press enter

   5. For Output format press enter again

6. Run Flask in debug mode:
   ```
   flask --debug run
   ```
7. Navigate to link to access site (should also be in console)
   -  http://127.0.0.1:5000/

### React

1. Open another terminal in VS Code. (**Use Git Bash**)
2. Check if npm is installed
   ```
   npm --version
   ```
   - if error visit https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
3. Navigate to the React folder
   ```
   cd react-frontend
   ```
4. Install dependencies
   ```
   npm install
   ```
5. Run app
   ```
   npm start
   ```