describe('FC.basket', function () {

    beforeEach(function () {

        $('body').addClass('jq');
        $('body').addClass('js');
        loadStyleFixtures('home.css');
        loadStyleFixtures('other.css');
    });

    afterEach(function () {
        $('body').removeClass('jq');
        $('body').removeClass('js');
    });

    it('should be defined', function () {
        expect(FC.basket).toBeDefined();
    });

    describe('initNew', function () {
        beforeEach(function () {
            spyOn(NRE.basket, 'clickHandler').and.callFake(function () {
                return true;
            });

            spyOn(NRE.basket, 'tabBask').and.callFake(function () {
                return true;
            });

            spyOn(NRE.basket, 'initSBNew').and.callFake(function () {
                return true;
            });

            spyOn(NRE.basket, 'addFocusRing').and.callFake(function () {
                return true;
            });

            spyOn(window, 'open').and.callFake(function () {
                return true;
            });

            $('#form1').submit(function () {
                return false;
            });
        });

        it('should call the focus ring function, call tabBask, and call the clickhandler', function () {
            loadFixtures('ctfSingle.html');
           
            
            FC.fareSwitcher.hasFS = false;
            NRE.basket.initNew($('#oft tbody tr'));

            expect(NRE.basket.clickHandler.calls.count()).toEqual(1+callOffset);
            expect(NRE.basket.tabBask).toHaveBeenCalled();
            expect(NRE.basket.addFocusRing).toHaveBeenCalled();
            expect(NRE.basket.initSBNew).toHaveBeenCalled();
        });

        it('should call the click handler if the selected fare is not a single', function () {
            loadFixtures('ctfSingle.html');
           
            
            NRE.basket.initNew($('#oft tbody tr'));

            $('#faresingleFareOutward41')[0].checked = true;
            $('#faresingleFareOutward41').trigger('mousedown');

            expect(NRE.basket.clickHandler.calls.count()).toEqual(1 + callOffset);

            jasmine.Fixtures.prototype.cleanUp();

            loadFixtures('ctfReturn1.html');
            NRE.basket.initNew($('#oft tbody tr'));

            $('#returnFareOutward45')[0].checked = true;
            $('#returnFareOutward45').trigger('mousedown');

            expect(NRE.basket.clickHandler.calls.count()).toEqual(3 + callOffset + callOffset);

            $('#faresingleFareOutward45')[0].checked = true;
            $('#faresingleFareOutward45').trigger('mousedown');

            expect(NRE.basket.clickHandler.calls.count()).toEqual(4 + callOffset + callOffset);


            //faresingleFareOutward45
        });

        it('should call the click handler if the fare is not a single and enter is clicked', function () {
            loadFixtures('ctfReturn1.html');
           
            
            NRE.basket.initNew($('#oft tbody tr'));

            $('#returnFareOutward45')[0].checked = true;
            var e = jQuery.Event('keypress', { keyCode: 13 });
            $('#faresingleFareOutward41').trigger(e);

            expect(NRE.basket.clickHandler.calls.count()).toEqual(2 + callOffset);

            $('#faresingleFareOutward45')[0].checked = true;
            $('#faresingleFareOutward45').trigger(e);

            expect(NRE.basket.clickHandler.calls.count()).toEqual(3 + callOffset);
        });

        it('should call window.open if the fare is not a single and enter is clicked', function () {
            loadFixtures('ctfSingle.html');
           
            
            NRE.basket.initNew($('#oft tbody tr'));

            $('#faresingleFareOutward41')[0].checked = true;
            var e = jQuery.Event('keypress', { keyCode: 13 });
            $('#faresingleFareOutward41').parent().trigger(e);

            expect(NRE.basket.clickHandler.calls.count()).toEqual(2 + callOffset);

            expect(window.open).toHaveBeenCalled();

        });

        it('should select the fare when up and down keys are used on singles', function () {
            loadFixtures('ctfSingle.html');
           
            
            NRE.basket.initNew($('#oft tbody tr'));

            $('#faresingleFareOutward41').focus();

            var e = jQuery.Event('keyup', { keyCode: 38 });
            $('#faresingleFareOutward42').trigger(e);

            expect(NRE.basket.clickHandler).toHaveBeenCalled();
            expect(window.open).not.toHaveBeenCalled();

            var e = jQuery.Event('keyup', { keyCode: 40 });
            $('#faresingleFareOutward41').trigger(e);

            expect(NRE.basket.clickHandler).toHaveBeenCalled();
            expect(window.open).not.toHaveBeenCalled();
        });

        it('should select the fare when up and down keys are used on retruns', function () {
            loadFixtures('ctfReturn1.html');
           
            
            NRE.basket.initNew($('#oft tbody tr'));

            $('#returnFareOutward41').focus();

            var e = jQuery.Event('keyup', { keyCode: 38 });
            $('#cheapmorefares-2-1returnFareOutward42').parent().trigger(e);

            expect(NRE.basket.clickHandler).toHaveBeenCalled();
            expect(window.open).not.toHaveBeenCalled();

            var e = jQuery.Event('keyup', { keyCode: 40 });
            $('#returnFareOutward41').parent().trigger(e);

            expect(NRE.basket.clickHandler).toHaveBeenCalled();
            expect(window.open).not.toHaveBeenCalled();
        });
    });

    describe('addFocusRing', function () {
        it('should add a coloured ring on focus', function () {
            loadFixtures('ctfReturn1.html');
            NRE.basket.addFocusRing($('#faresingleFareOutward41'));

            $('#faresingleFareOutward41').focus();

            expect($('#faresingleFareOutward41').parent()).toHaveCss({ outlineColor: 'rgb(255, 165, 0)'});
            expect($('#faresingleFareOutward41').parent()).toHaveCss({ outlineStyle: 'solid'});
            expect($('#faresingleFareOutward41').parent()).not.toHaveCss({ outlineWidth: '0px'});
            
        });

        it('should remove a coloured ring on blur', function () {
            loadFixtures('ctfReturn1.html');
            NRE.basket.addFocusRing($('#faresingleFareOutward41'));

            $('#faresingleFareOutward41').focus();

            expect($('#faresingleFareOutward41').parent()).toHaveCss({ outlineColor: 'rgb(255, 165, 0)' });
            expect($('#faresingleFareOutward41').parent()).toHaveCss({ outlineStyle: 'solid' });
            expect($('#faresingleFareOutward41').parent()).not.toHaveCss({ outlineWidth: '0px' });

            $('#faresingleFareOutward41').blur();

            if (navigator.userAgent.indexOf("PhantomJS") > 0) {
                expect($('#faresingleFareOutward41').parent().css('outline')).toBe('');
            }
            else {
                expect($('#faresingleFareOutward41').parent().css('outline')).toBe('rgb(51, 51, 51) none 0px');
            }
        });
    });

    describe('init', function () {
        beforeEach(function () {
            spyOn(NRE.basket, 'clickHandler').and.callFake(function () {
                return true;
            });

            spyOn(NRE.basket, 'tabBask').and.callFake(function () {
                return true;
            });

            spyOn(NRE.basket, 'addFocusRing').and.callFake(function () {
                return true;
            });

            spyOn(NRE.basket, 'initSB').and.callFake(function () {
                return true;
            });

            spyOn(window, 'open').and.callFake(function () {
                return true;
            });

            $('#form1').submit(function () {
                return false;
            });

            
        });

        it('should call the focus ring function, call tabBask, and call the clickhandler', function () {
            loadFixtures('ctfSingle.html');
           
            
            FC.fareSwitcher.hasFS = false;
            NRE.basket.init($('#oft tbody tr'));

            expect(NRE.basket.clickHandler.calls.count()).toEqual(1 + callOffset);
            expect(NRE.basket.tabBask).toHaveBeenCalled();
            expect(NRE.basket.addFocusRing).toHaveBeenCalled();
            expect(NRE.basket.initSB).toHaveBeenCalled();
            expect(NRE.basket.cTab).toBe('single');
            expect(NRE.basket.oTab).toBe('return');
        });

        it('should call the click handler if the selected fare is not a single', function () {
            loadFixtures('ctfSingle.html');
           
            
            NRE.basket.init($('#oft tbody tr'));

            $('#faresingleFareOutward41')[0].checked = true;
            $('#faresingleFareOutward41').trigger('mousedown');

            expect(NRE.basket.clickHandler.calls.count()).toEqual(1 + callOffset);

            jasmine.Fixtures.prototype.cleanUp();

            loadFixtures('ctfReturn1.html');
            NRE.basket.initNew($('#oft tbody tr'));

            $('#returnFareOutward45')[0].checked = true;
            $('#returnFareOutward45').trigger('mousedown');

            expect(NRE.basket.clickHandler.calls.count()).toEqual(3 + callOffset + callOffset);

            $('#faresingleFareOutward45')[0].checked = true;
            $('#faresingleFareOutward45').trigger('mousedown');

            expect(NRE.basket.clickHandler.calls.count()).toEqual(4 + callOffset + callOffset);


            //faresingleFareOutward45
        });

        it('should call the click handler if the fare is not a single and enter is clicked', function () {
            loadFixtures('ctfReturn1.html');
           
            
            NRE.basket.init($('#oft tbody tr'));

            $('#returnFareOutward45')[0].checked = true;
            var e = jQuery.Event('keypress', { keyCode: 13 });
            $('#faresingleFareOutward41').trigger(e);

            expect(NRE.basket.clickHandler.calls.count()).toEqual(3 + callOffset);

            $('#faresingleFareOutward45')[0].checked = true;
            $('#faresingleFareOutward45').trigger(e);

            expect(NRE.basket.clickHandler.calls.count()).toEqual(4 + callOffset);
        });

        it('should call window.open if the fare is not a single and enter is clicked', function () {
            loadFixtures('ctfSingle.html');
           
            
            NRE.basket.init($('#oft tbody tr'));

            $('#faresingleFareOutward41')[0].checked = true;
            var e = jQuery.Event('keypress', { keyCode: 13 });
            $('#faresingleFareOutward41').parent().trigger(e);

            expect(NRE.basket.clickHandler.calls.count()).toEqual(2 + callOffset);

            expect(window.open).toHaveBeenCalled();

        });

        it('should select the fare when up and down keys are used on singles', function () {
            loadFixtures('ctfSingle.html');
           
            
            NRE.basket.init($('#oft tbody tr'));

            $('#faresingleFareOutward41').focus();

            var e = jQuery.Event('keyup', { keyCode: 38 });
            $('#faresingleFareOutward42').trigger(e);

            expect(NRE.basket.clickHandler).toHaveBeenCalled();
            expect(window.open).not.toHaveBeenCalled();

            var e = jQuery.Event('keyup', { keyCode: 40 });
            $('#faresingleFareOutward41').trigger(e);

            expect(NRE.basket.clickHandler).toHaveBeenCalled();
            expect(window.open).not.toHaveBeenCalled();
        });

        it('should select the fare when up and down keys are used on returns', function () {
            loadFixtures('ctfReturn1.html');
           
            
            FC.fareSwitcher.switcher = $("th.fare .ctf-fare");
            FC.fareSwitcher.init();
            NRE.basket.init($('#oft tbody tr'));

            $('#fare-switcher .left a').eq(0).click();

            $('#returnFareOutward41').focus();

            var e = jQuery.Event('keyup', { keyCode: 38 });
            $('#cheapmorefares-2-1returnFareOutward42').parent().trigger(e);

            expect(NRE.basket.clickHandler).toHaveBeenCalled();
            expect(window.open).not.toHaveBeenCalled();

            var e = jQuery.Event('keyup', { keyCode: 40 });
            $('#returnFareOutward41').parent().trigger(e);

            expect(NRE.basket.clickHandler).toHaveBeenCalled();
            expect(window.open).not.toHaveBeenCalled();

            expect(NRE.basket.cTab).toBe('return');
            expect(NRE.basket.oTab).toBe('single');
        });
    });

    describe('initSBNew', function () {
        beforeEach(function () {
            spyOn(NRE.basket, 'setSBask').and.callFake(function () {
                return true;
            });

            spyOn(NRE.basket, 'popTD').and.callFake(function () {
                return true;
            });

            spyOn(FC, 'prefVendorAjax').and.callFake(function () {
                return true;
            });
        });

        it('should call setSBask, popTD and preferred vendor ajax if it\'s a single fare', function () {
            loadFixtures('ctfSingle.html');
           
            FC.fareSwitcher.hasFS = false;
            NRE.basket.initSBNew($('#oft tbody tr'));

            expect(NRE.basket.setSBask).toHaveBeenCalled();
            expect(NRE.basket.popTD).toHaveBeenCalled();
            expect(FC.prefVendorAjax).toHaveBeenCalled();

            expect(FC.prefVendorAjax.calls.count()).toBe(5);

            expect(FC.prefVendorAjax.calls.argsFor(0)[0].target.id).toBe('faresingleFareOutward41');
            expect(FC.prefVendorAjax.calls.argsFor(0)[1]).toBe(null);

            expect(FC.prefVendorAjax.calls.argsFor(1)[0].target.id).toBe('faresingleFareOutward42');
            expect(FC.prefVendorAjax.calls.argsFor(1)[1]).toBe(null);

            expect(FC.prefVendorAjax.calls.argsFor(2)[0].target.id).toBe('faresingleFareOutward43');
            expect(FC.prefVendorAjax.calls.argsFor(2)[1]).toBe(null);

            expect(FC.prefVendorAjax.calls.argsFor(3)[0].target.id).toBe('faresingleFareOutward44');
            expect(FC.prefVendorAjax.calls.argsFor(3)[1]).toBe(null);

            expect(FC.prefVendorAjax.calls.argsFor(4)[0].target.id).toBe('cheapmorefares-4-17faresingleFareOutward45');
            expect(FC.prefVendorAjax.calls.argsFor(4)[1]).toBe(null);

        });

        it('should call preferred vendor ajax if it\'s return for each selected fare and call popTD for each non selected fare on returns', function () {
            loadFixtures('ctfReturn1.html');
           
            FC.fareSwitcher.hasFS = true;
            $('input[type=radio]').each(function () {
                this.checked = false;
            });
            $('#faresingleFareOutward43')[0].checked = true;
            NRE.basket.initSBNew($('#oft tbody tr'));

            expect(FC.prefVendorAjax.calls.count()).toBe(2);

            expect(FC.prefVendorAjax.calls.argsFor(0)[0].target.id).toBe('faresingleFareOutward43');
            expect(FC.prefVendorAjax.calls.argsFor(0)[1]).toBe(null);

            expect(FC.prefVendorAjax.calls.argsFor(1)[0].target.id).toBe('faresingleFareOutward43');
            expect($(FC.prefVendorAjax.calls.argsFor(1)[1])[0].id).toBe('provider');

            expect(NRE.basket.popTD.calls.count()).toBe(9)
        });

    });

    describe('initSB', function () {
        beforeEach(function () {
            spyOn(NRE.basket, 'setSBask').and.callFake(function () {
                return true;
            });

            spyOn(NRE.basket, 'popTD').and.callFake(function () {
                return true;
            });

            spyOn(FC, 'prefVendorAjax').and.callFake(function () {
                return true;
            });
        });

        it('should call setSBask, popTD and preferred vendor ajax if it\'s a single fare', function () {
            loadFixtures('ctfSingle.html');
           
            FC.fareSwitcher.hasFS = false;
            NRE.basket.initSB($('#oft tbody tr'));

            expect(NRE.basket.setSBask).toHaveBeenCalled();
            expect(NRE.basket.popTD).toHaveBeenCalled();
            expect(FC.prefVendorAjax).toHaveBeenCalled();

            expect(FC.prefVendorAjax.calls.count()).toBe(5);

            expect(FC.prefVendorAjax.calls.argsFor(0)[0].target.id).toBe('faresingleFareOutward41');
            expect(FC.prefVendorAjax.calls.argsFor(0)[1]).toBe(null);

            expect(FC.prefVendorAjax.calls.argsFor(1)[0].target.id).toBe('faresingleFareOutward42');
            expect(FC.prefVendorAjax.calls.argsFor(1)[1]).toBe(null);

            expect(FC.prefVendorAjax.calls.argsFor(2)[0].target.id).toBe('faresingleFareOutward43');
            expect(FC.prefVendorAjax.calls.argsFor(2)[1]).toBe(null);

            expect(FC.prefVendorAjax.calls.argsFor(3)[0].target.id).toBe('faresingleFareOutward44');
            expect(FC.prefVendorAjax.calls.argsFor(3)[1]).toBe(null);

            expect(FC.prefVendorAjax.calls.argsFor(4)[0].target.id).toBe('cheapmorefares-4-17faresingleFareOutward45');
            expect(FC.prefVendorAjax.calls.argsFor(4)[1]).toBe(null);

        });

        it('should call preferred vendor ajax if it\'s return for each selected fare and call popTD for each non selected fare on returns', function () {
            loadFixtures('ctfReturn1.html');
           
            FC.fareSwitcher.hasFS = true;
            $('input[type=radio]').each(function () {
                this.checked = false;
            });
            $('#faresingleFareOutward43')[0].checked = true;
            NRE.basket.initSB($('#oft tbody tr'));

            expect(FC.prefVendorAjax.calls.count()).toBe(2);

            expect(FC.prefVendorAjax.calls.argsFor(0)[0].target.id).toBe('faresingleFareOutward43');
            expect(FC.prefVendorAjax.calls.argsFor(0)[1]).toBe(null);

            expect(FC.prefVendorAjax.calls.argsFor(1)[0].target.id).toBe('faresingleFareOutward43');
            expect($(FC.prefVendorAjax.calls.argsFor(1)[1])[0].id).toBe('provider');

            expect(NRE.basket.popTD.calls.count()).toBe(19)
        });
    });

    describe('hideTD', function () {
        beforeEach(function () {
            $.fx.off = true;
        });
        afterEach(function () {
            $.fx.off = false;
        });
        it('should hide other leg ticket info in minibaskets that are not selected on 2 single as returns', function () {
            loadFixtures('ctfReturn1.html');
            $('input[type=radio]').each(function () {
                this.checked = false;
            });
            $('#faresingleFareOutward41')[0].checked = true;
           
            
            FC.fareSwitcher.switcher = $("th.fare .ctf-fare");
            FC.fareSwitcher.hasFS = true;
            FC.moreFares.$triggers = $("#ctf-results .more-fares a");
            NRE.otherServices.buildAllLinks($('.fare > div.single'));
            FC.fareSwitcher.init();
            FC.moreFares.init();
            NRE.basket.init();
            NRE.earlierLaterAjax.init();

            var e = jQuery.Event('mousedown', { type: 'click', target: $('#faresingleFareOutward41')[0] });
            var outs = $('.f-single .td-out');
            var ins = $('.f-single .td-ret');
            var selectedMinibasket = $(e.target).parents('.mtx').next().find('.f-single .minibasket');
            var currentTabTDareas = $("#ctf-results").find("table.minibasket").not(selectedMinibasket);
            var ticketDetails = null;
            var $that = null;

            $('#fare-switcher .right a').eq(0).click();
            $('#faresingleFareOutward41').trigger(e);
            $('.more-fares a').eq(0).click();

            outs.show();
            ins.show();

            NRE.basket.hideTD(e);

            currentTabTDareas.each(function () {
                $that = $(this);
                ticketDetails = $that.parent().find("div.ticket-details");

                if (ticketDetails.hasClass("out-fare")) {
                    expect(ticketDetails.find("div.td-ret")).toHaveCss({'display': 'none'});
                } else {
                    expect(ticketDetails.find("div.td-out")).toHaveCss({'display': 'none'});
                }

            });
        });
    });

    describe('popTD', function () {
        beforeEach(function () {
            $.fx.off = true;
        });
        afterEach(function () {
            $.fx.off = false;
        });
        it('should write in the ticket detail for each ticket on 2 singles as return', function () {
            loadFixtures('ctfReturn1.html');
            $('input[type=radio]').each(function () {
                this.checked = false;
            });
            $('#faresingleFareOutward41')[0].checked = true;
           
            
            FC.fareSwitcher.switcher = $("th.fare .ctf-fare");
            FC.fareSwitcher.hasFS = true;
            FC.moreFares.$triggers = $("#ctf-results .more-fares a");
            NRE.otherServices.buildAllLinks($('.fare > div.single'));
            FC.fareSwitcher.init();
            FC.moreFares.init();
            //NRE.basket.init();
            NRE.earlierLaterAjax.init();

            var e = jQuery.Event('mousedown', { type: 'click', target: $('#faresingleFareOutward41')[0] });

            $('#fare-switcher .right a').eq(0).click();
            var selRadio = $('#faresingleFareOutward41');

            selRadio.trigger(e);
            
            $('.more-fares a').eq(0).click();

            NRE.basket.popTD(selRadio, false);

            var selectedMinibasket = $(e.target).parents('.mtx').next().find('.f-single');

            var outLeg = selectedMinibasket.find('.td-out');
            var inLeg = selectedMinibasket.find('.td-ret');
            var textString = selRadio.parent().parent().find('.fare-breakdown input').val().split('|')[14] + ' This fare is only valid on the train(s) specified.';
            var textString1 = $('#faresingleFareReturn46').parent().parent().find('.fare-breakdown input').val().split('|')[14] + ' This fare is only valid on the train(s) specified.';

            expect(outLeg).toBeVisible();
            expect(inLeg).toBeHidden();

            expect(outLeg.find('p')).toContainText(textString);

            $('.more-fares a').eq(9).click();

            NRE.basket.popTD($('#faresingleFareReturn46'), false);

            selectedMinibasket = $('#faresingleFareReturn46').parents('.mtx').next().find('.f-single');

            outLeg = selectedMinibasket.find('.td-out');
            inLeg = selectedMinibasket.find('.td-ret');

            expect(inLeg).toBeVisible();
            expect(outLeg).toBeHidden();
            expect(inLeg.find('p')).toContainText(textString1);


        });

        it('should write in the ticket detail for the ticket outbound ticket on returns', function () {
            loadFixtures('ctfReturn1.html');
            $('input[type=radio]').each(function () {
                this.checked = false;
            });
            $('#returnFareOutward41')[0].checked = true;
           
            
            FC.fareSwitcher.switcher = $("th.fare .ctf-fare");
            FC.fareSwitcher.hasFS = true;
            FC.moreFares.$triggers = $("#ctf-results .more-fares a");
            NRE.otherServices.buildAllLinks($('.fare > div.single'));
            FC.fareSwitcher.init();
            FC.moreFares.init();
            //NRE.basket.init();
            NRE.earlierLaterAjax.init();

            var e = jQuery.Event('mousedown', { type: 'click', target: $('#returnFareOutward41')[0] });

            $('#fare-switcher .left a').eq(0).click();
            var selRadio = $('#returnFareOutward41');

            selRadio.trigger(e);

            $('.more-fares a').eq(0).click();

            NRE.basket.popTD(selRadio, false);

            var selectedMinibasket = $(e.target).parents('.mtx').next().find('.f-return');

            var outLeg = selectedMinibasket.find('.td-out');
            var inLeg = selectedMinibasket.find('.td-ret');
            var textString = selRadio.parent().parent().find('.fare-breakdown input').val().split('|')[14] + ' This fare is only valid on trains travelling between certain times.';

            expect(outLeg).toBeVisible();
            expect(inLeg).toBeHidden();

            expect(outLeg.find('p')).toContainText(textString);

        });
    });

    describe('tabBask', function () {
        beforeEach(function () {
            $.fx.off = true;
        });
        afterEach(function () {
            $.fx.off = false;
        });

        it('should show one set of baskets and hide the other', function () {
            
            loadFixtures('ctfReturn1.html');
            $('input[type=radio]').each(function () {
                this.checked = false;
            });
            $('#faresingleFareOutward41')[0].checked = true;
           
            
            FC.fareSwitcher.switcher = $("th.fare .ctf-fare");
            FC.fareSwitcher.hasFS = true;
            FC.moreFares.$triggers = $("#ctf-results .more-fares a");
            NRE.otherServices.buildAllLinks($('.fare > div.single'));
            //FC.fareSwitcher.init();
            FC.moreFares.init();
            //NRE.basket.init();
            NRE.earlierLaterAjax.init();

            $('.more-fares a').eq(0).click();

            expect($('.f-return').eq(0)).toBeVisible();
            expect($('.f-single').eq(0)).toBeVisible();

            NRE.basket.cTab = "return";
            NRE.basket.oTab = "single";

            NRE.basket.tabBask();

            expect($('.f-return').eq(0)).toBeVisible();
            expect($('.f-single').eq(0)).toBeHidden();

            $('.f-single').eq(0).show();

            NRE.basket.oTab = "return";
            NRE.basket.cTab = "single";

            NRE.basket.tabBask();

            expect($('.f-return').eq(0)).toBeHidden();
            expect($('.f-single').eq(0)).toBeVisible();

        });
    });

    describe('hideOBask', function () {
        beforeEach(function () {
            $.fx.off = true;

            spyOn(NRE.basket, 'hideTD').and.callFake(function () {
                return true;
            });
        });
        afterEach(function () {
            $.fx.off = false;
        });
        it('should hide minibaskets for fares that are not selected', function () {
            loadFixtures('ctfReturn1.html');
            $('input[type=radio]').each(function () {
                this.checked = false;
            });
            $('#faresingleFareOutward41')[0].checked = true;
           
            
            FC.fareSwitcher.switcher = $("th.fare .ctf-fare");
            FC.fareSwitcher.hasFS = true;
            FC.moreFares.$triggers = $("#ctf-results .more-fares a");
            NRE.otherServices.buildAllLinks($('.fare > div.single'));
            FC.fareSwitcher.init();
            FC.moreFares.init();
            NRE.earlierLaterAjax.init();

            var fareDet = [];
            var $fareSumTitle = [];
            var $pvLabel = [];
            var $pvSelect = [];
            var $theBasket = [];
            var $tocLogo = [];
            var currentMoreFares = [];
            var currentTabBasket = [];
            
            NRE.basket.hideOBask(null);

            expect(NRE.basket.hideTD).toHaveBeenCalled();

            currentMoreFares = $('.more-fares a').eq(1);
            fareDet = currentMoreFares.parent().parent().parent().parent().next();
            currentTabBasket = fareDet.find('.f-single');
            $fareSumTitle = currentTabBasket.find("h5.sum");
            $pvLabel = currentTabBasket.find("label.prov");
            $pvSelect = currentTabBasket.find("select");
            $theBasket = currentTabBasket.find("table.minibasket");
            $tocLogo = currentTabBasket.find("div.operator-price");

            currentMoreFares.click();

            expect($fareSumTitle).toBeVisible();
            expect($pvLabel).toBeVisible();
            expect($pvSelect).toBeVisible();
            expect($theBasket).toBeVisible();
            expect($tocLogo).toBeVisible();

            currentMoreFares = $('.more-fares a').eq(3);
            fareDet = currentMoreFares.parent().parent().parent().parent().next();
            currentTabBasket = fareDet.find('.f-single');
            $fareSumTitle = currentTabBasket.find("h5.sum");
            $pvLabel = currentTabBasket.find("label.prov");
            $pvSelect = currentTabBasket.find("select");
            $theBasket = currentTabBasket.find("table.minibasket");
            $tocLogo = currentTabBasket.find("div.operator-price");

            currentMoreFares.click();

            expect($fareSumTitle).toBeHidden();
            expect($pvLabel).toBeHidden();
            expect($pvSelect).toBeHidden();
            expect($theBasket).toBeHidden();
            expect($tocLogo).toBeHidden();

            currentMoreFares = $('.more-fares a').eq(5);
            fareDet = currentMoreFares.parent().parent().parent().parent().next();
            currentTabBasket = fareDet.find('.f-single');
            $fareSumTitle = currentTabBasket.find("h5.sum");
            $pvLabel = currentTabBasket.find("label.prov");
            $pvSelect = currentTabBasket.find("select");
            $theBasket = currentTabBasket.find("table.minibasket");
            $tocLogo = currentTabBasket.find("div.operator-price");

            currentMoreFares.click();

            expect($fareSumTitle).toBeHidden();
            expect($pvLabel).toBeHidden();
            expect($pvSelect).toBeHidden();
            expect($theBasket).toBeHidden();
            expect($tocLogo).toBeHidden();

            currentMoreFares = $('.more-fares a').eq(7);
            fareDet = currentMoreFares.parent().parent().parent().parent().next();
            currentTabBasket = fareDet.find('.f-single');
            $fareSumTitle = currentTabBasket.find("h5.sum");
            $pvLabel = currentTabBasket.find("label.prov");
            $pvSelect = currentTabBasket.find("select");
            $theBasket = currentTabBasket.find("table.minibasket");
            $tocLogo = currentTabBasket.find("div.operator-price");

            currentMoreFares.click();

            expect($fareSumTitle).toBeHidden();
            expect($pvLabel).toBeHidden();
            expect($pvSelect).toBeHidden();
            expect($theBasket).toBeHidden();
            expect($tocLogo).toBeHidden();

            currentMoreFares = $('.more-fares a').eq(9);
            fareDet = currentMoreFares.parent().parent().parent().parent().next();
            currentTabBasket = fareDet.find('.f-single');
            $fareSumTitle = currentTabBasket.find("h5.sum");
            $pvLabel = currentTabBasket.find("label.prov");
            $pvSelect = currentTabBasket.find("select");
            $theBasket = currentTabBasket.find("table.minibasket");
            $tocLogo = currentTabBasket.find("div.operator-price");

            currentMoreFares.click();

            expect($fareSumTitle).toBeHidden();
            expect($pvLabel).toBeHidden();
            expect($pvSelect).toBeHidden();
            expect($theBasket).toBeHidden();
            expect($tocLogo).toBeHidden();

            currentMoreFares = $('.more-fares a').eq(10);
            fareDet = currentMoreFares.parent().parent().parent().parent().next();
            currentTabBasket = fareDet.find('.f-single');
            $fareSumTitle = currentTabBasket.find("h5.sum");
            $pvLabel = currentTabBasket.find("label.prov");
            $pvSelect = currentTabBasket.find("select");
            $theBasket = currentTabBasket.find("table.minibasket");
            $tocLogo = currentTabBasket.find("div.operator-price");

            currentMoreFares.click();

            expect($fareSumTitle).toBeHidden();
            expect($pvLabel).toBeHidden();
            expect($pvSelect).toBeHidden();
            expect($theBasket).toBeHidden();
            expect($tocLogo).toBeHidden();

            currentMoreFares = $('.more-fares a').eq(11);
            fareDet = currentMoreFares.parent().parent().parent().parent().next();
            currentTabBasket = fareDet.find('.f-single');
            $fareSumTitle = currentTabBasket.find("h5.sum");
            $pvLabel = currentTabBasket.find("label.prov");
            $pvSelect = currentTabBasket.find("select");
            $theBasket = currentTabBasket.find("table.minibasket");
            $tocLogo = currentTabBasket.find("div.operator-price");

            currentMoreFares.click();

            expect($fareSumTitle).toBeHidden();
            expect($pvLabel).toBeHidden();
            expect($pvSelect).toBeHidden();
            expect($theBasket).toBeHidden();
            expect($tocLogo).toBeHidden();

            currentMoreFares = $('.more-fares a').eq(12);
            fareDet = currentMoreFares.parent().parent().parent().parent().next();
            currentTabBasket = fareDet.find('.f-single');
            $fareSumTitle = currentTabBasket.find("h5.sum");
            $pvLabel = currentTabBasket.find("label.prov");
            $pvSelect = currentTabBasket.find("select");
            $theBasket = currentTabBasket.find("table.minibasket");
            $tocLogo = currentTabBasket.find("div.operator-price");

            currentMoreFares.click();

            expect($fareSumTitle).toBeHidden();
            expect($pvLabel).toBeHidden();
            expect($pvSelect).toBeHidden();
            expect($theBasket).toBeHidden();
            expect($tocLogo).toBeHidden();

            currentMoreFares = $('.more-fares a').eq(13);
            fareDet = currentMoreFares.parent().parent().parent().parent().next();
            currentTabBasket = fareDet.find('.f-single');
            $fareSumTitle = currentTabBasket.find("h5.sum");
            $pvLabel = currentTabBasket.find("label.prov");
            $pvSelect = currentTabBasket.find("select");
            $theBasket = currentTabBasket.find("table.minibasket");
            $tocLogo = currentTabBasket.find("div.operator-price");

            currentMoreFares.click();

            expect($fareSumTitle).toBeHidden();
            expect($pvLabel).toBeHidden();
            expect($pvSelect).toBeHidden();
            expect($theBasket).toBeHidden();
            expect($tocLogo).toBeHidden();


        });
    });

    describe('clearOTBask', function () {
        beforeEach(function () {
            $.fx.off = true;
        });
        afterEach(function () {
            $.fx.off = false;
        });
        it('should remove the minibaskets in the other tab', function () {
            loadFixtures('ctfReturn1.html');
            $('input[type=radio]').each(function () {
                this.checked = false;
            });
            $('#faresingleFareOutward41')[0].checked = true;
           
            
            FC.fareSwitcher.switcher = $("th.fare .ctf-fare");
            FC.fareSwitcher.hasFS = true;
            FC.moreFares.$triggers = $("#ctf-results .more-fares a");
            NRE.otherServices.buildAllLinks($('.fare > div.single'));
            FC.fareSwitcher.init();
            FC.moreFares.init();
            //NRE.basket.init();
            NRE.earlierLaterAjax.init();

            NRE.basket.clearOTBask();

            $('#fare-switcher .left a').eq(0).click();

            $('.f-return').each(function () {
                var $this = $(this);
                var minibask = $this.find('tr.miniBasketFare');
                var $pvLabel = $this.find('label.prov');
                var $pvSelect = $this.find('select');
                var $fareSumTitle = $this.find('h5.sum');
                var $tocLogo = $this.find('div.operator-price');

                $this.parent().parent().parent().prev().find('.more-fares a').click();

                expect(minibask).not.toExist();
                expect($fareSumTitle).toBeHidden();
                expect($pvLabel).toBeHidden();
                expect($pvSelect).toBeHidden();
                expect($tocLogo).toBeHidden();

            });

        });
    });

    describe('upOBask', function () {
        it('should update the specified basket with the specified content', function () {
            loadFixtures('ctfReturn1.html');

            var chosenTable = $('table.minibasket').eq(0);
            var newContent = $($.parseHTML('<table><tbody><tr><td>New content</td></tr></table>'));

            NRE.basket.upOBask(newContent, chosenTable);

            expect(chosenTable).toContainElement('tbody');
            expect(chosenTable).toContainElement('tr');
            expect(chosenTable).toContainElement('td');
            expect(chosenTable).toContainText('New content');
        });
    });

    describe('proSAsR', function () {
        beforeEach(function () {
            spyOn(NRE.basket, 'setSBask').and.callFake(function () {
                return true;
            });
        });
        it('should set sF and selected variables only if an inbound and outbound fare are selected', function () {
            loadFixtures('ctfReturn1.html');
            $('input[type=radio]').each(function () {
                this.checked = false;
                this.removeAttribute('checked');
            });
           
            

            NRE.basket.proSAsR();

            expect(NRE.basket.sFOut).toBe(null);
            expect(NRE.basket.sFRet).toBe(null);
            expect(NRE.basket.inSelected).toBeFalsy();
            expect(NRE.basket.outSelected).toBeFalsy();

            $('#faresingleFareOutward41')[0].checked = true;
            $('#faresingleFareOutward41').attr('checked', true);

            NRE.basket.proSAsR();

            expect(NRE.basket.sFOut).toBe(null);
            expect(NRE.basket.sFRet).toBe(null);
            expect(NRE.basket.inSelected).toBeFalsy();
            expect(NRE.basket.outSelected).toBeFalsy();

            $('#faresingleFareReturn49')[0].checked = true;
            $('#faresingleFareReturn49').attr('checked', true);

            NRE.basket.proSAsR();

            expect(NRE.basket.sFOut[0].id).toBe('faresingleFareOutward41');
            expect(NRE.basket.sFRet[0].id).toBe('faresingleFareReturn49');
            expect(NRE.basket.inSelected).toBeTruthy();
            expect(NRE.basket.outSelected).toBeTruthy();

        });
    });

    describe('resetBask', function () {
        beforeEach(function () {
            $.fx.off = true;
        });
        afterEach(function () {
            $.fx.off = false;
        });
        it('should remove any single baskets present in a return fare and return portion if only outbound return is selected', function () {
            loadFixtures('ctfReturn1.html');
            $('input[type=radio]').each(function () {
                this.checked = false;
            });
            $('#returnFareOutward41')[0].checked = true;
           
            
            FC.fareSwitcher.switcher = $("th.fare .ctf-fare");
            FC.fareSwitcher.hasFS = true;
            FC.moreFares.$triggers = $("#ctf-results .more-fares a");
            NRE.otherServices.buildAllLinks($('.fare > div.single'));
            FC.fareSwitcher.init();
            FC.moreFares.init();
            NRE.earlierLaterAjax.init();

            $('#fare-switcher .left a').eq(0).click();

            $('.more-fares a').eq(0).click();

            var theBasket = $('.f-return  table.minibasket').eq(0);

            theBasket.append('<tbody class="miniBasketReturnFare"><tr class="miniBasketFare"></tr></tbody>');
            theBasket.append('<tbody class="miniBasketReturnFare"><tr class="miniBasketRailcard"></tr></tbody>');
            theBasket.append('<tbody class="miniBasketSingleFareOutward"><tr class="miniBasketFare"></tr></tbody>');
            theBasket.append('<tbody class="miniBasketSingleFareOutward"><tr class="miniBasketRailcard"></tr></tbody>');
            theBasket.append('<tbody class="miniBasketSingleFareReturn"><tr class="miniBasketFare"></tr></tbody>');
            theBasket.append('<tbody class="miniBasketSingleFareReturn"><tr class="miniBasketRailcard"></tr></tbody>');

            NRE.basket.resetBask('ReturnFare', theBasket);

            expect(theBasket.find('tbody.miniBasketReturnFare tr.miniBasketFare')).not.toExist();
            expect(theBasket.find('tbody.miniBasketReturnFare tr.miniBasketRailcard')).not.toExist();
            expect(theBasket.find('tbody.miniBasketReturnFare')).toBeVisible();
            expect(theBasket.find('tbody.miniBasketSingleFareOutward tr.miniBasketFare')).not.toExist();
            expect(theBasket.find('tbody.miniBasketSingleFareReturn tr.miniBasketFare')).not.toExist();
            expect(theBasket.find('tbody.miniBasketSingleFareOutward tr.miniBasketRailcard')).not.toExist();
            expect(theBasket.find('tbody.miniBasketSingleFareReturn tr.miniBasketRailcard')).not.toExist();
            expect(theBasket.find('tbody.miniBasketSingleFareOutward')).toBeHidden();
            expect(theBasket.find('tbody.miniBasketSingleFareReturn')).toBeHidden();
        });

        it('should remove any single baskets present in a return fare if both journey legs are selected', function () {
            loadFixtures('ctfReturn1.html');
            $('input[type=radio]').each(function () {
                this.checked = false;
            });
            $('#returnFareOutward41')[0].checked = true;
            $('#returnFareReturn46')[0].checked = true;
           
            
            FC.fareSwitcher.switcher = $("th.fare .ctf-fare");
            FC.fareSwitcher.hasFS = true;
            FC.moreFares.$triggers = $("#ctf-results .more-fares a");
            NRE.otherServices.buildAllLinks($('.fare > div.single'));
            FC.fareSwitcher.init();
            FC.moreFares.init();
            NRE.earlierLaterAjax.init();

            $('#fare-switcher .left a').eq(0).click();

            $('.more-fares a').eq(0).click();

            var theBasket = $('.f-return  table.minibasket').eq(0);

            theBasket.append('<tbody class="miniBasketReturnFare"><tr class="miniBasketFare"></tr></tbody>');
            theBasket.append('<tbody class="miniBasketReturnFare"><tr class="miniBasketRailcard"></tr></tbody>');
            theBasket.append('<tbody class="miniBasketSingleFareOutward"><tr class="miniBasketFare"></tr></tbody>');
            theBasket.append('<tbody class="miniBasketSingleFareOutward"><tr class="miniBasketRailcard"></tr></tbody>');
            theBasket.append('<tbody class="miniBasketSingleFareReturn"><tr class="miniBasketFare"></tr></tbody>');
            theBasket.append('<tbody class="miniBasketSingleFareReturn"><tr class="miniBasketRailcard"></tr></tbody>');

            NRE.basket.inRet = true;
            NRE.basket.resetBask('ReturnFare', theBasket);
            
            expect(theBasket.find('tbody.miniBasketReturnFare tr.miniBasketFare')).toExist();
            expect(theBasket.find('tbody.miniBasketReturnFare tr.miniBasketRailcard')).toExist();
            expect(theBasket.find('tbody.miniBasketReturnFare')).toBeVisible();
            expect(theBasket.find('tbody.miniBasketSingleFareOutward tr.miniBasketFare')).not.toExist();
            expect(theBasket.find('tbody.miniBasketSingleFareReturn tr.miniBasketFare')).not.toExist();
            expect(theBasket.find('tbody.miniBasketSingleFareOutward tr.miniBasketRailcard')).not.toExist();
            expect(theBasket.find('tbody.miniBasketSingleFareReturn tr.miniBasketRailcard')).not.toExist();
            expect(theBasket.find('tbody.miniBasketSingleFareOutward')).toBeHidden();
            expect(theBasket.find('tbody.miniBasketSingleFareReturn')).toBeHidden();
        });

        it('should remove any return baskets present in a single fare', function () {
            loadFixtures('ctfReturn1.html');
            $('input[type=radio]').each(function () {
                this.checked = false;
            });
            $('#faresingleFareOutward41')[0].checked = true;
           
            
            FC.fareSwitcher.switcher = $("th.fare .ctf-fare");
            FC.fareSwitcher.hasFS = true;
            FC.moreFares.$triggers = $("#ctf-results .more-fares a");
            NRE.otherServices.buildAllLinks($('.fare > div.single'));
            FC.fareSwitcher.init();
            FC.moreFares.init();
            NRE.earlierLaterAjax.init();

            $('#fare-switcher .right a').eq(0).click();

            $('.more-fares a').eq(0).click();

            var theBasket = $('.f-single  table.minibasket').eq(0);

            theBasket.append('<tbody class="miniBasketSingleFareOutward"><tr class="miniBasketFare"></tr></tbody>');
            theBasket.append('<tbody class="miniBasketSingleFareOutward"><tr class="miniBasketRailcard"></tr></tbody>');
            theBasket.append('<tbody class="miniBasketSingleFareReturn"><tr class="miniBasketFare"></tr></tbody>');
            theBasket.append('<tbody class="miniBasketSingleFareReturn"><tr class="miniBasketRailcard"></tr></tbody>');
            theBasket.append('<tbody class="miniBasketReturnFare"><tr class="miniBasketFare"></tr></tbody>');
            theBasket.append('<tbody class="miniBasketReturnFare"><tr class="miniBasketRailcard"></tr></tbody>');

            NRE.basket.resetBask('SingleFareOutward', theBasket);

            expect(theBasket.find('tbody.miniBasketSingleFareOutward')).toBeVisible();
            expect(theBasket.find('tbody.miniBasketSingleFareReturn')).toBeVisible();
            expect(theBasket.find('tbody.miniBasketReturnFare tr.miniBasketFare')).not.toExist();
            expect(theBasket.find('tbody.miniBasketReturnFare tr.miniBasketRailcard')).not.toExist();
            expect(theBasket.find('tbody.miniBasketReturnFare')).toBeHidden();
        });
    });

    describe('baskBuild', function () {

    });

    describe('calcBaskVal', function () {

    });

    describe('buildFILink', function () {

    });

    describe('setSBask', function () {

    });

    describe('clickHandler', function () {

    });

    describe('unselORad', function () {

    });

    describe('removeAltTrains', function () {

    });

    describe('removeInboundReturns', function () {

    });

    describe('resetClass', function () {

    });

    describe('swapNames', function () {

    });

    describe('buyButtons', function () {

    });

    describe('selFare', function () {

    });
});

