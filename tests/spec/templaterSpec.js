describe("BC.templater functions", function () {
	beforeEach(function () {
		setFixtures(sandbox());
	});

	afterEach(function () {
		$('#sandbox').empty();
	});
	var myData = {
			item1: "my item 1", item2: "my item 2", moreItems: {
				moreItem: [
					{ item3: "Item 3 in object 1", item4: "Item 4 in object 1" },
					{ item3: "Item 3 in object 2", item4: "Item 4 in object 2" }
				]
			}
	};
	it("container should be defined", function () {
		expect(BC.templater).toBeDefined();
	});

	it("cleanTemplate should be defined", function () {
		expect(BC.cleanTemplate).toBeDefined();
	});

	describe("templater main function", function () {
		it("should replace the placeholders with the data provided", function () {
			$("#sandbox").append(BC.fixtures.templater.testTemplate);
			var newHtml = BC.templater($("#test-template").html(), myData, null, []);
			$("#sandbox").append(newHtml);
			expect($("#test1").text()).toBe(myData.item1);
			expect($("#test2").text()).toBe(myData.item2);
		});
		it("should be able to handle partial templates", function () {
			$("#sandbox").append(BC.fixtures.templater.testTemplate);
			$("#sandbox").append(BC.fixtures.templater.testPartialTemplate);
			var newHtml = BC.templater($("#test-template").html(), myData, null, [{ template: $("#test-template-part").html(), partialName: "moreItems\\.moreItem" }]);
			$("#sandbox").append(newHtml);
			expect($("#more-items")).toExist();
			expect($($("#more-items span")[0]).text()).toBe(myData.moreItems.moreItem[0].item3);
			expect($($("#more-items span")[1]).text()).toBe(myData.moreItems.moreItem[0].item4);
			expect($($("#more-items span")[2]).text()).toBe(myData.moreItems.moreItem[1].item3);
			expect($($("#more-items span")[3]).text()).toBe(myData.moreItems.moreItem[1].item4);
		});
	});
	describe("cleaning function", function () {
		it("should remove any unmatched values", function () {
			$("#sandbox").append(BC.fixtures.templater.testTemplate);
			$("#sandbox").append(BC.fixtures.templater.testPartialTemplate);
			var newHtml = BC.templater($("#test-template").html(), myData, null, [{ template: $("#test-template-part").html(), partialName: "moreItems\\.moreItem" }]);
			var cleanedHtml = BC.cleanTemplate(newHtml);
			$("#sandbox").append(cleanedHtml);
			expect($("#test5").text()).toBe("");
		})
	});
});