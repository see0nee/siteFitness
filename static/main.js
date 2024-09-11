const events = [
    {id: 1, date: "2023-09-15", type: "йога", spots: 10, seats: 6 },
    {id: 2, date: "2023-09-16", type: "фитнес", spots: 5, seats: 5 },
    {id: 3, date: "2023-09-17", type: "бокс", spots: 8, seats: 1 },
    {id: 4, date: "2023-09-17", type: "плавание", spots: 4, seats: 3 },
    {id: 5, date: "2023-09-18", type: "йога", spots: 4, seats: 4 },
    {id: 6, date: "2023-09-19", type: "бокс", spots: 6, seats: 0 },
    {id: 7, date: "2023-09-15", type: "фитнес", spots: 12, seats: 9 },
    {id: 8, date: "2023-09-16", type: "фитнес", spots: 12, seats: 0 },
];

const user = [
    {number: "0001", isPaid: true},
    {number: "0002", isPaid: false},
    {number: "0003", isPaid: true},
    {number: "0004", isPaid: false},
];

function displayEvents(eventsArr) {
    const calendar = document.getElementById("calendar-cont");
    calendar.innerHTML = `        
        <a href="#top" style="opacity: 50%;" id="scroll">Наверх</a>
        <div class="filter-form">
            <h3>Фильтрация</h3>
            <div class="filter">
                <div class="filter-item">
                    <input type="text" name="date" id="date">
                    <label for="date">По дате</label>
                </div>
                <div class="filter-item">
                    <input type="text" name="typeEvents" id="typeEvents">
                    <label for="typeEvents">По типу</label>
                </div>
                <div class="filter-item">
                    <input type="text" name="seats" id="seats">
                    <label for="seats">По свободным местам</label>
                </div>
                <div class="filter-item">
                    <input type="button" value="Отфильтровать" onclick="filterEvents()">
                </div>
            </div>
        </div>
        <div id="svg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="black" stroke-width="2" />
        
                <line x1="50" y1="50" x2="50" y2="30" stroke="black" stroke-width="2">
                    <animateTransform attributeName="transform" attributeType="XML"
                            type="rotate" from="0 50 50" to="360 50 50"
                            dur="43.2s" repeatCount="indefinite" />
                </line>
        
                <line x1="50" y1="50" x2="50" y2="20" stroke="black" stroke-width="1">
                    <animateTransform attributeName="transform" attributeType="XML"
                            type="rotate" from="0 50 50" to="360 50 50"
                            dur="3.6s" repeatCount="indefinite" />
                </line>
            </svg>
        <div>
    `;
    
    eventsArr.forEach(event => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add('calendar-item');
        eventDiv.innerHTML = `
            <div>
                <h1>${event.date} - ${event.type}: Мест ${event.spots}</h1>
                <h1>(${event.spots - event.seats} свободных мест)</h1>
            </div>
            <div class='sign'>
                <div>
                    <label for="number">Номер абонемента</label>
                    <input type="text" name="number" id="${event.id}">
                </div> 
                <input type="button" value="Записаться" onclick="signUp(${event.id})">
            </div>
        `;
        calendar.appendChild(eventDiv);
    });
}

function signUp(id) {
    let event = events.find(event => event.id == id);
    let user = user.find(user => user.number == document.getElementById(id).value);
    
    if(!user) {
        alert("Пользователя с данным номером абонемента не существует!");
    }

    console.log(user);
    console.log(event);

    if(event.spots - event.seats > 0) {
        if(user.isPaid == true){
            document.getElementById('svg').style.display = 'flex';
            document.getElementById('svg').style.justifyContent = "center";
            setTimeout(() => {
                events[id-1].seats++; 
                displayEvents(events);
                alert(`Пользователь ${user.number} записался на мероприятие ${event.type} ${event.date} числа`);
                document.getElementById('svg').style.display = 'none';
            }, 5000);
            
        }
        else{
            alert("Оплатите абонемент!");
        }
    }
    else{
        alert("Мест не осталось!")
    }
}
    
function filterEvents() {
    const date = document.getElementById('date').value;
    const eventType = document.getElementById('typeEvents').value;
    const minFreeSpots = document.getElementById('seats').value;

    const filteredEvents = events.filter(event => {
        return (!date || event.date === date) &&
               (!eventType || event.type.toLowerCase() === eventType.toLowerCase()) &&
               (!minFreeSpots || (event.spots - event.seats) >= minFreeSpots);
    });

    displayEvents(filteredEvents);
}

displayEvents(events);