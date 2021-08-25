var { Shop, Item, AgedBrie, Sulfuras, BackstagePasses } = require('../src/gilded_rose.js');
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));
    listItems.push(new Item("To be rotten tomato", -2, 2));
    listItems.push(new Item("Disgusting pastry", 7, 1));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems(listItems);

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 },
      { sellIn: -3, quality: 0 },
      { sellIn: 6, quality: 0 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Baisser de 1 la qualité et sellIn d'item Conjured", function () {
    listItems.push(new Item("Conjured +5 Dexterity Vest", 13, 20));
    listItems.push(new Item("Conjured Yummy yummy", 1, 13));
    listItems.push(new Item("Conjjured Yummy yummy", 1, 13));
    listItems.push(new Item("Mana Cake Conjured", 0, 11));
    listItems.push(new Item("Conjred To be rotten tomato", -2, 2));
    listItems.push(new Item("Disgusting pastrys", 7, 1));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems(listItems);

    var expected = [
      { sellIn: 12, quality: 18 },
      { sellIn: 0, quality: 11 },
      { sellIn: 0, quality: 12 },
      { sellIn: -1, quality: 9 },
      { sellIn: -3, quality: 0 },
      { sellIn: 6, quality: 0 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie", function () {
    listItems.push(new AgedBrie("Aged Brie", 20, 30));
    listItems.push(new AgedBrie("Quality Aged Brie", 15, 50));
    listItems.push(new AgedBrie("Aged Brie", 0, 11));
    listItems.push(new AgedBrie("Aged Brie", 20, 50));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems(listItems);

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 14, quality: 50 },
      { sellIn: -1, quality: 12 },
      { sellIn: 19, quality: 50 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité pour Backstage quand la date de péremption est à +10j", function () {
    listItems.push(new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 20, 50));
    listItems.push(new BackstagePasses("Backstage accelerates", 11, 48));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems(listItems);

    var expected = [
      { sellIn: 19, quality: 50 },
      { sellIn: 10, quality: 49 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité pour Backstage quand la date de péremption est entre +5 et +10j", function () {
    listItems.push(new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 10, 50));
    listItems.push(new BackstagePasses("Backstage accelerates", 9, 49));
    listItems.push(new BackstagePasses("Backstage is fast", 8, 48));
    listItems.push(new BackstagePasses("Backstage is faster", 7, 34));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems(listItems);

    var expected = [
      { sellIn: 9, quality: 50 },
      { sellIn: 8, quality: 50 },
      { sellIn: 7, quality: 50 },
      { sellIn: 6, quality: 36 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité pour Backstage quand la date de péremption est entre 0 et +5j", function () {
    listItems.push(new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 4, 50));
    listItems.push(new BackstagePasses("Backstage accelerates", 3, 49));
    listItems.push(new BackstagePasses("Backstage is fast", 2, 47));
    listItems.push(new BackstagePasses("Backstage is fast", 3, 40));
    listItems.push(new BackstagePasses("Backstage is faster", 1, 41));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems(listItems);

    var expected = [
      { sellIn: 3, quality: 50 },
      { sellIn: 2, quality: 50 },
      { sellIn: 1, quality: 50 },
      { sellIn: 2, quality: 43 },
      { sellIn: 0, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Baisser la qualité à zéro au jour de péremption", function () {
    listItems.push(new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 1, 50));
    listItems.push(new BackstagePasses("Backstage accelerates", 1, 3));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems(listItems);

    var expected = [
      { sellIn: 0, quality: 0 },
      { sellIn: 0, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Vérifier la qualité de Sulfura", function () {
    listItems.push(new Sulfuras("My suflura"));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems(listItems);

    var expected = [
      { quality: 80 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
    });
  });



});