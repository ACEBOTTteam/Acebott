int value=0;//Define the variable "value" to be assigned the value 0

void setup(){
  pinMode(34, INPUT);//Set the pin of the photosensitive sensor to 34
  pinMode(27, OUTPUT);//Set the LED lamp pin to 27
}

void loop(){
	value = analogRead(34);//Assign the value of the photosensor to the variable value
	if (value > 3500) {//When the light value is greater than 3500, the LED light is on, otherwise the light is not on
		digitalWrite(27,HIGH);
 } 
	else {
		digitalWrite(27,LOW);
 }
}