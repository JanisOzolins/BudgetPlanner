var budget = new Mongo.Collection("budget");

if (Meteor.isClient) {
  //variable declarations
  var living = 0;
  var income1 = 0;
  var income2 = 0;
  var income3 = 0;
  var transport = 0;
  var income = 0;
  var insurance = 0;
  var loans = 0;
  var leisure = 0;
  var balance = 0;
  var budgetInterval = "";
  Session.set("balance", 0);
  Session.set("expenses", 0);
  Session.set("income", 0);
  Session.set("currentWindow", "none");

  Template.selector.events({
    "change #btnWeekly" : function() {
      budgetInterval = "weekly";
    },

    "change #btnMonthly" : function() {
      budgetInterval = "monthly";
    },

    "change #btnYearly" : function() {
      budgetInterval = "yearly";
    },

  })

  Template.body.helpers({
    balance : function () { return Session.get("balance") },
    income : function () { return Session.get("income") },
    expenses : function () { return Session.get("expenses") },
   })

  Template.inputForm.helpers({
        showIncome : function () {
          return Session.get("currentWindow") === "income" ? true : false;
        }
  })

  Template.graphs.helpers({
    IncomeVsExpensesChart : function() {
      var chart, categories = ['Income', 'Expenses'];

      return {
      series: [{
                type: 'bar',
                name: 'Income vs. Expenses',
                data: [
                    ['Income',    	Session.get("graphIncome")],
                    ['Expenses',       	Session.get("graphExpenses")],
                ]
            }],
      xAxis: [{
                categories: categories,
                reversed: false
            }],

      title: { text: 'Income vs Expenses (Yearly)' },



      };
},
    ExpensesChart : function() {
      var chart, categories = ['Living Expenses', 'Transport', 'Insurance', 'Loans', 'Leisure'];

      return {
      series: [{
                type: 'pie',
                name: 'Income vs. Expenses',
                data: [
                    ['Income',    	Session.get("graphIncome")],
                    ['Expenses',       	Session.get("graphExpenses")],
                ]
            }],
      xAxis: [{
                categories: categories,
                reversed: false
            }],

      title: { text: 'Income vs Expenses (Yearly)' },



      };
},
  })

  Template.inputForm.events({

    "click #incomeExpand" : function(event, template) {
      Session.set("currentWindow", "income");
      return false;
    },

    "blur #income1" : function(event, template) {
      if (event.target.value === "" || event.target.value < 0 ){
        document.getElementById("income1").value = "0";
        income1 = parseInt(event.target.value);
      }
      else {
        income1 = parseInt(event.target.value);
      }
    },
    "blur #income2" : function(event, template) {
      if (event.target.value === "" || event.target.value < 0 ){
        document.getElementById("income2").value = "0";
        income2 = parseInt(event.target.value);
      }
      else {
        income2 = parseInt(event.target.value);
      }
    },
    "blur #income3" : function(event, template) {
      if (event.target.value === "" || event.target.value < 0 ){
        document.getElementById("income3").value = "0";
        income3 = parseInt(event.target.value);
      }
      else {
        income3 = parseInt(event.target.value);
      }
    },

    "blur input" : function(event, template) {
     income = income1 + income2 + income3;
     Session.set("balance", income - living - transport - insurance - loans - leisure);
     Session.set("expenses", living + transport + insurance + loans + leisure);

     Session.set("income", income1 + income2 + income3);

      if (budgetInterval === "weekly") {
         Session.set("graphIncome", Session.get("income") * 52);
      }
      if (budgetInterval === "monthly") {
         Session.set("graphIncome", Session.get("income") * 12);
      }
      if (budgetInterval === "yearly") {
         Session.set("graphIncome", Session.get("income"));
      }

     if (Session.get("balance") < 0) {
        document.getElementById("balance").style.color = "red";
     }
     if (Session.get("balance") > 0) {
        document.getElementById("balance").style.color = "green";
     }
     if (Session.get("balance") === 0) {
        document.getElementById("balance").style.color = "yellow";
     }

      if (budgetInterval === "weekly") {
         Session.set("graphExpenses", Session.get("expenses") * 52);
      }
      if (budgetInterval === "monthly") {
         Session.set("graphExpenses", Session.get("expenses") * 12);
      }
      if (budgetInterval === "yearly") {
         Session.set("graphExpenses", Session.get("expenses"));
      }
    },


    "blur  #income" : function(event, template) {


      

      Session.set("currentWindow", "income");

    },

    "click #saveBudget" : function (event, template) {
      var promptName = prompt("Please enter a memorable name for your budget");
      var object = {name: promptName, interval: budgetInterval, income: Session.get("income"), living: living, transport: transport, insurance: insurance, loans: loans, leisure: leisure, expenses: Session.get("expenses")};

      budget.insert(object);

      alert(budget.find());

      return false;

    },

    "change #living" : function(event, template) {
      if (event.target.value === "" || event.target.value < 0 ){
        document.getElementById("living").value = "0";
        living = parseInt(event.target.value);
      }
      else {
        living = parseInt(event.target.value);
      }
    },

    "change  #transport" : function(event, template) {
      if (event.target.value === "" || event.target.value < 0 ){
        document.getElementById("transport").value = "0";
        transport = parseInt(event.target.value);
      }
      else {
        transport = parseInt(event.target.value);
      }
    },

    "change  #insurance" : function(event, template) {
     if (event.target.value === "" || event.target.value < 0 ){
        document.getElementById("insurance").value = "0";
        insurance = parseInt(event.target.value);
      }
      else {
        insurance = parseInt(event.target.value);
      }
    },

    "change #loans" : function(event, template) {
      if (event.target.value === "" || event.target.value < 0 ){
        document.getElementById("loans").value = "0";
        loans = parseInt(event.target.value);
      }
      else {
        loans = parseInt(event.target.value);
      }
    },

    "change  #leisure" : function(event, template) {
      if (event.target.value === "" || event.target.value < 0 ){
        document.getElementById("leisure").value = "0";
        leisure = parseInt(event.target.value);
      }
      else {
        leisure = parseInt(event.target.value);
      }
    },

  })


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
