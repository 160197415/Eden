			

	                    // TODO: Replace the following with your app's Firebase project configuration
                        var firebaseConfig = {
                        apiKey: "AIzaSyAqyzzi9TOJqdVT56JoEImOEIMkNygTBHY",
                        authDomain: "endless-science-333617.firebaseapp.com",
                        databaseURL: "https://endless-science-333617-default-rtdb.firebaseio.com/",
                        projectId: "endless-science-333617",
                        storageBucket: "endless-science-333617.appspot.com",
                        messagingSenderId: "845878768858",
                        appId: "1:845878768858:web:8696ba58e19a4b8427a1e3",
                    }; 
                    firebase.initializeApp(firebaseConfig);
                        

                //--- Now to get all the data ---//
            
            function selectAllData(){
               firebase.database().ref('concernForm').once('value',
                function(allRecords){
                    allRecords.forEach(
                        function(currentRecord){
                            var name = currentRecord.val().userName;
                            var email = currentRecord.val().userEmail;
                            var environmentCoordinates = currentRecord.val().environmentCoordinates;
                            var environmentalConcernType = currentRecord.val().environmentalConcernType;
                            var details = currentRecord.val().details;
                            addItemsToTable(name,email,environmentCoordinates,environmentalConcernType,details);
                        }
                    );
                });
            }

            window.onload = selectAllData;

            //--Filling out the table ----//

            function addItemsToTable(name,email,enviromentCoordinates,environmentalConcernType,details){
                var tbody = document.getElementById('tbody1');
                var trow = document.createElement('tr');
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                var td3 = document.createElement('td');
                var td4 = document.createElement('td');
                var td5 = document.createElement('td');
                td1.innerHTML = name;
                td2.innerHTML = email;
                td3.innerHTML = enviromentCoordinates;
                td4.innerHTML = environmentalConcernType;
                td5.innerHTML = details;
                trow.appendChild(td1);
                trow.appendChild(td2);
                trow.appendChild(td3);
                trow.appendChild(td4);
                trow.appendChild(td5);
                tbody.appendChild(trow);

            }
