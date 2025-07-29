#define LED  27 //The interface for declaring LED is 27
#define button  32//The interface for declaring key presses is 32

bool light_state = false; //Initialize the state of the light, where false means the light is off and true means the light is on

void setup() {
  pinMode(LED,OUTPUT);//Set pin27 as the output mode
  pinMode(button,INPUT);//Set the pin32 input mode
}

void loop() {
  if(digitalRead(button) == 0){  //Determine whether the key is pressed
    delay(200);//The delay is 0.2s to increase the detection accuracy
    while(digitalRead(button)==0); //Wait for the button to release
    light_state = !light_state; // Switch the state of the light
  }

  if(light_state){
    digitalWrite(LED,HIGH);//Light on
  }
  else{
    digitalWrite(LED,LOW);//Light off
  }
}