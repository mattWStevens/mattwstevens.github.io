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

function handleSubmit(formValue) {
    // Get form values.
    const form = document.forms.ContactForm;
    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const email = formData.get('email');
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();

    let idList = [];
    if (!name) { idList.push('name'); }
    if (!subject) { idList.push('subject'); }
    if (!message) { idList.push('message'); }
    if (!email) { idList.push('email'); }
    else if (email) {
        const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        if (!regex.test(email)) {
            idList.push('email');
        }
    }

    // If formValue is supplied, it means we are only looking at the current
    // form input on change.  
    if (formValue) {
        idList = idList.includes(formValue) ? idList.filter(val => val === formValue) : [];

        // Remove error styling if user fixed mistake.
        if (!idList.length) {
            applyErrorStyles([formValue], false);
        }
    }

    if (!idList.length && !formValue) {
        sendEmail(name, subject, email, message);
        return;
    }

    applyErrorStyles(idList, true);
}

function applyErrorStyles(idList, error) {
    for (const id of idList) {
        const el = document.getElementById(id);
        if (el) {
            if (error) { el.classList.add('error-state'); }
            else { el.classList.remove('error-state'); }

            const container = el.parentElement;
            if (container) {
                container.firstElementChild.style.color = error ? 'white' : '';
            }
        }
    }
}

function sendEmail(name, subject, email, message) {
    const form = document.forms.ContactForm;

    var templateParams = {
        subject: subject,
        from_name: name,
        message: `You can contact ${name} via ${email}, here is their message:\n\n${message}`
    };

    emailjs.send('service_0qd9lv2', 'template_9xg78ks', templateParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            form.reset();
            const popup = document.getElementById('notification-popup');
            const text = document.getElementById('notification-text-message');
            popup.style.opacity = 1;
            popup.style.backgroundColor = 'green';
            text.innerText = 'Your message has been sent successfully!';
            setTimeout(() => {
                popup.style.opacity = 0;
            }, 3000);
        }, function (error) {
            console.log('FAILED...', error);
            popup.style.opacity = 1;
            popup.style.backgroundColor = 'red';
            text.innerText = 'Sorry, your message was not able to be sent. Please try again later.';
            setTimeout(() => {
                popup.style.opacity = 0;
            }, 3000);
        });
}