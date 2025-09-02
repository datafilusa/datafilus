document.addEventListener('DOMContentLoaded', () => {

  // ==============================
  // Example Student Profile (3 Semesters)
  // ==============================
  const studentProfile = {
    name: "Student B",
    program: "MD",
    profilePic: "",
    currentYear: 2,
    currentSemester: 1,
    tuitionPerSemester: 5000,
    payments: {
      "sy2025-1": [
        { date: "2025-01-15", amount: 1500 },
        { date: "2025-02-10", amount: 500 }
      ],
      "sy2025-2": [
        { date: "2025-09-01", amount: 1000 }
      ],
      "sy2025-3": [
        { date: "2026-03-05", amount: 2000 },
        { date: "2026-04-01", amount: 500 }
      ]
    },
    grades: {
      "sy2025-1": [
        { subject: "Anatomy", prelim: 85, midterm: 87, final: 86, cumulative: 86 },
        { subject: "Physiology", prelim: 88, midterm: 84, final: 85, cumulative: 86 },
        { subject: "Biochemistry", prelim: 85, midterm: 80, final: 95, cumulative: 96 },
        { subject: "Bioethics", prelim: 80, midterm: 97, final: 92, cumulative: 91 },
        { subject: "FMCH", prelim: 77, midterm: 81, final: 88, cumulative: 83 }
      ],
      "sy2025-2": [
        { subject: "Pathology", prelim: 88, midterm: 85, final: 87, cumulative: 87 },
        { subject: "Genetics", prelim: 90, midterm: 92, final: 91, cumulative: 91 },
        { subject: "Psychiatry", prelim: 89, midterm: 81, final: 92, cumulative: 88 },
        { subject: "Microbiology", prelim: 85, midterm: 89, final: 91, cumulative: 89 },
        { subject: "Histology", prelim: 90, midterm: 87, final: 92, cumulative: 90 },
      ],
      "sy2025-3": [
        { subject: "Gynecology", prelim: 82, midterm: 84, final: 85, cumulative: 84 },
        { subject: "Pharmacology", prelim: 79, midterm: 81, final: 80, cumulative: 80 },
        { subject: "FMCH", prelim: 95, midterm: 92, final: 89, cumulative: 91 },
        { subject: "Microbiology", prelim: 88, midterm: 90, final: 87, cumulative: 88 },
        { subject: "Anatomy", prelim: 96, midterm: 89, final: 95, cumulative: 93 },
      ],
    },
    attendance: {
      "sy2025-1": [
        "2025-03-02: Physiology (Absent)"
      ],
      "sy2025-2": [
        "2025-09-03: Biochemistry (Absent)"
      ],
      "sy2025-3": [
        "2026-03-15: Pharmacology (Absent)"
      ]
    }
  };

  // ==============================
  // Set Default Profile Picture
  // ==============================
  const profileImg = document.querySelector('.profile-picture img');
  if (profileImg) profileImg.src = studentProfile.profilePic || 'image/noprofilepicimg.png';

  // ==============================
  // Login / Logout + Remember Me
  // ==============================
  const loginForm = document.getElementById('loginForm');
  const profilePage = document.getElementById('profilePage');
  const loginBox = document.getElementById('loginBox');
  const logoutBtn = document.getElementById('logoutBtn');
  const errorMessage = document.getElementById('errorMessage');
  const fadeDuration = 400;

  const rememberCheckbox = document.getElementById('rememberMe');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  if (localStorage.getItem('rememberedUser') && localStorage.getItem('rememberedPass')) {
    usernameInput.value = localStorage.getItem('rememberedUser');
    passwordInput.value = localStorage.getItem('rememberedPass');
    rememberCheckbox.checked = true;
  }

  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === 'student' && password === '1234') {
      errorMessage.style.display = "none";
      if (rememberCheckbox.checked) {
        localStorage.setItem('rememberedUser', username);
        localStorage.setItem('rememberedPass', password);
      } else {
        localStorage.removeItem('rememberedUser');
        localStorage.removeItem('rememberedPass');
      }

      loginBox.style.transition = `opacity ${fadeDuration}ms`;
      loginBox.style.opacity = 0;
      setTimeout(() => {
        loginBox.style.display = 'none';
        profilePage.style.display = 'block';
        profilePage.style.opacity = 0;
        profilePage.style.transition = `opacity ${fadeDuration}ms`;
        setTimeout(() => profilePage.style.opacity = 1, 10);
      }, fadeDuration);

    } else {
      errorMessage.style.display = "block";
    }
  });

  logoutBtn.addEventListener('click', () => {
    profilePage.style.transition = `opacity ${fadeDuration}ms`;
    profilePage.style.opacity = 0;
    setTimeout(() => {
      profilePage.style.display = 'none';
      loginBox.style.display = 'block';
      loginBox.style.opacity = 0;
      loginBox.style.transition = `opacity ${fadeDuration}ms`;
      setTimeout(() => loginBox.style.opacity = 1, 10);
      if (!rememberCheckbox.checked) {
        loginForm.reset();
        localStorage.removeItem('rememberedUser');
        localStorage.removeItem('rememberedPass');
      } else {
        usernameInput.value = localStorage.getItem('rememberedUser') || '';
        passwordInput.value = localStorage.getItem('rememberedPass') || '';
        rememberCheckbox.checked = true;
      }
    }, fadeDuration);
  });

  // ==============================
  // Password Toggle Eye Icon
  // ==============================
  const togglePassword = document.getElementById('togglePassword');
  const svg = togglePassword?.querySelector('svg');
  const eyeIcon = `<path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7z" fill="none" stroke="#aaa" stroke-width="2"/><circle cx="12" cy="12" r="2.5" fill="none" stroke="#aaa" stroke-width="2"/>`;
  const eyeOffIcon = `<path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7z" fill="none" stroke="#aaa" stroke-width="2"/><circle cx="12" cy="12" r="2.5" fill="none" stroke="#aaa" stroke-width="2"/><line x1="7" y1="7" x2="17" y2="17" stroke="#aaa" stroke-width="2" stroke-linecap="round"/>`;
  if (svg) svg.innerHTML = eyeIcon;
  if (togglePassword) {
    togglePassword.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        if (svg) svg.innerHTML = eyeOffIcon;
      } else {
        passwordInput.type = 'password';
        if (svg) svg.innerHTML = eyeIcon;
      }
    });
  }

  // ==============================
  // Semester Dropdown & Data
  // ==============================
  const semesterDropdown = document.getElementById('semesterDropdown');
  const semesterContainer = document.getElementById('semesterContainer');

  const semesters = [];
  for (let i = 1; i <= 3; i++) {
    semesters.push({
      id: `sy2025-${i}`,
      label: `Semester ${i}, SY ${2025 + Math.floor((i - 1) / 2)}-${2025 + Math.floor((i - 1) / 2) + 1}`
    });
  }
  semesters.reverse();

  const subjectsBySemester = {
    "sy2025-1": ["Anatomy", "Physiology", "Biochemistry", "Bioethics", "FMCH"],
    "sy2025-2": ["Pathology", "Genetics", "Psychiatry", "Microbiology", "Histology"],
    "sy2025-3": ["Gynecology", "Pharmacology", "FMCH", "Microbiology", "Anatomy"]
  };

  let alwaysShowGrades = false;

  const latestScore = (g) => {
    if (typeof g.final === 'number') return { label: 'Final', value: g.final };
    if (typeof g.midterm === 'number') return { label: 'Midterm', value: g.midterm };
    if (typeof g.prelim === 'number') return { label: 'Prelim', value: g.prelim };
    return { label: 'N/A', value: 'N/A' };
  };

  // ==============================
  // Generate Semester Sections
  // ==============================
  semesters.forEach(sem => {
    const option = document.createElement('option');
    option.value = sem.id;
    option.textContent = sem.label;
    semesterDropdown.appendChild(option);

    const div = document.createElement('div');
    div.id = sem.id;
    div.className = 'semester-info section-card';
    div.style.display = 'none';

    // ===== GRADES =====
    const gradesSection = document.createElement('section');
    gradesSection.className = 'grades-section';

    const gradesButton = document.createElement('button');
    gradesButton.className = 'grades-button';
    gradesButton.textContent = 'View All Grades';
    gradesSection.appendChild(gradesButton);

    const previewDiv = document.createElement('div');
    previewDiv.className = 'latest-exam-preview';
    const rawSemGrades = studentProfile.grades[sem.id] || [];
    const semesterGrades = rawSemGrades.map(g => ({
      subject: g.subject,
      prelim: g.prelim,
      midterm: g.midterm,
      final: g.final
    }));
    if (semesterGrades.length > 0) {
      const latest = semesterGrades[semesterGrades.length - 1];
      const l = latestScore(latest);
      previewDiv.innerHTML = `
        <div class="latest-exam-container">
          <div class="latest-exam-left">Latest Exam Grade</div>
          <div class="latest-exam-right">${latest.subject}: ${l.value}</div>
        </div>
      `;
    } else {
      previewDiv.innerHTML = `
        <div class="latest-exam-container">
          <div class="latest-exam-left">Latest Exam Grade</div>
          <div class="latest-exam-right">N/A</div>
        </div>
      `;
    }

    gradesSection.appendChild(previewDiv);

    const table = document.createElement('table');
    table.className = 'grade-table';
    table.style.display = 'none';
    table.innerHTML = `
      <thead>
        <tr>
          <th>Subject</th>
          <th>Prelim</th>
          <th>Midterm</th>
          <th>Final</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    const tbody = table.querySelector('tbody');
    (subjectsBySemester[sem.id] || []).forEach(subject => {
      const grade = semesterGrades.find(g => g.subject === subject) || {};
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${subject}</td>
        <td>${(grade.prelim ?? "N/A")}</td>
        <td>${(grade.midterm ?? "N/A")}</td>
        <td>${(grade.final ?? "N/A")}</td>
      `;
      tbody.appendChild(tr);
    });
    gradesSection.appendChild(table);
    div.appendChild(gradesSection);

    // ===== PAYMENTS =====
    const paymentsSection = document.createElement('section');
    paymentsSection.className = 'payments-section';
    const paymentsTitle = document.createElement('h3');
    paymentsTitle.textContent = "Payments";
    paymentsTitle.style.borderLeft = "4px solid #FFD700";
    paymentsTitle.style.paddingLeft = "8px";
    paymentsTitle.style.marginBottom = "10px";
    paymentsTitle.style.fontWeight = "600";
    paymentsSection.appendChild(paymentsTitle);

    const paymentPreview = document.createElement('div');
    const payments = studentProfile.payments[sem.id] || [];
    const paid = payments.reduce((sum, p) => sum + p.amount, 0);
    const balance = studentProfile.tuitionPerSemester - paid;
    const nextDueDate = "2025-05-01"; // placeholder
    paymentPreview.innerHTML = `
      <p>Total Tuition: $${studentProfile.tuitionPerSemester}</p>
      <p>Balance: $${balance}</p>
      <p>Next Due Date: ${nextDueDate}</p>
    `;
    paymentsSection.appendChild(paymentPreview);

    const paymentsButton = document.createElement('button');
    paymentsButton.className = 'payments-button';
    paymentsButton.textContent = 'View Payments';
    paymentsSection.appendChild(paymentsButton);

    const paymentsTable = document.createElement('table');
    paymentsTable.style.display = 'none';
    paymentsTable.style.width = '100%';
    paymentsTable.style.borderCollapse = 'collapse';
    paymentsTable.style.marginTop = '10px';
    paymentsTable.innerHTML = `<thead style="border-bottom:2px solid #ccc;">
      <tr>
        <th style="text-align:left; padding:6px 0;">Date</th>
        <th style="text-align:right; padding:6px 0;">Amount Paid</th>
      </tr></thead><tbody>`;
    
    payments.forEach((p) => {
      paymentsTable.innerHTML += `<tr style="border-bottom:1px solid #eee; transition: background 0.3s;">
        <td style="padding:6px 0;">${p.date}</td>
        <td style="text-align:right; padding:6px 0;">$${p.amount}</td>
      </tr>`;
    });

    paymentsTable.innerHTML += `<tr style="font-weight:bold; border-top:2px solid #ccc;">
      <td style="padding:6px 0;">Total Paid</td>
      <td style="text-align:right; padding:6px 0;">$${paid}</td>
    </tr>`;
    paymentsTable.innerHTML += `</tbody>`;
    paymentsSection.appendChild(paymentsTable);

    paymentsTable.addEventListener('mouseover', e => {
      if (e.target.tagName === 'TD') e.target.parentElement.style.background = '#f9f9f9';
    });
    paymentsTable.addEventListener('mouseout', e => {
      if (e.target.tagName === 'TD') e.target.parentElement.style.background = 'transparent';
    });

    // ===== ATTENDANCE =====
    const attendanceSection = document.createElement('section');
    attendanceSection.className = 'attendance-section';
    const attendanceTitle = document.createElement('h3');
    attendanceTitle.textContent = "Attendance";
    attendanceTitle.style.borderLeft = "4px solid #FFD700";
    attendanceTitle.style.paddingLeft = "8px";
    attendanceTitle.style.marginBottom = "10px";
    attendanceTitle.style.fontWeight = "600";
    attendanceSection.appendChild(attendanceTitle);

    const attendancePreview = document.createElement('div');
    attendancePreview.innerHTML = studentProfile.attendance[sem.id] && studentProfile.attendance[sem.id].length > 0 ?
      '<ul>' + studentProfile.attendance[sem.id].map(a => `<li>${a}</li>`).join('') + '</ul>' :
      '<p>No Records</p>';
    attendanceSection.appendChild(attendancePreview);

    const attendanceButton = document.createElement('button');
    attendanceButton.className = 'payments-button';
    attendanceButton.textContent = 'View Full Attendance';
    attendanceSection.appendChild(attendanceButton);

    const attendanceTable = document.createElement('table');
    attendanceTable.style.display = 'none';
    attendanceTable.style.width = '100%';
    attendanceTable.style.borderCollapse = 'collapse';
    attendanceTable.style.marginTop = '10px';
    attendanceTable.innerHTML = `<thead style="border-bottom:2px solid #ccc;">
      <tr>
        <th style="text-align:left; padding:6px 0;">Date</th>
        <th style="text-align:left; padding:6px 0;">Class / Absent</th>
      </tr></thead><tbody>`;
    
    (studentProfile.attendance[sem.id] || []).forEach(a => {
      attendanceTable.innerHTML += `<tr style="border-bottom:1px solid #eee; transition: background 0.3s;">
        <td style="padding:6px 0;">${a.split(':')[0]}</td>
        <td style="padding:6px 0;">${a.split(':')[1]}</td>
      </tr>`;
    });

    attendanceTable.innerHTML += `</tbody>`;
    attendanceSection.appendChild(attendanceTable);

    attendanceTable.addEventListener('mouseover', e => {
      if (e.target.tagName === 'TD') e.target.parentElement.style.background = '#f9f9f9';
    });
    attendanceTable.addEventListener('mouseout', e => {
      if (e.target.tagName === 'TD') e.target.parentElement.style.background = 'transparent';
    });

    const paWrapper = document.createElement('div');
    paWrapper.className = 'payments-attendance';
    paWrapper.appendChild(paymentsSection);
    paWrapper.appendChild(attendanceSection);
    div.appendChild(paWrapper);
    semesterContainer.appendChild(div);
  });

  // ==============================
  // Button Click Events (Grades, Payments, Attendance)
  // ==============================
  document.querySelectorAll('.grades-section').forEach(section => {
    const btn = section.querySelector('.grades-button');
    const table = section.querySelector('.grade-table');
    const preview = section.querySelector('.latest-exam-preview');

    btn.addEventListener('click', () => {
      // Corrected iOS behavior: show full table, hide preview when clicked
      const isTableVisible = table.style.display === 'table';
      if (!isTableVisible) {
        table.style.display = 'table';
        preview.style.display = 'none';
      } else {
        table.style.display = 'none';
        preview.style.display = 'block';
      }
    });
  });

  document.querySelectorAll('.payments-section').forEach(section => {
    const btn = section.querySelector('.payments-button');
    const table = section.querySelector('table');

    btn.addEventListener('click', () => {
      table.style.display = table.style.display === 'table' ? 'none' : 'table';
    });
  });

  document.querySelectorAll('.attendance-section').forEach(section => {
    const btn = section.querySelector('.payments-button');
    const table = section.querySelector('table');

    btn.addEventListener('click', () => {
      table.style.display = table.style.display === 'table' ? 'none' : 'table';
    });
  });

  // ==============================
  // Dropdown Change
  // ==============================
  semesterDropdown.addEventListener('change', () => {
    const selected = semesterDropdown.value;
    document.querySelectorAll('.semester-info').forEach(div => {
      div.style.display = div.id === selected ? 'block' : 'none';
    });
  });

  // ==============================
  // Show Latest by default
  // ==============================
  if (semesters.length > 0) semesterDropdown.value = semesters[0].id;
  semesterDropdown.dispatchEvent(new Event('change'));

});
