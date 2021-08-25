var { Shop, Item, AgedBrie, Sulfuras, BackstagePasses } = require('../src/gilded_rose.js');
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems(listItems);

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie", function () {
    listItems.push(new AgedBrie("Aged Brie", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems(listItems);

    var expected = [
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité pour Backstage passes", function () {
    listItems.push(new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 20, 30));
    listItems.push(new BackstagePasses("Backstage accelerates", 8, 16));
    listItems.push(new BackstagePasses("Backstage is fast", 3, 4));
    listItems.push(new BackstagePasses("Backstage is null", 0, 45));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems(listItems);

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 7, quality: 18 },
      { sellIn: 2, quality: 7 },
      { sellIn: 0, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

});