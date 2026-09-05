// Course Data
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web...',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes...',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];


const courseList = document.querySelector("#course-list");
const courseCount = document.querySelector("#course-count");
const allBtn = document.querySelector("#all");
const wddBtn = document.querySelector("#wdd");
const cseBtn = document.querySelector("#cse");


// This is the function that display the courses
function displayCourses(courseArray) {
    const totalCredits = courseArray.reduce((sum, course) => {
        return sum + course.credits;
    }, 0);

    courseCount.textContent = `The total number of credits listed below is ${totalCredits}`;

    courseList.innerHTML = courseArray.map(course => {
        return `
            <div class="course-card ${course.completed ? 'completed' : ''}">
                ${course.completed ? '✓ ' : ''}${course.subject} ${course.number}
            </div>
        `;
    }).join('');
}


// These are the Event listener
allBtn.addEventListener("click", () => {
    displayCourses(courses);
});

wddBtn.addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
});

cseBtn.addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
});


displayCourses(courses);