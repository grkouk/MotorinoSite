/* global moment */
/* global toastr */

$("#fillRequirementsModal").on("show.bs.modal", function (event) {
	$("#spinIcon").hide();
	var dateFrom = document.getElementById("dateFrom");
	var dateTo = document.getElementById("dateTo");
	dateFrom.value = moment().format("YYYY-MM-DD");
	dateTo.value = moment().add(3, "days").format("YYYY-MM-DD");
});

var saveButtonClicked = false;
$("#requirementsModalSaveButton").on("click", function () {
	if (saveButtonClicked) {
		console.log("Ignoring button click");
		return;
	}

	saveButtonClicked = true;
	var myForm = document.getElementById("requirementsModalForm");
	var dateFrom = document.getElementById("dateFrom");
	var dateTo = document.getElementById("dateTo");
	var eMail = document.getElementById("inputEmail");
	var customerName = document.getElementById("customerName");
	
	//var inputCity = document.getElementById("inputCity");
	var inputCountry = document.getElementById("inputCountry");
	var roomType = document.getElementById("bikeType");


	if (dateFrom.value > dateTo.value) {

		console.log("date from is graiter then date to");
	}
	if (myForm.checkValidity() === false) {
		saveButtonClicked = false;
		toastr.error("Please correct all the errors!", "Motorino", {
			progressBar: true,
			positionClass: "toast-bottom-center"
		});
	} else {
		//Testapi varsion
		var formData = {
			RequestDate: moment().format("YYYY-MM-DD"),
			RequesterEmail: eMail.value,
			RequesterName: customerName.value,
			// Adults: inputAdults.value,
			// Children: inputChildren.value,
			// City
			Country: inputCountry.value,
			RoomType: roomType.value,
			DateFrom: dateFrom.value,
			DateTo: dateTo.value
		};
		//var uri = 'http://localhost:60928/api/RoomQuoteRequests'
		var uri = "http://testapi.potos.tours/api/RoomQuoteRequests";
		$("#spinIcon").show();
		var formDataJSON = JSON.stringify(formData);
		var jqxhr = $.ajax({
			url: uri,
			type: "POST",
			data: formDataJSON,
			contentType: "application/json",
			success: function () {
				console.log("success in post call ");
				$("#spinIcon").hide();
				$("#fillRequirementsModal").modal("hide");
				saveButtonClicked = false;
				toastr.success("Thank you for your request!", "Motorino", {
					progressBar: true,
					positionClass: "toast-bottom-center"
				});
			},
			error: function () {
				saveButtonClicked = false;
				$("#spinIcon").hide();
				toastr.error("There was an error with your request. Please try again later","Motorino",{
					progressBar: true,
					positionClass: "toast-bottom-center"
				});
				console.log("error in post call ");
			}
		});
	}
	myForm.classList.add("was-validated");
});
//#region 
// function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     var expires = "expires="+d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for(var i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return '';
// }
// function isTextFieldEmpty(fieldId) {
//     var tField = document.getElementById(fieldId);
//     var $tField = $("#" + fieldId);
//     if ($tField.val() == null || $tField.val() == "") {
//         // $tField.addClass("form-control-danger");
//         tField.setCustomValidity('Error Message');
//         return true;
//     } else {
//         //$tField.removeClass("form-control-danger")
//         tField.setCustomValidity('');
//         return false;
//     }
// }
//#endregion