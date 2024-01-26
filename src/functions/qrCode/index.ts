/* eslint-disable prettier/prettier */

import * as QRCode from 'qrcode';
import * as fs from 'fs'; // Se quiser salvar o QR em um arquivo

export async function QrCode(arg: string | number) {

    try {
        const qrCode = await QRCode.toDataURL(arg);

        const qrCodeFilename = `${arg}-qrcode.png`;

        // Se quiser salvar o QR em um arquivo (opcional)
        await fs.promises.writeFile(
            `./tmp/${qrCodeFilename}`,
            qrCode.split(';base64,').pop(),
            { encoding: 'base64' }
        );

        return qrCodeFilename;

    } catch (err) {
        return;
    }

    return arg;
}