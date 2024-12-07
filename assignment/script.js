document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registrationForm").addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent form from submitting immediately

        // Get form input values
        const name = document.getElementById("name").value.trim();
        const sport = document.getElementById("sport").value.trim();
        const age = document.getElementById("age").value.trim();
        const contact = document.getElementById("contact").value.trim();

        // Validate the fields
        if (!name || !sport || !age || !contact) {
            document.getElementById("formMessage").innerText = "All fields must be filled out.";
            document.getElementById("formMessage").style.color = "red"; // Display an error message
        } else if (isNaN(age) || age <= 0) {
            document.getElementById("formMessage").innerText = "Please enter a valid age.";
            document.getElementById("formMessage").style.color = "red"; // Display an error message
        } else {
            document.getElementById("formMessage").innerText = "Registration Successful!";
            document.getElementById("formMessage").style.color = "green"; // Display a success message

            // Optionally, reset the form
            this.reset();
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Admin Login
    const adminPassword = "admin123"; // Predefined admin password
    const loginForm = document.getElementById("adminLogin");
    const adminSchedule = document.getElementById("adminSchedule");
    const adminActions = document.getElementById("adminActions");
    const loginMessage = document.getElementById("loginMessage");

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const enteredPassword = document.getElementById("password").value;

            if (enteredPassword === adminPassword) {
                loginMessage.innerText = "Access granted!";
                loginMessage.style.color = "limegreen";
                adminSchedule.style.display = "block";
                adminActions.style.display = "block"; // Show admin panel
                loginForm.style.display = "none"; // Hide login form
            } else {
                loginMessage.innerText = "Invalid password. Please try again.";
                loginMessage.style.color = "red";
            }
        });
    }

    // Mock Schedule Data
    const schedule = [
        { date: "2024-12-15", time: "10:00 AM", teams: "Team A vs Team B", venue: "Main Arena" },
        { date: "2024-12-16", time: "1:00 PM", teams: "Team C vs Team D", venue: "Stadium 2" }
    ];

    // Mock Score Data
    const matches = [
        { teams: "Team A vs Team B", score: "0 - 0" },
        { teams: "Team C vs Team D", score: "1 - 2" }
    ];

    // DOM Elements
    const scheduleTable = document.getElementById("scheduleTable");
    const scoreTable = document.getElementById("scoreTable");

    // Load Schedule
    function loadSchedule() {
        scheduleTable.innerHTML = `
            <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Teams</th>
                <th>Venue</th>
                <th>Actions</th>
            </tr>
        `;
        schedule.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.date}</td>
                <td>${item.time}</td>
                <td>${item.teams}</td>
                <td>${item.venue}</td>
                <td>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>
            `;
            scheduleTable.appendChild(row);
        });

        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                deleteScheduleRow(index);
            });
        });
    }

    // Load Matches
    function loadMatches() {
        scoreTable.innerHTML = `
            <tr>
                <th>Teams</th>
                <th>Score</th>
            </tr>
        `;
        matches.forEach((match, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${match.teams}</td>
                <td>${match.score}</td>
            `;
            scoreTable.appendChild(row);
        });
    }

    // Add Schedule Form
    const scheduleForm = document.getElementById("scheduleForm");
    if (scheduleForm) {
        scheduleForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;
            const teams = document.getElementById("teams").value;
            const venue = document.getElementById("venue").value;

            if (date && time && teams && venue) {
                schedule.push({ date, time, teams, venue });
                loadSchedule();
                scheduleForm.reset();
            }
        });
    }

    // Add/Update Match Score Form
    const adminScoreForm = document.getElementById("adminScoreForm");
    if (adminScoreForm) {
        adminScoreForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const teams = document.getElementById("adminTeams").value;
            const score = document.getElementById("adminScore").value;

            // Check if the match already exists
            const existingMatchIndex = matches.findIndex((match) => match.teams === teams);
            if (existingMatchIndex !== -1) {
                // Update existing match score
                matches[existingMatchIndex].score = score;
            } else {
                // Add new match
                matches.push({ teams, score });
            }

            loadMatches(); // Refresh match table
            adminScoreForm.reset();
        });
    }
    

    

    // Delete Schedule Row
    function deleteScheduleRow(index) {
        schedule.splice(index, 1);
        loadSchedule();
    }

    // Update Score
    function updateScore(index) {
        const newScore = prompt("Enter new score:", matches[index].score);
        if (newScore) {
            matches[index].score = newScore;
            loadMatches();
        }
    }

    // Initialize
    loadSchedule(); // Load initial schedule
    loadMatches(); // Load initial matches
});
