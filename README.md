# JobRangers

JobRangers is a powerful tool for those looking to create impressive resumes and find relevant job opportunities. Our vision is to empower users to present their skills and experiences in the best possible light and connect them with the perfect match for their personalities. Our ultimate goal is to help job seekers land their dream job by providing them with the tools and resources they need to succeed. Whether users are just starting their careers or looking for a new opportunity, JobRangers is the app that will give them a competitive edge in the current job market.

## Contributors

- Sam Adams
- Max Eaton
- Gerardo Ferrigno
- Grant Hargrave
- Prajwal Nepal
- Sang Shim

## Built with

- Docker - containerization platform
- PostgreSQL - relational database management system
- Node.js - JavaScript runtime environment
- EJS - templating language for HTML
- CSS - styling language for web pages

## Pages

- Home: This page redirects to other pages and has an "About Us" section.
- Discover: This page lists jobs based on user skills.
- Info: This page has fields to input user data and generates a PDF of a resume.

## Installation and Deployment

To install JobRangers, run the following command:

```
git clone https://github.com/CSCI-3308-Team-03/JobRangers.git
```

To deploy locally, make sure you have Docker installed and run the following command:

```
docker-compose up
```

To reset the database, run:

```
docker-compose down --volumes
```

After deployment, JobRangers can be accessed at `http://localhost:3000`.
	
## Azure Deployment
The app is also deployed on Azure at `http://recitation-12-team-03.eastus.cloudapp.azure.com`.

## Communication Plan
Our team plans to utilize Discord to discuss meeting times, coordinate person-to-person workload, and complete future project milestones.

## Meeting Pla
The TA meeting will be held every Monday at 3:45 PM. The scrum meeting will occur on Zoom from 4:00 PM to 5:00 PM on Monday as well. This will allow the members on the team to receive inputs directly from the TAs and move into development without any delay. 
	
## API Information
Using a REST API from an official website of the United States Government which stores potential national job listings. We will be using the api/search/ endpoint which returns an array of objects containing jobs along with their respective attributes and descriptions.

 - Website <https://developer.usajobs.gov/>
 - API KEY <QYaokDz2ueAHu3iPkUCh8Zn7wBR11Hl0l7ruwzfGJ8U=>
 - Email <granthargrav@gmail.com>

