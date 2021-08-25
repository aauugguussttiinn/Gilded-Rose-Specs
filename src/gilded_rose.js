class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateQuality() {
    this.sellIn -=1
    switch (true) {
      case (this.quality > 0 && this.sellIn > -1) :
        this.quality -= 1
        break;
      case (this.quality > 2 && this.sellIn < 0)  :
        this.quality -= 2
        break;
      case (this.quality < 3 && this.sellIn < -1) :
        this.quality = 0
        break;
    }
    return this
  }

  updateConjuredQuality() {
    this.sellIn -=1
    switch (true) {
      case (this.quality > 1 && this.sellIn > -1) :
        this.quality -= 2
        break;
      case (this.quality > 3 && this.sellIn < 0)  :
        this.quality -= 4
        break;
      case (this.quality < 4 && this.sellIn < 0) :
        this.quality = 0
        break;
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
    this.sellIn -=1
    return this
  }
}

class Sulfuras extends Item {
  constructor(name) {
    super(name)
    this.quality = 80
  }
  updateQuality() {
    return this
  }
}

class BackstagePasses extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }
  updateQuality() {
    this.sellIn -= 1
    switch (true) {
      case (this.sellIn > 9) :
        if (this.quality < 50) {
          this.quality += 1
        }
        break;
      case this.sellIn < 11 && this.sellIn > 4 :
        if (this.quality < 49) {
          this.quality += 2
        } else {
          this.quality = 50
        }
        break;
      case this.sellIn < 6 && this.sellIn > 0 :
        if (this.quality < 48) {
          this.quality += 3
        } else {
          this.quality = 50
        }
        break;
      case this.sellIn === 0 :
        this.quality = 0
        break;
    }
    return this
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateItems(items) {
    items.forEach(item => {
      if ( /^Conjured/.test(item.name) ) {
        item.updateConjuredQuality()
      } else {
        item.updateQuality()
      }
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
