const certificateImages = document.querySelectorAll('.certificate-image');
const modal = document.getElementById('certificateModal');
const modalImage = document.getElementById('modalImage');
const closeButton = document.querySelector('.close-button');
let currentIndex = 0;
const imageSources = Array.from(certificateImages).map(img => img.src);

// Логіка модального вікна для зображень
certificateImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImage.src = img.src;
        currentIndex = index;
    });
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === 'flex') {
        modal.style.display = 'none';
    }
});

window.addEventListener("keydown", (event) => {
    if (modal.style.display === 'flex') {
        if (event.key === "ArrowLeft") {
            currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
            modalImage.src = imageSources[currentIndex];
        } else if (event.key === "ArrowRight") {
            currentIndex = (currentIndex + 1) % imageSources.length;
            modalImage.src = imageSources[currentIndex];
        } else if (event.key === "Escape") {
            modal.style.display = 'none';
        }
    }
});


// ====== Функціонал для перемикання мови ======

const translations = {
    uk: {
        pageTitle: 'Анастасія',
        navHome: 'Головна',
        navAbout: 'Про вчителя',
        navProgram: 'Навчальна програма',
        navTest: 'Тест',
        navMaterials: 'Матеріали',
        langUkrainian: 'Українська',
        langEnglish: 'Англійська',
        teacherName: 'Анастасія',
        teacherTitle: 'Викладач англійської',
        experienceYears: '5 років досвіду',
        experienceBritishSchool: 'Досвід роботи у Британській школі',
        generalEnglish: 'Загальна англійська',
        conversationalEnglish: 'Розмовна англійська',
        qualificationsTitle: 'Кваліфікації',
        qual1: 'Leadership seminar',
        qual2: 'Emotional intelligence seminar',
        qual3: 'NCFE (Northern Council for Further Education) certificate level 2',
        qual4: 'NCFE (Northern Council for Further Education) certificate level 3',
        qual5: 'Managing classroom conflict training',
        backToHome: 'На головну сторінку',
        defaultLang: 'Мова',
        optionOne: 'Українська',
        optionTwo: 'Англійська',
        footerHome: "ГОЛОВНА",
        footerAbout: "ПРО ВЧИТЕЛЯ",
        footerProgram: "НАВЧАЛЬНІ ПРОГРАМИ",
        footerTest: "ТЕСТ",
        footerMaterials: "МАТЕРІАЛИ",
        footerFAQ: "ПОШИРЕНІ ЗАПИТАННЯ",
        footerReviews: "ВІДГУКИ",
        footerContact: "ЗВОРОТНІЙ ЗВ'ЯЗОК",
        footerCopyright: " 2025 Анастасія Михайлівна. Всі права захищено.",
        footerPrivacyPolicy: "Політика конфіденційності",
        footerPhone: "Телефон +380 96 988 19 22"
    },
    en: {
        pageTitle: 'Anastasiia',
        navHome: 'Home',
        navAbout: 'About Teacher',
        navProgram: 'Study Program',
        navTest: 'Test',
        navMaterials: 'Materials',
        langUkrainian: 'Ukrainian',
        langEnglish: 'English',
        teacherName: 'Anastasiia',
        teacherTitle: 'English Teacher',
        experienceYears: '5 years of experience',
        experienceBritishSchool: 'Experience working in a British school',
        generalEnglish: 'General English',
        conversationalEnglish: 'Conversational English',
        qualificationsTitle: 'Qualifications',
        qual1: 'Leadership seminar',
        qual2: 'Emotional intelligence seminar',
        qual3: 'NCFE (Northern Council for Further Education) certificate level 2',
        qual4: 'NCFE (Northern Council for Further Education) certificate level 3',
        qual5: 'Managing classroom conflict training',
        backToHome: 'Back to Home Page',
        defaultLang: 'Language',
        optionOne: 'Ukrainian',
        optionTwo: 'English',
        footerHome: "HOME",
        footerAbout: "ABOUT TEACHER",
        footerProgram: "STUDY PROGRAMS",
        footerTest: "TEST",
        footerMaterials: "MATERIALS",
        footerFAQ: "FAQ",
        footerReviews: "REVIEWS",
        footerContact: "FEEDBACK",
        footerCopyright: "2025 Anastasiia Mykhailivna. All rights reserved.",
        footerPrivacyPolicy: "Privacy Policy",
        footerPhone: "Phone +380 96 988 19 22"
    }
};

const langRadioButtons = document.querySelectorAll('input[name="option"]');
const htmlElement = document.querySelector('html');
const selectedLanguageDisplay = document.querySelector('.select .selected');


function updateContent(lang) {
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    if (translations[lang]) {
        selectedLanguageDisplay.setAttribute('data-default', translations[lang]['defaultLang']);
        selectedLanguageDisplay.setAttribute('data-one', translations[lang]['optionOne']);
        selectedLanguageDisplay.setAttribute('data-two', translations[lang]['optionTwo']);
    }

    const backButton = document.querySelector('.certificates a');
    if (backButton && translations[lang] && translations[lang]['backToHome']) {
        backButton.textContent = translations[lang]['backToHome'];
    }
}

function setLanguage(lang) {
    htmlElement.lang = lang;
    localStorage.setItem('lang', lang);
    updateContent(lang);

    if (lang === 'uk') {
        selectedLanguageDisplay.textContent = translations.uk.optionOne;
    } else if (lang === 'en') {
        selectedLanguageDisplay.textContent = translations.en.optionTwo;
    } else {
        selectedLanguageDisplay.textContent = translations[localStorage.getItem('lang')] ? translations[localStorage.getItem('lang')].defaultLang : translations.uk.defaultLang;
    }
    langRadioButtons.forEach(radio => {
        radio.checked = (radio.value === lang);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'uk';
    setLanguage(savedLang);
});
langRadioButtons.forEach(radio => {
    radio.addEventListener('change', (event) => {
        setLanguage(event.target.value);
    });
});

const selectBox = document.querySelector('.select');
const optionsBox = document.querySelector('.options');
const selectedOption = document.querySelector('.select .selected');

selectBox.addEventListener('click', () => {
    optionsBox.classList.toggle('active');
    selectBox.classList.toggle('active');
});

optionsBox.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        setLanguage(e.target.value);
        optionsBox.classList.remove('active');
        selectBox.classList.remove('active');
    });
});
//ТЕМНА ТЕМА
document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.querySelector('.toggle-switch .checkbox');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-theme') {
            checkbox.checked = true;
        }
    }

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });
});

// Додаємо логіку бургер-меню
const burgerMenuButton = document.querySelector('.burger_menu');
const navUl = document.querySelector('.ul_header');

burgerMenuButton.addEventListener('click', () => {
    navUl.classList.toggle('active');
});

// Закриття бургер-меню при натисканні на пункт меню (опціонально)
navUl.querySelectorAll('.a_nav').forEach(link => {
    link.addEventListener('click', () => {
        if (navUl.classList.contains('active')) {
            navUl.classList.remove('active');
        }
    });
});

// Закриття бургер-меню при кліку за його межами
document.addEventListener('click', (event) => {
    if (!navUl.contains(event.target) && !burgerMenuButton.contains(event.target) && navUl.classList.contains('active')) {
        navUl.classList.remove('active');
    }
});