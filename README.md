# avr
AVR architecture incursions

# Designations
1.1. RAMPX, RAMPY, and RAMPZ
Registers concatenated with the X-, Y-, and Z-registers enabling indirect addressing of the whole data
space on MCUs with more than 64KB data space, and constant data fetch on MCUs with more than
64KB program space.
1.2. RAMPD
Register concatenated with the Z-register enabling direct addressing of the whole data space on MCUs
with more than 64KB data space.
1.3. EIND
Register concatenated with the Z-register enabling indirect jump and call to the whole program space on
MCUs with more than 64K words (128KB) program space.
1.4. Stack
STACK Stack for return address and pushed registers
SP Stack Pointer to STACK
1.5. Flags
⇔ Flag affected by instruction
0 Flag cleared by instruction
1 Flag set by instruction
- Flag not affected by instruction

# Status Register (SREG)
SREG Status Register
C Carry Flag
Z Zero Flag
N Negative Flag
V Two’s complement overflow indicator
S N ⊕ V, for signed tests
H Half Carry Flag
T Transfer bit used by BLD and BST instructions
I Global Interrupt Enable/Disable Flag

# Registers and Operands
Rd: Destination (and source) register in the Register File
Rr: Source register in the Register File
R: Result after instruction is executed
K: Constant data
k: Constant address
b: Bit in the Register File or I/O Register (3-bit)
s: Bit in the Status Register (3-bit)
X,Y,Z: Indirect Address Register (X=R27:R26, Y=R29:R28, and
Z=R31:R30)
A: I/O location address
q: Displacement for direct addressing (6-bit)