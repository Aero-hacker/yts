import React from "react";
import { message } from "antd";
import { MQTTURL, MQTTPORT } from "../../../../DataConfig";
export function ESP_Dev1_Generation(
  JSONData,
  JSONData2,
  JSONName,
  setBinFileProcessing
) {
  function convertStringToNumber(data) {
    let SplitData = data.split("GPIO");
    return SplitData[1];
  }
  function TypeToPinmode(data) {
    switch (data) {
      case "button":
        return "OUTPUT";
        break;
      case "switch":
        return "OUTPUT";
        break;
      case "slider":
        return "OUTPUT";
        break;
      case "value":
        return "INPUT";
        break;
      case "gauge":
        return "INPUT";
        break;
    }
  }
  let FinalEmbeddedCode = "";
  let ConfigurationPins = [];
  console.log("The JSON Data1", JSONData);
  console.log("The JSON Data2", JSONData2);

  JSONData.fields.map((data) => {
    if (
      (data.props.IOTConfig != null || undefined) &&
      !data.props.CustomConfig
    ) {
      let TempJSON = {
        ...data.props.IOTConfig?.selectedPins?.pinData,
        Type: data.type,
        PinNameValue: convertStringToNumber(
          data.props.IOTConfig?.selectedPins?.pinData?.PinName
        ),
        PinMode: TypeToPinmode(data.type),
      };
      // console.log(TempJSON);
      ConfigurationPins.push(TempJSON);
    }
  });
  if (ConfigurationPins === null) {
    message.info("For this there is IOT Configuration Exists");
    return;
  }
  console.log("Configuration Pins Data --->", ConfigurationPins);

  let CustomConfigurationPins = [];
  JSONData.fields.map((data) => {
    if (
      (data.props.IOTConfig != null || undefined) &&
      data.props.CustomConfig
    ) {
      let TempJSON = {
        ...data.props.CustomConfig.CustomCode,
        ...data.props.CustomConfig.selectedPins.pinData,
        Type: data.type,
        PinNameValue: convertStringToNumber(
          data.props.CustomConfig?.selectedPins?.pinData?.PinName
        ),
        PinMode: TypeToPinmode(data.type),
      };
      // console.log(TempJSON);
      CustomConfigurationPins.push(TempJSON);
    }
  });
  console.log("Custom Configuration Pins Data --->", CustomConfigurationPins);

  setBinFileProcessing(true);
  FinalEmbeddedCode += `
    #include <WiFi.h>
    #include <PubSubClient.h>
    #include <ArduinoJson.h>`;

  CustomConfigurationPins.map((data) => {
    FinalEmbeddedCode += `
      ${data.CustomCode1}
      `;
  });

  FinalEmbeddedCode += `
    const char* ssid = "${JSONData2.WiFi_SSID}";
    const char* password = "${JSONData2.WiFi_Password}";
    const char* mqtt_server = "${MQTTURL}";
    const int mqtt_port = ${MQTTPORT};
    const char* mqtt_user = "Jaideep";
    const char* mqtt_password = "Jaideep";
    const char* mqtt_clientId = "Pezala_${Math.floor(
      new Date().getTime() / 1000.0
    )}";
    const char* mqtt_topic_read = "HS_${JSONData2.Topic}";
    const char* mqtt_topic_post = "HP_${JSONData2.Topic}";

    unsigned long DataPost = 0;

    WiFiClient espClient;
    PubSubClient client(espClient);

    String ResData = "";`;

  CustomConfigurationPins.map((data) => {
    FinalEmbeddedCode += `
      ${data.CustomCode2}
      `;
  });

  FinalEmbeddedCode += `
    void setup() {
      Serial.begin(115200);`;

  ConfigurationPins.map((data) => {
    FinalEmbeddedCode += `
         pinMode(${data.PinNameValue}, ${data.PinMode});`;
  });
  CustomConfigurationPins.map((data) => {
    FinalEmbeddedCode += `
      ${data.CustomCode3}
      `;
  });
  FinalEmbeddedCode += `
    Serial.println("Version Name: ${JSONData2.VersionAlias}");
    Serial.println("Version Software: V1.00, Embedded: V1.00");
    Serial.print("WiFi SSID: ");
    Serial.println(ssid);
    Serial.print("WiFi Password: ");
    Serial.println(password);
    Serial.print("MQTT Topic Read: ");
    Serial.println(mqtt_topic_read);
    Serial.print("MQTT Topic Post: ");
    Serial.println(mqtt_topic_post);

     WiFi.begin(ssid, password);
      while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
      }
      Serial.println("Connected to WiFi");
  
      client.setServer(mqtt_server, mqtt_port);
      client.setCallback(callback);

      while (!client.connected()) {
        Serial.println("Connecting to MQTT...");
        if (client.connect(mqtt_clientId, mqtt_user, mqtt_password)) {
          Serial.println("Connected to MQTT");
          client.subscribe(mqtt_topic_read);
        } else {
          Serial.print("Failed, rc=");
          Serial.print(client.state());
          Serial.println(" Retrying in 5 seconds...");
          delay(5000);
        }
      }
    }

    void loop() {
      client.loop();
      if((millis() - DataPost) > 5000){
        DataPost = millis();
        String MessageData;
        char MessageDataSend[400];
        StaticJsonDocument<400> doc;
        String DataValue = "";
        `;

  ConfigurationPins.map((data) => {
    if (data.Type === "value") {
      FinalEmbeddedCode += `

          Serial.println("<------------Publishing ${data.PinNameValue} Data---------->");
          doc["PinChanged"] = ${data.PinNameValue};
          doc["FPinData"] = digitalRead(${data.PinNameValue});
          serializeJson(doc, MessageDataSend);
          Serial.print("Publish Payload Data: ");
          Serial.println(MessageDataSend);
          Serial.println("");
          Serial.println("");
          client.publish(mqtt_topic_post, MessageDataSend);
          
        `;
    }
    if (data.Type === "gauge") {
      FinalEmbeddedCode += `

          Serial.println("<------------Publishing ${data.PinNameValue} Data---------->");
          doc["PinChanged"] = ${data.PinNameValue};
          doc["FPinData"] = analogRead(${data.PinNameValue});
          serializeJson(doc, MessageDataSend);
          Serial.print("Publish Payload Data: ");
          Serial.println(MessageDataSend);
          Serial.println("");
          Serial.println("");
          client.publish(mqtt_topic_post, MessageDataSend);

        `;
    }
  });
  CustomConfigurationPins.map((data) => {
    if (data.Type === "value") {
      FinalEmbeddedCode += `

          Serial.println("<------------Publishing ${data.PinNameValue} Data---------->");
          doc["PinChanged"] = ${data.PinNameValue};
          DataValue = "";
          ${data.CustomCode4}
          doc["FPinData"] = DataValue;
          serializeJson(doc, MessageDataSend);
          Serial.print("Publish Payload Data: ");
          Serial.println(MessageDataSend);
          Serial.println("");
          Serial.println("");
          client.publish(mqtt_topic_post, MessageDataSend);
          
        `;
    }
    if (data.Type === "gauge") {
      FinalEmbeddedCode += `

          Serial.println("<------------Publishing ${data.PinNameValue} Data---------->");
          doc["PinChanged"] = ${data.PinNameValue};
          DataValue = "";
          ${data.CustomCode4}
          doc["FPinData"] = DataValue;
          serializeJson(doc, MessageDataSend);
          Serial.print("Publish Payload Data: ");
          Serial.println(MessageDataSend);
          Serial.println("");
          Serial.println("");
          client.publish(mqtt_topic_post, MessageDataSend);

        `;
    }
  });

  FinalEmbeddedCode += `
      }
    }
    void callback(char* topic, byte* payload, unsigned int length) {
      String MessageData;
      char MessageDataSend[400];
      StaticJsonDocument<400> doc;

      Serial.print("Message arrived to Topic: ");
      Serial.println(topic);
      Serial.print("Payload: ");
      for (int i = 0; i < length; i++) {
        MessageData += (char)payload[i];
      }
      Serial.println(MessageData);
      Serial.println("");
      DeserializationError error = deserializeJson(doc, MessageData);

      if (error) {
        Serial.print(F("deserializeJson() failed: "));
        Serial.println(error.f_str());
        return;
      }
      ResData = "";
      unsigned long PinChanged = doc["PinChanged"];
      switch (PinChanged) {
`;
  ConfigurationPins.map((data) => {
    if (data.Type === "switch") {
      FinalEmbeddedCode += `
         case ${data.PinNameValue}:
        {
          Serial.println("<------------Pin Triggered is ${data.PinNameValue}---------->");
          String PinData = doc["PinData"];
          if (PinData == "true") {
            digitalWrite(${data.PinNameValue}, HIGH);
            ResData = "true";
          }
          if (PinData == "false") {
            digitalWrite(${data.PinNameValue}, LOW);
            ResData = "false";
          }
        }
        break;`;
    }
    if (data.Type === "slider") {
      FinalEmbeddedCode += `
         case ${data.PinNameValue}:
        {
          Serial.println("<------------Pin Triggered is ${data.PinNameValue}---------->");
          int PinData = doc["PinData"];
          analogWrite(${data.PinNameValue}, PinData);
          ResData = String(PinData);
        }
        break;`;
    }
  });
  CustomConfigurationPins.map((data) => {
    if (data.Type === "switch") {
      FinalEmbeddedCode += `
         case ${data.PinNameValue}:
        {
          Serial.println("<------------Pin Triggered is ${data.PinNameValue}---------->");
          String PinData = doc["PinData"];
          if (PinData == "true") {
            ResData = "true";
          }
          if (PinData == "false") {
            ResData = "false";
          }
          String DataValue = PinData;
          ${data.CustomCode4}
        }
        break;`;
    }
    if (data.Type === "slider") {
      FinalEmbeddedCode += `
         case ${data.PinNameValue}:
        {
          Serial.println("<------------Pin Triggered is ${data.PinNameValue}---------->");
          int PinData = doc["PinData"];
          ResData = String(PinData);
          int DataValue = PinData;
           ${data.CustomCode4}
        }
        break;`;
    }
  });

  FinalEmbeddedCode += `
        default:
        {
          Serial.println("<------------Did not match with any given Pin---------->");
        }
        break;
      }
      doc["FPinData"] = ResData;

      serializeJson(doc, MessageDataSend);
      Serial.print("Publish Payload Data: ");
      Serial.println(MessageDataSend);
      Serial.println("");
      Serial.println("");
      client.publish(mqtt_topic_post, MessageDataSend);
    }
 `;

  let FileName = `EmbeddedCode_V1_${Math.floor(new Date().getTime() / 1000.0)}`;
  console.log("<-----------Embedded Code & Details---------------->");
  let ReturnData = {
    Name: JSONData2.VersionAlias,
    FileName: FileName,
    EmbeddedCode: FinalEmbeddedCode,
  };
  console.log(ReturnData);
  return ReturnData;
}
