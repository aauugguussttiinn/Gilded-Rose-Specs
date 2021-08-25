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
    this.sellIn -=1
    return this
  }
}

class AgedBrie extends Item {
  constructor(name, sellIn, quality) {
    super(name)
    super(sellIn)
    super(quality)
  }

  updateQuality() {
    if (this.quality < 50) {
      this.quality += 1
    }
    this.sellIn -=1
    return this
  }
}

class Sulfuras extends Item {
  constructor(name, sellIn, quality) {
    super(name)
    super(sellIn)
    super(quality)
  }

  updateQuality() {
    this.quality -= 0
    this.sellIn -=1
    return this
  }
}

class BackstagePasses extends Item {
  constructor(name, sellIn, quality) {
    super(name)
    super(sellIn)
    super(quality)
  }

  updateQuality() {
    switch (this.sellIn) {
      case this.sellIn < 11 && this.sellIn > 5 :
        this.quality += 2
      case this.sellIn < 5 && this.sellIn > 0 :
        this.quality += 3
      case 0 :
        this.quality = 0
    }
    this.sellIn -=1
    return this
  }
}




class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateItem(items) {
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
