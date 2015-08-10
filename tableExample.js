if (Meteor.isClient) {
  tableItems = new ReactiveVar([]);
  Template.table.onCreated(function() {
    ti = tableItems.get();
    ti.push({
      _id: tableItems.get().length,
      cost: 0,
      amount: 0
    });
    ti.push({
      _id: tableItems.get().length,
      cost: 0,
      amount: 0
    });
    tableItems.set(ti);
  });
  Template.table.helpers({
    tableItems: function() {
      return tableItems.get();
    },
    total: function() {
      ti = tableItems.get();
      var total = 0;
      for (var i = 0; i < ti.length; i++) {
        total += ti[i].cost * ti[i].amount;
      }
      return total;
    }
  });
  Template.tableItem.helpers({
    total: function() {
      console.log(Template.instance().data);
      return Template.instance().data.cost * Template.instance().data.amount;
    }
  });
  Template.tableItem.events({
    'keyup .cost': function() {
      var cost = parseFloat($(".t" + this._id + " .cost").val());
      var ti = tableItems.get();
      ti[this._id].cost = cost;
      tableItems.set(ti);
    },
    'keyup .amount': function() {
      var amount = parseFloat($(".t" + this._id + " .amount").val());
      var ti = tableItems.get();
      ti[this._id].amount = amount;
      tableItems.set(ti);
    }
  });
}
