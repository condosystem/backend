/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { QrCodeService } from './qr-code.service';
import { Public } from 'src/common/decorators';

@Controller('qrcode')
export class QrCodeController {
    constructor(private readonly qrCodeService: QrCodeService) { }

    @Public()
    @Get('fileName')
    async readQrCodeFromFile(@Body() fileName: string, @Res() res: Response): Promise<void> {

        try {
            const decodedData = await this.qrCodeService.readQRCodeFromFile(fileName);
            res.status(200).json({ data: decodedData });
        } catch (error) {
            res.status(500).json({ error: error.message || 'Ocorreu um erro ao ler o código QR.' });
        }
    }
}
