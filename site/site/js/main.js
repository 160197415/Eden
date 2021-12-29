
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqyzzi9TOJqdVT56JoEImOEIMkNygTBHY",
    authDomain: "endless-science-333617.firebaseapp.com",
    databaseURL: "https://endless-science-333617-default-rtdb.firebaseio.com/",
    projectId: "endless-science-333617",
    storageBucket: "endless-science-333617.appspot.com",
    messagingSenderId: "845878768858",
    appId: "1:845878768858:web:8696ba58e19a4b8427a1e3",
};

firebase.initializeApp(firebaseConfig);
// const db = firebase.database();

/**Initialising firebase */

  let messagesRef = firebase.database().ref('concernForm');

/**Listen for form submit */

document.querySelector(".contact-form").addEventListener("submit", submitForm);


//Submit form
function submitForm (e){
    e.preventDefault();

    //We want to get all the values

    let userName = document.querySelector(".name").value;
    let userEmail = document.querySelector(".email").value;
    
    let environmentCoordinates = document.querySelector(".position").value;

    let environmentalConcernType = document.querySelector(".concernOption").value;
    let details = document.querySelector(".message").value;

    console.log(userName, userEmail, environmentCoordinates, environmentalConcernType, details);

    writeUserData(userName, userEmail, environmentCoordinates, environmentalConcernType, details);
    document.querySelector(".contact-form").reset();
}
//Save info to firebase
function writeUserData(userName, userEmail, environmentCoordinates, environmentalConcernType, details) {
    let newConcernForm = messagesRef.push();
    newConcernForm.set({
        userName: userName,
        userEmail: userEmail,
        environmentCoordinates: environmentCoordinates,
        environmentalConcernType: environmentalConcernType,
        details: details
    });
  }
