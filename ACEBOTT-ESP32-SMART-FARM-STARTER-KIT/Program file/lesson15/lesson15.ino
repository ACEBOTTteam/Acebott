#include<WiFi.h>//Import WiFi library
#include<WebServer.h>//Import the Web server library
const char* ssid = "jrii";//Please enter your WiFi name
const char* password = "12345678";//Please enter your WiFi password
int ledPin = 27;
WebServer server(80);//Set the web server port

void handleRoot(){//Remote control LED web program
 String HTML = "<!DOCTYPE html>\
 <html>\
 <head><meta charset='utf-8'></head>\
 <body>\
 Control LED！\
 <script>var xhttp = new XMLHttpRequest();\
     function sw(arg){\
      xhttp.open('GET', '/sw?Led=' + arg,true );\
      xhttp.send()}\
 </script>\
 <button onmousedown=sw('on')>LED ON</button>\
 <button onmousedown=sw('off')>LED OFF</button>\
 </body>\
 </html>";
 server.send(200,"text/html",HTML); 
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED){//Waiting to connect to WiFi
    delay(500);
    Serial.print(".");
  }
  Serial.print("\nIP address: ");
	Serial.println(WiFi.localIP());//Serial port prints the ip address of WiFi
	server.on("/", handleRoot);
	server.on("/sw",ledSwitch);
	server.on("/c", [](){server.send(200,"text/html","hello");});
	server.onNotFound([](){server.send(200,"text/html;charset=utf-8","Page not found！");});
	server.begin();
}

void ledSwitch(){
	String state = server.arg("Led");
	if(state == "off"){
		digitalWrite(ledPin, LOW);//Web page click off the lights, LED off
	}else if(state == "on"){
		digitalWrite(ledPin, HIGH);//Web page click on the light, LED on
 }
	server.send(200, "text/html", "LED IS <b>" + state + "</b>.");
}
void loop() {
	server.handleClient();
}