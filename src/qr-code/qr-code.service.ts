/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as Jimp from 'jimp';
import * as QrCodeReader from 'qrcode-reader';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class QrCodeService {
    async readQRCodeFromFile(fileName: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const filePath = path.join(__dirname, '..', '../../tmp', fileName); // Substitua com o caminho para a pasta onde os arquivos estão armazenados
            fs.readFile(filePath, async (err, data) => {
                if (err) {
                    reject(`Erro ao ler o arquivo: ${err}`);
                } else {
                    try {
                        const qrCodeReader = new QrCodeReader();
                        const image = await Jimp.read(data);

                        qrCodeReader
                            .decode(image.bitmap)
                            .then(decodedData => {
                                resolve(decodedData?.result);
                            })
                            .catch(error => {
                                reject(`Erro ao ler o código QR: ${error}`);
                            });
                    } catch (error) {
                        reject(`Erro ao processar a imagem: ${error}`);
                    }
                }
            });
        });
    }
}
