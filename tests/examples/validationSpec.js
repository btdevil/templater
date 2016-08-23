describe("BXT.validation ", function () {

	beforeEach(function () {
		setFixtures(sandbox());
		$("#sandbox").append(BXT.fixtures.validator.formHtml);
		BXT.validation.form = $("form");
	});

	afterEach(function () {
		$('#sandbox').empty();
	});

	it("should run validation function on submit", function () {
		spyOn(BXT.validation, "onSubmit");
		BXT.utils.functionInitializer();
		$("#submit").trigger("click");

		expect(BXT.validation.onSubmit).toHaveBeenCalled();
	});

	it("should submit the form if none of form fields require validation", function () {
		var form = $("form");
		var spyEvent = spyOnEvent(form, "submit");

		form.find("input[data-mandatory='true']").attr("data-mandatory", "false");
		form.find("input[id*='Confirmation']").remove();
		form.attr("data-validate-email", "false");
		form.attr("data-validate-passlength", "false");

		BXT.utils.functionInitializer();
		$("#submit").trigger("click");

		expect(spyEvent).not.toHaveBeenPrevented();
	});

	it("should run mandatory validation if any mandatory fields are found", function () {
		spyOn(BXT.validation, "mandatoryValidator");
		BXT.utils.functionInitializer();
		$("#submit").trigger("click");

		expect(BXT.validation.mandatoryValidator).toHaveBeenCalled();
	});

	it("should fail validation if required fields are empty", function () {
		var form = $("form");
		var spyEvent = spyOnEvent(form, "submit");

		form.find("input[id*='Confirmation']").remove();
		form.attr("data-validate-email", "false");
		form.attr("data-validate-passlength", "false");

		BXT.utils.functionInitializer();
		$("#submit").trigger("click");

		expect(BXT.validation.isValid).toBe(false);
		expect(spyEvent).toHaveBeenPrevented();
		for (var i = 0, iLen = BXT.validation.requiredFields.length; i < iLen; i++) {
			expect($("#" + BXT.validation.requiredFields[i].id + "Err")).toBeVisible();
		}
	});

	it("should pass validation if required fields are not empty", function () {
		var form = $("form");
		var spyEvent = spyOnEvent(form, "submit");
		var reqFields = form.find('input[data-mandatory="true"]');

		form.find("input[id*='Confirmation']").remove();
		form.attr("data-validate-email", "false");
		form.attr("data-validate-passlength", "false");
		for (var i = 0, iLen = reqFields.length; i < iLen; i++){
			if (reqFields[i].type === "checkbox" && reqFields[i].getAttribute('data-inverted') === 'false') {
				reqFields[i].checked = true;
			} else if (reqFields[i].type === "checkbox" && reqFields[i].getAttribute('data-inverted') === 'true') {
				reqFields[i].checked = false;
			}
			else{
				reqFields[i].value = true;
			}
		}

		BXT.utils.functionInitializer();
		$("#submit").trigger("click");

		expect(BXT.validation.isValid).toBe(true);
		expect(spyEvent).not.toHaveBeenPrevented();
		for (var i = 0, iLen = reqFields.length; i < iLen; i++) {
			expect($("#" + reqFields[i].id + "Err")).toBeHidden();
		}
	});

	it("should run match validation if 'match' fields are found", function () {
		spyOn(BXT.validation, "matchValidator");
		BXT.utils.functionInitializer();
		$("#submit").trigger("click");

		expect(BXT.validation.matchValidator).toHaveBeenCalled();
	});

	it("should fail validation if match fields are empty", function () {
		var form = $("form");
		var spyEvent = spyOnEvent(form, "submit");

		form.find("input[data-mandatory='true']").attr("data-mandatory", "false");
		form.attr("data-validate-email", "false");
		form.attr("data-validate-passlength", "false");

		BXT.utils.functionInitializer();
		$("#submit").trigger("click");

		expect(BXT.validation.isValid).toBe(false);
		expect(spyEvent).toHaveBeenPrevented();
		for (var i = 0, iLen = BXT.validation.matchFields.length; i < iLen; i++) {
			expect($("#" + BXT.validation.matchFields[i].id + "Err")).toBeVisible();
		}

	});

	it("should fail validation if match fields do not match", function () {
		var form = $("form");
		var spyEvent = spyOnEvent(form, "submit");
		var matchFields = form.find('input[id*="Confirmation"]');
		var fieldToMatchId = "";
		var testValue = "la la";
		var testValue2 = "la la 2"

		form.find("input[data-mandatory='true']").attr("data-mandatory", "false");
		form.attr("data-validate-email", "false");
		form.attr("data-validate-passlength", "false");
		for (var i = 0, iLen = matchFields.length; i < iLen; i++) {
			matchFields[i].value = testValue;
			fieldToMatchId = matchFields[i].id.replace("Confirmation", "")
			$("#" + fieldToMatchId).val(testValue2);
		}


		BXT.utils.functionInitializer();
		$("#submit").trigger("click");

		expect(BXT.validation.isValid).toBe(false);
		expect(spyEvent).toHaveBeenPrevented();
		for (var i = 0, iLen = BXT.validation.matchFields.length; i < iLen; i++) {
			expect($("#" + BXT.validation.matchFields[i].id + "Err")).toBeVisible();
		}
	});

	it("should pass validation if match fields match", function () {
		var form = $("form");
		var spyEvent = spyOnEvent(form, "submit");
		var matchFields = form.find('input[id*="Confirmation"]');
		var fieldToMatchId = "";
		var testValue = "la la";

		form.find("input[data-mandatory='true']").attr("data-mandatory", "false");
		form.attr("data-validate-email", "false");
		form.attr("data-validate-passlength", "false");
		for (var i = 0, iLen = matchFields.length; i < iLen; i++) {
			matchFields[i].value = testValue;
			fieldToMatchId = matchFields[i].id.replace("Confirmation", "")
			$("#" + fieldToMatchId).val(testValue);
		}


		BXT.utils.functionInitializer();
		$("#submit").trigger("click");

		expect(BXT.validation.isValid).toBe(true);
		expect(spyEvent).not.toHaveBeenPrevented();
		for (var i = 0, iLen = matchFields.length; i < iLen; i++) {
			expect($("#" + matchFields[i].id + "Err")).toBeHidden();
		}
	});

	it("should fail validation if the email address is not valid", function () {
		var form = $("form");
		var spyEvent = spyOnEvent(form, "submit");
		var emailRexFields = form.find("input[id*='email']");

		form.find("input:not([id*='email'])").remove();
		form.attr("data-validate-passlength", "false");
		for (var i = 0, iLen = emailRexFields.length; i < iLen; i++) {
			emailRexFields[i].value = "this is not email 2^%^%%@@@";
		}

		BXT.utils.functionInitializer();
		$("#submit").trigger("click");

		expect(spyEvent).toHaveBeenPrevented();
		for (var i = 0, iLen = emailRexFields.length; i < iLen; i++) {
			expect($("#" + emailRexFields[i].id + "Err")).toBeVisible();
		}
	});

	it("should pass validation if the email address is valid", function () {
		var form = $("form");
		var spyEvent = spyOnEvent(form, "submit");
		var emailRexFields = form.find("input[id*='email']");

		form.find("input:not([id*='email'])").remove();
		form.attr("data-validate-passlength", "false");
		for (var i = 0, iLen = emailRexFields.length; i < iLen; i++) {
			emailRexFields[i].value = "test.tester+valid@test.com";
		}

		BXT.utils.functionInitializer();
		$("#submit").trigger("click");

		expect(spyEvent).not.toHaveBeenPrevented();
		for (var i = 0, iLen = emailRexFields.length; i < iLen; i++) {
			expect($("#" + emailRexFields[i].id + "Err")).toBeHidden();
		}
	});

	it("should fail validation if the password is less than 6 characters", function () {
		var form = $("form");
		var spyEvent = spyOnEvent(form, "submit");
		var passwordLengthFields = form.find("input[id*='password']");

		form.find("input:not([id*='password'])").remove();
		for (var i = 0, iLen = passwordLengthFields.length; i < iLen; i++) {
			passwordLengthFields[i].value = "12345";
		}

		BXT.utils.functionInitializer();
		$("#submit").trigger("click");

		expect(spyEvent).toHaveBeenPrevented();
		for (var i = 0, iLen = passwordLengthFields.length; i < iLen; i++) {
			expect($("#" + passwordLengthFields[i].id + "Err")).toBeVisible();
		}
	});

	it("should pass validation if the password is equal to or more than 6 characters", function () {
		var form = $("form");
		var spyEvent = spyOnEvent(form, "submit");
		var passwordLengthFields = form.find("input[id*='password']");

		form.find("input:not([id*='password'])").remove();
		for (var i = 0, iLen = passwordLengthFields.length; i < iLen; i++) {
			passwordLengthFields[i].value = "123456";
		}

		BXT.utils.functionInitializer();
		$("#submit").trigger("click");

		expect(spyEvent).not.toHaveBeenPrevented();
		for (var i = 0, iLen = passwordLengthFields.length; i < iLen; i++) {
			expect($("#" + passwordLengthFields[i].id + "Err")).toBeHidden();
		}
	});

	it("should clear any corrected errors on a second submission", function () {
		var form = $("form");
		var spyEvent = spyOnEvent(form, "submit");
		var matchFields = form.find('input');
		var fieldToMatchId = "";
		var testValue = "la la";

		BXT.utils.functionInitializer();
		$("#submit").trigger("click");

		expect(BXT.validation.isValid).toBe(false);
		expect(spyEvent).toHaveBeenPrevented();

		for (var i = 0, iLen = matchFields.length; i < iLen; i++) {
			matchFields[i].value = testValue;
			fieldToMatchId = matchFields[i].id;
			if (fieldToMatchId.indexOf("email") < 0 && fieldToMatchId.indexOf("password") && matchFields[i].type !== "checkbox") {
				$("#" + fieldToMatchId).val(testValue);
			} else if (matchFields[i].type === "checkbox") {
				if (matchFields[i].type === "checkbox" && matchFields[i].getAttribute('data-inverted') === 'false') {
					matchFields[i].checked = true;
				} else if (matchFields[i].type === "checkbox" && matchFields[i].getAttribute('data-inverted') === 'true') {
					matchFields[i].checked = false;
				}
			} else if (fieldToMatchId.indexOf("email") >= 0) {
				$("#" + fieldToMatchId).val("test@test.com");
			} else if (fieldToMatchId.indexOf("password") >= 0) {
				$("#" + fieldToMatchId).val("123456");
			}
		}

		$("#submit").trigger("click");

		for (var i = 0, iLen = matchFields.length; i < iLen; i++) {
			if (matchFields[i].id !== "" && !(matchFields[i].type === "checkbox" && matchFields[i].getAttribute("data-mandatory") === "false")) {
				expect($("#" + matchFields[i].id + "Err")).toBeHidden();
			}
		}

	});
});