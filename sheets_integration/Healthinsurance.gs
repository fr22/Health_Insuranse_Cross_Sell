function onOpen() {
  var ui = SpreadsheetApp.getUi()
  ui.createMenu('Predictions')
    .addItem('Get Prediction', 'PredictAll')
    .addToUi()
}

host_production = 'https://healthinsurance-api-render.onrender.com'
//helper function
function ApiCall(data, endpoint){
  var url = host_production + endpoint
  var payload = JSON.stringify(data)
  //Logger.log(url)
  //Logger.log(payload)
  

 
  var options = {'method':'post', 'contentType':'application/json', 'payload':payload, 'muteHttpExceptions': true}
  
  var response = UrlFetchApp.fetch(url, options)
  // get response
  var rc = response.getResponseCode()
  var responseText = response.getContentText()

  if (rc !== 200){
    Logger.log( rc, responseText)
    Logger.log( responseText)
    prediction = 'No prediction'
  }
  else{
    prediction = JSON.parse(responseText)
  }

  return prediction


}

function PredictAll() {
  var ss = SpreadsheetApp.getActiveSheet()
  var titleColumns = ss.getRange('A1:K1').getValues()[0]
  var lastRow = ss.getLastRow()
  var json_list = []
  var data = ss.getRange('A2' + ':' + 'K' + lastRow).getValues()

  // run over all rows
  for (row in data){
    var json = new Object()
    //run over all columns
    for (var j=0; j < titleColumns.length; j++){
      json[titleColumns[j]] = data[row][j]
    }

    //list of json to send
    var json_send = new Object()
    json_send['id'] = json['id']
    json_send['gender'] = json['gender']
    json_send['age'] = json['age']
    json_send['driving_license'] = json['driving_license']
    json_send['region_code'] = json['region_code']
    json_send['previously_insured'] = json['previously_insured']
    json_send['vehicle_age'] = json['vehicle_age']
    json_send['vehicle_damage'] = json['vehicle_damage']
    json_send['annual_premium'] = json['annual_premium']
    json_send['policy_sales_channel'] = json['policy_sales_channel']
    json_send['vintage'] = json['vintage']

    //Logger.log(JSON.stringify(json_send))
    json_list = json_list.concat(json_send)

    

  }
  //Logger.log(json_list)
  pred = ApiCall(json_list, '/predict')
  //Logger.log(pred)
  
  //send back to google sheets
  for (row in data){
    ss.getRange(Number(row)+2, 12).setValue(pred[Number(row)]['prediction'])
    //Logger.log(pred[Number(row)]['prediction'])
  }
	//Logger.log(JSON.stringify(json_list))																	

}