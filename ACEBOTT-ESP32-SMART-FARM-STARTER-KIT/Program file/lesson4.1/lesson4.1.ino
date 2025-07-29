int analogPin = 34;  // Pin ADC
int nilaiADC = 0;

void setup() {
  Serial.begin(115200);
}

void loop() {
  nilaiADC = analogRead(analogPin);  // Membaca nilai analog (0 - 4095)
  Serial.println(nilaiADC);
  delay(500);
}
