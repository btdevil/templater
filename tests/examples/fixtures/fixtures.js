var BXT = window.BXT || {};
BXT.fixtures = BXT.fixtures || {};
BXT.fixtures.templater = {
	testTemplate: '<script type="text/html" id="test-template"><span id="test1">{{item1}}</span><span id="test2">{{item2}}</span><span id="test5">{{test5}}</span></div><div id="more-items">{{<moreItems.moreItem}}</div></script>',
	testPartialTemplate: '<script type="text/html" id="test-template-part"><span>{{item3}}</span><span>{{item4}}</span></script>'
}
BXT.fixtures.validator = {
	formHtml: '<style>.errorMsg{display:block;} .errorMsg.not-valid{display:none}</style>' +
'			<form id="register" class="address register registration-form" action="javascript:void(0)" method="post" data-validate-email="true" data-validate-passlength="true">' +
'				<fieldset class="selectField">'+
'					<label for="title" class="small-label">'+
'						<span class="required before">*</span>Title<span class="required after">*</span>'+
'					</label>'+
'					<select id="title" name="title">'+
'						<option value="Mr">Mr</option>'+
'						<option value="Mrs">Mrs</option>'+
'						<option value="Miss">Miss</option>'+
'						<option value="Ms">Ms</option>'+
'					</select>'+
'					<div id="titleErr" class="errorMsg not-valid">Please select a value</div>'+
'				</fieldset>'+
'				<fieldset class="input">'+
'					<label for="firstName">'+
'						<span class="required before">*</span>'+
'						First name<span class="required after">*</span>'+
'					</label>'+
'					<input id="first-name" name="firstName" type="text" data-mandatory="true" value="" />'+
'					<div id="first-nameErr" class="errorMsg not-valid">Please enter your first name</div>'+
'				</fieldset>'+
'				<fieldset class="input">'+
'					<label for="firstNameConfirmation">'+
'						<span class="required before">*</span>'+
'						confirm username<span class="required after">*</span>'+
'					</label>'+
'					<input id="first-nameConfirmation" name="firstNameConfirmation" type="text" value="" />'+
'					<div id="first-nameConfirmationErr" class="errorMsg not-valid">username is different</div>'+
'				</fieldset>'+
'				<fieldset class="input">'+
'					<label for="lastName">'+
'						<span class="required before">*</span>'+
'						Last name<span class="required after">*</span>'+
'					</label>'+
'					<input id="last-name" name="lastName" type="text" data-mandatory="true" value="" />'+
'					<div id="last-nameErr" class="errorMsg not-valid">Please enter your last name</div>'+
'				</fieldset>'+
'				<fieldset class="input">'+
'					<label for="email">'+
'						<span class="required before">*</span>'+
'						Email<span class="required after">*</span>'+
'					</label>'+
'					<input id="email" name="email" type="text" data-mandatory="true" value="" />'+
'					<div id="emailErr" class="errorMsg not-valid">Please type a valid email address</div>'+
'				</fieldset>'+
'				<fieldset class="input">'+
'					<label for="emailConfirmation">'+
'						<span class="required before">*</span>'+
'						Confirm Email<span class="required after">*</span>'+
'					</label>'+
'					<input id="emailConfirmation" name="emailConfirmation" type="text" value="" />'+
'					<div id="emailConfirmationErr" class="errorMsg not-valid">The email addresses do not match</div>'+
'				</fieldset>'+
'				<fieldset class="input">'+
'					<label for="password">'+
'						<span class="required before">*</span>'+
'						Password<span class="required after">*</span>'+
'					</label>'+
'					<input id="password" name="password" type="password" data-mandatory="true" value="" />'+
'					<div id="passwordErr" class="errorMsg not-valid">Please enter at least 6 characters</div>'+
'				</fieldset>'+
'				<fieldset class="input">'+
'					<label for="passwordConfirmation">'+
'						<span class="required before">*</span>'+
'						Confirm password<span class="required after">*</span>'+
'					</label>'+
'					<input id="passwordConfirmation" name="passwordConfirmation" type="password" value="" />'+
'					<div id="passwordConfirmationErr" class="errorMsg not-valid">The passwords do not match</div>'+
'				</fieldset>'+
'				<fieldset class="checkbox">'+
'					<input id="newsletter1" name="newsletter" data-inverted="false" data-mandatory="false" type="checkbox" value="true" />'+
'					<input type="hidden" name="_newsletter" value="on">'+
'					<label for="newsletter">Id like to save money, get free stuff &amp; be the first to know</label>'+
'					<div id="newsletterErr" class="errorMsg not-valid">errourzzzzzzzz</div>'+
'				</fieldset>'+
'				<fieldset class="checkbox">'+
'					<input id="offers1" name="offers" data-inverted="false" data-mandatory="false" type="checkbox" value="true" />'+
'					<input type="hidden" name="_offers" value="on">'+
'					<label for="offers">Share my details with selected parners</label>'+
'					<div id="offers1Err" class="errorMsg not-valid"></div>'+
'				</fieldset>'+
'				<fieldset class="checkbox">'+
'					<input id="terms1" name="terms" data-inverted="false" data-mandatory="true" type="checkbox" value="true" />'+
'					<input type="hidden" name="_terms" value="on">'+
'					<label for="terms">I have read and accept the PhotoBox  <a href="http://www.photobox.co.uk/content/legal/terms-of-use" target="_blank">Terms of use</a> of use and <a href="http://www.photobox.co.uk/content/legal/privacy" target="_blank">Privacy policy</a></label>'+
'					<div id="terms1Err" class="errorMsg not-valid">Please check Terms of use &amp; Privacy policy</div>'+
'				</fieldset>'+
'				<div class="controls">'+
'					<button id="submit" name="submit" class="button submitter register-submit green arrow arrow-lr" type="submit" value="Submit">'+
'						<span>Join free</span>'+
'					</button>'+
'				</div>'+
'			</form>'
}