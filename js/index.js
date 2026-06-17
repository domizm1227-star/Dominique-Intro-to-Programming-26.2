const body = document.body;
const footerElement = document.createElement('footer');

body.appendChild(footerElement);

//Current date and year
const today = new Date();
const thisYear = today.getFullYear();

//Paragraph for copyright info
const copyrightParagraph = document.createElement('p');
copyrightParagraph.textContent = `© Dominique Medrano ${thisYear}`;
footerElement.appendChild(copyrightParagraph);

//Array of skills
const skills = ['HTML', 'CSS', 'JAVASCRIPT', 'Customer-Service', 'AI-Training', 'Problem-Solving', 'Git & GitHub'];
const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');

//Loop through skills and creating list items
for (let i = 0; i < skills.length; i++) {
    const skillsItem = document.createElement('li');
    skillsItem.innerText = skills[i];
    skillsList.appendChild(skillsItem);
}

//Message form
const messageForm = document.querySelector('form[name="leave_message"]');
messageForm.addEventListener('submit', function(event) {
    event.preventDefault();

    //capturing form values
    const name = event.target.usersName.value;
    const email = event.target.usersEmail.value;
    const message = event.target.usersMessage.value;

console.log("Name:", name);
console.log("Email:", email);
console.log("Message:", message);

const messageSection = document.querySelector('#messages');
const messageList = messageSection.querySelector('ul');

const newMessage = document.createElement('li');

//Creating a new message item
const newMessage = document.createElement('li');

//Create link to mailto and message text
newMessage.innerHTML = `<a href="mailto:${email}">${name}</a><span> - ${message}</span>`;
messageList.appendChild(newMessage);

//Creating Remove button
const removeButton = document.createElement('button');
removeButton.innerText = 'remove';
removeButton.type = 'button';

//Adding click event to remove
removeButton.addEventListener('click', function() {
    const entry = removeButton.parentNode;
    entry.remove();

});

//Appending button and message to the list
newMessage.appendChild(removeButton);

messageForm.reset();
});

//Fetching data GitHub API

fetch("https://api.github.com/users/domizm1227-star/repos")
.then(response => response.json())
.then(data => {
    const repositories = data;

    console.log("Your GitHub Repositories:", repositories);

    const projectSection = document.getElementById("projects");
    const projectList = projectSection.querySelector("ul");

    projectList.innerHTML = '';

    for(let i = 0; i < repositories.length; i++) {
        const project = document.createElement("li");
        //Repository names are clickable links
        const projectLink=document.createElement("a");
        projectLink.href = repsitries[i].html_url;
        projectLink.target = "_blank";
        project.innerText = repositories[i].name;
        projectLink.style.color = "inherit";

        project.appendChild(projectLink);
        projectList.appendChild(project);
    }
    })
    .catch(error => {
        console.error("Error fetching repos:", error);

        const projectSection = document.getElementById("projects");
        const projectList = projectSection.querySelector("ul");

        const errorItem = document.createElement("li");
        errorItem.innerText = "Unable to load repositories. Please try again later.";
        projectList.appendChild(errorItem); 
    });