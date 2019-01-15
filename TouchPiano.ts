/*****************************************************************************
* | File      	:	WSTouchPiano
* | Author      :   Waveshare team
* | Function    :	Contorl Piano  
* | Info        :
*----------------
* |	This version:   V1.1
* | Date        :   2018-05-22
* | Info        :   Improve misidentification
*
* | Basic       :   2018-01-22
* | Info        :   Basic version
******************************************************************************/
/**
 * The piano key corresponds to the touch screen TPvalue.
 */
enum TP_PIANO {
    None = 0x0000,
    C = 0x0001,
    bD = 0x0002,
    D = 0x0004,
    bE = 0x0008,

    E = 0x0010,
    F = 0x0020,
    bG = 0x0040,
    G = 0x0080,

    bA = 0x0100,
    A = 0x0200,
    bB = 0x0400,
    B = 0x0800,

    C1 = 0x1000,
}



/**
 * Operate the function of the piano board.
 */
//% weight=20 color=#3333FF icon="\uf001"
namespace WSTouchPiano {
    //% blockId=tp_press 
    //% block="Pey|%index|is pressed"
    //% weight=100
    export function TP_Press(index: TP_PIANO): boolean {
        let TPval = pins.i2cReadNumber(0x57, NumberFormat.UInt16BE);

        let keyup = 1;
        let press = false;
        if (keyup && TPval != TP_PIANO.None) {
            if (TPval != TP_PIANO.None) {
                keyup = 0;
                let temp = TPval >> 8;
                TPval = (TPval << 8) | temp;
                if (index != 0) {
                    if (TPval & index) {
                        press = true;
                    } else {
                        press = false;
                    }
                } else {
                    if (TPval == 0) {
                        press = true;
                    } else {
                        press = false;
                    }
                }
            }
        }
        return press;
    }




	/**
	 * Plays a tone through pin ``P0`` for the given duration.
	 * @param frequency pitch of the tone to play in Hertz (Hz)
	 * @param ms tone duration in milliseconds (ms)
	 */
    //% help=music/play-tone 
    //% weight=70
    //% blockId=TP_PlayMusic block="Play |Music %note=device_note|for %duration=device_beat" blockGap=8
    //% parts="headphone"
    //% useEnumTPval=1
    export function TP_PlayMusic(frequency: number, ms: number): void {
        pins.analogPitch(frequency, ms);
    }

    let play = 0;
    /**
    * Play the Piano
    */
    //% blockId==TP_PlayPiano" block="Play Piano"
    //% weight=60    
    export function TP_PlayPiano(): void {
        //pins.analogSetPitchPin(AnalogPin.P0);
        let TPval = pins.i2cReadNumber(0x57, NumberFormat.UInt16BE);
        let temp = TPval >> 8;
        TPval = (TPval << 8) | temp;

        if ((TPval & play) != 0) {
            TPval = TPval & play;
        } else if (TPval & TP_PIANO.C) {
          
            music.ringTone(262);
        } else if (TPval & TP_PIANO.bD) {
           
            music.ringTone(277);
        } else if (TPval & TP_PIANO.D) {
          
            music.ringTone(294);
        } else if (TPval & TP_PIANO.bE) {
           
            music.ringTone(311);
        } else if (TPval & TP_PIANO.E) {
       
            music.ringTone(330);
        } else if (TPval & TP_PIANO.F) {
       
            music.ringTone(349);
        } else if (TPval & TP_PIANO.bG) {
          
            music.ringTone(370);
        } else if (TPval & TP_PIANO.G) {
      
            music.ringTone(392);
        } else if (TPval & TP_PIANO.bA) {
        
            music.ringTone(415);
        } else if (TPval & TP_PIANO.A) {
       
            music.ringTone(440);
        } else if (TPval & TP_PIANO.bB) {
   
            music.ringTone(466);
        } else if (TPval & TP_PIANO.B) {
     
            music.ringTone(494);
        } else if (TPval & TP_PIANO.C1) {
         
            music.ringTone(523);
        } else if (TPval == TP_PIANO.None) {
       
            music.ringTone(0);
        }
        if (TPval != 0xffff)
            play = TPval;
    }
}
