// ==========================================
// ЕТАП II: РОЗШИРЕНА БАЗА ДАНИХ
// ==========================================
const students = [
    {
        id: 1,
        name: "Олексій Петренко",
        description: "Спеціальність: Комп'ютерні науки. Староста групи.",
        photo: "https://via.placeholder.com/150",
        contacts: { phone: "099-111-2233", email: "oleksii@univ.edu.ua" },
        subjects: { "Вища математика": 95, "Web-програмування": 98, "Бази даних": 90, "Англійська мова": 85 }
    },
    {
        id: 2,
        name: "Марія Ковальчук",
        description: "Спеціальність: Кібербезпека. Активна в дебатах.",
        photo: "https://via.placeholder.com/150",
        contacts: { phone: "098-222-3344", email: "maria.k@univ.edu.ua" },
        subjects: { "Вища математика": 88, "Web-програмування": 92, "Бази даних": 85, "Англійська мова": 95 }
    },
    {
        id: 3,
        name: "Іван Сидоренко",
        description: "Спеціальність: Програмна інженерія. Захоплюється JS.",
        photo: "https://via.placeholder.com/150",
        contacts: { phone: "067-333-4455", email: "ivan.s@univ.edu.ua" },
        subjects: { "Вища математика": 70, "Web-програмування": 99, "Бази даних": 75, "Англійська мова": 68 }
    },
    {
        id: 4,
        name: "Олена Гнатюк",
        description: "Спеціальність: Комп'ютерні науки. Призер олімпіад.",
        photo: "https://via.placeholder.com/150",
        contacts: { phone: "050-444-5566", email: "olena.h@univ.edu.ua" },
        subjects: { "Вища математика": 100, "Web-програмування": 95, "Бази даних": 98, "Англійська мова": 90 }
    },
    {
        id: 5,
        name: "Дмитро Кравченко",
        description: "Спеціальність: Системний аналіз. Капітан команди.",
        photo: "https://via.placeholder.com/150",
        contacts: { phone: "063-555-6677", email: "dmytro.k@univ.edu.ua" },
        subjects: { "Вища математика": 65, "Web-програмування": 72, "Бази даних": 60, "Англійська мова": 80 }
    },
    {
        id: 6,
        name: "Анастасія Лисенко",
        description: "Спеціальність: Програмна інженерія. UI/UX дизайнер.",
        photo: "https://via.placeholder.com/150",
        contacts: { phone: "099-666-7788", email: "nastia.l@univ.edu.ua" },
        subjects: { "Вища математика": 82, "Web-програмування": 100, "Бази даних": 88, "Англійська мова": 92 }
    },
    {
        id: 7,
        name: "Максим Ткаченко",
        description: "Спеціальність: Кібербезпека. Цікавиться мережами.",
        photo: "https://via.placeholder.com/150",
        contacts: { phone: "097-777-8899", email: "maks.t@univ.edu.ua" },
        subjects: { "Вища математика": 75, "Web-програмування": 65, "Бази даних": 92, "Англійська мова": 70 }
    },
    {
        id: 8,
        name: "Вікторія Мороз",
        description: "Спеціальність: Комп'ютерні науки. Староста курсу.",
        photo: "https://via.placeholder.com/150",
        contacts: { phone: "066-888-9900", email: "vika.m@univ.edu.ua" },
        subjects: { "Вища математика": 94, "Web-програмування": 90, "Бази даних": 95, "Англійська мова": 88 }
    }
];

// Допоміжна функція для розрахунку середнього балу одного студента
function getStudentAverage(subjectsObj) {
    const grades = Object.values(subjectsObj);
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, grade) => acc + grade, 0);
    return +(sum / grades.length).toFixed(1);
}

// ==========================================
// ЕТАП IV: РОБОТА З ПАМ'ЯТТЮ (LocalStorage)
// ==========================================
let favoriteIds = JSON.parse(localStorage.getItem('favoriteStudents')) || [];


// ==========================================
// ЕТАП I: КАРКАС ТА ДИНАМІКА (DOM/BOM)
// ==========================================

// 1. Динамічний годинник
function updateDateTime() {
    const datetimeElement = document.getElementById('datetime-display');
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    if(datetimeElement) datetimeElement.textContent = now.toLocaleDateString('uk-UA', options);
}
setInterval(updateDateTime, 1000);
updateDateTime();

// 2. Навігація (SPA)
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.page-section');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        sections.forEach(section => section.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');
    });
});

// 3. Інформація про браузер (BOM)
function renderBrowserInfo() {
    const infoContainer = document.getElementById('browser-info');
    if (infoContainer) {
        infoContainer.innerHTML = `
            <p><strong>Браузер:</strong> ${navigator.userAgent}</p>
            <p><strong>Мова:</strong> ${navigator.language}</p>
            <p><strong>Платформа:</strong> ${navigator.platform}</p>
            <p><strong>Онлайн:</strong> ${navigator.onLine ? "Так" : "Ні"}</p>
        `;
    }
}
renderBrowserInfo();


// ==========================================
// ЕТАП II ТА IV: ГЕНЕРАЦІЯ ТА СТАТИСТИКА
// ==========================================

// Функція рендерингу студентів
function renderStudents(data) {
    const container = document.getElementById('students-container');
    if (!container) return;
    container.innerHTML = ''; 

    data.forEach(student => {
        const isFav = favoriteIds.includes(student.id);
        const avgGrade = getStudentAverage(student.subjects); // Отримуємо середній бал

        const studentHTML = `
            <div class="student-card ${isFav ? 'favorited' : ''}" data-id="${student.id}">
                <img src="${student.photo}" alt="${student.name}" class="student-photo">
                <h3>${student.name}</h3>
                <div class="grade-badge">Середній бал: ${avgGrade}</div>
                <div class="card-actions">
                    <button class="action-btn fav-btn">${isFav ? '⭐ Вибрано' : 'В обране'}</button>
                    <button class="action-btn details-btn">Оцінки</button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', studentHTML);
    });
    
    updateStatistics(data); 
}

// Функція розрахунку статистики 
function updateStatistics(dataToCalculate) {
    if (!dataToCalculate || dataToCalculate.length === 0) return;

    // Середній бал всіх відфільтрованих студентів
    const totalSum = dataToCalculate.reduce((sum, s) => sum + getStudentAverage(s.subjects), 0);
    const avg = (totalSum / dataToCalculate.length).toFixed(1);

    // Кількість відмінників (середній бал >= 90)
    const topCount = dataToCalculate.reduce((count, s) => getStudentAverage(s.subjects) >= 90 ? count + 1 : count, 0);

    const avgEl = document.getElementById('average-grade');
    const countEl = document.getElementById('top-students-count');
    
    if (avgEl) avgEl.textContent = avg;
    if (countEl) countEl.textContent = topCount;
}

// Пошук 
const searchInput = document.getElementById('student-search');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const text = e.target.value.toLowerCase();
        const filtered = students.filter(s => s.name.toLowerCase().includes(text));
        renderStudents(filtered);
    });
}


// ==========================================
// ЕТАП III: ІНТЕРАКТИВНІСТЬ, ПОДІЇ ТА ФОРМИ
// ==========================================

// 1. Валідація форми
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('user-name').value.trim();
        const phone = document.getElementById('user-phone').value.trim();
        const errorMsg = document.getElementById('form-error');
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

        if (name === "" || !phoneRegex.test(phone)) {
            errorMsg.style.color = "red";
            errorMsg.textContent = "Помилка: Перевірте дані (тел: 000-000-0000)!";
        } else {
            errorMsg.style.color = "green";
            errorMsg.textContent = "Успішно відправлено!";
            this.reset();
        }
    });
}

// 2. Делегування подій (Вибране + Модальне вікно з оцінками)
const studentsContainer = document.getElementById('students-container');
const modal = document.getElementById('student-modal');

if (studentsContainer) {
    studentsContainer.addEventListener('click', function(e) {
        const card = e.target.closest('.student-card');
        if (!card) return;

        const id = parseInt(card.dataset.id);
        const student = students.find(s => s.id === id);

        // Логіка для кнопки "В обране"
        if (e.target.classList.contains('fav-btn')) {
            if (favoriteIds.includes(id)) {
                favoriteIds = favoriteIds.filter(favId => favId !== id);
                e.target.textContent = 'В обране';
                card.classList.remove('favorited');
            } else {
                favoriteIds.push(id);
                e.target.textContent = '⭐ Вибрано';
                card.classList.add('favorited');
            }
            localStorage.setItem('favoriteStudents', JSON.stringify(favoriteIds));
        }

        // Логіка для кнопки "Оцінки" (Модальне вікно)
        if (e.target.classList.contains('details-btn')) {
            
            // Формуємо список предметів та оцінок
            const subjectsListHTML = Object.entries(student.subjects)
                .map(([subjectName, grade]) => {
                    let color = grade >= 90 ? 'green' : (grade < 70 ? 'red' : 'black');
                    return `<li style="padding: 5px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;">
                        <span>${subjectName}</span> 
                        <strong style="color: ${color}">${grade}</strong>
                    </li>`;
                }).join('');

            // Заповнюємо модальне вікно даними
            document.getElementById('modal-details').innerHTML = `
                <div style="text-align: center;">
                    <h2>${student.name}</h2>
                    <img src="${student.photo}" style="width:120px; border-radius:50%; margin-bottom: 10px;">
                    <p style="color: #7f8c8d; font-size: 0.9em;">${student.description}</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 15px 0;">
                    <h4 style="margin: 0 0 5px 0;">Контактні дані:</h4>
                    <p style="margin: 5px 0;">📞 ${student.contacts.phone}</p>
                    <p style="margin: 5px 0;">✉️ <a href="mailto:${student.contacts.email}">${student.contacts.email}</a></p>
                </div>

                <h4>Успішність (Сер. бал: ${getStudentAverage(student.subjects)}):</h4>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${subjectsListHTML}
                </ul>
            `;
            modal.style.display = 'block';
        }
    });
}

// Закриття модального вікна
const closeBtn = document.querySelector('.close-btn');
if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = 'none';
}
window.onclick = (e) => { 
    if (e.target === modal) modal.style.display = 'none'; 
};

// Запуск початкового рендерингу карток
renderStudents(students);