
describe("Boxtop namespace", function () {
	it("should be defined", function () {
		expect(BXT).toBeDefined();
	})
});

var basketFixtureVars = {
	nodeId: '1873ae63-d719-4edb-8dd1-196795199336',
	basketId: '17559535',
	unitId: '421943',
	unitWithUpsellId: '415629',
	unitWithoutUpsellId: '421943'
}

describe("basketUtil functions", function () {
	beforeEach(function () {
		setFixtures(sandbox());
	});

	afterEach(function () {
		$('#sandbox').empty();
	});

	it("BXT.basketUtil should be defined", function () {
		expect(BXT.basketUtil).toBeDefined();
	});
	it("BXT.basketUtil.sendDeleteRequest should be defined", function () {
		expect(BXT.basketUtil.removeDeleteNotification).toBeDefined();
	});
	it("BXT.basketUtil.sendQuantityChangeRequest should be defined", function () {
		expect(BXT.basketUtil.sendQuantityChangeRequest).toBeDefined();
	});

	describe("getUnitId", function () {
		it("should return part of argument string after last '-' ", function () {
			expect(BXT.basketUtil.getUnitId('unit-test-15')).toBe('15');
			expect(BXT.basketUtil.getUnitId('')).toBe('');
		});
	});

	describe("getNodeId", function () {
		it("should get id from element with id='node-{id}'", function () {
			$("#sandbox").append(BXT.fixtures.basket.mainBasket);
			expect(BXT.basketUtil.getNodeId()).toBe(basketFixtureVars.nodeId);
		});
	});

	describe("getBasketId", function () {
		it("should get id from element with id='basket-{id}'", function () {
			$("#sandbox").append(BXT.fixtures.basket.mainBasket);
			expect(BXT.basketUtil.getBasketId()).toBe(basketFixtureVars.basketId);
		});
	});

	describe("getIdFromElement", function () {
		it("should get id from element with id contain prefix from argument", function () {
			$("#sandbox").append(BXT.fixtures.basket.mainBasket);
			expect(BXT.basketUtil.getIdFromElement('node')).toBe(basketFixtureVars.nodeId);
			expect(BXT.basketUtil.getIdFromElement('basket')).toBe(basketFixtureVars.basketId);
		});
	});

	describe("getBasePath", function () {
		it("should return base url for AJAX request", function () {
			$("#sandbox").append(BXT.fixtures.basket.mainBasket);
			expect(BXT.basketUtil.getBasePath()).toMatch('\\/ajax/basket-ajax\\/item-ajax\\?basketId=' +
				basketFixtureVars.basketId + '&nid=' + basketFixtureVars.nodeId);
		});
	});

	describe("updateBasketView", function () {
		beforeEach(function () {
			$("#sandbox").append(BXT.fixtures.basket.mainBasket);
		});

		it("should update items total", function () {
			BXT.basketUtil.updateBasketView({itemsTotal:2});
			expect($('#items-total .value').text()).toBe('2');
		});
		it("should update items count", function () {
			BXT.basketUtil.updateBasketView({itemsCount:2});
			expect($('.basket-summary .items-count').text()).toBe('2 items');
			BXT.basketUtil.updateBasketView({itemsCount:1});
			expect($('.basket-summary .items-count').text()).toBe('1 item');
		});
		it("should update total chargeable", function () {
			BXT.basketUtil.updateBasketView({totalChargeable:2});
			expect($('#total-price .value').text()).toBe('2');
			expect($('.basket-summary .total-chargeable').text()).toBe('2');
		});
		it("should update min despatch date", function () {
			BXT.basketUtil.updateBasketView({minDespatchDate:2});
			expect($('#min-despatch-date').text()).toBe('2');
		});
		it("should update max despatch date", function () {
			BXT.basketUtil.updateBasketView({maxDespatchDate:2});
			expect($('#max-despatch-date').text()).toBe('2');
		});
		it("should update cash discount total", function () {
			BXT.basketUtil.updateBasketView({cashDiscountTotal:2});
			expect($('#cash-discount-total .modal-value').text()).toBe('2');
		});
		it("should update monetary discount total", function () {
			BXT.basketUtil.updateBasketView({monetaryDiscountTotal:2});
			expect($('#monetary-discount-total .modal-value').text()).toBe('2');
		});
		it("should update offer total", function () {
			BXT.basketUtil.updateBasketView({offerTotal:2});
			expect($('#offer-total .modal-value').text()).toBe('2');
		});
		it("should call updateBasketDeliveryCost", function () {
			spyOn(BXT.basketUtil, "updateBasketDeliveryCost");
			BXT.basketUtil.updateBasketView({});
			expect(BXT.basketUtil.updateBasketDeliveryCost).toHaveBeenCalled();
		});
		it("should set correct visibility of cash-discount-total", function () {
			BXT.basketUtil.updateBasketView({cashDiscountTotal:2});
			expect($('#cash-discount-total').hasClass('hidden')).toBe(false);
			BXT.basketUtil.updateBasketView({});
			expect($('#cash-discount-total').hasClass('hidden')).toBe(true);
		});
		it("should set correct visibility of monetary-discount-total", function () {
			BXT.basketUtil.updateBasketView({monetaryDiscountTotal:2});
			expect($('#monetary-discount-total').hasClass('hidden')).toBe(false);
			BXT.basketUtil.updateBasketView({});
			expect($('#monetary-discount-total').hasClass('hidden')).toBe(true);
		});
		it("should call updateBasketOffer", function () {
			spyOn(BXT.basketUtil, "updateBasketOffer");
			BXT.basketUtil.updateBasketView({});
			expect(BXT.basketUtil.updateBasketOffer).toHaveBeenCalled();
		});
		it("should set correct visibility of estimate-date", function () {
			BXT.basketUtil.updateBasketView({items:[{}]});
			expect($('#estimate-date').hasClass('hidden')).toBe(false);
			BXT.basketUtil.updateBasketView({});
			expect($('#estimate-date').hasClass('hidden')).toBe(true);
		});
		it("should call updateBasketUnits", function () {
			spyOn(BXT.basketUtil, "updateBasketUnits");
			BXT.basketUtil.updateBasketView({});
			expect(BXT.basketUtil.updateBasketUnits).toHaveBeenCalled();
		});


	});

	describe("updateBasketUnits", function () {
		beforeEach(function () {
			$("#sandbox").append(BXT.fixtures.basket.mainBasket);
		});
		it("should call updateBasketUnit if ids match", function () {
			spyOn(BXT.basketUtil, "updateBasketUnit");
			BXT.basketUtil.updateBasketUnits({items:[{id: basketFixtureVars.unitId}]});
			expect(BXT.basketUtil.updateBasketUnit).toHaveBeenCalled();
		});
		it("should not call updateBasketUnit if ids don't match", function () {
			spyOn(BXT.basketUtil, "updateBasketUnit");
			BXT.basketUtil.updateBasketUnits({items:[{id:'1'}]});
			BXT.basketUtil.updateBasketUnits({});
			expect(BXT.basketUtil.updateBasketUnit).not.toHaveBeenCalled();
		});
		it("should remove basket unit if ids don't match", function () {
			BXT.basketUtil.updateBasketUnits({});
			expect($("#basketUnit-2").length).toBe(0);
		});
	});

	describe("updateBasketUnit", function () {
		beforeEach(function () {
			$("#sandbox").append(BXT.fixtures.basket.mainBasket);
		});

		it("should update unit price", function () {
			BXT.basketUtil.updateBasketUnit({id:basketFixtureVars.unitId, unitPrice:2});
			expect($('#basketUnit-' + basketFixtureVars.unitId + ' #unitPrice-' + basketFixtureVars.unitId +
				' .current').text()).toBe('2');
		});
		it("should update unit base price", function () {
			BXT.basketUtil.updateBasketUnit({id:basketFixtureVars.unitId, basePrice:2});
			expect($('#basketUnit-' + basketFixtureVars.unitId + ' #unitBasePrice-' + basketFixtureVars.unitId +
				' .current').text()).toBe('2');
		});
		it("should update unit total price", function () {
			BXT.basketUtil.updateBasketUnit({id:basketFixtureVars.unitId, total:2});
			expect($('#basketUnit-' + basketFixtureVars.unitId + ' #price-' + basketFixtureVars.unitId).text()).toBe('2');
		});
		it("should update unit quantity", function () {
			BXT.basketUtil.updateBasketUnit({id:basketFixtureVars.unitId, quantity:2});
			expect($('#basketUnit-' + basketFixtureVars.unitId + ' #quantityInput-' + basketFixtureVars.unitId).val()).toBe('2');
			expect($('#basketUnit-' + basketFixtureVars.unitId + ' #quantityInput-' + basketFixtureVars.unitId).data('value')).toBe(2);
		});
		it("should call updateUnitUpsell", function () {
			spyOn(BXT.basketUtil, "updateUnitUpsell");
			BXT.basketUtil.updateBasketUnit({id: basketFixtureVars.unitId});
			expect(BXT.basketUtil.updateUnitUpsell).toHaveBeenCalled();
		});
		it("should update unit credit", function () {
			BXT.basketUtil.updateBasketUnit({id:basketFixtureVars.unitId});
			expect($("body").find('#unit-credit-' + basketFixtureVars.unitId).hasClass('hidden')).toBe(true);
			BXT.basketUtil.updateBasketUnit({id:basketFixtureVars.unitId, quantityFree:20});
			expect($("body").find('#unit-credit-' + basketFixtureVars.unitId).hasClass('hidden')).toBe(false);
			BXT.basketUtil.updateBasketUnit({id:basketFixtureVars.unitId, creditsAvailable:true});
			expect($("body").find('#unit-credit-' + basketFixtureVars.unitId).hasClass('hidden')).toBe(false);
			BXT.basketUtil.updateBasketUnit({id:basketFixtureVars.unitId, creditsAllowed:true, quantityFree:20, creditSaving:'20'});
			expect($("body").find('#unit-credit-' + basketFixtureVars.unitId + ' .value').hasClass('visuallyhidden')).toBe(false);
			expect($("body").find('#unit-credit-' + basketFixtureVars.unitId + ' .value .modal-value').text()).toBe('20');
			expect($("body").find('#unit-credit-' + basketFixtureVars.unitId + ' #item-credits-allowed-'
				+ basketFixtureVars.unitId).data('previous-value')).toBe(true);
			BXT.basketUtil.updateBasketUnit({id:basketFixtureVars.unitId, creditsAllowed:false, quantityFree:20, creditSaving:'20'});
			expect($("body").find('#unit-credit-' + basketFixtureVars.unitId + ' .value').hasClass('visuallyhidden')).toBe(true);
			expect($("body").find('#unit-credit-' + basketFixtureVars.unitId + ' #item-credits-allowed-'
				+ basketFixtureVars.unitId).data('previous-value')).toBe(false);
		});
		it("should update unit options", function () {
			BXT.basketUtil.updateBasketUnit({id:basketFixtureVars.unitId, quantityFree:20});
			var unit = $('#basketUnit-' + basketFixtureVars.unitId);
			expect(unit.find('#additional-price-tree-' + basketFixtureVars.unitId).hasClass('visuallyhidden')).toBe(true);
			expect(unit.find('#additional-price-' + basketFixtureVars.unitId).hasClass('visuallyhidden')).toBe(true);
			expect(unit.find('.description').hasClass('has-options')).toBe(false);
			BXT.basketUtil.updateBasketUnit({id:basketFixtureVars.unitId});
			expect(unit.find('#additional-price-tree-' + basketFixtureVars.unitId).hasClass('visuallyhidden')).toBe(true);
			expect(unit.find('#additional-price-' + basketFixtureVars.unitId).hasClass('visuallyhidden')).toBe(false);
			expect(unit.find('.description').hasClass('has-options')).toBe(false);
			BXT.basketUtil.updateBasketUnit({id:basketFixtureVars.unitId, namedOptionsList:[{}]});
			expect(unit.find('#additional-price-tree-' + basketFixtureVars.unitId).hasClass('visuallyhidden')).toBe(false);
			expect(unit.find('.description').hasClass('has-options')).toBe(true);
			BXT.basketUtil.updateBasketUnit({id:basketFixtureVars.unitId, extraPagesOption:{}});
			expect(unit.find('#additional-price-tree-' + basketFixtureVars.unitId).hasClass('visuallyhidden')).toBe(false);
			expect(unit.find('.description').hasClass('has-options')).toBe(true);
		});
	});
	describe("updateBasketOffer", function () {
		beforeEach(function () {
			$("#sandbox").append(BXT.fixtures.basket.mainBasket);
		});

		it("should update basket offer", function () {
			var offerTotal = $('#offer-total');
			var offerSuccess = $('#offer-success');
			var noOfferMessage = $('#no-offer-code-message');
			BXT.basketUtil.updateBasketOffer({});
			expect(offerTotal.hasClass('hidden')).toBe(true);
			expect(offerSuccess.hasClass('visuallyhidden')).toBe(true);
			expect(noOfferMessage.hasClass('visuallyhidden')).toBe(false);
			BXT.basketUtil.updateBasketOffer({currentOffer:{}});
			expect(offerTotal.hasClass('hidden')).toBe(true);
			expect(offerSuccess.hasClass('visuallyhidden')).toBe(true);
			expect(noOfferMessage.hasClass('visuallyhidden')).toBe(false);
			BXT.basketUtil.updateBasketOffer({currentOffer:{code:'BXT1', expiryDate: 'expiry date'}});
			expect(offerTotal.hasClass('hidden')).toBe(false);
			expect(offerSuccess.hasClass('visuallyhidden')).toBe(false);
			expect(noOfferMessage.hasClass('visuallyhidden')).toBe(true);
			expect(offerTotal.find('#offer-code').text()).toBe('BXT1');
			expect(offerSuccess.find('#offer-code-success').text()).toBe('BXT1');
		});
	});
	describe("updateBasketDeliveryCost", function () {
		beforeEach(function () {
			$("#sandbox").append(BXT.fixtures.basket.mainBasket);
		});

		it("should update basket delivery cost", function () {
			var estimatedDelivery = $('#estimated-delivery');
			var estimatedDeliveryValue = estimatedDelivery.find('.value');
			BXT.basketUtil.updateBasketDeliveryCost({estimatedDeliveryCost:'10$'});
			expect(estimatedDelivery.hasClass('discount')).toBe(false);
			expect(estimatedDeliveryValue.text()).toBe('10$');
			BXT.basketUtil.updateBasketDeliveryCost({freeDelivery:true});
			expect(estimatedDelivery.hasClass('discount')).toBe(true);
			expect(estimatedDeliveryValue.text()).toBe(estimatedDeliveryValue.attr('data-free-message'));
		});
	});
	describe("updateUnitUpsell", function () {
		beforeEach(function () {
			$("#sandbox").append(BXT.fixtures.basket.mainBasket);
		});

		it("should update unit upsell remove link visibility", function () {
			BXT.basketUtil.updateUnitUpsell({id:basketFixtureVars.unitId, basketItemUpsell: {upsell: {active:true}}});
			expect($('#remove-upsell-' + basketFixtureVars.unitId).hasClass('hidden')).toBe(false);
			BXT.basketUtil.updateUnitUpsell({id:basketFixtureVars.unitId, upsell: {}});
			expect($('#remove-upsell-' + basketFixtureVars.unitId).hasClass('hidden')).toBe(true);
			BXT.basketUtil.updateUnitUpsell({id:basketFixtureVars.unitId});
			expect($('#remove-upsell-' + basketFixtureVars.unitId).hasClass('hidden')).toBe(true);
		});
		it("should update unit upsell", function () {
			BXT.basketUtil.updateUnitUpsell({unitPrice: 'unit price',id:basketFixtureVars.unitId, productName: 'product name',basketItemUpsell:
			{upsell: {active:true, id:5, name: 'upsell name'}, unitPrice: 'upsell price'}});
			expect($('#upsell-' + basketFixtureVars.unitId).hasClass('hidden')).toBe(false);
			expect($('#upsell-' + basketFixtureVars.unitId + ' .title').text()).toBe('product name');
			expect($('#upsell-' + basketFixtureVars.unitId + ' .sub-title').text()).toBe('upsell name');
			expect($('#upsell-' + basketFixtureVars.unitId + ' .old').text()).toBe('unit price');
			expect($('#upsell-' + basketFixtureVars.unitId + ' .current').text()).toBe('upsell price');
			BXT.basketUtil.updateUnitUpsell({id:basketFixtureVars.unitId, upsell: {}});
			expect($('#upsell-' + basketFixtureVars.unitId).hasClass('hidden')).toBe(true);
			BXT.basketUtil.updateUnitUpsell({id:basketFixtureVars.unitId});
			expect($('#upsell-' + basketFixtureVars.unitId).hasClass('hidden')).toBe(true);
		});
		it("should update unit upsell button", function () {
			BXT.basketUtil.updateUnitUpsell({id:basketFixtureVars.unitId, basketItemUpsell: {upsell: {active:true, id:5}}});
			expect($('#upsell-promotion-button-' + basketFixtureVars.unitId).hasClass('hidden')).toBe(true);
			BXT.basketUtil.updateUnitUpsell({id:basketFixtureVars.unitId, upsell: {}});
			expect($('#upsell-promotion-button-' + basketFixtureVars.unitId).hasClass('hidden')).toBe(false);
			BXT.basketUtil.updateUnitUpsell({id:basketFixtureVars.unitId});
			expect($('#upsell-promotion-button-' + basketFixtureVars.unitId).hasClass('hidden')).toBe(true);
		});
	});

	describe("showDeleteConfirmationPopup", function () {
		beforeEach(function () {
			$("#sandbox").append(BXT.fixtures.basket.mainBasket);
		});
		it("should call showConfirmationPopup with removal contentId if no upsell", function () {
			spyOn(BXT.basketUtil, "showConfirmationPopup");
			BXT.basketUtil.showDeleteConfirmationPopup(basketFixtureVars.unitWithoutUpsellId);
			expect(BXT.basketUtil.showConfirmationPopup).toHaveBeenCalledWith(basketFixtureVars.unitWithoutUpsellId, 'removal', jasmine.any(Function));
		});
		it("should call showConfirmationPopup with removal contentId if unit has upsell", function () {
			spyOn(BXT.basketUtil, "showConfirmationPopup");
			BXT.basketUtil.showDeleteConfirmationPopup(basketFixtureVars.unitWithUpsellId);
			expect(BXT.basketUtil.showConfirmationPopup).toHaveBeenCalledWith(basketFixtureVars.unitWithUpsellId, 'removal-with-upsell', jasmine.any(Function));
		});
	});

	describe("showDeleteUpsellConfirmationPopup", function () {
		it("should call showConfirmationPopup", function () {
			$("#sandbox").append(BXT.fixtures.basket.mainBasket);
			spyOn(BXT.basketUtil, "showConfirmationPopup");
			BXT.basketUtil.showDeleteUpsellConfirmationPopup(basketFixtureVars.unitWithUpsellId, 10);
			expect(BXT.basketUtil.showConfirmationPopup).toHaveBeenCalledWith(basketFixtureVars.unitWithUpsellId, 'upsell', jasmine.any(Function), [11,
				$('#basketUnit-' + basketFixtureVars.unitWithUpsellId + ' .unit-header .title' ).text()]);
		});
	});
	describe("showConfirmationPopup", function () {
		beforeEach(function () {
			$("#sandbox").append(BXT.fixtures.basket.mainBasket);
		});
		it("should show modal if !isPalm", function () {
			BXT.utils.isPalm = false;
			BXT.basketUtil.showConfirmationPopup(basketFixtureVars.unitId, 'removal', function(){}, ['val1', 'val2']);
			expect($('#confirmation-modal-title').text()).toBe('Remove this item from your basket');
			expect($('#confirmation-modal').css('display')).toBe('block');
			expect($('#confirmation-modal-information').text()).toBe('Are you sure you want to remove the selected item(s)?');
			expect($('#basketUnit-' + basketFixtureVars.unitId + ' #confirmation-notification').length).toBe(0);
		});
		it("should show notification if isPalm", function () {
			BXT.utils.isPalm = true;
			BXT.basketUtil.showConfirmationPopup(basketFixtureVars.unitId, 'removal', function(){}, ['val1', 'val2']);
			expect($('#basketUnit-' + basketFixtureVars.unitId + ' #confirmation-notification-information').text()).toBe('Are you sure you want to remove the selected item(s)?');
		});
	});
	describe("sendDeleteRequest", function () {
		it("should call AJAX request", function () {
			spyOn($, "ajax");
			BXT.basketUtil.sendDeleteRequest(2);
			expect($.ajax).toHaveBeenCalledWith(BXT.basketUtil.getBasePath() + '&itemId=2', jasmine.any(Object));
		});
	});
	describe("sendQuantityChangeRequest", function () {
		it("should call AJAX request", function () {
			spyOn($, "ajax");
			BXT.basketUtil.sendQuantityChangeRequest(2, 2);
			expect($.ajax).toHaveBeenCalledWith(BXT.basketUtil.getBasePath() + '&itemId=2', jasmine.any(Object));
		});
	});
});

describe("basket functions", function () {
	beforeEach(function () {
		setFixtures(sandbox());
	});

	afterEach(function () {
		$('#sandbox').empty();
	});
	it("BXT.basket should be defined", function () {
		expect(BXT.basket).toBeDefined();
	});

	describe("init", function () {
		beforeEach(function () {	
		});
		it("Should run if the html element is present", function () {
			$("#sandbox").append(BXT.fixtures.basket.mainBasket);
			spyOn(BXT.basket.init, 'call').andCallThrough();
			BXT.utils.functionInitializer();
			expect(BXT.basket.init.call).toHaveBeenCalled();
		});

		it("Should run not if the html element not is present", function () {
			spyOn(BXT.basket.init, 'call').andCallThrough();
			BXT.utils.functionInitializer();
			expect(BXT.basket.init.call).not.toHaveBeenCalled();
		});

		it("Should copy text and href from bottom-controls to controlls-mobile", function () {
			
			BXT.basket.init();
			expect($('#controlls-mobile .c-out span').text()).toBe($('#bottom-controls .c-out span').text());
			expect($('#controlls-mobile .c-out').attr('href')).toBe($('#bottom-controls .c-out').attr('href'));
		});
		it("Should listen remove link click", function () {
			
			spyOn(BXT.basketUtil, 'showDeleteConfirmationPopup');
			$('#deleteUnit-' + basketFixtureVars.unitId).trigger('click');
			expect(BXT.basketUtil.showDeleteConfirmationPopup).toHaveBeenCalled;
		});
		it("Should listen remove icon click", function () {
			
			spyOn(BXT.basketUtil, 'showDeleteConfirmationPopup');
			$('#removeIcon-' + basketFixtureVars.unitId).trigger('click');
			expect(BXT.basketUtil.showDeleteConfirmationPopup).toHaveBeenCalled;
		});
	});
});

describe("basketOptions functions", function () {
	beforeEach(function () {
		setFixtures(sandbox());
	});

	afterEach(function () {
		$('#sandbox').empty();
	});
	it("BXT.basketOptions should be defined", function () {
		expect(BXT.basketOptions).toBeDefined();
	});

	describe("init", function () {
		beforeEach(function() {
			spyOn(BXT.basketOptions.init, 'call').andCallThrough();
		});

		it("Should run if the html element is present", function () {
			$("#sandbox").append(BXT.fixtures.basket.mainBasket);
			BXT.utils.functionInitializer();
			expect(BXT.basketOptions.init.call).toHaveBeenCalled();
		});

		it("Should run not if the html element not is present", function () {
			BXT.utils.functionInitializer();
			expect(BXT.basketOptions.init.call).not.toHaveBeenCalled();
		});

		it("Should call hideAllOptions", function () {
			spyOn(BXT.basketOptions, 'hideAllOptions');
			BXT.basketOptions.init();
			expect(BXT.basketOptions.hideAllOptions).toHaveBeenCalled;
		});
		it("Should listen options button click and close if open", function () {
			$("#sandbox").append(BXT.fixtures.basket.basketOpen1);
			spyOn(BXT.basketOptions, 'hideOptions');
			BXT.basketOptions.init();
			$('#options-button-2').trigger('click');
			expect(BXT.basketOptions.hideOptions).toHaveBeenCalled();
		});
		it("Should listen options button click and open if closed", function () {
			$("#sandbox").append(BXT.fixtures.basket.basketOpen2);
			spyOn(BXT.basketOptions, 'showOptions');
			BXT.basketOptions.init();
			$('#options-button-2').trigger('click');
			expect(BXT.basketOptions.showOptions).toHaveBeenCalled();
		});
	});
	describe("hideAllOptions", function () {
		it("Should call hideOptions for every unit", function () {
			$("#sandbox").append(BXT.fixtures.basket.basketOpen3);
			spyOn(BXT.basketOptions, 'hideOptions');
			BXT.basketOptions.hideAllOptions();
			expect(BXT.basketOptions.hideOptions).toHaveBeenCalledWith('2');
			expect(BXT.basketOptions.hideOptions).toHaveBeenCalledWith('3');
			expect(BXT.basketOptions.hideOptions).toHaveBeenCalledWith('4');
		});
	});
	describe("showOptions", function () {
		it("Should show unit options", function () {
			$("#sandbox").append(BXT.fixtures.basket.basketOpen4);
			BXT.basketOptions.showOptions(2);
			expect($('#basketUnit-2 .options-vertical-line').is(':visible')).toBe(true);
			expect($('#basketUnit-2 .additional-price').hasClass('accessibility--palm')).toBe(false);
			expect($('#unitBasePrice-2').is(':visible')).toBe(true);
			expect($('#options-button-2 span').hasClass('icon-options-close')).toBe(true);
			expect($('#options-button-2 span').hasClass('icon-options-open')).toBe(false);
		});
	});
	describe("hideOptions", function () {
		it("Should hide unit options", function () {
			$("#sandbox").append(BXT.fixtures.basket.basketOpen5);
			BXT.basketOptions.hideOptions(2);
			expect($('#basketUnit-2 .options-vertical-line').is(':visible')).toBe(false);
			expect($('#basketUnit-2 .additional-price').hasClass('accessibility--palm')).toBe(true);
			expect($('#unitBasePrice-2').is(':visible')).toBe(false);
			expect($('#options-button-2 span').hasClass('icon-options-close')).toBe(false);
			expect($('#options-button-2 span').hasClass('icon-options-open')).toBe(true);
		});
	});
});

describe("basketQuantity functions", function () {
	beforeEach(function () {
		setFixtures(sandbox());
	});

	afterEach(function () {
		$('#sandbox').empty();
	});
	it("BXT.basketQuantity should be defined", function () {
		expect(BXT.basketQuantity).toBeDefined();
	});

	describe("init", function () {
		beforeEach(function() {
			spyOn(BXT.basketQuantity.init, 'call').andCallThrough();
		});

		it("Should run if the html element is present", function () {
			$("#sandbox").append(BXT.fixtures.basket.mainBasket);
			BXT.utils.functionInitializer();
			expect(BXT.basketQuantity.init.call).toHaveBeenCalled();
		});

		it("Should run not if the html element not is present", function () {
			BXT.utils.functionInitializer();
			expect(BXT.basketQuantity.init.call).not.toHaveBeenCalled();
		});

		describe("controls", function () {
			beforeEach(function() {
				$("#sandbox").append(BXT.fixtures.basket.mainBasket);
				BXT.basketQuantity.init();
			});

			it("Should call doQuantityMinusClick if user click minus link", function () {
				spyOn(BXT.basketQuantity, 'doQuantityMinusClick');
				$('a[id^="quantityMinus-"]').trigger('click');
				expect(BXT.basketQuantity.doQuantityMinusClick).toHaveBeenCalled();
			});

			it("Should call doQuantityPlusClick if user click plus link", function () {
				spyOn(BXT.basketQuantity, 'doQuantityPlusClick');
				$('a[id^="quantityPlus-"]').trigger('click');
				expect(BXT.basketQuantity.doQuantityPlusClick).toHaveBeenCalled();
			});

			it("Should call doQuantityInputChange if user change quantity input value", function () {
				spyOn(BXT.basketQuantity, 'doQuantityInputChange');
				$('input[id^="quantityInput-"]').trigger('change');
				expect(BXT.basketQuantity.doQuantityInputChange).toHaveBeenCalled();
			});

			it("Should remove quantity input readonly property", function () {
				expect($('#quantityInput-' + basketFixtureVars.unitId).prop('readonly')).toBe(false);
			});
		});
	});
	describe("doQuantityMinusClick", function () {
		it("Should call updateQuantityInputValue", function () {
			spyOn(BXT.basketQuantity, 'updateQuantityInputValue');
			BXT.basketQuantity.doQuantityMinusClick({target:{id:'quantityMinus-2'}})
			expect(BXT.basketQuantity.updateQuantityInputValue).toHaveBeenCalledWith('2', -1, true);
		});
	});
	describe("doQuantityPlusClick", function () {
		it("Should call updateQuantityInputValue", function () {
			spyOn(BXT.basketQuantity, 'updateQuantityInputValue');
			BXT.basketQuantity.doQuantityPlusClick({target:{id:'quantityPlus-2'}})
			expect(BXT.basketQuantity.updateQuantityInputValue).toHaveBeenCalledWith('2', 1, true);
		});
	});
	describe("doQuantityInputChange", function () {
		it("Should call updateQuantityInputValue", function () {
			spyOn(BXT.basketQuantity, 'updateQuantityInputValue');
			BXT.basketQuantity.updateQuantityInputValue({target:{id:'quantityInput-2'}})
			expect(BXT.basketQuantity.updateQuantityInputValue).toHaveBeenCalled();
		});
	});
	describe("updateQuantityInputValue", function () {
		it("Should call showDeleteConfirmationPopup if value is 0", function () {
			spyOn(BXT.basketUtil, 'showDeleteConfirmationPopup');
			BXT.basketQuantity.updateQuantityInputValue('2', 0);
			expect(BXT.basketUtil.showDeleteConfirmationPopup).toHaveBeenCalled();
		});
		it("Should call sendQuantityChangeRequest if value != 0 and no upsell", function () {
			$("#sandbox").append(BXT.fixtures.basket.mainBasket);
			spyOn(BXT.basketUtil, 'sendQuantityChangeRequest');
			BXT.basketQuantity.updateQuantityInputValue(basketFixtureVars.unitWithoutUpsellId, 3);
			expect(BXT.basketUtil.sendQuantityChangeRequest).toHaveBeenCalled();
			expect($('#quantityInput-' + basketFixtureVars.unitWithoutUpsellId).val()).toBe('3');
		});
		it("Should call showDeleteUpsellConfirmationPopup if value != 0 and upsell", function () {
			$("#sandbox").append(BXT.fixtures.basket.mainBasket);
			spyOn(BXT.basketUtil, 'showDeleteUpsellConfirmationPopup');
			BXT.basketQuantity.updateQuantityInputValue(basketFixtureVars.unitWithUpsellId, 3);
			expect(BXT.basketUtil.showDeleteUpsellConfirmationPopup).toHaveBeenCalled();
		});
	});
});

describe("offerCode functions", function () {
	beforeEach(function () {
		setFixtures(sandbox());
	});

	afterEach(function () {
		$('#sandbox').empty();
	});
	it("BXT.offerCode should be defined", function () {
		expect(BXT.offerCode).toBeDefined();
	});
});

describe("basketCredits functions", function () {
	beforeEach(function () {
		setFixtures(sandbox());
	});

	afterEach(function () {
		$('#sandbox').empty();
	});
	it("BXT.basketCredits should be defined", function () {
		expect(BXT.basketCredits).toBeDefined();
	});

	it("BXT.basketCredits.doSelectChange should be defined", function () {
		expect(BXT.basketCredits.doSelectChange).toBeDefined();
	});

	describe("init", function () {
		beforeEach(function() {
			spyOn(BXT.basketCredits.init, 'call').andCallThrough();
		});

		it("Should run if the html element is present", function () {
			$("#sandbox").append(BXT.fixtures.basket.basketCredits);
			BXT.utils.functionInitializer();
			expect(BXT.basketCredits.init.call).toHaveBeenCalled();
		});

		it("Should run not if the html element not is present", function () {
			BXT.utils.functionInitializer();
			expect(BXT.basketCredits.init.call).not.toHaveBeenCalled();
		});

		it("Should remove submit button", function () {
			$("#sandbox").append(BXT.fixtures.basket.basketCredits);
			BXT.basketCredits.init();
			expect($("#item-credits-allowed-submit-2").length).toBe(0);
		});

		it("Should listen select change", function () {
			$("#sandbox").append(BXT.fixtures.basket.basketCredits);
			spyOn(BXT.basketCredits, 'doSelectChange');
			BXT.basketCredits.init();
			$("#item-credits-allowed-2").trigger('change');
			expect(BXT.basketCredits.doSelectChange).toHaveBeenCalled();
		});

		it("Should set select prev value", function () {
			$("#sandbox").append(BXT.fixtures.basket.basketCredits);
			BXT.basketCredits.init();
			expect($("#item-credits-allowed-2").data('previous-value')).toBe('true');
		});
	});

	describe("sendCreditsChangeRequest", function () {
		it("Should call ajax request", function () {
			spyOn($, 'ajax');
			BXT.basketCredits.sendCreditsChangeRequest();
			expect($.ajax).toHaveBeenCalled();
		});
	});
});