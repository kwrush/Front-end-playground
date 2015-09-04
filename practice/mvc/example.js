/**
 * Model
 */
function ListModel(items) {
    this.items = items;
    this.selectedIndex = -1;
    
    this.itemAdded = new Event(this);
    this.itemRemoved = new Event(this);
    this.selectedIndexChanged = new Event(this); 
}

ListModel.prototype = {
    getItems: function() {
        return [].concat(this.items);
    },
    
    addItem: function(item) {
        this.items.push(item);
        this.itemAdded.notify({item: item});
    }
    
    removeItemAt: function(index) {
        var item;
        
        item = this.items[index];
        this.items.splice(index, 1);
        this.itemRemoved.notify({item: item});
        
        if (index === this.selectedIndex) {
            this.setSelectedIndex(-1);
        }
    }
};