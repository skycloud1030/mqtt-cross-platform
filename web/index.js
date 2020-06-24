$(document).ready(function () {
  const TOPIC = "/test";
  $("#mqtt_pub").click(publish_message);
  client = new Paho.MQTT.Client(location.hostname, 9001, "clientId");
  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  // connect the client
  client.connect({ onSuccess: onConnect });

  // called when the client connects
  function onConnect() {
    console.log("onConnect");
    client.subscribe(TOPIC);
  }

  function publish_message() {
    var input_text = $("#mqtt_text");
    var payload = input_text.val();
    var message = new Paho.MQTT.Message(payload);
    message.destinationName = TOPIC;
    client.send(message);
    input_text.val("");
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
    document.getElementById("mqtt_monitor").innerHTML = message.payloadString;
  }
});
