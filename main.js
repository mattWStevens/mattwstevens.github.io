let currExperienceItem = 1;

function navigateExperience(direction) {
    // Update experience item.
    const navValue = direction === 'back' ? -1 : 1;
    currExperienceItem += navValue;

    if (currExperienceItem === 0) { currExperienceItem = 3; }
    if (currExperienceItem === 4) { currExperienceItem = 1; }

    const experienceContainerCurrent = document.getElementsByClassName(`experience__item--${currExperienceItem}`)[0];
    const githubLink = document.getElementsByClassName('link-button')[0];
    const navNumber = document.getElementById('experienceNavNumber');

    // Apply animations.
    experienceContainerCurrent.style.animation = 'change 2s linear';
    experienceContainerCurrent.firstElementChild.style.animation = 'fadeIn 2s';
    if (githubLink) { githubLink.style.animation = 'fadeInLink 2s'; }

    // Keep updating of experience item number display in sync with ripple animation.
    setTimeout(() => {
        navNumber.textContent = `${currExperienceItem}/3`;
    }, 200);

    // Update display.
    const experienceItems = document.getElementsByClassName('experience__item');

    for (let i = 0; i < experienceItems.length; i++) {
        if (i + 1 !== currExperienceItem) {
            experienceItems[i].style.display = 'none';
        } else {
            experienceItems[i].style.display = 'block';
        }
    }
}