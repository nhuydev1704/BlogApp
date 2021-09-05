import { Twilio } from 'twilio'

const accountSid = `${process.env.local.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.local.TWILIO_AUTH_TOKEN}`;
const from = `${process.env.local.TWILIO_PHONE_NUMBER}`;
const serviceID = `${process.env.local.TWILIO_SERVICE_ID}`;

const client = new Twilio(accountSid, authToken)


export const sendSms = (to: string, body: string, txt: string) => {
    try {
        client.messages
            .create({
                body: `BlogNhuY ${txt} - ${body}`,
                from,
                to
            })
            .then(message => console.log(message.sid));
    } catch (err: any) {
        console.log(err)
    }
}

export const smsOTP = async (to: string, channel: string) => {
    try {
        const data = await client.verify
            .services(serviceID)
            .verifications
            .create({
                to,
                channel
            })
        return data;

    } catch (err: any) {
        console.log(err)
    }
}

export const verifyOTP = async (to: string, code: string) => {
    try {
        const data = await client.verify
            .services(serviceID)
            .verificationChecks
            .create({
                to,
                code
            })
        return data;

    } catch (err: any) {
        console.log(err)
    }
}

