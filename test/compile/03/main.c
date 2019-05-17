int main(void)
{
    int a = 0;
    int i;
    for (i = 0; i < 2; i++) {
        a++;
    }

    return a;
}


// https://blog.podkalicki.com/how-to-compile-and-burn-the-code-to-avr-chip-on-linuxmacosxwindows/
// avr-gcc -Wall -g -Os -mmcu=attiny85 -o main.bin .\main.c
// avr-size -C main.bin
// avr-objcopy -j .text -j .data -O ihex main.bin main.hex
// avr-objdump -s -m <avr architecture> -d program.hex > program.dump
// avr-objdump -s -m avr -d main.hex > main.dump