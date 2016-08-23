var BC = window.BC || {};
BC.fixtures = BC.fixtures || {};
BC.fixtures.templater = {
    testTemplate: '<script type="text/html" id="test-template"><span id="test1">{{item1}}</span><span id="test2">{{item2}}</span><span id="test5">{{test5}}</span></div><div id="more-items">{{<moreItems.moreItem}}</div></script>',
    testPartialTemplate: '<script type="text/html" id="test-template-part"><span>{{item3}}</span><span>{{item4}}</span></script>'
}