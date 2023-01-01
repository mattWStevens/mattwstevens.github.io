let currExperienceItem = 1;

function navigateExperience(direction) {
    const navValue = direction === 'back' ? -1 : 1;
    currExperienceItem += navValue;
    if (currExperienceItem === 0) { currExperienceItem = 3; }
    if (currExperienceItem === 4) { currExperienceItem = 1; }
    
    const navNumber = document.getElementById('experienceNavNumber');
    navNumber.textContent = `${currExperienceItem}/3`;
    const experienceItems = document.getElementsByClassName('experience__item');

    for (let i = 0; i < experienceItems.length; i++) {
        if (i + 1 !== currExperienceItem) {
            experienceItems[i].style.visibility = 'hidden';
        } else {
            experienceItems[i].style.visibility = 'visible';
        }
    }
}