const API = 'http://localhost:5501/api';

// ------------------ Registration ------------------
if(document.getElementById('registerForm')){
document.getElementById('registerForm').addEventListener('submit', e=>{
    e.preventDefault();
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch(`${API}/users/register`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({username,email,password})
    }).then(res=>res.json()).then(data=>alert(data.message));
});
}

// ------------------ Login ------------------
if(document.getElementById('loginForm')){
document.getElementById('loginForm').addEventListener('submit', e=>{
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch(`${API}/users/login`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({email,password})
    })
    .then(res => res.json())
    .then(data => {
        if (data.user_id) {
            alert("Login successful!");
            localStorage.setItem("user_id", data.user_id);
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid email or password!");
        }
    });
});
}

// ------------------ Dashboard Logic ------------------
if(document.getElementById('habitTable')){

const user_id = localStorage.getItem('user_id');
if(!user_id){
    alert("Please login first!");
    window.location.href = "index.html";
}

// Load Habits (No ID Shown)
function loadHabits(){
    fetch(`${API}/habits/${user_id}`)
    .then(res=>res.json())
    .then(data=>{
        let table = document.getElementById('habitTable').querySelector("tbody");
        table.innerHTML = "";

        data.forEach(h=>{
            table.innerHTML += `
            <tr>
                <td>${h.habit_name}</td>
                <td>${h.frequency}</td>
                <td>${h.streak_count || 0}🔥</td>
                <td><button class="btn btn-success btn-sm" onclick="completeHabit(${h.id})">✓</button></td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteHabit(${h.id})">Delete</button></td>
            </tr>`;
        });
    });
}

// Add Habit
document.getElementById('addHabit').addEventListener('click',()=>{
    let habit_name = document.getElementById('habit_name').value;
    let frequency = document.getElementById('frequency').value;

    fetch(`${API}/habits`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({user_id, habit_name, frequency, start_date:new Date().toISOString(), streak_count:0})
    })
    .then(res=>res.json())
    .then(data=>{
        alert(data.message);
        loadHabits();
        loadChart();
    });
});

// Delete Habit
window.deleteHabit = function(id){
    fetch(`${API}/habits/${id}`, {method:'DELETE'})
    .then(res=>res.json())
    .then(data=>{
        alert(data.message);
        loadHabits();
        loadChart();
    });
};

// Mark Habit Completed
window.completeHabit = function(id){
    fetch(`${API}/habits/complete/${id}`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadHabits();
        loadChart();
    });
};

// AI Suggest Habit
window.suggestHabit = function(){
    const suggestions = [
        "Drink 8 glasses of water 💧",
        "Read 20 minutes daily 📚",
        "Walk 5000 steps 🚶‍♂️",
        "Meditate 5 minutes 🧘‍♀️",
        "Practice gratitude 🙏"
    ];

    let pick = suggestions[Math.floor(Math.random() * suggestions.length)];
    const box = document.getElementById("suggestionBox");
    box.innerHTML = "AI Suggestion: " + pick;
    box.classList.remove("d-none");
};


// ----------- Chart.js Section -----------
let chart;

function loadChart(){
    fetch(`${API}/habits/${user_id}`)
    .then(res=>res.json())
    .then(data=>{
        const labels = data.map(h => h.habit_name);
        const streaks = data.map(h => h.streak_count || 0);

        if(chart) chart.destroy();

        const ctx = document.getElementById('habitChart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Habit Streak Count',
                    data: streaks
                }]
            }
        });
    });
}

// Load on Page
loadHabits();
loadChart();

}

// ------------------ Logout ------------------
function logout(){
    localStorage.removeItem("user_id");
    window.location.href = "index.html";
}
