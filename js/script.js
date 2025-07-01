const reviewsSwiper = new Swiper('.swiper', {
    loop: false, 
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
});

const leaveReviewBtn = document.getElementById('leave-review-btn');
const reviewModal = document.getElementById('review-modal');
const closeButton = document.querySelector('.modal .close-button');
const submitReviewForm = document.getElementById('submit-review-form');
const reviewerNameInput = document.getElementById('reviewer-name');
const reviewTextInput = document.getElementById('review-text');
const reviewsContainer = document.querySelector('#reviews-container');
if (leaveReviewBtn) {
    leaveReviewBtn.addEventListener('click', function() {
        reviewModal.style.display = 'flex';
    });
}
if (closeButton) {
    closeButton.addEventListener('click', function() {
        reviewModal.style.display = 'none';
    });
}
window.addEventListener('click', function(event) {
    if (event.target === reviewModal) {
        reviewModal.style.display = 'none';
    }
});
function createReviewSlide(author, text, id) {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    swiperSlide.setAttribute('data-review-id', id);
    const authorParagraph = document.createElement('p');
    authorParagraph.classList.add('review-author');
    authorParagraph.textContent = author;
    const textParagraph = document.createElement('p');
    textParagraph.classList.add('p_swiper');
    textParagraph.textContent = text;
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-review-btn');
    deleteButton.textContent = 'Видалити відгук';
    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation(); 
        deleteReview(id);
    });

    swiperSlide.appendChild(authorParagraph);
    swiperSlide.appendChild(textParagraph);
    swiperSlide.appendChild(deleteButton);

    return swiperSlide;
}

function renderReviews() {
    const existingDynamicReviews = reviewsContainer.querySelectorAll('.swiper-slide[data-review-id]');
    existingDynamicReviews.forEach(review => review.remove());

    const storedReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
    storedReviews.forEach(reviewData => {
        const newSlide = createReviewSlide(reviewData.author, reviewData.text, reviewData.id);
        reviewsSwiper.addSlide(reviewsSwiper.slides.length, newSlide); 
    });
    reviewsSwiper.update(); 
}
submitReviewForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const author = reviewerNameInput.value.trim();
    const text = reviewTextInput.value.trim();

    if (author && text) {
        const reviewId = Date.now().toString(); // Simple unique ID
        const newReview = { id: reviewId, author: author, text: text };

        const storedReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
        storedReviews.push(newReview);
        localStorage.setItem('userReviews', JSON.stringify(storedReviews));

        const newSlide = createReviewSlide(author, text, reviewId);
        reviewsSwiper.addSlide(reviewsSwiper.slides.length, newSlide); 
        reviewsSwiper.update(); 
        reviewsSwiper.slideTo(reviewsSwiper.slides.length - 1); 
        reviewerNameInput.value = '';
        reviewTextInput.value = '';
        reviewModal.style.display = 'none';
    } else {
        alert('Будь ласка, заповніть усі поля відгуку.');
    }
});
function deleteReview(idToDelete) {
    let storedReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
    const updatedReviews = storedReviews.filter(review => review.id !== idToDelete);
    localStorage.setItem('userReviews', JSON.stringify(updatedReviews));
    const slideToRemove = reviewsContainer.querySelector(`.swiper-slide[data-review-id="${idToDelete}"]`);
    if (slideToRemove) {
        const slideIndex = Array.from(reviewsSwiper.slides).indexOf(slideToRemove);
        if (slideIndex > -1) {
            reviewsSwiper.removeSlide(slideIndex);
            reviewsSwiper.update(); 
        }
    }
}
document.addEventListener('DOMContentLoaded', renderReviews);
document.addEventListener('DOMContentLoaded', function() {
    // Випадаючі питання (FAQ)
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    });
});

// Зміна теми

document.addEventListener('DOMContentLoaded', function() {
    const toggleCheckbox = document.querySelector('.checkbox');
    toggleCheckbox.addEventListener('change', function() {
        toggleCheckbox.classList.toggle('active')
        if (!toggleCheckbox.classList.contains('active')) {
            document.body.style.backgroundColor = '#f5f0e1';
            document.body.style.color = '#6E5773';
            document.querySelector('.header').style.backgroundColor = '#e7d8c9';
            document.querySelector('.nav_header').style.backgroundColor = '#e7d8c9';
            document.querySelector('.button_hero.secondary').style.backgroundColor = '#D4B48C';
            document.querySelector('.button_hero.tertiary').style.backgroundColor = '#BFA082';
            document.querySelectorAll('.a_nav').forEach(el => {el.style.color = '#6e5773'});
            document.querySelectorAll('.line_header').forEach(el => {el.style.background = '#6e5773'});
            document.querySelector('.logo_header').style.backgroundColor = 'transparent'; 
            document.querySelector('.logo_header').style.borderRadius = '50%'; 
            document.querySelector('.logo_header').style.marginRight = '20px'; 
            document.querySelectorAll('section h2').forEach(el => {el.style.color = '#a98467'});
            document.querySelectorAll('.course-item h3').forEach(el => {el.style.color = '#a98467'});
            document.querySelectorAll('.materials-title').forEach(el => {el.style.color = '#a98467'});
            document.querySelector('.section_about').style.background = '#E1DACA';
            document.querySelector('.certificates').style.backgroundColor = '#eaddca'; 
            document.querySelector('.certificates').style.color = '#daa06d'; 
            document.querySelector('.certificates').style.border = '2px dashed #daa06d'; 
            document.querySelector('.certificates').style.boxShadow = '0 0 0 4px #eaddca, 2px 2px 4px 2px rgba(0, 0, 0, 0.5)'; 
            document.querySelectorAll('.course-item').forEach(el => {el.style.backgroundColor = '#ffffff'});
            document.querySelectorAll('.materials-category').forEach(el => {el.style.backgroundColor = '#ffffff'});
            document.querySelector('h1').style.color = '#6e5773';
            document.querySelector('.subtitle_header').style.color = '#6e5773';
            document.querySelectorAll('.faq-question').forEach(el => {el.style.color = '#6e5773'});
            document.querySelectorAll('.faq-answer').forEach(el => {el.style.color = '#5c4d42'});
            document.querySelectorAll('.swiper-slide').forEach(el => {el.style.backgroundColor = '#f9f9f9'});
            document.querySelector('#review-form').style.backgroundColor = '#ffffff';
            document.querySelector('.footer').style.background = '#E7D8C9';
            document.querySelectorAll('.footer-anchor').forEach(el => {el.style.color = '#6e5773'});
            document.querySelectorAll('.footer-contact-item').forEach(el => {el.style.color = '#6e5773'});
            document.querySelector('.footer-logo-img').style.backgroundColor = 'transparent'; 
            document.querySelector('.footer-logo-img').style.borderRadius = '50%'; 
            document.querySelector('.footer-logo-img').style.marginRight = '40px'; 
        } else {
            document.body.style.backgroundColor = '#3E5C76';
            document.body.style.color = '#ffffff';
            document.querySelector('.header').style.backgroundColor = '#0d1321';
            document.querySelector('.nav_header').style.backgroundColor = '#0d1321';
            document.querySelector('.button_hero.secondary').style.backgroundColor = '#1D2D44';
            document.querySelector('.button_hero.tertiary').style.backgroundColor = '#0d1321';
            document.querySelectorAll('.a_nav').forEach(el => {el.style.color = '#ffffff'});
            document.querySelectorAll('.line_header').forEach(el => {el.style.background = '#ffffff'});
            document.querySelector('.logo_header').style.backgroundColor = '#ffffff'; 
            document.querySelector('.logo_header').style.borderRadius = '50%'; 
            document.querySelector('.logo_header').style.marginRight = '20px'; 
            document.querySelectorAll('section h2').forEach(el => {el.style.color = '#ffffff'});
            document.querySelectorAll('.course-item h3').forEach(el => {el.style.color = '#ffffff'});
            document.querySelectorAll('.materials-title').forEach(el => {el.style.color = '#ffffff'});
            document.querySelector('.section_about').style.backgroundColor = '#1D2D44';
            document.querySelector('.certificates').style.backgroundColor = '#3E5C76'; 
            document.querySelector('.certificates').style.color = '#ffffff'; 
            document.querySelector('.certificates').style.border = 'none'; 
            document.querySelector('.certificates').style.boxShadow = 'none'; 
            document.querySelectorAll('.course-item').forEach(el => {el.style.backgroundColor = '#1D2D44'});
            document.querySelectorAll('.materials-category').forEach(el => {el.style.backgroundColor = '#1D2D44'});
            document.querySelector('h1').style.color = '#ffffff';
            document.querySelector('.subtitle_header').style.color = '#ffffff';
            document.querySelectorAll('.faq-question').forEach(el => {el.style.color = '#ffffff'});
            document.querySelectorAll('.faq-answer').forEach(el => {el.style.color = '#ffffff'});
            document.querySelectorAll('.swiper-slide').forEach(el => {el.style.backgroundColor = '#1D2D44'});
            document.querySelector('#review-form').style.backgroundColor = '#1D2D44';
            document.querySelector('.footer').style.background = '#0d1321';
            document.querySelectorAll('.footer-anchor').forEach(el => {el.style.color = '#ffffff'});
            document.querySelectorAll('.footer-contact-item').forEach(el => {el.style.color = '#ffffff'});
            document.querySelector('.footer-logo-img').style.backgroundColor = '#ffffff'; 
            document.querySelector('.footer-logo-img').style.borderRadius = '50%'; 
            document.querySelector('.footer-logo-img').style.marginRight = '40px'; 
        }
    });
});


// BURGER MENU
document.addEventListener('DOMContentLoaded', function() {
    let iconMenu = document.querySelector(".img_burgermenu");
    let list = document.querySelector(".ul_header");
    let nav = document.querySelector(".nav_header");
    let header = document.querySelector(".header");
    let btn = document.querySelector(".burger_menu");
    btn.addEventListener('click', addMenu);
    header.style.alignItems = "start";
    function addMenu(){
        if(list.classList.contains('active')){
            list.classList.remove('active');
            iconMenu.src = "images/burgermenu.png"; 
            nav.style.width = "100%"; 
            btn.classList.remove("rotate");
        } else {
            list.classList.add("active");
            iconMenu.src = "images/close.png";
            nav.style.width = "100%"; 
            btn.classList.add("rotate");
        }
    }
})
let openModal = document.querySelector("#openModal");
let overlay = document.querySelector("#modal-overlay"); 
let btnClose = document.querySelector("#close-modal-btn"); 
let modalOverlay = document.querySelector("#modal-overlay");
let lessonForm = document.querySelector("#lesson-signup-form"); 

// ОПЕНЕР МОДАЛЬНОГО ВІКНА ПРИ НАТИСКАНІ КНОПКИ
openModal.addEventListener('click', () => {
    overlay.style.display = "flex"; 
});
// ФУНКЦІЯ ЗАКРИВАННЯ ФОРМИ
function closeModal() {
    overlay.style.display = "none";
}
// ЗАКРИВАТИ МОДАЛЬНЕ ВІКНО ПРИ НАТИСКАННІ НА КНОПКУ "ЗАКРИТИ" (хрестик)
btnClose.addEventListener('click', closeModal);
// ЗАКРИВАТИ МОДАЛЬНЕ ВІКНО ПРИ НАТИСКАННІ НА БЛОК ПОЗА ФОРМИ
modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});
// ЗАКРИВАТИ МОДАЛЬНЕ ВІКНО ПРИ НАТИСКАНІ НА ESCAPE
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});
// РЕАЛІЗАЦІЯ ОБРОБКИ ФОРМИ
lessonForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = {
        name: event.target.elements.name.value,
        phone: event.target.elements.phone.value,
        email: event.target.elements.email.value,
        topic: event.target.elements.topic.value, 
        agreement: event.target.elements.agreement.checked,
    };
    if (!formData.agreement) {
        alert("Ви повинні погодитися з умовами.");
        return;
    }
    try {
        const response = await fetch("https://telegram-bot-305n.onrender.com/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                message: formData.topic 
            })
        });
        if (!response.ok) {
            throw new Error("Помилка при надсиланні форми");
        }
        alert("Дані успішно надіслані!");
        closeModal();
        lessonForm.reset();
    } catch (error) {
        console.error("Помилка:", error); 
        alert("Сталася помилка при надсиланні форми. Спробуйте ще раз.");
    }
});
//ЗМІНА МОВИ
const translations = {
    uk: {
        pageTitle: "KANYANAS English Teacher",
        navHome: "Головна",
        navAbout: "Про вчителя",
        navProgram: "Навчальна програма",
        navTest: "Тест",
        navMaterials: "Матеріали",
        heroSubtitle: "Онлайн курс, що підходить саме тобі – від основ до впевненого володіння. Вчися у зручному темпі та досягай результатів із задоволенням!",
        testButton: "Тест з англійської",
        signupButton: "Записатися на урок",
        aboutTitle: "Про вчителя",
        aboutText1: "Маю 5 років досвіду викладання англійської мови <br> для студентів різного рівня.",
        aboutText2: "Я використовую комунікативний підхід у навчанні, що допомагає студентам швидко та ефективно опановувати розмовну англійську. Мої заняття інтерактивні, цікаві та адаптовані до індивідуальних потреб кожного учня.",
        certificatesButton: "Мої сертифікати",
        programTitle: "Навчальна програма",
        generalEnglishTitle: "Загальна англійська",
        generalEnglishAudience: "Цільова аудиторія: всі, хто бажає покращити свої знання англійської мови.",
        generalEnglishFeatures: "Особливості: індивідуальний підхід до кожного учня, адаптація матеріалів відповідно до ваших потреб та ритму навчання.",
        generalEnglishTopics: "Основні теми: leisure time, technology world, education, shopping, entertainment, travelling, sports, the natural world, food, following dreams та інші цікаві напрямки.",
        conversationalEnglishTitle: "Розмовна англійська",
        conversationalEnglishAudience: "Цільова аудиторія: всі, хто хоче впевнено спілкуватися англійською.",
        conversationalEnglishFeatures: "Особливості: заняття побудовані з урахуванням ваших інтересів і потреб, що допомагає швидко покращити навички говоріння.",
        conversationalEnglishTopics: "Основні теми: leisure time, technology world, education, shopping, entertainment, travelling, sports, the natural world, food, following dreams та інші актуальні теми.",
        materialsSectionTitle: "Матеріали",
        assignmentsTitle: "Завдання для самостійного виконання",
        assignmentsDescription: "Практичні вправи для закріплення вивченого матеріалу.",
        videoLessonsTitle: "Відеоуроки",
        videoLessonsDescription: "Корисні відеоматеріали для кращого розуміння тем.",
        recommendedResourcesTitle: "Рекомендовані книги та сайти",
        recommendedResourcesDescription: "Добірка корисних ресурсів для вивчення англійської.",
        faqSectionTitle: "Поширені запитання",
        faqQuestion1: "Як проходять заняття?",
        faqAnswer1: "Заняття проводяться онлайн через зручну для вас платформу (наприклад, Zoom, Google Meet). Вони включають теоретичну частину, практичні вправи та інтерактивні завдання.",
        faqQuestion2: "Чи потрібні додаткові матеріали?",
        faqAnswer2: "Основні навчальні матеріали надаються. За бажанням ви можете використовувати додаткові ресурси за рекомендацією викладача.",
        faqQuestion3: "Як записатися на урок?",
        faqAnswer3: "Щоб записатися на урок, будь ласка, заповніть форму зворотного зв'язку внизу сторінки або зв'яжіться зі мною напряму за вказаними контактними даними.",
        faqQuestion4: "Чи є знижки для групових занять?",
        faqAnswer4: "Наразі групові заняття не проводяться. Проте слідкуйте за оновленнями на сайті, можливі зміни в майбутньому.",
        reviewsSectionTitle: "Відгуки",
        leaveReviewButton: "Залишити відгук",
        leaveYourReviewTitle: "Залиште свій відгук",
        yourNamePlaceholder: "Ваше ім'я",
        yourReviewPlaceholder: "Ваш відгук",
        submitReviewButton: "Надіслати відгук",
        footerHome: "ГОЛОВНА",
        footerAbout: "ПРО ВЧИТЕЛЯ",
        footerProgram: "НАВЧАЛЬНІ ПРОГРАМИ",
        footerTest: "ТЕСТ",
        footerMaterials: "МАТЕРІАЛИ",
        footerFAQ: "ПОШИРЕНІ ЗАПИТАННЯ",
        footerReviews: "ВІДГУКИ",
        footerContact: "ЗВОРОТНІЙ ЗВ'ЯЗОК",
        footerCopyright: "2025 Анастасія Михайлівна. Всі права захищено.",
        footerPrivacyPolicy: "Політика конфіденційності",
        modalSignupTitle: "Записатися на урок",
        modalNameLabel: "Ім'я:",
        modalEmailLabel: "Email:",
        modalPhoneLabel: "Номер телефону:",
        modalTopicLabel: "Бажана тема уроку:",
        modalAgreementLabel: "Я погоджуюся з умовами обробки даних",
        modalSubmitButton: "Надіслати заявку",
        footerPhone: "Телефон +380 96 988 19 22",
        modalSignupTitleTest: "Тест на визначення рівня англійської",
        modalBodyTest: "Тест на визначення рівня - <a href= 'https://forms.gle/rJABVQwif1XZeXDP8'>https://forms.gle/rJABVQwif1XZeXDP8</a>  , переходьте за посиланням та дізнавайтесь свій рівень англійської. Успіхів.",
        buttonTest: "Пройти тест",
        review1: "Ви найкращий репетитор, з яким мені коли-небудь доводилося займатися! Заняття проходять цікаво, легко і надихають вчитися ще більше. Вона вміє підтримати, пояснити складне простими словами і щиро радіє моїм успіхам. Завдяки їй я почала любити англійську! Щиро рекомендую!",
        review2: "Доброго дня. Як репетитор Ви мені дуже подобаєтесь, в мене з мовами дуже туго, але після наших занять я почала розуміти англійську і запам'ятовувати. Іноді мені здається, що правил з англійської я знаю більше, ніж з української. Якщо мені щось не зрозуміло, то Bи і 5 разів будете пояснювати. А ще Ви завжди мене хвалите і мені дуже приємно. Жалкую тільки про те, що не знайшла вас раніше",
        review3: "Анастасія - дуже гарний репетитор з англійської мови, вона максимально доступно пояснює навіть найскладніший матеріал, розкладаючи його на частинки та подаючи матеріал так, що навіть дорослим стає цікаво. Вміє утримати увагу учнів. Заняття проходять ефективно та мають результат. Безмежно вдячні Анастасії за терпіння та допомогу Щиро бажаємо нових звершень і Перемог",
        review4: "Мені дуже подобаються ваші уроки з Вікторією, індивідуальний підхід, це головне що дитина повністю вас сприймає, не боїться, готується до занять залюбки. А ще люблю коли є контрольні заняття, і бачу великий результат і дуже вами задоволена",
        review6: "Хочу щиро подякувати чудовій репетиторці з англійської мови Анастасії, яка займається з моїм сином Артемом! Ми дуже раді, що знайшли саме її -справжнього професіонала своєї справи. Вона не просто навчає, а вміє зацікавити, мотивувати та підтримати. Артем із задоволенням чекає кожного заняття, і його рівень знань значно покращився за короткий час. Особливо тішить, що з'явилася впевненість у спілкуванні англійською! Завдяки її терплячості, доброзичливості та індивідуальному підходу, син не лише краще вивчає мову, а й полюбив сам процес навчання. Видно, що вона вкладає душу в кожен урок. Щиро рекомендую всім батькам, які шукають для своєї дитини не просто вчителя, а справжнього наставника",
        review7: "Анастасія дуже гарний репетитор з англійської мови, вона максимально доступно пояснює навіть найскладніший матеріал, розкладаючи його на частинки та подаючи матеріал так, що навіть дорослим стає цікаво. Заняття проходять ефективно та мають результат. Тому, з впевненістю, рекомендую",
        review8: "Мені дуже подобається вчитися англійської мови з Анастасією Михалівною! Вона завжди пояснює все так, що я швидко розумію нові слова і правила. Ми багато читаємо, граємо в цікаві ігри, дивимось відео і вчимося говорити англійською. Завдяки нашим заняттям я почала краще розуміти завдання у школі, а ще мені стало легше писати тести. Анастасія Михайлівна завжди добра, підтримує мене і хвалить, коли я стараюсь. Я тепер більше люблю англійську",
        openBooks: "Відкрити підручники",
        AccessBooks: 'Доступ до підручників',
        codeBooks: 'Введіть код доступу',
        ConfirmBooks: 'Підтвердити',
        booksMessageF: 'Код правильний! Доступ надано.',
        booksMessageIncorrect: 'Неправильний код. Спробуйте ще раз.',
        AvailableBooks: 'Доступні підручники'


      },
    en: {
        pageTitle: "KANYANAS English Teacher",
        navHome: "Home",
        navAbout: "About Teacher",
        navProgram: "Study Program",
        navTest: "Test",
        navMaterials: "Materials",
        heroSubtitle: "An online course that suits you – from basics to confident proficiency. Learn at your own pace and achieve results with pleasure!",
        testButton: "English Test",
        signupButton: "Sign Up for a Lesson",
        aboutTitle: "About the Teacher",
        aboutText1: "I have 5 years of experience teaching English <br> to students of various levels.",
        aboutText2: "I use a communicative approach to teaching, which helps students quickly and effectively master spoken English. My classes are interactive, interesting, and adapted to the individual needs of each student.",
        certificatesButton: "My Certificates",
        programTitle: "Study Program",
        generalEnglishTitle: "General English",
        generalEnglishAudience: "Target Audience: everyone who wants to improve their English language skills.",
        generalEnglishFeatures: "Features: individual approach to each student, adaptation of materials according to your needs and learning pace.",
        generalEnglishTopics: "Main Topics: leisure time, technology world, education, shopping, entertainment, travelling, sports, the natural world, food, following dreams, and other interesting areas.",
        conversationalEnglishTitle: "Conversational English",
        conversationalEnglishAudience: "Target Audience: everyone who wants to communicate confidently in English.",
        conversationalEnglishFeatures: "Features: lessons are built taking into account your interests and needs, which helps to quickly improve speaking skills.",
        conversationalEnglishTopics: "Main Topics: leisure time, technology world, education, shopping, entertainment, travelling, sports, the natural world, food, following dreams, and other relevant topics.",
        materialsSectionTitle: "Materials",
        assignmentsTitle: "Self-study Assignments",
        assignmentsDescription: "Practical exercises to consolidate learned material.",
        videoLessonsTitle: "Video Lessons",
        videoLessonsDescription: "Useful video materials for a better understanding of topics.",
        recommendedResourcesTitle: "Recommended Books and Websites",
        recommendedResourcesDescription: "A selection of useful resources for learning English.",
        faqSectionTitle: "Frequently Asked Questions",
        faqQuestion1: "How are the classes conducted?",
        faqAnswer1: "Classes are held online via a platform convenient for you (e.g., Zoom, Google Meet). They include a theoretical part, practical exercises, and interactive tasks.",
        faqQuestion2: "Are additional materials needed?",
        faqAnswer2: "Main educational materials are provided. Optionally, you can use additional resources recommended by the teacher.",
        faqQuestion3: "How to sign up for a lesson?",
        faqAnswer3: "To sign up for a lesson, please fill out the feedback form at the bottom of the page or contact me directly using the provided contact details.",
        faqQuestion4: "Are there discounts for group classes?",
        faqAnswer4: "Currently, group classes are not held. However, stay tuned for updates on the website; changes are possible in the future.",
        reviewsSectionTitle: "Reviews",
        leaveReviewButton: "Leave a Review",
        leaveYourReviewTitle: "Leave Your Review",
        yourNamePlaceholder: "Your Name",
        yourReviewPlaceholder: "Your Review",
        submitReviewButton: "Submit Review",
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
        modalSignupTitle: "Sign Up for a Lesson",
        modalNameLabel: "Name:",
        modalEmailLabel: "Email:",
        modalPhoneLabel: "Phone Number:",
        modalTopicLabel: "Desired Lesson Topic:",
        modalAgreementLabel: "I agree to the terms of data processing",
        modalSubmitButton: "Submit Application",
        footerPhone: "Phone +380 96 988 19 22",
        modalSignupTitleTest: "English level test",
        modalBodyTest: "Level test - <a href= 'https://forms.gle/rJABVQwif1XZeXDP8'>https://forms.gle/rJABVQwif1XZeXDP8</a> , follow the link and find out your English level. Good luck",
        buttonTest: "Pass the test",
        review1: "You are the best tutor I have ever had the opportunity to work with! The classes are interesting, easy and inspire me to learn even more. She knows how to support, explain complex things in simple words and is sincerely happy about my successes. Thanks to her, I began to love English! I highly recommend it!",
        review2: "Good afternoon. I really like you as a tutor, I'm really bad at languages, but after our classes I started to understand and remember English. Sometimes it seems to me that I know more rules in English than in Ukrainian. If I don't understand something, you will explain it 5 times. And you always praise me and I am very pleased. My only regret is that I didn't find you earlier.",
        review3: "Anastasia is a very good English tutor, she explains even the most complex material in the most accessible way, breaking it down into parts and presenting the material in a way that makes it interesting even for adults. She knows how to keep students' attention. The classes are effective and effective. We are infinitely grateful to Anastasia for her patience and help. We sincerely wish her new achievements and victories.",
        review4: "I really like your lessons with Victoria, the individual approach, the main thing is that the child fully accepts you, is not afraid, prepares for classes with pleasure. I also like when there are control classes, and I see a great result and am very satisfied with you.",
        review6: "I would like to sincerely thank the wonderful English tutor Anastasia, who works with my son Artem! We are very glad that we found her - a true professional in her field. She not only teaches, but also knows how to interest, motivate and support. Artem looks forward to each lesson with pleasure, and his level of knowledge has improved significantly in a short time. Thanks to her patience, kindness and individual approach, my son not only learns the language better, but also loves the learning process itself. It is clear that she puts her soul into every lesson. I sincerely recommend her to all parents who are looking for not just a teacher, but a real mentor for their child.",
        review7: "Anastasia is a very good English tutor, she explains even the most complex material in the most accessible way, breaking it down into parts and presenting the material in a way that makes it interesting even for adults. The classes are effective and effective. Therefore, I recommend her with confidence.",
        review8: "I really enjoy learning English with Anastasia Mikhalyvna! She always explains everything in a way that I quickly understand new words and rules. We read a lot, play interesting games, watch videos and learn to speak English. Thanks to our classes, I began to understand the tasks at school better, and it also became easier for me to write tests.",
        openBooks: "Open the books",
        AccessBooks:"Access to books",
        codeBooks: 'Enter the access code',
        ConfirmBooks: 'Confirm',
        booksMessageF: 'The code is correct! Access granted.',
        booksMessageIncorrect: 'Incorrect code. Please try again.',
        AvailableBooks: 'Available books'

      }
};
function updateContent(lang) {
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (!['option1Text', 'option2Text', 'languageOptionText'].includes(key)) {
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'TITLE') {
                    element.textContent = translations[lang][key];
                } else {
                    element.innerHTML = translations[lang][key];
                }
            }
        }
    });
    const namePlaceholder = document.querySelector('[data-lang-key="yourNamePlaceholder"]');
    if (namePlaceholder) {
        namePlaceholder.setAttribute('placeholder', translations[lang].yourNamePlaceholder);
    }
    const reviewPlaceholder = document.querySelector('[data-lang-key="yourReviewPlaceholder"]');
    if (reviewPlaceholder) {
        reviewPlaceholder.setAttribute('placeholder', translations[lang].yourReviewPlaceholder);
    }
    document.documentElement.lang = lang;
    const booksCodePlaceholder = document.querySelector('[data-lang-key="codeBooks"][type="password"]');
    if (booksCodePlaceholder) {
      booksCodePlaceholder.setAttribute('placeholder', translations[lang].codeBooks);
    }
    document.documentElement.lang = lang;
}
let currentLang = localStorage.getItem('lang') || 'uk';
translations.uk.option1Text = "Українська";
translations.uk.option2Text = "Англійська";
translations.en.option1Text = "Ukrainian";
translations.en.option2Text = "English";
document.addEventListener('DOMContentLoaded', () => {
    updateContent(currentLang);
    const ukrainianRadio = document.getElementById('option-1');
    const englishRadio = document.getElementById('option-2');
    if (currentLang === 'uk') {
        if (ukrainianRadio) ukrainianRadio.checked = true;
    } else {
        if (englishRadio) englishRadio.checked = true;
    }
    if (ukrainianRadio) {
        ukrainianRadio.addEventListener('change', () => {
            currentLang = 'uk';
            localStorage.setItem('lang', 'uk');
            updateContent('uk');
        });
    }
    if (englishRadio) {
        englishRadio.addEventListener('change', () => {
            currentLang = 'en';
            localStorage.setItem('lang', 'en');
            updateContent('en');
        });
    }
});
//ТЕСТ
const openTestModalBtn = document.getElementById('button_hero');
const testModalOverlay = document.getElementById('modal-overlay-test');
const closeTestModalBtn = document.getElementById('close-test-modal-btn');
function openTestModal() {
    testModalOverlay.style.display = 'flex'; 
    document.body.style.overflow = 'hidden'; 
}
function closeTestModal() {
    testModalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto'; 
}
openTestModalBtn.addEventListener('click', openTestModal);
closeTestModalBtn.addEventListener('click', closeTestModal);
testModalOverlay.addEventListener('click', (event) => {
    if (event.target === testModalOverlay) {
        closeTestModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && testModalOverlay.style.display === 'flex') {
        closeTestModal();
    }
});
//ПІДРУЧНИКИ
const ACCESS_CODE = "12345"; 

const books = [
  {
    name: "travel english.pdf",
    id: "1MQ6rkUdMH9MT8ojsucFCDS77Q9hqwm5Z",
    size: 6784338,
    url: "https://drive.google.com/file/d/1MQ6rkUdMH9MT8ojsucFCDS77Q9hqwm5Z/view",
  },
  {
    name: "English for Everyone. English Idioms (2).pdf",
    id: "1QaiVQaPlq3wWHWw0YEKDzG0EVYZe40Tk",
    size: 19166038,
    url: "https://drive.google.com/file/d/1QaiVQaPlq3wWHWw0YEKDzG0EVYZe40Tk/view",
  },
  {
    name: "English for Everyone. Vocabulary Builder (2).pdf",
    id: "1kxUNotxa7vw2EnyDvA_GjVHFKpr2_FuD",
    size: 28269939,
    url: "https://drive.google.com/file/d/1kxUNotxa7vw2EnyDvA_GjVHFKpr2_FuD/view",
  },
  {
    name: "English for Everyone. Grammar Guide (2).pdf",
    id: "1bvWuoyPLSoXw9DCvYdSqDzkQVpHJ2iEU",
    size: 25310798,
    url: "https://drive.google.com/file/d/1bvWuoyPLSoXw9DCvYdSqDzkQVpHJ2iEU/view",
  },
  {
    name: "English for Everyone. Phrasal Verbs (2).pdf",
    id: "19o77muLi4GaRKRiGGMOiEH5Vsyor4nkE",
    size: 38398336,
    url: "https://drive.google.com/file/d/19o77muLi4GaRKRiGGMOiEH5Vsyor4nkE/view",
  },
  {
    name: "English for Everyone. Grammar Guide. Practice Book.pdf",
    id: "1BxWUSNTiOf0ZH9t9XOicqFDx-qPU4Tia",
    size: 22817790,
    url: "https://drive.google.com/file/d/1BxWUSNTiOf0ZH9t9XOicqFDx-qPU4Tia/view",
  },
  {
    name: "GG4 Workbook (2).pdf",
    id: "1VazfiLCxzwjdLxf8fcz-pDc-L6iqs6Sk",
    size: 22817790,
    url: "https://drive.google.com/file/d/1VazfiLCxzwjdLxf8fcz-pDc-L6iqs6Sk/view",
  },
  {
    name: "GG1 Student's Book.pdf",
    id: "13ARj4HVLSI7MHQN82szMSnnbAtDAM6Vs",
    size: 22817790,
    url: "https://drive.google.com/file/d/13ARj4HVLSI7MHQN82szMSnnbAtDAM6Vs/view",
  },
  {
    name: "GG2 Student's Book.pdf",
    id: "1GDyY1JRawd7USW23uWmRnPiU1sZ66yaH",
    size: 22817790,
    url: "https://drive.google.com/file/d/1GDyY1JRawd7USW23uWmRnPiU1sZ66yaH/view",
  },
  {
    name: "GG2 Student's Book.pdf",
    id: "1jTqibchB1doh80r8RauCH_D0x-pUbz1k",
    size: 22817790,
    url: "https://drive.google.com/file/d/1jTqibchB1doh80r8RauCH_D0x-pUbz1k/view",
  },
  {
    name: "Solutions Elementary 3rd Workbook (2).pdf",
    id: "1h_jRNJDWtU1Jm4F0HgeQTo9No-dSUSHO",
    size: 22817790,
    url: "https://drive.google.com/file/d/1h_jRNJDWtU1Jm4F0HgeQTo9No-dSUSHO/view",
  },
  {
    name: "Solutions Pre-Int.3rd Student's Book (2).pdf",
    id: "11Ivg-O5LtgJHXZHGSyCHvt55CyVAz7FJ",
    size: 22817790,
    url: "https://drive.google.com/file/d/11Ivg-O5LtgJHXZHGSyCHvt55CyVAz7FJ/view",
  },
  {
    name: "Solutions Pre-Int.3rd Workbook (2).pdf",
    id: "169dRHyAILSwcqjgL-F8IIWWs4ouGVqnz",
    size: 22817790,
    url: "https://drive.google.com/file/d/169dRHyAILSwcqjgL-F8IIWWs4ouGVqnz/view",
  },
  {
    name: "Solutions Inter.3rd Student's Book (2).pdf",
    id: "1O1hFBJNpqW5JqqjihijzlJSCjWwjxVyZ",
    size: 22817790,
    url: "https://drive.google.com/file/d/1O1hFBJNpqW5JqqjihijzlJSCjWwjxVyZ/view",
  },
  {
    name: "Solutions Inter.3rd Student's Book (2).pdf",
    id: "1cLsFMDucoLpaMvzJvl1L7sU7eUNGZhy9",
    size: 22817790,
    url: "https://drive.google.com/file/d/1cLsFMDucoLpaMvzJvl1L7sU7eUNGZhy9/view",
  },
  {
    name: "Solutions Elementary 3rd Student's Book (2).pdf",
    id: "1f355INMsq5MdgdK7j1GsWJCkW9Lr8ZZE", 
    size: 22817790,
    url: "https://drive.google.com/file/d/1f355INMsq5MdgdK7j1GsWJCkW9Lr8ZZE/view",
  },
  {
    name: "SpeakOut A1 3rd Workbook.pdf",
    id: "1bc8udLiVR5QOm-NjrpqQ9Ogk413uYFlV",
    size: 22817790,
    url: "https://drive.google.com/file/d/1bc8udLiVR5QOm-NjrpqQ9Ogk413uYFlV/view",
  },
  {
    name: "AEF 3rd 5 Workbook.pdf",
    id: "1gkWyN3vunnxuahVSQh3MmDlkpSzYXAOL",
    size: 22817790,
    url: "https://drive.google.com/file/d/1gkWyN3vunnxuahVSQh3MmDlkpSzYXAOL/view",
  },
  {
    name: "AEF 3rd 4 Workbook.pdf",
    id: "1R_GnBJoTH0mX9InbH44_zTKYscAyfuEQ",
    size: 22817790,
    url: "https://drive.google.com/file/d/1R_GnBJoTH0mX9InbH44_zTKYscAyfuEQ/view",
  },
  {
    name: "AEF 3rd 3 Workbook.pdf",
    id: "1_rM5VKg81mmhGuKpKXYA83B82DDiNUwV",
    size: 22817790,
    url: "https://drive.google.com/file/d/1_rM5VKg81mmhGuKpKXYA83B82DDiNUwV/view",
  },
  {
    name: "AEF 3rd 1 Stud.Book.pdf",
    id: "1XfXDK6S87Nm8Js-mTo9rIB8NweYyrGQ8",
    size: 22817790,
    url: "https://drive.google.com/file/d/1XfXDK6S87Nm8Js-mTo9rIB8NweYyrGQ8/view",
  },
  {
    name: "AEF 3rd 1 Workbook.pdf",
    id: "1dMd4C03A9BgR3hG9XX5stjCAWYVVyT3H",
    size: 22817790,
    url: "https://drive.google.com/file/d/1dMd4C03A9BgR3hG9XX5stjCAWYVVyT3H/view",
  },
  {
    name: "EF4th Intermediate Workbook (2).pdf",
    id: "1L5CY_fhluZBQ1JmJYVp_TexY2R5HSiAL",
    size: 22817790,
    url: "https://drive.google.com/file/d/1L5CY_fhluZBQ1JmJYVp_TexY2R5HSiAL/view",
  },
  {
    name: "EF4th Pre-Intermediate Student's Book (2).pdf",
    id: "1WImYG7vBIUyP6n4BzZuDxZ0SF3vWgCYj",
    size: 22817790,
    url: "https://drive.google.com/file/d/1WImYG7vBIUyP6n4BzZuDxZ0SF3vWgCYj/view",
  },
  {
    name: "EF4th Pre-Intermediate Workbook.pdf",
    id: "1QWtnWp1iaPbzTOswT6Zwgd-Wrm39uAXs",
    size: 22817790,
    url: "https://drive.google.com/file/d/1QWtnWp1iaPbzTOswT6Zwgd-Wrm39uAXs/view",
  },
  {
    name: "EF4th Elementary Workbook.pdf",
    id: "1kk-Zi7kpm8GNaBcRaW1cye-OkuUIw4cV",
    size: 22817790,
    url: "https://drive.google.com/file/d/1kk-Zi7kpm8GNaBcRaW1cye-OkuUIw4cV/view",
  },
  {
    name: "EF4th Beginner Workbook.pdf",
    id: "1ocMkI5geYDcfRIrRWPrWEoIkbeyqzG-q",
    size: 22817790,
    url: "https://drive.google.com/file/d/1ocMkI5geYDcfRIrRWPrWEoIkbeyqzG-q/view",
  },
  {
    name: "SpeakOut A2 3rd Workbook.pdf",
    id: "1CZPw2US9-UXxtNSffC6TCdfRabraZFiQ",
    size: 22817790,
    url: "https://drive.google.com/file/d/1CZPw2US9-UXxtNSffC6TCdfRabraZFiQ/view",
  },
  {
    name: "EF4th Upper-Intermediate Workbook.pdf",
    id: "1Dc2Tqs_odDk4cF0niEhQSyt82tPMdVoS",
    size: 22817790,
    url: "https://drive.google.com/file/d/1Dc2Tqs_odDk4cF0niEhQSyt82tPMdVoS/view",
  },
  {
    name: "AEF 3rd 2 Workbook.pdf",
    id: "1J-bxHJonh4eytVIqHzlvEaLv9heC3qWE",
    size: 22817790,
    url: "https://drive.google.com/file/d/1J-bxHJonh4eytVIqHzlvEaLv9heC3qWE/view",
  },
  {
    name: "AEF 3rd 2 Stud. Book.pdf",
    id: "11D5_SeSh-8vxRC5CvR28Vmj83qeTSC7R",
    size: 22817790,
    url: "https://drive.google.com/file/d/11D5_SeSh-8vxRC5CvR28Vmj83qeTSC7R/view",
  },
  {
    name: "EF4th Beginner Student's Book.pdf",
    id: "1Y-6tpmVYKlNA0lL-qoasakSy9wGaTo7z",
    size: 22817790,
    url: "https://drive.google.com/file/d/1Y-6tpmVYKlNA0lL-qoasakSy9wGaTo7z/view",
  },
  {
    name: "SpeakOut B1 3rd Workbook.pdf",
    id: "1yWeYyy1RA16JWpJf2xPpZHNSoEWizV7A",
    size: 22817790,
    url: "https://drive.google.com/file/d/1yWeYyy1RA16JWpJf2xPpZHNSoEWizV7A/view",
  },
  {
    name: "EF4th Elementary Student's Book.pdf",
    id: "1Q74Un6MSmZH39ib-G-nOpFs-Y951w6H9",
    size: 22817790,
    url: "https://drive.google.com/file/d/1Q74Un6MSmZH39ib-G-nOpFs-Y951w6H9/view",
  },
  {
    name: "GG3 Workbook.pdf",
    id: "1sQ8F5czAT4u_Ohntzb4Sv9wSlNv9fXF5",
    size: 22817790,
    url: "https://drive.google.com/file/d/1sQ8F5czAT4u_Ohntzb4Sv9wSlNv9fXF5/view",
  },
  {
    name: "GG3 Student's Book.pdf",
    id: "1e2rE3TiPON1QhaAhiTun8E5Wz8ecoj21",
    size: 22817790,
    url: "https://drive.google.com/file/d/1e2rE3TiPON1QhaAhiTun8E5Wz8ecoj21/view",
  },
];
const openBooksModalBtn = document.getElementById('openBooksModalBtn');
const booksModalOverlay = document.getElementById('books-modal-overlay');
const closeBooksModalBtn = document.getElementById('close-books-modal-btn');
const booksCodeInput = document.getElementById('books-code');
const checkBooksCodeBtn = document.getElementById('check-books-code-btn');
const booksMessage = document.getElementById('books-message');
const booksListContainer = document.getElementById('books-list-container');
const bookListModal = document.getElementById('bookListModal');

function openBooksModal() {
  booksModalOverlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  booksCodeInput.value = '';
  booksMessage.textContent = '';
  booksCodeInput.style.display = 'block';
  checkBooksCodeBtn.style.display = 'block';
  booksListContainer.style.display = 'none';
}

function closeBooksModal() {
  booksModalOverlay.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function checkBooksCode() {
  const enteredCode = booksCodeInput.value;
  const currentLang = document.documentElement.lang || 'uk'; // За замовчуванням 'uk' якщо не встановлено

  if (enteredCode === ACCESS_CODE) {
    // Використовуємо переклад з об'єкта translations
    booksMessage.textContent = translations[currentLang].booksMessageF;
    booksMessage.style.color = "green";
    displayBooks();
    booksCodeInput.style.display = 'none';
    checkBooksCodeBtn.style.display = 'none';
  } else {
    // Використовуємо переклад для неправильного коду
    booksMessage.textContent = translations[currentLang].booksMessageIncorrect;
    booksMessage.style.color = "red";
  }
}
function displayBooks() {
  bookListModal.innerHTML = '';
  books.forEach(book => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = book.url;
    link.textContent = book.name;
    link.target = "_blank";
    listItem.appendChild(link);
    bookListModal.appendChild(listItem);
  });
  booksListContainer.style.display = 'block';
}

openBooksModalBtn.addEventListener('click', openBooksModal);
closeBooksModalBtn.addEventListener('click', closeBooksModal);
checkBooksCodeBtn.addEventListener('click', checkBooksCode);

booksModalOverlay.addEventListener('click', (event) => {
  if (event.target === booksModalOverlay) {
    closeBooksModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && booksModalOverlay.style.display === 'flex') {
    closeBooksModal();
  }
});

const opennModalBtn = document.getElementById('openModal');
const modalOverlayBooks = document.getElementById('modal-overlay');
const closeModalBtn = document.getElementById('close-modal-btn');
const lessonSignupForm = document.getElementById('lesson-signup-form');

function opennModal() {
  modalOverlayBooks.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlayBooks.style.display = 'none';
  document.body.style.overflow = 'auto';
}

opennModalBtn.addEventListener('click', opennModal);
closeModalBtn.addEventListener('click', closeModal);

modalOverlayBooks.addEventListener('click', (event) => {
  if (event.target === modalOverlayBooks) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalOverlayBooks.style.display === 'flex') {
    closeModal();
  }
});

lessonSignupForm.addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Ваша заявка на урок надіслана!');
  closeModal();
  lessonSignupForm.reset();
});

const openNModalBtn = document.getElementById('button_hero');
const MModalOverlay = document.getElementById('modal-overlay-test');
const closeTestModalBtnn = document.getElementById('close-test-modal-btn');

function handleOpenTestModal() { 
  MModalOverlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function handleCloseTestModal() { 
  MModalOverlay.style.display = 'none';
  document.body.style.overflow = 'auto';
}

openNModalBtn.addEventListener('click', handleOpenTestModal); 
closeTestModalBtnn.addEventListener('click', handleCloseTestModal); 

MModalOverlay.addEventListener('click', (event) => {
  if (event.target === MModalOverlay) {
    handleCloseTestModal(); 
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && MModalOverlay.style.display === 'flex') {
    handleCloseTestModal(); 
  }
});