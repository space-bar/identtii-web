const API_BASE_URL = "https://api.identtii.com/v1";

// Function Sign up form Api Integration
function getSignData() {
    let theSignForm = document.getElementById("sign-form");
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.querySelector(".phone").value;
    let business = document.getElementById("business").value;
    let category = document.getElementById("busCat").value;

    if (name == '' || email == '' || phone == '' || business == '' || category == '') {
        swal({
            icon: 'info',
            text: 'All entries are required',
            confirmButtonColor: '#23a6f0'
        })
    } else {
        let element = document.querySelector(".iti__selected-flag");
        let atts = element.attributes;
        let x = atts.title.textContent;
        let text = x.split(" ");
        let getCode = text.slice(-1);
        let code = getCode[0];


        let signOptions = {
            method: "POST",
            headers: new Headers({
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                "contactName": name,
                "email": email,
                "phoneNumber": phone,
                "businessName": business,
                "businessCategory": category,
                "countryCode": code
            })
        };

        fetch(API_BASE_URL+"/user/sign-up", signOptions)
            .then(response => {
                console.log(response.status)
                if (response.status == 200) {
                    swal("Message Sent", "Successful!", "success");
                    theSignForm.reset();
                } else {
                    swal("Oops...", "Something went wrong!", "error");
                }
            })
            .catch(error => console.log('error', error));
    }
}


// Function Contact form Api Integration
function getContactData() {
    const getForm = document.getElementById("contact-form");
    const getName = document.getElementById("getname").value;
    const getEmail = document.getElementById("getemail").value;
    const getPhone = document.getElementById("getphone").value;
    const getMessage = document.getElementById("getmessage").value;

    if (getName == '' || getEmail == '' || getPhone == '' || getMessage == '') {
        swal({
            icon: 'info',
            text: 'All entries are required!',
            confirmButtonColor: '#23a6f0'
        })
    } else {
        let contactOptions = {
            method: "POST",
            headers: new Headers({
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                "name": getName,
                "email": getEmail,
                "phoneNumber": getPhone,
                "subject": "Enquiry on Identtii",
                "message": getMessage,
                "countryCode": ""
            })
        };

        fetch(API_BASE_URL+"/user/contact-us", contactOptions)
            .then(response => {
                console.log(response.status)
                if (response.status == 200) {
                    swal("Message Sent", "Successful!", "success");
                    getForm.reset();

                } else {
                    swal("Oops...", "Something went wrong!", "error");
                }
            })

            .catch(error => console.log('error', error));
    }
}

// API Integration for search page
getResolve = (referenceId, resolutionType, resolutionInfo, resolutionRef, email) => {
    if (resolutionType === "01") {
        Swal.fire({
            title: 'Resolution',
            text: `A resolution link will be sent to ` + `${email}. ` + `Once you get it, please continue from there`,
            icon: 'info',
            confirmButtonColor: '#23a6f0',
            confirmButtonText: 'Send link',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                const url = API_BASE_URL + `/resolution/` + `${referenceId}` + `/open`;

                fetch(url, {
                    method: "PATCH",
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then((response) => {
                    if (response.status === 200) {
                        Swal.fire({
                            icon: "success",
                            text: "Resolution link sent successfully..",
                            confirmButtonColor: '#23a6f0'
                        })
                    } else {
                        Swal.fire({
                            icon: "error",
                            text: "Error sending Resolution link",
                            confirmButtonColor: '#23a6f0'
                        })
                    }
                })
            }
        })
    } else if (resolutionType === "02") {
        Swal.fire({
            title: 'Resolution',
            text: `A payment resolution link will be sent to ` + `${email}. ` + `Once you get it, please continue from there`,
            icon: 'info',
            confirmButtonColor: '#23a6f0',
            confirmButtonText: 'Send link',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                const url = API_BASE_URL + `/resolution/` + `${referenceId}` + `/open`;

                fetch(url, {
                    method: "PATCH",
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then((response) => {
                    if (response.status === 200) {
                        Swal.fire({
                            icon: "success",
                            text: "Resolution link sent successfully..",
                            confirmButtonColor: '#23a6f0'
                        })
                    } else {
                        Swal.fire({
                            icon: "error",
                            text: "Error sending Resolution link",
                            confirmButtonColor: '#23a6f0'
                        })
                    }
                })
            }
        })
    } else if (resolutionType === "03") {
        Swal.fire({
            title: 'Resolution',
            icon: 'info',
            text: `${resolutionInfo}. ` + `${resolutionRef}`,
            cancelButtonColor: '#23a6f0',
            cancelButtonText: 'OK',
            showCancelButton: true,
            showConfirmButton: false
        })
    } else {
        Swal.fire({
            title: 'Resolution Error',
            text: 'Unknown resolution method. Please contact support or update your app',
            showCancelButton: true,
            confirmButtonColor: '#23a6f0'
        })
    }
}


// Function for Search page
function getDetails(event, caller, query, view) {
    event.preventDefault();

    let pagex;
    if (caller === "search") {
        pagex = 0

        if (view == "web") {

            query = document.getElementById("details").value;

        } else {

            query = document.getElementById("mobSearchInput").value;

        }


    } else if (caller === "next") {
        pagex = parseInt(sessionStorage.getItem("page") + 1);
        if (view == "web") {

            query = document.getElementById("details").value;

        } else {

            query = document.getElementById("mobSearchInput").value;

        }


    } else if (caller === "prev") {
        pagex = parseInt(sessionStorage.getItem("page") - 1);

        if (view == "web") {

            query = document.getElementById("details").value;

        } else {

            query = document.getElementById("mobSearchInput").value;

        }

    } else if (caller === "landingSearch") {
        pagex = 0
    }

    if (query.trim() == '') {
        Swal.fire({
            icon: 'info',
            text: 'Please enter a search',
            confirmButtonColor: '#23a6f0'
        })
    } else {
        let getTheRecord = document.querySelector(".oversight");


        let url = API_BASE_URL + `/reference/search?page=` + pagex + `&pageSize=2&query=` + query

        let searchOptions = {
            method: "GET",
            headers: new Headers({
                'accept': 'application/json',
            })
        };

        fetch(url, searchOptions)
            .then(response => response.json())
            .then(result => {

                if (result.totalCount > 0) {
                    let showLine = document.querySelector(".showline")

                    getTheRecord.innerHTML = " ";

                    result.references.map((item) => {
                        getTheRecord.innerHTML += `
            <div class="search-card" id=${item.referenceId}>
                <p class="mb-5">${item.fullName}</p>
                <p><i class="fa fa-envelope mr-2"></i>${item.email}</p>
                <p><i class="fa fa-phone mr-2 mb-3"></i>${item.phoneNumber}</p>
                <a href="mailto:hi@identtii.com?subject=Inquiry"><button class="info-button">Ask for more info</button></a>
                <button class="button-resolve" onclick="getResolve('${item.referenceId}', '${item.resolution.type}', '${item.resolution.description}', '${item.resolution.value}', '${item.email}')">Resolve</button>
            </div>
            `
                    })

                    showLine.style.display = "block";

                    sessionStorage.setItem("innerhtmlHasChild", "yes")
                    sessionStorage.setItem("page", `${result.page}`)

                    // document.getElementById(getTheRecord).innerHTML = " ";


                    let getSection = document.querySelector(".section-pagination");
                    let paged = document.querySelector(".page");
                    let getActive = document.querySelector(".showPage");
                    let getActive2 = document.querySelector(".showPage2");

                    let showTotal = document.querySelector(".showTotalPage");
                    let thePrevious = document.querySelector(".get-previous");
                    let thePrevious2 = document.querySelector(".get-previous2");
                    let next = document.querySelector(".get-next");
                    let next2 = document.querySelector(".get-next2");
                    let setValue = document.querySelector(".thevalue");

                    if (result.totalCount > 2) {
                        getSection.style.display = "block";
                        // paged.style.display = "block";
                        getActive.innerHTML = `Page ` + parseInt(result.page + 1) + ` of ` + result.totalPageCount;
                        getActive2.innerHTML = `Page ` + parseInt(result.page + 1) + ` of ` + result.totalPageCount;

                    } else {
                        getSection.style.display = "none";
                        getTheRecord.style.paddingBottom = "80px";
                    }

                    if (parseInt(result.page + 1) == parseInt(result.totalPageCount)) {
                        next.disabled = true;
                        next2.disabled = true;

                    } else {
                        next.disabled = false;
                        next2.disabled = false;

                    }

                    if (parseInt(result.page) == 0) {
                        thePrevious.disabled = true;
                        thePrevious2.disabled = true;

                    } else {
                        thePrevious.disabled = false;
                        thePrevious2.disabled = false;

                    }

                } else {
                    if (result.message != null) {
                        Swal.fire({
                            icon: 'error',
                            text: result.message,
                            confirmButtonColor: '#23a6f0'
                        })
                    } else {
                        Swal.fire({
                            icon: 'info',
                            text: 'No result found yet for your search',
                            confirmButtonColor: '#23a6f0'
                        })
                    }
                }

            })

            .catch(error => console.log('error', error))
    }


}


// Api integration for resolution
function getResolution(event) {
    event.preventDefault();
    const params2 = new URLSearchParams(window.location.search)
    let referenceId = params2.get('refId');


    let primary = document.getElementById("firstPhone").value;
    let secondary = document.getElementById("secondPhone").value;

    if (primary == '' && secondary == '') {
        Swal.fire({
            icon: 'info',
            text: 'Enter atleast one phone number',
            confirmButtonColor: '#23a6f0',
        })
    } else {
        let getResolution = document.querySelector(".getFormResolution")


        let phoneNumber = []
        phoneNumber[0] = primary;
        phoneNumber[1] = secondary

        let options = {
            method: "POST",
            headers: new Headers({
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }),

            body: JSON.stringify({
                "phoneNumbers": phoneNumber

            })
        };

        let resoUrl = API_BASE_URL + `/resolution/${referenceId}/close`;

        fetch(resoUrl, options)
            .then(response => {
                if (response.ok) {

                    Swal.fire({
                        text: 'Resolution request successfully submitted.',
                        icon: 'success',
                        confirmButtonColor: '#23a6f0',
                        confirmButtonText: 'OK',
                        showCancelButton: false
                    }).then((result) => {
                        if (result.isConfirmed) {

                            window.location.href = "index.html";
                        }
                    })

                } else {
                    Swal.fire({
                        text: 'There was an error submitting this request.',
                        confirmButtonColor: '#23a6f0'
                    })
                }
            })
    }

}

// Function for Token page
function getTokenLoad() {
    const params = new URLSearchParams(window.location.search)
    let getToken = params.get('token');
    console.log(getToken);


    let getUrl = API_BASE_URL + `/resolution/${getToken}/verify`

    let searchToken = {
        method: "PATCH",
        headers: new Headers({
            'accept': 'application/json',
        })
    };

    fetch(getUrl, searchToken)
        .then(function (response) {
            console.log(response.status); // Will show you the status
            if (!response.ok) {
                window.location.href = "index.html";
            } else {
                return response.json();
            }

        })
        .then(json => {
            window.location.href = `resolution.html?refId=${json.referenceId}`
        })
        .catch(error => console.log('error', error))
}


function searchQuery(event) {
    const params = new URLSearchParams(window.location.search);
    if (params.has('query')) {
        let getQuery = params.get('query');

        let view = params.get('view');

        if (view == "web") {
            document.getElementById("details").value = getQuery;

        } else {

            document.getElementById("mobSearchInput").value = getQuery;

        }

        getDetails(event, 'landingSearch', getQuery, view)

    }

}

function searchHome(event, view) {
    event.preventDefault();
    if (view == "web") {

        getIndex = document.getElementById("indexSearch").value;

    } else {

        getIndex = document.getElementById("mobIndexSearchInput").value;


    }

    if (getIndex.trim() == '') {
        Swal.fire({
            icon: 'info',
            text: 'Please enter a search',
            confirmButtonColor: '#23a6f0'
        })
    } else {

        window.location.href = "search.html?query=" + getIndex + "&view=" + view

    }

}


// Function for app download
function getDownload(event) {
    event.preventDefault();
    var userAgent = navigator.userAgent.toLowerCase();
    var Android = userAgent.indexOf("android") > -1;

    Swal.fire({
        icon: 'info',
        text: 'App Coming Soon...',
        confirmButtonColor: '#23a6f0'
    })

    /*
    if (Android) {

        window.location.href = "https://play.google.com/store/apps/details?id=com.identtii.identtii";

    } else {

        Swal.fire({
        icon: 'info',
        text: 'IOS app Coming Soon...',
        confirmButtonColor: '#23a6f0'
    })

    }
*/

}
