int value=0;

void setup(){
	Serial.begin(115200);
  pinMode(35, INPUT);//The soil moisture sensor pin is set to 35
}

void loop(){
	value = analogRead(35);//Assign the value of the soil moisture sensor to the variable value
	Serial.println(value);
	delay(1000);
}