import{s as b,bB as R,bC as k,r as s,j as n,M as U,B as x,X as W,c as V,d as w,K as y,aa as A}from"./index-Cb_E7giR.js";import{h as G}from"./moment-BH_gi4k_.js";import{T as z}from"./Table-BWfrwmEE.js";import"./styleChecker-CdUbCfc4.js";import"./addEventListener-BgwVifcY.js";import"./index-DvPUYAG9.js";import"./Pagination-CHtVKEwY.js";function L(g,o,C,p){function S(e){return e.split("GPIO")[1]}function l(e){switch(e){case"button":return"OUTPUT";case"switch":return"OUTPUT";case"slider":return"OUTPUT";case"value":return"INPUT";case"gauge":return"INPUT"}}let t="",m=[];if(console.log("The JSON Data1",g),console.log("The JSON Data2",o),g.fields.map(e=>{var u,P,f,h,_;if(e.props.IOTConfig!=null&&!e.props.CustomConfig){let M={...(P=(u=e.props.IOTConfig)==null?void 0:u.selectedPins)==null?void 0:P.pinData,Type:e.type,PinNameValue:S((_=(h=(f=e.props.IOTConfig)==null?void 0:f.selectedPins)==null?void 0:h.pinData)==null?void 0:_.PinName),PinMode:l(e.type)};m.push(M)}}),m===null){b.info("For this there is IOT Configuration Exists");return}console.log("Configuration Pins Data --->",m);let r=[];g.fields.map(e=>{var u,P,f;if(e.props.IOTConfig!=null&&e.props.CustomConfig){let h={...e.props.CustomConfig.CustomCode,...e.props.CustomConfig.selectedPins.pinData,Type:e.type,PinNameValue:S((f=(P=(u=e.props.CustomConfig)==null?void 0:u.selectedPins)==null?void 0:P.pinData)==null?void 0:f.PinName),PinMode:l(e.type)};r.push(h)}}),console.log("Custom Configuration Pins Data --->",r),p(!0),t+=`
    #include <WiFi.h>
    #include <PubSubClient.h>
    #include <ArduinoJson.h>`,r.map(e=>{t+=`
      ${e.CustomCode1}
      `}),t+=`
    const char* ssid = "${o.WiFi_SSID}";
    const char* password = "${o.WiFi_Password}";
    const char* mqtt_server = "${R}";
    const int mqtt_port = ${k};
    const char* mqtt_user = "Jaideep";
    const char* mqtt_password = "Jaideep";
    const char* mqtt_clientId = "Pezala_${Math.floor(new Date().getTime()/1e3)}";
    const char* mqtt_topic_read = "HS_${o.Topic}";
    const char* mqtt_topic_post = "HP_${o.Topic}";

    unsigned long DataPost = 0;

    WiFiClient espClient;
    PubSubClient client(espClient);

    String ResData = "";`,r.map(e=>{t+=`
      ${e.CustomCode2}
      `}),t+=`
    void setup() {
      Serial.begin(115200);`,m.map(e=>{t+=`
         pinMode(${e.PinNameValue}, ${e.PinMode});`}),r.map(e=>{t+=`
      ${e.CustomCode3}
      `}),t+=`
    Serial.println("Version Name: ${o.VersionAlias}");
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
        `,m.map(e=>{e.Type==="value"&&(t+=`

          Serial.println("<------------Publishing ${e.PinNameValue} Data---------->");
          doc["PinChanged"] = ${e.PinNameValue};
          doc["FPinData"] = digitalRead(${e.PinNameValue});
          serializeJson(doc, MessageDataSend);
          Serial.print("Publish Payload Data: ");
          Serial.println(MessageDataSend);
          Serial.println("");
          Serial.println("");
          client.publish(mqtt_topic_post, MessageDataSend);
          
        `),e.Type==="gauge"&&(t+=`

          Serial.println("<------------Publishing ${e.PinNameValue} Data---------->");
          doc["PinChanged"] = ${e.PinNameValue};
          doc["FPinData"] = analogRead(${e.PinNameValue});
          serializeJson(doc, MessageDataSend);
          Serial.print("Publish Payload Data: ");
          Serial.println(MessageDataSend);
          Serial.println("");
          Serial.println("");
          client.publish(mqtt_topic_post, MessageDataSend);

        `)}),r.map(e=>{e.Type==="value"&&(t+=`

          Serial.println("<------------Publishing ${e.PinNameValue} Data---------->");
          doc["PinChanged"] = ${e.PinNameValue};
          DataValue = "";
          ${e.CustomCode4}
          doc["FPinData"] = DataValue;
          serializeJson(doc, MessageDataSend);
          Serial.print("Publish Payload Data: ");
          Serial.println(MessageDataSend);
          Serial.println("");
          Serial.println("");
          client.publish(mqtt_topic_post, MessageDataSend);
          
        `),e.Type==="gauge"&&(t+=`

          Serial.println("<------------Publishing ${e.PinNameValue} Data---------->");
          doc["PinChanged"] = ${e.PinNameValue};
          DataValue = "";
          ${e.CustomCode4}
          doc["FPinData"] = DataValue;
          serializeJson(doc, MessageDataSend);
          Serial.print("Publish Payload Data: ");
          Serial.println(MessageDataSend);
          Serial.println("");
          Serial.println("");
          client.publish(mqtt_topic_post, MessageDataSend);

        `)}),t+=`
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
`,m.map(e=>{e.Type==="switch"&&(t+=`
         case ${e.PinNameValue}:
        {
          Serial.println("<------------Pin Triggered is ${e.PinNameValue}---------->");
          String PinData = doc["PinData"];
          if (PinData == "true") {
            digitalWrite(${e.PinNameValue}, HIGH);
            ResData = "true";
          }
          if (PinData == "false") {
            digitalWrite(${e.PinNameValue}, LOW);
            ResData = "false";
          }
        }
        break;`),e.Type==="slider"&&(t+=`
         case ${e.PinNameValue}:
        {
          Serial.println("<------------Pin Triggered is ${e.PinNameValue}---------->");
          int PinData = doc["PinData"];
          analogWrite(${e.PinNameValue}, PinData);
          ResData = String(PinData);
        }
        break;`)}),r.map(e=>{e.Type==="switch"&&(t+=`
         case ${e.PinNameValue}:
        {
          Serial.println("<------------Pin Triggered is ${e.PinNameValue}---------->");
          String PinData = doc["PinData"];
          if (PinData == "true") {
            ResData = "true";
          }
          if (PinData == "false") {
            ResData = "false";
          }
          String DataValue = PinData;
          ${e.CustomCode4}
        }
        break;`),e.Type==="slider"&&(t+=`
         case ${e.PinNameValue}:
        {
          Serial.println("<------------Pin Triggered is ${e.PinNameValue}---------->");
          int PinData = doc["PinData"];
          ResData = String(PinData);
          int DataValue = PinData;
           ${e.CustomCode4}
        }
        break;`)}),t+=`
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
 `;let N=`EmbeddedCode_V1_${Math.floor(new Date().getTime()/1e3)}`;console.log("<-----------Embedded Code & Details---------------->");let T={Name:o.VersionAlias,FileName:N,EmbeddedCode:t};return console.log(T),T}const H=({data:g,fetchList:o})=>{const[C,p]=s.useState(!1),[S,l]=s.useState({}),[t,m]=s.useState({}),[r,N]=s.useState(!1),[T,e]=s.useState(!0),[u,P]=s.useState(),[f,h]=s.useState(!1),[_,M]=s.useState(!1),[E,q]=s.useState(),O=[{title:"Name",dataIndex:"Name",key:"Name"},{title:"Equipment",dataIndex:"Equipment",key:"Equipment"},{title:"Bin File Status",dataIndex:"BinFileState",key:"BinFileState",render:d=>n.jsx(n.Fragment,{children:d?"True":"False"})},{title:"Actions",dataIndex:"actions",key:"actions",render:(d,i)=>n.jsx(n.Fragment,{children:n.jsx(x,{onClick:()=>{p(!0),P(i.Data.jsondata_id),h(i.BinFileState),M(i.Data.embedded_generated_name),q(i.Name),l(i.Data.json),m(i.Data.json2),console.log("Complete Data",i),console.log("Hardware Json Data",i.Data.json),console.log("Hardware Json Data2",i.Data.json2)},type:"primary",size:"large",children:"Push Code"})})}];function J(d){let i=L(d,t,E,N);const c=new FormData;c.append("name",i==null?void 0:i.Name),c.append("version","V1.00"),c.append("code",i==null?void 0:i.EmbeddedCode),c.append("hardware_name","esp32:esp32:nodemcu-32s"),c.append("filename",i==null?void 0:i.FileName),c.append("User_Id",W()),V.post(w.CodePush.GenerateBinFile,c).then(a=>{console.log(a);let D=`${y}/media/Embedded/Arduino/${i==null?void 0:i.FileName}/${i==null?void 0:i.FileName}.ino.bin`,$=new Date;V.post(`${w.CodePush.UpdateJSON}${u}/`,{embedded_generated_code_state:!0,embedded_generated_name:i==null?void 0:i.FileName,embedded_generated_time:G($).format("MMMM Do YYYY, h:mm:ss a")}).then(F=>{console.log(F),b.success("Embedded Bin File code Generation Success"),j(D),e(!1),o()})}).catch(a=>{var D,$,F,I,v,B;console.log(a),(D=a==null?void 0:a.data)!=null&&D.message?b.error(($=a==null?void 0:a.data)==null?void 0:$.message):b.error("Something went wrong"),(I=(F=a==null?void 0:a.response)==null?void 0:F.data)!=null&&I.message&&(navigator.clipboard.writeText(`${(B=(v=a==null?void 0:a.response)==null?void 0:v.data)==null?void 0:B.message}`),b.info("Error is Copied to Clipboard"))}).finally(()=>{N(!1)})}function j(d){let i={name:E,version:"Pezala_V1.0",new_install_prompt_erase:!1,builds:[{chipFamily:"ESP32",parts:[{path:`${y}/media/Embedded/Arduino/FixedFiles/boot_app0.bin`,offset:57344},{path:d,offset:65536},{path:`${y}/media/Embedded/Arduino/FixedFiles/BootLoaderFile.ino.bootloader.bin`,offset:4096},{path:`${y}/media/Embedded/Arduino/FixedFiles/PartionFile.ino.partitions.bin`,offset:32768}]}]};console.log("<-----------File Path Generated---------------->"),console.log({TempFilePath:d,DynamicManifest:i});const c=JSON.stringify(i),a=new Blob([c],{type:"application/json"}),D=URL.createObjectURL(a);document.querySelector("esp-web-install-button").setAttribute("manifest",D)}return n.jsxs(n.Fragment,{children:[n.jsx(z,{dataSource:g,columns:O}),n.jsx(U,{title:"Generate Bin File",open:C,footer:null,onCancel:()=>{p(!1),e(!0)},children:n.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:[n.jsx("div",{style:{textAlign:"center",color:"gray"},children:"Please click on the 'Generate Bin File' button below to generate the embedded software for the version you have selected."}),n.jsx(x,{type:"primary",loading:r,disabled:!T,style:{width:"180px",margin:"1rem 0"},onClick:()=>{if(f){let d=`${y}/media/Embedded/Arduino/${_}/${_}.ino.bin`;j(d),e(!1),b.info("Bin File Exists!")}else J(S)},children:"Generate Bin File"}),n.jsx("div",{style:{textAlign:"center",color:"gray"},children:"After generating the Bin File, proceed by clicking on 'Connect Board' to transfer and upload the code to the hardware."}),n.jsx("esp-web-install-button",{id:"installButton",manifest:"",onClick:()=>{p(!1),e(!0)},children:n.jsx(x,{disabled:T,style:{width:"180px",margin:"1rem 0"},slot:"activate",type:"primary",role:"button",children:"Connect Board"})})]})})]})},te=()=>{s.useState(!1);const[g,o]=s.useState([]);s.useEffect(()=>{C()},[]);const C=()=>{V.get(`${w.CodePush.GetJSON}${A()}`).then(p=>{console.log(p.data);let S=[];p.data.map(l=>{S.push({key:l.name,Name:l.name,Equipment:l.equipment_id,BinFileState:l.embedded_generated_code_state,Data:l})}),o(S)})};return n.jsx(n.Fragment,{children:n.jsxs("div",{children:[n.jsx("div",{className:"items-center pb-5 flex flex-1 flex-row justify-between",children:n.jsx("p",{className:"text-[20px] font-medium",children:"Code Push"})}),n.jsx(H,{data:g,fetchList:C})]})})};export{te as default};
