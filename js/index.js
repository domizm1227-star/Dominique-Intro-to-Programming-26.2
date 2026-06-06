const body = document.body;
const footerElement = document.createElement('footer');

body.appendChild(footerElement);

const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector('footer');
const copyrightParagraph = document.createElement('p');
copyrightParagraph.textContent =`Dominique Medrano ${new Date().getFullYear()}`;
footerElement.appendChild(copyrightParagraph);

const skills = ['HTML', 'CSS', 'JAVASCRIPT', 'Customer-Service', 'AI-Training', 'Problem-Solving', 'Git & GitHub'];
const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');

for (let i = 0; i < skills.length; i++) {
    const skillsItem = document.createElement('li');
    skillsItem.innerText = skills[i];
    skillsList.appendChild(skillsItem);
}

const messageForm = document.querySelector('form[name="leave_message"]');
messageForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = event.target.usersName.value;
    const email = event.target.usersEmail.value;
    const message = event.target.usersMessage.value;

console.log("Name:", name);
console.log("Email:", email);
console.log("Message:", message);

const messageSection = document.querySelector('#messages');
const messageList = messageSection.querySelector('ul');

const newMessage = document.createElement('li');

newMessage.innerHTML = `<a href="mailto:${email}">${name}</a><span> - ${message}</span>`;
messageList.appendChild(newMessage);

const removeButton = document.createElement('button');
removeButton.innerText = 'remove';
removeButton.type = 'button';

removeButton.addEventListener('click', function() {
    const entry = removeButton.parentNode;
    entry.remove();

});

newMessage.appendChild(removeButton);

messageForm.reset();
});

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
        project.innerText = repositories[i].name;
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