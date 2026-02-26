export default {
    name: 'style',
    description: 'Convert text to fancy styled formats',
    category: 'Fun',
    async execute(sock, m, { args, prefix }) {
        if (args.length === 0) {
            return await sock.sendMessage(m.key.remoteJid, { 
                text: `💅 *Text Style Converter*\n\n` +
                      `Usage: ${prefix}style <text>\n\n` +
                      `Example: ${prefix}style Hello World\n\n` +
                      `The bot will convert your text into multiple fancy styles!`
            });
        }

        const text = args.join(' ');
        
        // Fancy text conversions
        const styles = {
            'Bold': text.split('').map(c => {
                const code = c.charCodeAt(0);
                if (code >= 65 && code <= 90) return String.fromCharCode(code + 120107);
                if (code >= 97 && code <= 122) return String.fromCharCode(code + 120101);
                if (code >= 48 && code <= 57) return String.fromCharCode(code + 120734);
                return c;
            }).join(''),
            
            'Italic': text.split('').map(c => {
                const code = c.charCodeAt(0);
                if (code >= 65 && code <= 90) return String.fromCharCode(code + 120263);
                if (code >= 97 && code <= 122) return String.fromCharCode(code + 120257);
                return c;
            }).join(''),
            
            'Script': text.split('').map(c => {
                const code = c.charCodeAt(0);
                if (code >= 65 && code <= 90) return String.fromCharCode(code + 119951);
                if (code >= 97 && code <= 122) return String.fromCharCode(code + 119945);
                return c;
            }).join(''),
            
            'Double': text.split('').map(c => {
                const code = c.charCodeAt(0);
                if (code >= 65 && code <= 90) return String.fromCharCode(code + 120055);
                if (code >= 97 && code <= 122) return String.fromCharCode(code + 120049);
                if (code >= 48 && code <= 57) return String.fromCharCode(code + 120734);
                return c;
            }).join(''),
            
            'Monospace': text.split('').map(c => {
                const code = c.charCodeAt(0);
                if (code >= 65 && code <= 90) return String.fromCharCode(code + 120367);
                if (code >= 97 && code <= 122) return String.fromCharCode(code + 120361);
                if (code >= 48 && code <= 57) return String.fromCharCode(code + 120774);
                return c;
            }).join(''),
            
            'Bubble': text.split('').map(c => {
                const code = c.charCodeAt(0);
                if (code >= 65 && code <= 90) return String.fromCharCode(code + 9333);
                if (code >= 97 && code <= 122) return String.fromCharCode(code + 9327);
                if (code >= 48 && code <= 57) return String.fromCharCode(code + 9263);
                return c;
            }).join(''),
            
            'Squared': text.split('').map(c => {
                const code = c.charCodeAt(0);
                if (code >= 65 && code <= 90) return String.fromCharCode(code + 127280);
                if (code >= 97 && code <= 122) return String.fromCharCode(code.toString().toUpperCase().charCodeAt(0) + 127280);
                return c;
            }).join(''),
            
            'Upside Down': text.split('').reverse().map(c => {
                const flipped = {
                    'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ',
                    'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u',
                    'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n',
                    'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
                    'A': '∀', 'B': 'ᙠ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': '⅁',
                    'H': 'H', 'I': 'I', 'J': 'ſ', 'K': '⋊', 'L': '˥', 'M': 'W', 'N': 'N',
                    'O': 'O', 'P': 'Ԁ', 'Q': 'Ὸ', 'R': 'ᴚ', 'S': 'S', 'T': '⊥', 'U': '∩',
                    'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
                    '!': '¡', '?': '¿', '.': '˙', ',': '\'', "'": ',', '"': '„',
                    '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{',
                    ' ': ' '
                };
                return flipped[c] || c;
            }).join('')
        };

        let response = `💅 *Styled Text Results*\n\n`;
        response += `📝 Original: ${text}\n\n`;
        response += `━━━━━━━━━━━━━━━━━━\n\n`;
        
        for (const [style, result] of Object.entries(styles)) {
            response += `✨ *${style}:*\n${result}\n\n`;
        }
        
        response += `━━━━━━━━━━━━━━━━━━\n`;
        response += `_Copy and use your favorite style!_`;

        await sock.sendMessage(m.key.remoteJid, { text: response });
    }
};
