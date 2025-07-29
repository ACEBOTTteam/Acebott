int buzzerPin = 25;//Define the buzzer pin
//Defining notes
#define C4 262
#define D4 294
#define E4 330
#define F4 350
#define G4 393
#define A4 441
#define B4 495
int length0=24;//Length of tune
//Define a song tune
int tune0[] = { E4, E4, E4, E4, E4, E4, E4, G4, C4, D4, E4, F4, F4, F4, F4 ,F4, E4, E4, E4, G4, G4, F4, D4, C4};
//Define the tune beat
float durt0[] = { 1, 1, 2, 1, 1, 2, 1, 1, 1.5, 0.5, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3 };

void setup() 
{
	for (int x = 0; x < length0; x++) {
		tone(buzzerPin, tune0[x]);
		delay(341 * durt0[x]);//Song beat time
		noTone(buzzerPin);
	 }
}

void loop() 
{ 
}