document.addEventListener('DOMContentLoaded', function () {
    // Array of destinations for autocomplete
    var destinations = ["New York", "Paris", "London", "Tokyo", "Rome"]; // Add more destinations as needed

    // Autocomplete for destination input
    var destinationInput = document.getElementById('destination');
    var destinationList = document.getElementById('destinationList');

    destinationInput.addEventListener('input', function () {
        var inputVal = this.value.toLowerCase();
        var suggestions = destinations.filter(function (destination) {
            return destination.toLowerCase().startsWith(inputVal);
        });
        displaySuggestions(destinationList, destinationInput, suggestions);
    });

    destinationInput.addEventListener('blur', function () {
        setTimeout(function () {
            hideSuggestions(destinationList);
        }, 200); // Delay hiding suggestions to capture click on a suggestion
    });

    // Function to display suggestions
    function displaySuggestions(element, input, suggestions) {
        // Clear previous suggestions
        element.innerHTML = '';
        // Display new suggestions
        suggestions.forEach(function (suggestion) {
            var listItem = document.createElement('div');
            listItem.textContent = suggestion;
            listItem.addEventListener('click', function () {
                input.value = suggestion;
                hideSuggestions(element);
            });
            element.appendChild(listItem);
        });
        element.style.display = 'block';
        element.style.border = '1px solid #ccc'
    }

    function hideSuggestions(element) {
        element.style.display = 'none';
        element.style.border = 'none';
    }

    // Check-in and Check-out date change event
    var checkIn = document.getElementById('checkIn');
    var checkOut = document.getElementById('checkOut');
    var nights = document.getElementById('nights');
    for (var i = 1; i <= 30; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        nights.appendChild(option);
    }
    checkIn.addEventListener('change', function () {
        updateNights();
    });

    checkOut.addEventListener('change', function () {
        updateNights();
    });

    nights.addEventListener('change', function () {
        updateCheckOut();
    });

    function updateNights() {
        var checkInDate = new Date(checkIn.value);
        var checkOutDate = new Date(checkOut.value);

        if (!isNaN(checkInDate.getTime()) && !isNaN(checkOutDate.getTime()) && checkOutDate > checkInDate) {
            var newNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
            nights.innerHTML = '';
            for (var i = 1; i <= newNights; i++) {
                var option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                nights.appendChild(option);
            }

            nights.selectedIndex = newNights - 1; // Set selected value to newNights
        } else {
            nights.innerHTML = '<option value="">Select nights</option>';
        }
    }

    function updateCheckOut() {
        var checkInDate = new Date(checkIn.value);
        var nightsCount = parseInt(nights.value);
        var checkOutDate = new Date(checkInDate);
        checkOutDate.setDate(checkOutDate.getDate() + nightsCount);
        var checkOutDateString = checkOutDate.toISOString().split('T')[0];
        checkOut.value = checkOutDateString;
    }

    // Array of nationalities for autocomplete
    var nationalities = ["USA", "France", "UK", "Japan", "Italy"]; // Add more nationalities as needed

    // Autocomplete for nationality input
    var nationalityInput = document.getElementById('nationality');
    var nationalityList = document.getElementById('nationalityList');

    nationalityInput.addEventListener('input', function () {
        var inputVal = this.value.toLowerCase();
        var suggestions = nationalities.filter(function (nationality) {
            return nationality.toLowerCase().startsWith(inputVal);
        });
        displaySuggestions(nationalityList, nationalityInput, suggestions);
    });

    nationalityInput.addEventListener('blur', function () {
        setTimeout(function () {
            hideSuggestions(nationalityList);
        }, 200); // Delay hiding suggestions to capture click on a suggestion
    });


    var form = document.getElementById('travelForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevents the default form submission

        // Collect form data
        var destination = document.getElementById('destination').value;
        var checkIn = document.getElementById('checkIn').value;
        var checkOut = document.getElementById('checkOut').value;
        var nights = document.getElementById('nights').value;
        var nationality = document.getElementById('nationality').value;

        // Prepare data object
        var formData = {
            destination: destination,
            checkIn: checkIn,
            checkOut: checkOut,
            nights: nights,
            nationality: nationality
        };
        console.log("foem", formData)
        // Send data to backend
        fetch('https://your-backend-endpoint.com/save-data', {
            method: 'POST', // Change the method based on your backend API
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                // Handle the response from the backend
                if (response.ok) {
                    return response.json(); // If expecting JSON response
                } else {
                    throw new Error('Failed to send form data');
                }
            })
            .then(data => {
                // Handle success, if needed
                console.log('Form data sent successfully:', data);
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
    });

});
