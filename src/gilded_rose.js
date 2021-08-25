class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
  updateQuality() {
    if (this.quality > 0) {
      this.quality -= 1
    }
    if (this.sellIn > 0) {
      this.sellIn -=1
    }
    return this
  }
}

class AgedBrie extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }
  updateQuality() {
    if (this.quality < 50) {
      this.quality += 1
    }
    if (this.sellIn > 0) {
      this.sellIn -=1
    }
    return this
  }
}

class Sulfuras extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }
  updateQuality() {
    this.quality -= 0
    if (this.sellIn > 0) {
      this.sellIn -=1
    }
    return this
  }
}

class BackstagePasses extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }
  updateQuality() {
    switch (true) {
      case this.sellIn > 10 :
        this.quality += 1
        this.sellIn -= 1
        break;
      case this.sellIn < 11 && this.sellIn > 5 :
        this.quality += 2
        this.sellIn -= 1
        break;
      case this.sellIn < 5 && this.sellIn > 0 :
        this.quality += 3
        this.sellIn -= 1
        break;
      case this.sellIn === 0 :
        this.quality = 0
        this.sellIn = 0
        break;
    }
    this
    return this
  }
}




class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateItems(items) {
    items.forEach(item => {
      item.updateQuality()
    })
    return this.items;
  }

}
module.exports = {
  Item,
  AgedBrie,
  Sulfuras,
  BackstagePasses,
  Shop
}
