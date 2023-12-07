function handleNewEmails() {
  //credit to trusktr on https://stackoverflow.com/questions/50032950/google-gmail-script-that-triggers-on-incoming-email
  const PAGE_SIZE = 50;

  var threads = GmailApp.search("newer_than:1h", 0, PAGE_SIZE) //new emails

  //iterate thru new threads
  for (var thread of threads) {

    //get email(s)
    const adresses = thread.getMessages()[0].getTo();

    for (var adress of adresses.split(",")){

      //get bounds for parsing
      var plus = adress.indexOf("+");
      var at = adress.indexOf("@");

      if (plus == -1){
          Logger.log("Filtered out: " + adress)
          continue;}  //filter out

      //log adress
      Logger.log("Filter in: " + adress)

      //parse
      var plus_adress = adress.substring(plus + 1, at);

      //Iterate thru labels, mach existing labels to specific adress
      const labels = GmailApp.getUserLabels();
      for (var label of labels){
        if (label.getName() === plus_adress){ //label found

          //add label to the current thread
          thread.addLabel(label);
          break;
      }
    }

    //no existing label found -->  create label
    const my_label = GmailApp.createLabel(plus_adress);
    thread.addLabel(my_label);
    }
    //exit new threads
  }
}
