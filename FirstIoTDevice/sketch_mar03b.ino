 // Define hardware connections
#define PIN_GATE_IN 2
#define IRQ_GATE_IN  0
#define PIN_LED_OUT 13
#define PIN_ANALOG_IN A0

#include <LiquidCrystal.h>
LiquidCrystal lcd(12,11,5,4,3,1);

// soundISR()
// This function is installed as an interrupt service routine for the pin
// change interrupt.  When digital input 2 changes state, this routine
// is called.
// It queries the state of that pin, and sets the onboard LED to reflect that 
// pin's state.
void soundISR()
{
  int pin_val;

  pin_val = digitalRead(PIN_GATE_IN);
  digitalWrite(PIN_LED_OUT, pin_val);   
}

void setup()
{
  Serial.begin(9600);
   lcd.begin(16, 2);

  //  Configure LED pin as output
  pinMode(PIN_LED_OUT, OUTPUT);

  // configure input to interrupt
  pinMode(PIN_GATE_IN, INPUT);
  attachInterrupt(IRQ_GATE_IN, soundISR, CHANGE);

  // Display status
  Serial.println("Initialized");
}

void loop()
{
  int value;

  // Check the envelope input
  value = analogRead(PIN_ANALOG_IN);
  Serial.print(value);

  // Convert envelope value into a message
  Serial.print("Status: ");
  if(value <= 10)
  {
    Serial.println("Quiet.");
    lcd.clear();
  }
  else if( (value > 10) && ( value <= 30) )
  {
    Serial.println("Moderate.");
    lcd.clear();
  }
  else if(value > 30)
  {
    Serial.println("Loud.");
    
    lcd.setCursor(0,1);
    lcd.clear();
    lcd.print("Too loud!!!");

  }

  // pause for 1 second
  delay(1000);

}
