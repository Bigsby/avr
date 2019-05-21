#define F_CPU 4000000UL
#define __AVR_ATmega328__ 1
#include <avr/io.h>
#include <util/delay.h>

int main(void)
{

    DDRC = 0xFF;
    while (1)
    {
        PORTC |= (1 << 0);
        _delay_ms(250);
        PORTC &= ~(1 << 0);
        _delay_ms(250);
    };
}

// https://blog.podkalicki.com/how-to-compile-and-burn-the-code-to-avr-chip-on-linuxmacosxwindows/
// avr-gcc -Wall -g -Os -mmcu=attiny85 -o main.bin .\main.c
// avr-gcc -Wall -g -Os -mmcu=atmega328 -o main.bin ./main.c
// avr-size -C main.bin
// avr-objcopy -j .text -j .data -O ihex main.bin main.hex
// avr-objdump -s -m <avr architecture> -d program.hex > program.dump
// avr-objdump -s -m avr -d main.hex > main.dump