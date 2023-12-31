import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendQrCodeEmail(email: string, qrCode: string, nameuser: string): Promise<void>;
    sendPulseraEnviada(email: string, nameuser: string): Promise<void>;
    sendPulseraEntregada(email: string, nameuser: string): Promise<void>;
}
