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


const courseDetails = document.querySelector("#course-details");

function displayCourseDetails(course) {
    courseDetails.innerHTML = `
    <div class="dialog-header">
      <h2>${course.subject} ${course.number}</h2>
      <button id="closeModal" type="button" aria-label="Close dialog">X</button>
    </div>
    <div class="dialog-body">
      <h3>${course.title}</h3>
      <p><strong>${course.credits} credits</strong></p>
      <p><strong>Certificate:</strong> ${course.certificate}</p>
      <p>${course.description}</p>
      <p><strong>Technology:</strong> ${course.technology.join(', ')}</p>
    </div>
  `;

    courseDetails.showModal();

    const closeModal = document.querySelector("#closeModal");
    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });
}

courseDetails.addEventListener("click", (event) => {
    if (event.target === courseDetails) {
        courseDetails.close();
    }
});

function displayCourses(courseArray) {
    const totalCredits = courseArray.reduce((sum, course) => {
        return sum + course.credits;
    }, 0);

    courseCount.textContent = `The total number of course credits listed above is ${totalCredits}`;

    courseList.innerHTML = "";

    courseArray.forEach(course => {
        const courseDiv = document.createElement("button");
        courseDiv.type = "button";
        courseDiv.className = `course-card ${course.completed ? 'completed' : ''}`;
        courseDiv.textContent = `${course.completed ? '✓ ' : ''}${course.subject} ${course.number}`;

        courseDiv.addEventListener('click', () => {
            displayCourseDetails(course);
        });

        courseList.appendChild(courseDiv);
    });
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