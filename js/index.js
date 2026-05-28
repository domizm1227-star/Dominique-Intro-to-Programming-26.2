const body = document.body;
const footerElement = document.createElement('footer');

body.appendChild(footerElement);

const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector('footer');
const copyrightParagraph = document.createElement('p');
copyrightParagraph.textContent =`${new Date().getFullYear()} Dominique Medrano`;
footerElement.appendChild(copyrightParagraph);

const skills = ['HTML', 'CSS', 'JAVASCRIPT', 'Customer-Service', 'AI-Training', 'Problem-Solving', 'Git & GitHub'];
const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');

for (let i = 0; i < skills.length; i++) {
    const skillsItem = document.createElement('li');
    skillsItem.innerText = skills[i];
    skillsList.appendChild(skillsItem);
}

