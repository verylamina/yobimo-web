const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSwIgd1OjBu_x9MXZu7-_hb4HLVsyhjC8Sgh2CqYiotH3XQ7-vbq31lf26okK2iYMx-4Ti9kxUZC1bd/pub?output=csv';
        
const loadingScreen = document.getElementById('loading');

async function fetchSheetData() {
    try {
        const response = await fetch(sheetUrl);
        loadingScreen.classList.remove('hidden');
        const data = await response.text();
        const rows = data.split('\n');
        loadingScreen.classList.add('hidden');

        // Fetch values from A2 to A7 (for names) and B3 to B7 (for progress values)
        const progressNames = rows.slice(2, 7).map(row => {
            const cells = row.split(',');
            return cells[0]; // Get value from the first column (A)
        });

        const progressValues = rows.slice(2, 7).map(row => {
            const cells = row.split(',');
            return cells[1] ? parseInt(cells[1]) : 0; // Get value from the second column (B)
        });

        // Update your progress bars and names here
        updateProgressBars(progressNames, progressValues);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updateProgressBars(names, values) {
    const progressBars = [
        document.getElementById('progress-bar1'),
        document.getElementById('progress-bar2'),
        document.getElementById('progress-bar3'),
        document.getElementById('progress-bar4'),
        document.getElementById('progress-bar5')
    ];

    const progressNames = [
        document.getElementById('progress-name1'),
        document.getElementById('progress-name2'),
        document.getElementById('progress-name3'),
        document.getElementById('progress-name4'),
        document.getElementById('progress-name5')
    ];

    values.forEach((value, index) => {
        const percentage = parseInt(value);
        const progressBar = progressBars[index];
        const progressName = progressNames[index];

        // Set progress bar width and text
        progressBar.style.width = `${percentage}%`;
        progressBar.textContent = `${percentage}%`;

        // Set the name of the progress bar
        progressName.textContent = names[index];

        // Set color based on conditions
        if (percentage >= 90) {
            progressBar.style.backgroundColor = '#57ae2b';
        } else if (percentage >= 70) {
            progressBar.style.backgroundColor = '#5d31aa';
        } else if (percentage >= 60) {
            progressBar.style.backgroundColor = '#46c7c3';
        } else if (percentage >= 50) {
            progressBar.style.backgroundColor = '#5e5e5e';
        } else if (percentage >= 40) {
            progressBar.style.backgroundColor = '#bdb50f';
        } else if (percentage >= 20) {
            progressBar.style.backgroundColor = '#0f4fbd';
        } else {
            progressBar.style.backgroundColor = '#212121'; // Default color if less than 20%
        }
    });
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}



function openModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
    setTimeout(() => {
        modal.querySelector('.modal-content').classList.add('zoom');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
    modal.querySelector('.modal-content').classList.remove('zoom');
}

function confirmSubmit() {
    window.location.href = "https://forms.gle/H3gf8qCZMdF39aUj8"; // Redirect to form
}

fetchSheetData();