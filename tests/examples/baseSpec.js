
describe("Boxtop namespace", function () {
    it("should be defined", function () {
        expect(BXT).toBeDefined();
    })
});
describe("Utilities functions", function () {
    beforeEach(function () {
    	BXT.utils.isPalm = null;
    	BXT.utils.isLap = null;
    	BXT.utils.isDesk = null;
    });
    afterEach(function () {
    	BXT.utils.isPalm = null;
    	BXT.utils.isLap = null;
    	BXT.utils.isDesk = null;
    });
    it("BXT.utils should be defined", function () {
    	expect(BXT.utils).toBeDefined();
    });
    it("BXT.utils.functionInitializer should be defined", function () {
    	expect(BXT.utils.functionInitializer).toBeDefined();
    });
    it("BXT.utils.onresize should be defined", function () {
    	expect(BXT.utils.onResize).toBeDefined();
    });
    it("BXT.utils.resizeFuncs", function () {
    	expect(BXT.utils.resizeFuncs).toBeDefined();
    });
    describe("Screen detection", function () {

    	it("should set isPalm to true if the screen size is less than " + BXT.utils.lapStart + "px", function () {
    		spyOn(BXT.utils, "getWindowWidth").andReturn(BXT.utils.lapStart - 10);
    		BXT.utils.initScreenDetection();
            expect(BXT.utils.getWindowWidth).toHaveBeenCalled();
            expect(BXT.utils.isPalm).toBe(true);
            expect(BXT.utils.isLap).toBe(false);
            expect(BXT.utils.isLapLarge).toBe(false);
            expect(BXT.utils.isDesk).toBe(false);
        });

    	it("should set isLap to true and isLapLarge to be false if the screen size is more than " + BXT.utils.lapStart + "px and less than " + BXT.utils.deskStart + "px", function () {
    		spyOn(BXT.utils, "getWindowWidth").andReturn(BXT.utils.lapStart + 10);
    		BXT.utils.initScreenDetection();
            expect(BXT.utils.isPalm).toBe(false);
            expect(BXT.utils.isLap).toBe(true);
            expect(BXT.utils.isLapLarge).toBe(false);
            expect(BXT.utils.isDesk).toBe(false);
    	});

    	it("should set isLap to true if the screen size is " + BXT.utils.lapStart + "px", function () {
    		spyOn(BXT.utils, "getWindowWidth").andReturn(BXT.utils.lapStart);
    		BXT.utils.initScreenDetection();
    		expect(BXT.utils.isPalm).toBe(false);
    		expect(BXT.utils.isLap).toBe(true);
    		expect(BXT.utils.isLapLarge).toBe(false);
    		expect(BXT.utils.isDesk).toBe(false);
    	});

    	it("should set isLap to true and isLapLarge to true if the screen size is " + (BXT.utils.lapLargeStart + 10) + "px", function () {
    		spyOn(BXT.utils, "getWindowWidth").andReturn(BXT.utils.lapLargeStart + 10);
    		BXT.utils.initScreenDetection();
    		expect(BXT.utils.isPalm).toBe(false);
    		expect(BXT.utils.isLap).toBe(true);
    		expect(BXT.utils.isLapLarge).toBe(true);
    		expect(BXT.utils.isDesk).toBe(false);
    	});

    	it("should set isDesk to true if the screen size is more than " + (BXT.utils.deskStart) + "px", function () {
    		spyOn(BXT.utils, "getWindowWidth").andReturn(BXT.utils.deskStart + 1);
    		BXT.utils.initScreenDetection();
            expect(BXT.utils.isPalm).toBe(false);
            expect(BXT.utils.isLap).toBe(false);
            expect(BXT.utils.isLapLarge).toBe(false);
            expect(BXT.utils.isDesk).toBe(true)
    	});
    	it("should set isDesk to true and isLap to false if the screen size is " + (BXT.utils.deskStart) + "px", function () {
    		spyOn(BXT.utils, "getWindowWidth").andReturn(BXT.utils.deskStart);
    		BXT.utils.initScreenDetection();
    		expect(BXT.utils.isPalm).toBe(false);
    		expect(BXT.utils.isLap).toBe(false);
    		expect(BXT.utils.isLapLarge).toBe(false);
    		expect(BXT.utils.isDesk).toBe(true)
    	});
    });
    describe("Function initialiser", function () {
    	var tempNamespace;
    	beforeEach(function () {
    		tempNamespace = (function() {
    			var process = {
    				testVar: 0,
    				myFunction: function () {
    					this.testVar = 1;
    				}
    			}
    			
    			return process;
    		})();
    		spyOn(tempNamespace, 'myFunction').andCallThrough();
    		BXT.utils.functionList.push({ test: "#my-div", func: tempNamespace.myFunction, ctx: tempNamespace });
    		//spyOn(BXT.utils, 'functionInitializer').andCallThrough();
    		
    	});
    	afterEach(function () {
    		tempNamespace = null;
    		BXT.utils.functionList.pop();
    		if ($("#my-div")) {
    			$("#my-div").remove();
    		}
    	});
    	it("Should run the function if the html element is present", function () {
    		$("body").append("<div id='my-div'></div>");
    		BXT.utils.functionInitializer();
    		expect(tempNamespace.myFunction).toHaveBeenCalled();
    	});
    	it("Should run not the function if the html element not is present", function () {
    		BXT.utils.functionInitializer();
    		expect(tempNamespace.myFunction).not.toHaveBeenCalled();
    	});
    });
    describe("onResize", function () {
    	var tempNamespace;
    	beforeEach(function () {
    		tempNamespace = (function () {
    			var process = {
    				testVar: 0,
    				myFunction: function () {
    					this.testVar = 1;
    				}
    			}

    			return process;
    		})();
    		spyOn(tempNamespace, 'myFunction').andCallThrough();
    		BXT.utils.resizeFuncs.push({ func: tempNamespace.myFunction, ctx: tempNamespace });
    	});
    	afterEach(function () {
    		tempNamespace = null;
    		BXT.utils.resizeFuncs.pop();
    	});
    	it("should trigger functions when the window is resized", function () {
    		BXT.utils.onResize();
    		$(window).trigger("resize");
    		expect(tempNamespace.myFunction).toHaveBeenCalled();
    	});
    	it("should trigger functions when the device orientation is changed", function () {
    		BXT.utils.onResize();
    		$(window).trigger("orientationchange");
    		expect(tempNamespace.myFunction).toHaveBeenCalled();
    	});
    	it("should trigger the screen detection (values not null) function when the window is resized", function () {
    		BXT.utils.onResize();
    		$(window).trigger("resize");
    		expect(BXT.utils.isPalm).not.toBeNull();
    	});
    	it("should trigger the screen detection (values not null) function when the device orientation is changed", function () {
    		BXT.utils.onResize();
    		$(window).trigger("orientationchange");
    		expect(BXT.utils.isPalm).not.toBeNull();
    	});
    });

    describe("isLandscape", function () {
        it("should be true if the window height is less than window width", function () {
                spyOn(BXT.utils, "getWindowWidth").andReturn(200);
                spyOn(BXT.utils, "getWindowHeight").andReturn(100);
                expect(BXT.utils.isLandscape()).toBe(true);
        });
    });
  
});
