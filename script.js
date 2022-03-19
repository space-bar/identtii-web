
let input = document.querySelector('.phone');
let input2 = document.querySelector('.phone2');


let iti = window.intlTelInput(input, {
    preferredCountries: ["ng", "co", "in", "de"],
    seperateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});

let iti2 = window.intlTelInput(input2, {
    preferredCountries: ["ng", "co", "in", "de"],
    seperateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
})





