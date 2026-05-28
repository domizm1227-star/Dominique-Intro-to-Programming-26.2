const body = document.body;
const footerElement = document.createElement('footer');

body.appendChild(footerElement);

const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector('footer');
const copyright = document.createElement('p');
const myName = "Dominique";
copyright.innerHTML = `&copy; ${myName} ${thisYear}`;
footer.appendChild(copyright);

const skills = ['HTML', 'CSS', 'JAVASCRIPT', 'Customer-Service', 'AI-Training', 'Problem-Solving', 'Git & GitHub'];
const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');

for (let i = 0; i < skills.length; i++) {
    const skillsItem = document.createElement('li');
    skillsItem.innerText = skills[i];
    skillsList.appendChild(skillsItem);
}

